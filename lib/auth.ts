import { cookies } from "next/headers";
import { createHmac } from "crypto";

const COOKIE_NAME = "admin_session";
const SESSION_DURATION_HOURS = 24;

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export async function createSession(): Promise<void> {
  const secret = process.env.AUTH_SECRET!;
  const expires = Date.now() + SESSION_DURATION_HOURS * 3600 * 1000;
  const payload = String(expires);
  const signature = sign(payload, secret);
  const cookieValue = `${payload}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_HOURS * 3600,
    path: "/",
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie) return false;

  const secret = process.env.AUTH_SECRET!;
  const [payload, signature] = cookie.value.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload, secret);
  if (signature !== expected) return false;

  const expires = parseInt(payload, 10);
  if (Date.now() > expires) return false;

  return true;
}
