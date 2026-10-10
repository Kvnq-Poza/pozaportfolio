import { renderOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Blog by James Alaribe (Poza)";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "ls blog/",
    title: "Blog by James Alaribe (Poza)",
    subtitle: "Articles on Next.js, React, Node.js, APIs and building a career in software.",
    tags: ["Next.js", "React", "Node.js", "Career"],
  });
}
