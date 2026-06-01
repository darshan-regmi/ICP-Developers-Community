// Events ledger. Add upcoming events to `upcoming` and archived ones to `past`.

export const months = [
  "ALL",
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
] as const;

export type Month = (typeof months)[number];

export type UpcomingEvent = {
  date: string;
  month: Exclude<Month, "ALL">;
  title: string;
  location: string;
  time: string;
};

export type PastEvent = {
  month: string;
  title: string;
  meta: string;
};

export const upcoming: UpcomingEvent[] = [
  {
    date: "12",
    month: "JUN",
    title: "BUILD NIGHT 06",
    location: "Pokhara · in-person",
    time: "7:00 PM",
  },
  {
    date: "24",
    month: "JUN",
    title: "AI/ML WORKSHOP — TRANSFORMERS FROM SCRATCH",
    location: "Online",
    time: "6:00 PM",
  },
  {
    date: "06",
    month: "JUL",
    title: "HACK / POKHARA 02",
    location: "Campus auditorium · 48 hours",
    time: "all weekend",
  },
  {
    date: "19",
    month: "JUL",
    title: "OPEN SOURCE CONTRIBUTION DAY",
    location: "Lab · in-person",
    time: "10:00 AM",
  },
  {
    date: "03",
    month: "AUG",
    title: "DESIGN + DEV JAM",
    location: "Campus · in-person",
    time: "11:00 AM",
  },
];

export const past: PastEvent[] = [
  { month: "MAY", title: "open source day", meta: "84 attendees" },
  { month: "APR", title: "rust study circle", meta: "6-week cohort · 22 finishers" },
  { month: "MAR", title: "design + dev jam", meta: "9 teams · 9 demos" },
];
