import { SITE, POZA_DATA, SKILLS } from "@/lib/constants";

export const absoluteUrl = (path = "/") =>
  `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

export const PERSON_ID = absoluteUrl("/#person");
export const WEBSITE_ID = absoluteUrl("/#website");

export function personSchema() {
  const skills = POZA_DATA.technical_skills.flatMap((s) => s.skill_list);
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: POZA_DATA.name,
    alternateName: [POZA_DATA.alias, "Kvnq Poza"],
    jobTitle: "Software Developer",
    description: POZA_DATA.professional_summary,
    url: SITE.url,
    image: absoluteUrl(SITE.image),
    sameAs: Object.values(SITE.socials),
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.location.city,
        addressCountry: SITE.location.countryCode,
      },
    },
    workLocation: [
      {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.location.city,
          addressCountry: SITE.location.countryCode,
        },
      },
      { "@type": "VirtualLocation", name: "Remote (worldwide)" },
    ],
    knowsAbout: Array.from(new Set([...SKILLS, ...skills])),
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Developer",
      occupationalCategory: "15-1252.00 Software Developers",
      skills: skills.join(", "),
    },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const graph = (...nodes: object[]) => ({
  "@context": "https://schema.org",
  "@graph": nodes,
});
