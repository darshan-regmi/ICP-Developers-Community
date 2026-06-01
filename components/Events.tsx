"use client";

import { useState, useMemo } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { MonoLabel } from "./ui/MonoLabel";
import { months, upcoming, past, type Month } from "@/data/ledger";

export function Events() {
  const [selected, setSelected] = useState<Month>("ALL");

  const filtered = useMemo(() => {
    if (selected === "ALL") return upcoming;
    return upcoming.filter((e) => e.month === selected);
  }, [selected]);

  return (
    <section id="events" className="section gutter relative">
      <div className="max-w-page mx-auto">
        <SectionHeader
          index="04"
          slug="events"
          title="THE LEDGER."
          kicker="upcoming · past"
        />

        <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-2 -mx-2 px-2">
          <span className="font-display text-2xl font-semibold shrink-0">2026</span>
          <span className="rule h-px flex-1 min-w-[2rem]" />
          <div className="flex gap-1 font-mono text-meta shrink-0">
            {months.map((m) => {
              const isActive = m === selected;
              const hasEvents = m === "ALL" || upcoming.some((e) => e.month === m);
              return (
                <button
                  key={m}
                  onClick={() => setSelected(m)}
                  aria-pressed={isActive}
                  className={`px-2 py-1 transition-colors ${
                    isActive
                      ? "bg-[var(--fg)] text-[var(--bg)]"
                      : hasEvents
                        ? "hover:bg-[var(--fg)] hover:text-[var(--bg)]"
                        : "opacity-30 hover:opacity-60"
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length > 0 ? (
          <ul className="border-t border-rule">
            {filtered.map((e) => (
              <li
                key={`${e.month}-${e.date}-${e.title}`}
                className="group border-b border-rule py-6 md:py-8 grid grid-cols-12 gap-4 items-baseline hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-0 cursor-pointer"
              >
                <div className="col-span-2 md:col-span-1 font-mono text-xl md:text-3xl font-medium px-2">
                  {e.date}
                </div>
                <div className="col-span-2 md:col-span-1 font-mono text-meta opacity-70">
                  {e.month}
                </div>
                <div className="col-span-1 hidden md:flex justify-center">
                  <span className="w-2 h-6 bg-current" />
                </div>
                <div className="col-span-8 md:col-span-6">
                  <h3 className="font-display font-semibold text-xl md:text-2xl">
                    {e.title}
                  </h3>
                  <p className="font-mono text-meta opacity-70 mt-1">
                    {e.location} · {e.time}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-3 flex justify-end">
                  <span className="font-mono text-meta uppercase opacity-70 group-hover:opacity-100">
                    RSVP →
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border-y border-rule py-20 text-center">
            <p className="font-mono text-meta uppercase opacity-60 mb-3">
              — empty —
            </p>
            <p className="font-display font-semibold text-2xl md:text-3xl">
              No events scheduled for {selected.toLowerCase()}.
            </p>
            <button
              onClick={() => setSelected("ALL")}
              className="mt-6 font-mono text-meta uppercase underline underline-offset-4 hover:text-[var(--accent)]"
            >
              show all upcoming →
            </button>
          </div>
        )}

        <div className="mt-16">
          <MonoLabel className="block mb-6">— previously —</MonoLabel>
          <ul className="space-y-3">
            {past.map((p) => (
              <li
                key={p.title}
                className="grid grid-cols-12 gap-4 items-baseline font-mono text-base"
              >
                <span className="col-span-2 opacity-60">{p.month}</span>
                <span className="col-span-1 opacity-40">◦</span>
                <span className="col-span-5 md:col-span-4">{p.title}</span>
                <span className="col-span-4 md:col-span-5 opacity-60 text-right md:text-left">
                  ◦ {p.meta}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
