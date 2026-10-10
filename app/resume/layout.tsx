import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/seo";

const description =
  "Resume of James Alaribe (Poza), full-stack software developer: experience, technical skills (Next.js, React, TypeScript, Node.js, Python, PostgreSQL, Docker) and projects. Download the PDF.";

export const metadata: Metadata = {
  title: "Resume: Software Developer CV",
  description,
  alternates: { canonical: "/resume" },
  openGraph: { url: "/resume", title: "Resume of James Alaribe (Poza)", description },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Resume", path: "/resume" }]))} />
      {children}
    </>
  );
}
