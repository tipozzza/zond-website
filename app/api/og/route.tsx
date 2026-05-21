import { ImageResponse } from "next/og";

export const runtime = "edge";

const BRAND = "#3D2E91";
const BRAND_DARK = "#1a1543";
const ACCENT = "#F4C430";

async function loadFont(): Promise<ArrayBuffer> {
  const res = await fetch(new URL("./Rubik.ttf", import.meta.url));
  return await res.arrayBuffer();
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "ZOND — реклама и производство").slice(0, 140);
  const subtitle = (searchParams.get("subtitle") || "Томск, с 1992 года").slice(0, 120);
  const category = (searchParams.get("category") || "").slice(0, 60);

  const fontData = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          color: "white",
          fontFamily: "Rubik",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${ACCENT}33 0%, transparent 70%)`,
          }}
        />

        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: ACCENT,
            textTransform: "uppercase",
            letterSpacing: 3,
            display: "flex",
          }}
        >
          {category || "ZOND"}
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            marginTop: 36,
            lineHeight: 1.12,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 30,
            marginTop: 28,
            opacity: 0.85,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: ACCENT,
              fontWeight: 700,
              display: "flex",
            }}
          >
            ZOND × Лайтово
          </div>
          <div
            style={{
              fontSize: 22,
              opacity: 0.7,
              display: "flex",
            }}
          >
            zondreklama.ru
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Rubik",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
