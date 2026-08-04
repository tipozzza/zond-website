/**
 * Автодеплой на Timeweb после публикации контента через админку.
 *
 * Зачем: у приложения выключен нативный автодеплой Timeweb из GitHub, поэтому
 * правки контента коммитятся в репозиторий, но сайт сам не пересобирается —
 * каждую публикацию раньше приходилось «доставлять» вручную. Здесь мы после
 * записи контента дёргаем Deploy API Timeweb, и сайт обновляется сам.
 *
 * Как: любая запись файла проходит через putFile/putBinaryFile/deleteFile в
 * github-api.ts. Оттуда вызывается scheduleDeploy(path). Мы деплоим ТОЛЬКО на
 * изменения контента (белый список путей ниже) — служебные записи (прогресс
 * MAX-викторины data/quiz*.json, data/team.json, лиды корзины lib/cart-leads.json)
 * пересборку не вызывают, иначе сайт бы передеплоивался на каждое действие
 * пользователя в боте.
 *
 * Дебаунс: одна публикация = несколько записей (двойная запись новости в
 * lib+public, галерея из N фото). Таймер сбрасывается на каждую запись и
 * стреляет один раз через DEBOUNCE_MS после последней — все правки схлопываются
 * в один деплой. Работает надёжно, потому что приложение крутится персистентным
 * процессом `next start` (не serverless), и setTimeout доживает до срабатывания.
 *
 * Фича включается только при заданном TIMEWEB_API_TOKEN. Без него scheduleDeploy —
 * no-op, поведение как раньше (деплой вручную). Ошибка деплоя никогда не ломает
 * сохранение: всё бросание проглатывается и уходит в лог.
 */

const APP_ID = process.env.TIMEWEB_APP_ID || "213607";
const DEBOUNCE_MS = 6000;

/**
 * Файлы, изменение которых требует пересборки сайта: их контент бандлится в
 * билд (news-data.ts импортит lib/news.json и т.д.) либо это статика в /public.
 */
const DEPLOY_FILES = new Set<string>([
  "lib/news.json",
  "public/data/news.json",
  "lib/blog.json",
  "data/portfolio.json",
  "public/data/sides.json",
]);

/** Нужна ли пересборка сайта из-за записи по этому пути. */
export function pathAffectsSite(repoPath: string): boolean {
  if (DEPLOY_FILES.has(repoPath)) return true;
  // Загруженные картинки: новости, блог, портфолио, конструкции — всё в public/images/**
  if (repoPath.startsWith("public/images/")) return true;
  return false;
}

let timer: ReturnType<typeof setTimeout> | null = null;

/**
 * Планирует пересборку сайта на Timeweb после изменения контента.
 * Идемпотентно склеивает пачку правок в один деплой (см. дебаунс выше).
 * Никогда не бросает.
 */
export function scheduleDeploy(repoPath: string): void {
  if (!process.env.TIMEWEB_API_TOKEN) return; // фича выключена, пока нет токена
  if (!pathAffectsSite(repoPath)) return;
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    runDeploy().catch((e) => console.error("[timeweb-deploy] deploy failed:", e));
  }, DEBOUNCE_MS);
}

/** Текущий HEAD ветки в GitHub — его и деплоим (включает все склеенные коммиты). */
async function latestCommitSha(): Promise<string | null> {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!owner || !repo) {
    console.error("[timeweb-deploy] GITHUB_OWNER/REPO не заданы");
    return null;
  }
  const url = `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("[timeweb-deploy] не удалось прочитать HEAD sha:", res.status, await res.text());
    return null;
  }
  const data = (await res.json()) as { sha?: string };
  return data.sha ?? null;
}

/** Один запрос к Deploy API Timeweb на пересборку текущего HEAD. */
async function runDeploy(): Promise<void> {
  const token = process.env.TIMEWEB_API_TOKEN;
  if (!token) return;
  const sha = await latestCommitSha();
  if (!sha) {
    console.error("[timeweb-deploy] нет commit sha — деплой пропущен");
    return;
  }
  const url = `https://api.timeweb.cloud/api/v1/apps/${APP_ID}/deploy`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ commit_sha: sha }),
  });
  if (!res.ok) {
    console.error("[timeweb-deploy] Deploy API ошибка:", res.status, await res.text());
    return;
  }
  console.log(`[timeweb-deploy] запущен деплой ${sha.slice(0, 7)}`);
}
