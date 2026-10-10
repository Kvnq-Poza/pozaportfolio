import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { SITE } from "@/lib/constants";

export const OG_SIZE = { width: 1200, height: 630 };

const avatar = `data:image/jpeg;base64,${fs
  .readFileSync(path.join(process.cwd(), "public", "og-avatar.jpg"))
  .toString("base64")}`;

// Terminal-style social card shared by the site-wide and per-post OG images.
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
  tags = [],
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tags?: string[];
}) {
  const host = new URL(SITE.url).host.replace(/^www\./, "");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#000000",
          color: "#f9fafb",
          padding: "64px 72px",
          fontFamily: "monospace",
          border: "2px solid #22c55e33",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#ef4444" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#eab308" }} />
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#22c55e" }} />
          <div style={{ marginLeft: 16, fontSize: 28, color: "#22c55e" }}>
            {`poza@dev:~$ ${eyebrow}`}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: 20 }}>
            <div
              style={{
                fontSize: title.length > 60 ? 52 : 64,
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: -1,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div style={{ fontSize: 30, color: "#9ca3af", lineHeight: 1.4 }}>
                {subtitle}
              </div>
            )}
          </div>
          <img
            src={avatar}
            width={220}
            height={220}
            style={{ borderRadius: 24, border: "4px solid #22c55e" }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {tags.slice(0, 4).map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: 24,
                  padding: "6px 16px",
                  borderRadius: 8,
                  background: "#22c55e22",
                  color: "#22c55e",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 28, color: "#9ca3af" }}>{host}</div>
        </div>
      </div>
    ),
    OG_SIZE
  );
}
