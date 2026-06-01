// "What we do" — modules. Up to 6 recommended. The first long one in the row
// gets the `tall` flag for the asymmetric Mondrian grid layout.

export type Module = {
  id: string;
  title: string;
  body: string;
  meta: string;
  span: string;
  tall?: boolean;
  detail: {
    format: string;
    cadence: string;
    audience: string;
    examples: string[];
    nextStep: string;
  };
};

export const modules: Module[] = [
  {
    id: "01",
    title: "WORKSHOPS",
    body: "Hands-on sessions led by seniors and visiting engineers. No slides without code.",
    meta: "weekly",
    span: "md:col-span-4",
    detail: {
      format: "90-minute code-along sessions. Recordings posted to the GitHub org.",
      cadence: "Every Wednesday during the semester.",
      audience: "Open to all students — beginners welcome.",
      examples: [
        "Build your first REST API in an evening",
        "From zero to deployed: Next.js + Vercel",
        "Reading other people's code: a workshop",
      ],
      nextStep:
        "Drop into the Discord #workshops channel to see this week's topic.",
    },
  },
  {
    id: "02",
    title: "HACKATHONS",
    body: "48-hour build sprints. Real problems, real teams, real demos.",
    meta: "quarterly",
    span: "md:col-span-4 md:row-span-2",
    tall: true,
    detail: {
      format:
        "Theme announced one week before. Teams of 2–4. Public demos on day 3.",
      cadence: "Four times a year — once per quarter.",
      audience: "Mixed-skill teams encouraged. We help match teammates.",
      examples: [
        "Tools for Pokhara — local civic problems",
        "Solo-shippable AI — one builder, one weekend, one product",
        "Hardware + Software — physical interactions",
      ],
      nextStep:
        "Next hackathon: Hack/Pokhara 02 — early July. Registration opens in June.",
    },
  },
  {
    id: "03",
    title: "OPEN SOURCE",
    body:
      "Maintain libraries, contribute upstream, run an org that compounds across years.",
    meta: "ongoing",
    span: "md:col-span-4",
    detail: {
      format:
        "Issue triage Mondays, PR reviews Thursdays. Maintainers rotate per semester.",
      cadence: "Active year-round.",
      audience:
        "Anyone willing to send a first PR. Mentors available for newcomers.",
      examples: [
        "icp-dc/handbook — our internal docs",
        "icp-dc/cli — tooling for student projects",
        "Upstream contributions to Next.js, Astro, Bun",
      ],
      nextStep: "Browse open issues at github.com/icp-dc and claim one.",
    },
  },
  {
    id: "04",
    title: "STUDY GROUPS",
    body: "Small cohorts going deep on one topic — Rust, ML, distributed systems.",
    meta: "8-week cohorts",
    span: "md:col-span-4",
    detail: {
      format: "Weekly meeting + problem sets. ~6 people per group.",
      cadence: "Cohorts run for 6–8 weeks. New cohorts start every quarter.",
      audience: "Students who want to commit to one topic seriously.",
      examples: [
        "Rust by the book — from ownership to async",
        "ML from scratch — no frameworks, just math",
        "Designing Data-Intensive Applications — DDIA reading group",
      ],
      nextStep: "Watch the announcement channel for the next cohort intake.",
    },
  },
  {
    id: "05",
    title: "BUILD SESSIONS",
    body: "Friday nights in the lab. Bring a problem, leave with a commit.",
    meta: "every friday",
    span: "md:col-span-4",
    detail: {
      format:
        "Open-format coworking. Snacks, music, a whiteboard, and lots of help.",
      cadence: "Every Friday, 6pm–10pm, during the semester.",
      audience: "Drop-in. No registration. Bring your laptop.",
      examples: [
        "Pair on a side project",
        "Ask for code review",
        "Sit next to someone better than you and learn",
      ],
      nextStep: "Just show up. The next one is this Friday.",
    },
  },
  {
    id: "06",
    title: "TEAM PROJECTS",
    body:
      "Long-running squads shipping ambitious software with real users in Pokhara.",
    meta: "semester-long",
    span: "md:col-span-12",
    detail: {
      format:
        "Squads of 3–5. PM, design, and engineering roles. Real release schedule.",
      cadence: "One full semester per project. Demos at the end.",
      audience:
        "Members ready to commit consistently. Selection during cohort intake.",
      examples: [
        "NAYAA — a marketplace for Pokhara's craft makers",
        "Phewa Watch — open dataset for lake water quality",
        "Campus Pulse — real-time chat for college events",
      ],
      nextStep:
        "Apply during the core-team intake to be considered for a squad.",
    },
  },
];
