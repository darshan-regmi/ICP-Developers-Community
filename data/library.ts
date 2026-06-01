// Resources content: the learning roadmap + the curated reading library.

export type RoadmapStep = {
  id: string;
  title: string;
  note: string;
  href: string;
};

export type LibraryLevel = "beginner" | "intermediate" | "advanced";

export type LibraryItem = {
  type: string;
  title: string;
  meta: string;
  desc: string;
  href: string;
  level: LibraryLevel;
};

export const roadmap: RoadmapStep[] = [
  {
    id: "00",
    title: "start here",
    note: "onboarding doc",
    href: "https://github.com/",
  },
  {
    id: "01",
    title: "fundamentals",
    note: "html · css · git · unix",
    href: "https://developer.mozilla.org/en-US/docs/Learn",
  },
  {
    id: "02",
    title: "pick a track",
    note: "web · ai · systems · design",
    href: "https://roadmap.sh/",
  },
  {
    id: "03",
    title: "ship something",
    note: "first PR · first deploy",
    href: "https://vercel.com/docs",
  },
  {
    id: "04",
    title: "go deeper",
    note: "cohort · study circle · open source",
    href: "#what",
  },
  {
    id: "05",
    title: "build with us",
    note: "join a project team",
    href: "#join",
  },
];

export const library: LibraryItem[] = [
  {
    type: "guide",
    title: "MDN Web Docs",
    meta: "free · reference",
    desc: "The single best reference for HTML, CSS, and JavaScript on the open web.",
    href: "https://developer.mozilla.org/",
    level: "beginner",
  },
  {
    type: "interactive",
    title: "The Odin Project",
    meta: "free · full curriculum",
    desc: "A complete full-stack curriculum that takes you from absolute zero to job-ready.",
    href: "https://www.theodinproject.com/",
    level: "beginner",
  },
  {
    type: "tutorial",
    title: "Next.js Learn",
    meta: "free · ~6 hrs",
    desc: "Official tutorial that walks you through building a real production-grade Next.js app.",
    href: "https://nextjs.org/learn",
    level: "intermediate",
  },
  {
    type: "talk",
    title: "Bret Victor — Inventing on Principle",
    meta: "54 min · talk",
    desc: "A foundational talk on building tools with fast feedback. Worth watching twice.",
    href: "https://vimeo.com/36579366",
    level: "intermediate",
  },
  {
    type: "book",
    title: "Designing Data-Intensive Applications",
    meta: "12 chapters · paid",
    desc: "The reference for backend systems thinking. Borrowable from the club shelf.",
    href: "https://dataintensive.net/",
    level: "advanced",
  },
  {
    type: "course",
    title: "MIT 6.S081 — Operating Systems",
    meta: "12 weeks · free",
    desc: "Build a Unix-like OS from scratch. The systems track's bread and butter.",
    href: "https://pdos.csail.mit.edu/6.S081/",
    level: "advanced",
  },
];
