import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph, PERSON_ID, absoluteUrl } from "@/lib/seo";

const description =
  "About James Alaribe (Poza): a Lagos-based full-stack software developer working with clients worldwide, specialising in Next.js, React, TypeScript, Node.js and Python, from IT infrastructure to building scalable SaaS products.";

export const metadata: Metadata = {
  title: "About: Full-Stack Developer Story & Skills",
  description,
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About James Alaribe (Poza)", description },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "AboutPage",
            "@id": absoluteUrl("/about#page"),
            url: absoluteUrl("/about"),
            name: "About James Alaribe (Poza)",
            description,
            mainEntity: { "@id": PERSON_ID },
          },
          breadcrumbSchema([{ name: "About", path: "/about" }])
        )}
      />
      {children}
    </>
  );
}
