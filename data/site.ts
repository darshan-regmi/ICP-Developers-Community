// Single source of truth for SEO/meta. Update these when the brand, URL, or
// social handles change — every meta tag, sitemap entry, and JSON-LD block
// reads from this file.

// Replace with your custom domain once it's set up. Until then, Vercel's
// production URL (set automatically via VERCEL_PROJECT_PRODUCTION_URL) is
// used in deployed builds; this fallback is only for local builds.
const FALLBACK_URL = "https://icp-developers-community.vercel.app";

export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : FALLBACK_URL;

export const site = {
  name: "ICP Developers' Community",
  shortName: "ICP DC",
  tagline: "We build in public. We learn by shipping.",
  description:
    "A student-led developer movement from Informatics College, Pokhara. Workshops, hackathons, open source, and team projects — built by students who refuse to wait until graduation to ship real software.",
  // Shorter version used where the full description is too long (≤155 chars).
  descriptionShort:
    "A student-led developer movement from Informatics College, Pokhara. We build in public. We learn by shipping.",
  url: siteUrl,
  locale: "en_US",
  language: "en",
  keywords: [
    "ICP Developers Community",
    "Informatics College Pokhara",
    "developer community Nepal",
    "student developers Nepal",
    "coding club Pokhara",
    "hackathon Nepal",
    "Pokhara tech community",
    "open source Nepal",
    "Nepal developer community",
    "college tech club Nepal",
    "programming club Pokhara",
  ],
  themeColor: { dark: "#222831", light: "#EEEEEE" },
  author: {
    name: "ICP Developers' Community",
    url: siteUrl,
  },
  social: {
    // Fill these in as the real accounts come online; empty strings are
    // filtered out of JSON-LD `sameAs` automatically.
    twitter: "",
    twitterHandle: "",
    github: "https://github.com/icpdevelopers",
    discord: "https://discord.com/invite/7HpJhBjaMH",
    instagram: "",
    linkedin: "",
  },
  organization: {
    legalName: "ICP Developers' Community at Informatics College Pokhara",
    foundingDate: "2023",
    address: {
      locality: "Pokhara",
      region: "Gandaki",
      country: "Nepal",
      countryCode: "NP",
    },
    parentOrganization: "Informatics College Pokhara",
  },
  contact: {
    email: "dev@icp.edu.np", // e.g. "hello@icp-dc.com"
  },
  membership: {
    // Applications are restricted to this email domain.
    // Change here once + the API + form copy + duplicate logic all follow.
    emailDomain: "icp.edu.np",
  },
  // Used by Google Search Console verification meta tag if/when set.
  verification: {
    google: "", // paste the content="..." value from the meta tag
    yandex: "",
    bing: "",
  },
};

export type Site = typeof site;
