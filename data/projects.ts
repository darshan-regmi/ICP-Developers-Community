// Project showcase data. The first `featuredCount` projects are visible by
// default; the rest reveal via the "view all projects" button.

export type ProjectCategory = "web";

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
    name: "Exam Seat Finder",
    tag: "a platform built for students to find their exam seats during the exam time and for RTE to easily manage the seating arrangements.",
    category: "web",
    stack: ["React", "Django"],
    team: 3,
    year: 2026,
    live: "https://rte.icp.edu.np/",
    repo: "/locked",
    description:
      "A web application designed to streamline the process of finding exam seats for students and managing seating arrangements for the RTE (Routine TimeTable Examination). The platform allows students to easily locate their assigned seats during exam time, while providing RTE with an efficient tool to organize and manage seating arrangements. The system includes features such as randomized seat assignment, interactive seat assignment changing, and a web ui for students to find their seats.",
    contributors: ["Darshan Regmi", "Sneha Giri", "Anush Gurung"],
  },
];
