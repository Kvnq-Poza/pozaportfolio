import { renderOgImage, OG_SIZE } from "@/lib/og";
import { SITE } from "@/lib/constants";

export const alt = SITE.title;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "whoami",
    title: "James Alaribe (Poza)",
    subtitle:
      "Full-stack software developer in Lagos, building systems worldwide. Scalable SaaS platforms, APIs and real-time web apps.",
    tags: ["Next.js", "React", "TypeScript", "Node.js"],
  });
}
