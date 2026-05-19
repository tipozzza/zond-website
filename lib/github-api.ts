const API_BASE = "https://api.github.com";

function headers() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_BRANCH || "main";

export type FileContent = {
  sha: string;
  content: string;
  decoded: string;
};

export async function getFile(path: string): Promise<FileContent | null> {
  const url = `${API_BASE}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}?ref=${BRANCH}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`getFile ${path}: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const decoded = Buffer.from(data.content, "base64").toString("utf-8");
  return { sha: data.sha, content: data.content, decoded };
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
  const res = await fetch(url, { method: "PUT", headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`putFile ${path}: ${res.status} ${await res.text()}`);
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
  const res = await fetch(url, { method: "PUT", headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`putBinaryFile ${path}: ${res.status} ${await res.text()}`);
}

export async function deleteFile(path: string, message: string, sha: string): Promise<void> {
  const url = `${API_BASE}/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`;
  const body = { message, sha, branch: BRANCH };
  const res = await fetch(url, { method: "DELETE", headers: headers(), body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`deleteFile ${path}: ${res.status} ${await res.text()}`);
}
