// Core team roster. Order in this array = order on the page.

export type Member = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  socials: { label: string; href: string }[];
};

export const members: Member[] = [
  {
    name: "ARYAN GURUNG",
    role: "lead organizer",
    quote:
      "I help run the club day-to-day. Mostly interested in systems and infrastructure — happy to talk Kubernetes any time.",
    initials: "AG",
    socials: [
      { label: "github", href: "#" },
      { label: "linkedin", href: "#" },
      { label: "email", href: "mailto:#" },
    ],
  },
  {
    name: "SAMRIDDHI KC",
    role: "design & community",
    quote:
      "I work on the visual side of things and help new members find their way in. Reach out if you're not sure where to start.",
    initials: "SK",
    socials: [
      { label: "github", href: "#" },
      { label: "linkedin", href: "#" },
      { label: "email", href: "mailto:#" },
    ],
  },
  {
    name: "NIRAJAN PAUDEL",
    role: "backend & devops",
    quote:
      "I take care of our deployments and backend services. Always glad to help with debugging or code reviews.",
    initials: "NP",
    socials: [
      { label: "github", href: "#" },
      { label: "linkedin", href: "#" },
      { label: "email", href: "mailto:#" },
    ],
  },
  {
    name: "MILA SHRESTHA",
    role: "open source & study circles",
    quote:
      "I coordinate our open-source work and the study cohorts. Beginners are welcome — that's how I started too.",
    initials: "MS",
    socials: [
      { label: "github", href: "#" },
      { label: "linkedin", href: "#" },
      { label: "email", href: "mailto:#" },
    ],
  },
  {
    name: "ABISHEK THAPA",
    role: "events & partnerships",
    quote:
      "I organize events and look after partnerships with the college and local companies. Reach out if you have ideas.",
    initials: "AT",
    socials: [
      { label: "github", href: "#" },
      { label: "linkedin", href: "#" },
      { label: "email", href: "mailto:#" },
    ],
  },
];

export const rosterSummary = {
  organizers: 5,
  members: 142,
  alumni: 27,
};
