// Project showcase data. The first `featuredCount` projects are visible by
// default; the rest reveal via the "view all projects" button.

export type ProjectCategory = "web" | "ai" | "tools" | "games" | "hardware";

export type Project = {
  n: string;
  name: string;
  tag: string;
  category: ProjectCategory;
  stack: string[];
  team: number;
  year: number;
  live?: string;
  repo?: string;
  description: string;
  contributors: string[];
};

export const featuredCount = 4;

export const projects: Project[] = [
  {
    n: "01",
    name: "NAYAA",
    tag: "a marketplace for Pokhara's craft makers",
    category: "web",
    stack: ["next.js", "postgres", "stripe"],
    team: 3,
    year: 2026,
    live: "#",
    repo: "#",
    description:
      "NAYAA connects local craft makers in Pokhara with buyers across Nepal. Sellers list handmade goods, buyers checkout with secure payments, and a small commission funds the platform. Built end-to-end by three students over one semester.",
    contributors: ["Aryan Gurung", "Samriddhi KC", "Pratik Sharma"],
  },
  {
    n: "02",
    name: "SARANGI.FM",
    tag: "a community radio built in 36 hours",
    category: "web",
    stack: ["sveltekit", "icecast", "node"],
    team: 4,
    year: 2026,
    live: "#",
    repo: "#",
    description:
      "A 24/7 student-run online radio built during a weekend hackathon. Listeners drop into a shared room, request tracks, and chat live. Streaming runs on a tiny VPS and serves the whole campus.",
    contributors: [
      "Nirajan Paudel",
      "Mila Shrestha",
      "Sushant Adhikari",
      "Priya Joshi",
    ],
  },
  {
    n: "03",
    name: "PHEWA WATCH",
    tag: "open dataset + dashboard for lake water quality",
    category: "ai",
    stack: ["python", "fastapi", "deck.gl"],
    team: 5,
    year: 2025,
    live: "#",
    repo: "#",
    description:
      "A public dashboard tracking water quality measurements around Phewa Lake. Sensors and weekly samples feed an open API and a public map. Used by two local NGOs.",
    contributors: [
      "Abishek Thapa",
      "Bipasha Rana",
      "Saurav Karki",
      "Anjila Pun",
      "Roshan Tamang",
    ],
  },
  {
    n: "04",
    name: "STUDYHALL",
    tag: "spaced repetition for engineering students",
    category: "tools",
    stack: ["react native", "supabase"],
    team: 2,
    year: 2025,
    live: "#",
    repo: "#",
    description:
      "A mobile app that turns lecture notes into spaced-repetition flashcards using a lightweight LLM. Has over 400 active student users across two colleges.",
    contributors: ["Mila Shrestha", "Hemanta Bista"],
  },
  {
    n: "05",
    name: "ANNAPURNA TRAILS",
    tag: "offline trail maps for trekkers",
    category: "tools",
    stack: ["react native", "mapbox", "sqlite"],
    team: 3,
    year: 2025,
    live: "#",
    repo: "#",
    description:
      "A fully offline trail map app for the Annapurna circuit. Caches map tiles, elevation, and points of interest. Built in partnership with a local trekking agency.",
    contributors: ["Samriddhi KC", "Saurav Karki", "Aayush Sapkota"],
  },
  {
    n: "06",
    name: "INK & CODE",
    tag: "a markdown-first newsletter platform",
    category: "web",
    stack: ["sveltekit", "postgres", "resend"],
    team: 2,
    year: 2025,
    repo: "#",
    description:
      "A no-nonsense newsletter platform aimed at student writers. Write in Markdown, schedule sends, and track opens without selling reader data.",
    contributors: ["Priya Joshi", "Bipasha Rana"],
  },
  {
    n: "07",
    name: "KORA",
    tag: "open API for Pokhara public transit",
    category: "tools",
    stack: ["go", "postgis", "redis"],
    team: 4,
    year: 2024,
    repo: "#",
    description:
      "An open transit API for Pokhara micro-buses. We surveyed routes, mapped stops, and built a Go service with GTFS-style schema. Frontends can query routes between any two points.",
    contributors: [
      "Nirajan Paudel",
      "Abishek Thapa",
      "Pratik Sharma",
      "Hemanta Bista",
    ],
  },
  {
    n: "08",
    name: "WEAVE",
    tag: "real-time whiteboard for study groups",
    category: "web",
    stack: ["next.js", "yjs", "tldraw"],
    team: 3,
    year: 2024,
    live: "#",
    repo: "#",
    description:
      "A collaborative whiteboard built on YJS. Used internally by our study circles for shared note-taking and live problem solving.",
    contributors: ["Aryan Gurung", "Mila Shrestha", "Anjila Pun"],
  },
  {
    n: "09",
    name: "MOMO COMPILER",
    tag: "a toy compiler for a Nepali-syntax mini-language",
    category: "tools",
    stack: ["rust", "llvm"],
    team: 2,
    year: 2024,
    repo: "#",
    description:
      "An educational compiler project: parse a tiny language with Nepali keywords, lower to LLVM IR, run real programs. Used in the systems study circle.",
    contributors: ["Nirajan Paudel", "Sushant Adhikari"],
  },
  {
    n: "10",
    name: "CAMPUS PULSE",
    tag: "real-time chat for college events",
    category: "web",
    stack: ["sveltekit", "pusher", "postgres"],
    team: 3,
    year: 2024,
    live: "#",
    repo: "#",
    description:
      "A lightweight event chat. Each campus event gets a temporary room that auto-archives after the event. Has powered 17 in-college events so far.",
    contributors: ["Samriddhi KC", "Roshan Tamang", "Aayush Sapkota"],
  },
];
