import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { PROJECTS } from "@/lib/constants";
import { breadcrumbSchema, graph, PERSON_ID, absoluteUrl } from "@/lib/seo";

const description =
  "Software projects by James Alaribe (Poza): SaaS platforms, payment systems, REST APIs, accessibility tools and real-time web apps built with Next.js, React, TypeScript, Node.js and PostgreSQL.";

export const metadata: Metadata = {
  title: "Projects: SaaS, APIs & Web Apps Portfolio",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { url: "/projects", title: "Projects by James Alaribe (Poza)", description },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const realLink = (url?: string) => (url && url !== "https://#" ? url : undefined);
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "CollectionPage",
            "@id": absoluteUrl("/projects#page"),
            url: absoluteUrl("/projects"),
            name: "Projects by James Alaribe (Poza)",
            description,
            author: { "@id": PERSON_ID },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: PROJECTS.map((project, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "CreativeWork",
                  name: project.title,
                  description: project.description,
                  url: realLink(project.liveUrl) ?? realLink("githubUrl" in project ? project.githubUrl : undefined),
                  image: project.image?.startsWith("/assets") ? absoluteUrl(project.image) : undefined,
                  keywords: project.technologies?.join(", "),
                  dateCreated: project.year,
                  creator: { "@id": PERSON_ID },
                },
              })),
            },
          },
          breadcrumbSchema([{ name: "Projects", path: "/projects" }])
        )}
      />
      {children}
    </>
  );
}
