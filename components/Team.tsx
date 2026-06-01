"use client";

import { useState } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { MonoLabel } from "./ui/MonoLabel";
import { members, rosterSummary } from "@/data/members";

export function Team() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="team" className="section gutter relative">
      <div className="max-w-page mx-auto">
        <SectionHeader
          index="06"
          slug="team"
          title="THE TEAM."
          kicker="core organizers"
        />

        <ul className="border-t border-rule">
          {members.map((m, i) => (
            <li
              key={m.name}
              className={`border-b border-rule transition-[padding] duration-300 ${
                open === i ? "py-8" : "py-5"
              }`}
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => setOpen(i)}
              tabIndex={0}
            >
              <div className="grid grid-cols-12 gap-4 items-center cursor-pointer">
                <h3 className="col-span-12 md:col-span-5 font-display font-semibold text-2xl md:text-4xl leading-none">
                  {m.name}
                </h3>
                <span className="hidden md:block md:col-span-1 rule h-px" />
                <span className="col-span-8 md:col-span-4 font-mono text-meta opacity-70 uppercase">
                  {m.role}
                </span>
                <span className="col-span-4 md:col-span-2 font-mono text-meta text-right">
                  {open === i ? "—" : "+"}
                </span>
              </div>

              {open === i && (
                <div className="grid grid-cols-12 gap-4 mt-6">
                  <div className="col-span-3 md:col-span-2">
                    <div className="aspect-square brutal-border flex items-center justify-center bg-[var(--bg-2)]">
                      <span className="font-display text-3xl md:text-5xl font-semibold opacity-80">
                        {m.initials}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-9 md:col-span-7 flex flex-col justify-center">
                    <p className="text-lg md:text-xl leading-snug text-[var(--fg-2)]">
                      {m.quote}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-3 flex md:justify-end items-end gap-4 font-mono text-meta uppercase">
                    {m.socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="hover:text-[var(--accent)] underline underline-offset-4"
                      >
                        {s.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex items-center justify-between flex-wrap gap-4">
          <MonoLabel>
            {rosterSummary.organizers} organizers · {rosterSummary.members} members ·{" "}
            {rosterSummary.alumni} alumni
          </MonoLabel>
          <a href="#join" className="btn-secondary">
            apply to core team
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
