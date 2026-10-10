import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph, PERSON_ID, absoluteUrl } from "@/lib/seo";

const description =
  "Hire James Alaribe (Poza), a full-stack software developer based in Lagos, Nigeria and available for remote freelance and full-time work worldwide on SaaS products, APIs and web apps. Get in touch.";

export const metadata: Metadata = {
  title: "Contact: Hire a Full-Stack Developer",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Hire James Alaribe (Poza)", description },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "ContactPage",
            "@id": absoluteUrl("/contact#page"),
            url: absoluteUrl("/contact"),
            name: "Contact James Alaribe (Poza)",
            description,
            mainEntity: { "@id": PERSON_ID },
          },
          breadcrumbSchema([{ name: "Contact", path: "/contact" }])
        )}
      />
      {children}
    </>
  );
}
