import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET() {
  const val = (k: string) => process.env[k] || "";
  return NextResponse.json({
    env_reaches_runtime: Boolean(process.env.GITHUB_TOKEN) || Boolean(process.env.MAX_GROUP_ID),
    has: {
      MAX_BOT_TOKEN: Boolean(val("MAX_BOT_TOKEN")),
      MAX_GROUP_ID: Boolean(val("MAX_GROUP_ID")),
      MAX_CRON_SECRET: Boolean(val("MAX_CRON_SECRET")),
      MAX_WEBHOOK_SECRET: Boolean(val("MAX_WEBHOOK_SECRET")),
      SITE_URL: Boolean(val("SITE_URL")),
      GITHUB_TOKEN: Boolean(val("GITHUB_TOKEN")),
    },
    lengths: {
      MAX_CRON_SECRET: val("MAX_CRON_SECRET").length,
      MAX_BOT_TOKEN: val("MAX_BOT_TOKEN").length,
    },
  });
}
