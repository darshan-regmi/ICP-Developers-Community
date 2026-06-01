// Core team roster. Order in this array = order on the page.

export type Member = {
  name: string;
  role: string;
  quote: string;
  initials: string;
  /** Optional portfolio URL. When set, the initials block on the expanded
   * row becomes a link and reveals "view portfolio" on hover. */
  portfolio?: string;
  socials: { label: string; href: string }[];
};

export const members: Member[] = [
  {
    name: "Darshan Regmi",
    role: "lead Frontend Developer & President",
    quote:
      "I help run the club day-to-day. Mostly interested in Mobile App Development && frontend — happy to talk Next.js and Expo any time.",
    initials: "DR",
    portfolio: "https://darshanregmi.com.np",
    socials: [
      { label: "github", href: "https://github.com/darshan-regmi" },
      { label: "linkedin", href: "https://linkedin.com/in/darshan-regmi" },
      { label: "email", href: "mailto:darshan.regmi.a24@icp.edu.np" },
    ],
  },
  {
    name: "Sneha Giri",
    role: "Backend Developer & Vice President",
    quote:
      "I work on the visual side of things and help new members find their way in. Reach out if you're not sure where to start.",
    initials: "SG",
    portfolio: "https://snehagiri.com.np",
    socials: [
      { label: "github", href: "https://github.com/meoov-1" },
      {
        label: "linkedin",
        href: "https://www.linkedin.com/in/sneha-giri-246129283/",
      },
      { label: "email", href: "mailto:sneha.giri.a24@icp.edu.np" },
    ],
  },
];

export const rosterSummary = {
  organizers: 2,
  members: 50,
  alumni: 1,
};
