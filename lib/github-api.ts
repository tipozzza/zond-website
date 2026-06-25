import { readFile } from "fs/promises";
import path from "path";

const API_BASE = "https://api.github.com";
const REQUEST_TIMEOUT_MS = 8000;

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

/**
 * fetch к GitHub с жёстким таймаутом. Без него заблокированный/медленный
 * исходящий трафик (бывает на хостинге) подвешивает запрос, и админка
 * висит на «Загрузка...» бесконечно. По таймауту бросаем GitHubApiError
 * (status 0), чтобы хендлер показал понятную ошибку / ушёл в фолбэк.
 */
async function ghFetch(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new GitHubApiError("timeout", url, 0, `request timed out after ${REQUEST_TIMEOUT_MS}ms`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_BRANCH || "main";

/**
 * Типизированная ошибка GitHub API. Несёт HTTP-статус, чтобы админ-хендлеры
 * могли решать что показать пользователю (через friendlyGithubError).
 */
export class GitHubApiError extends Error {
  status: number;
  path: string;
  raw: string;
  constructor(operation: string, path: string, status: number, raw: string) {
    super(`${operation} ${path}: ${status} ${raw}`);
    this.name = "GitHubApiError";
    this.status = status;
    this.path = path;
    this.raw = raw;
  }
}

export type FileContent = {
  sha: string;
  content: string;
  decoded: string;
};

export async function getFile(path: string): Promise<FileContent | null> {
  const url = `${API_BASE}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}?ref=${BRANCH}`;
  const res = await ghFetch(url, { headers: headers(), cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new GitHubApiError("getFile", path, res.status, await res.text());
  const data = await res.json();
  const decoded = Buffer.from(data.content, "base64").toString("utf-8");
  return { sha: data.sha, content: data.content, decoded };
}

/**
 * Чтение списка для админки, устойчивое к недоступности GitHub.
 * Сначала пробуем GitHub (свежие данные сразу после правки). Если GitHub
 * упал (нет/протух токен, 5xx, таймаут) — читаем локальную копию файла из
 * бандла деплоя, чтобы список всё равно отрисовался. Запись по-прежнему идёт
 * только через GitHub. `source` сообщает UI, откуда взяты данные.
 *
 * GitHub 404 (файла ещё нет на ветке) — это не ошибка: возвращаем null,
 * хендлер покажет пустой список.
 */
export async function getFileWithFallback(
  repoPath: string,
): Promise<{ decoded: string; source: "github" | "local" } | null> {
  try {
    const file = await getFile(repoPath);
    return file ? { decoded: file.decoded, source: "github" } : null;
  } catch (err) {
    console.error("[admin github-api] getFile failed, trying local copy:", err);
    try {
      const local = await readFile(path.join(process.cwd(), repoPath), "utf-8");
      return { decoded: local, source: "local" };
    } catch (localErr) {
      console.error("[admin github-api] local fallback failed:", localErr);
      throw err; // отдаём исходную ошибку GitHub для friendlyGithubError
    }
  }
}

export async function putFile(
  path: string,
  content: string,
  message: string,
  sha?: string,
): Promise<void> {
  const url = `${API_BASE}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`;
  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;
  const res = await ghFetch(url, { method: "PUT", headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new GitHubApiError("putFile", path, res.status, await res.text());
}

export async function putBinaryFile(
  path: string,
  base64Content: string,
  message: string,
  sha?: string,
): Promise<void> {
  const url = `${API_BASE}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`;
  const body: Record<string, unknown> = { message, content: base64Content, branch: BRANCH };
  if (sha) body.sha = sha;
  const res = await ghFetch(url, { method: "PUT", headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new GitHubApiError("putBinaryFile", path, res.status, await res.text());
}

export async function deleteFile(path: string, message: string, sha: string): Promise<void> {
  const url = `${API_BASE}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`;
  const body = { message, sha, branch: BRANCH };
  const res = await ghFetch(url, { method: "DELETE", headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new GitHubApiError("deleteFile", path, res.status, await res.text());
}

/**
 * Гарантирует существование папки в репо. Если префикса нет — создаёт
 * пустой `.gitkeep` внутри, что заводит папку в Git tree.
 *
 * Класс ошибок «404 при первой загрузке файла в новую категорию»
 * возникает потому, что GitHub Contents API на PUT в несуществующий префикс
 * иногда отвечает 404 вместо тихого создания промежуточных tree entries.
 * Этот хелпер снимает класс ошибок раз и навсегда: на существующей папке —
 * один лёгкий GET (no-op); на новой — GET 404 → PUT .gitkeep.
 *
 * Идемпотентно: безопасно вызывать перед каждым upload-ом.
 */
export async function ensureDirectory(dir: string): Promise<void> {
  const clean = dir.replace(/^\/+|\/+$/g, "");
  if (!clean) return;
  const url = `${API_BASE}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(clean)}?ref=${BRANCH}`;
  const res = await ghFetch(url, { headers: headers(), cache: "no-store" });
  if (res.status === 200) return;
  if (res.status !== 404) {
    throw new GitHubApiError("ensureDirectory", clean, res.status, await res.text());
  }
  await putFile(`${clean}/.gitkeep`, "", `chore: ensure ${clean} exists`);
}

/**
 * Преобразует исключение от GitHub API в дружелюбное сообщение для админки.
 * Сырой JSON GitHub с ссылкой на docs.github.com пугает не-технических
 * пользователей. Полная ошибка остаётся в серверных логах через console.error.
 *
 * Возвращает пару { status, message } для использования в NextResponse.json.
 */
export function friendlyGithubError(err: unknown): { status: number; message: string } {
  console.error("[admin github-api]", err);
  if (err instanceof GitHubApiError) {
    if (err.status === 404 || err.status === 403) {
      return {
        status: 502,
        message:
          "Не удалось сохранить файл — проблема со связью с хранилищем. Попробуйте через минуту. Если повторяется, сообщите администратору.",
      };
    }
    if (err.status === 409) {
      return {
        status: 409,
        message:
          "Кто-то одновременно редактировал тот же раздел. Перезагрузите страницу и повторите.",
      };
    }
    if (err.status === 422) {
      return {
        status: 422,
        message: "Сервер хранилища отказал в записи (валидация). Сообщите администратору.",
      };
    }
    return {
      status: 502,
      message: "Ошибка хранилища. Если повторяется, сообщите администратору.",
    };
  }
  return {
    status: 500,
    message: "Внутренняя ошибка сервера. Если повторяется, сообщите администратору.",
  };
}
