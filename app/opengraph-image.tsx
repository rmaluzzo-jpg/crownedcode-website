import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Crowned Code — Custom Software for Serious Businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.18) 0%, transparent 60%), #0a0a0a",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg
            width="44"
            height="34"
            viewBox="0 0 32 24"
            fill="none"
            stroke="#c9a84c"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 22h28M5 22l2.5-10 5.5 5.5L16 8l3 9.5 5.5-5.5L27 22" />
          </svg>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            Crowned<span style={{ color: "#c9a84c" }}>Code</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Custom software for{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #c9a84c 0%, #e2c46e 50%, #c9a84c 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              serious businesses.
            </span>
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#888",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            AI integration, internal tools, and systems built to last.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            color: "#666",
            fontSize: 18,
          }}
        >
          <div>crownedcode.com</div>
          <div style={{ color: "#c9a84c", fontWeight: 600 }}>
            B2B Custom Software Studio
          </div>
        </div>
      </div>
    ),
    size,
  );
}
