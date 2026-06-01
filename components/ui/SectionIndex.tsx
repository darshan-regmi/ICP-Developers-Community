"use client";

import { useEffect, useState } from "react";

const SECTIONS = ["hero", "about", "what", "events", "projects", "team", "resources", "join"];

export function SectionIndex() {
  const [active, setActive] = useState(1);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(i + 1);
          });
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <span className="font-mono text-meta tracking-[0.08em]">
      § {String(active).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
    </span>
  );
}
