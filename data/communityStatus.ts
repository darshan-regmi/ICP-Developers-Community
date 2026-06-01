// Hero terminal-panel content — edit values to update the live status box.

export type StatusRow = {
  label: string;
  value: string;
  accent?: boolean;
};

export const communityStatus: {
  panelTitle: string;
  status: string;
  rows: StatusRow[];
} = {
  panelTitle: "~/community.status",
  status: "live",
  rows: [
    { label: "members", value: "142 active" },
    { label: "cohort 06", value: "open · applications live" },
    { label: "projects shipped", value: "27 · this year" },
    { label: "next build night", value: "jun 12 · 7pm" },
    { label: "core team", value: "accepting", accent: true },
  ],
};
