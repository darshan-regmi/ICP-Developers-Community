"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { MonoLabel } from "./ui/MonoLabel";
import { roadmap, library, type LibraryLevel } from "@/data/library";

export function Resources() {
  const [level, setLevel] = useState<LibraryLevel>("beginner");

  const filteredLibrary = useMemo(
    () => library.filter((l) => l.level === level),
    [level]
  );

  return (
    <section id="resources" className="section gutter relative">
      <div className="max-w-page mx-auto">
        <SectionHeader
          index="07"
          slug="resources"
          title="THE LIBRARY."
          kicker="roadmap · curated"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-5">
            <MonoLabel className="block mb-6">— learning ladder —</MonoLabel>
            <ol className="space-y-0">
              {roadmap.map((step) => {
                const isInternal = step.href.startsWith("#");
                return (
                  <li key={step.id}>
                    <a
                      href={step.href}
                      target={isInternal ? undefined : "_blank"}
                      rel={isInternal ? undefined : "noopener noreferrer"}
                      className="group border-t border-rule py-4 grid grid-cols-12 gap-3 items-baseline hover:text-[var(--accent)] cursor-pointer"
                    >
                      <span className="col-span-2 font-mono text-meta opacity-60">
                        {step.id}
                      </span>
                      <span className="col-span-6 font-display font-medium text-xl md:text-2xl">
                        {step.title}
                      </span>
                      <span className="col-span-4 font-mono text-meta opacity-60 text-right group-hover:opacity-100">
                        {step.note} →
                      </span>
                    </a>
                  </li>
                );
              })}
              <li className="border-t border-rule" />
            </ol>
          </div>

          <div className="md:col-span-7">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <MonoLabel>— curated reading —</MonoLabel>
              <div className="flex gap-1 font-mono text-meta uppercase">
                {(["beginner", "intermediate", "advanced"] as LibraryLevel[]).map(
                  (l) => (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      aria-pressed={l === level}
                      className={`px-3 py-1.5 border transition-colors ${
                        l === level
                          ? "bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]"
                          : "border-rule hover:border-[var(--fg)]"
                      }`}
                    >
                      {l}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredLibrary.length > 0 ? (
                filteredLibrary.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-border p-5 flex flex-col justify-between min-h-[200px] hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white transition-colors duration-0 cursor-pointer no-underline"
                  >
                    <div>
                      <MonoLabel className="opacity-100">type · {item.type}</MonoLabel>
                      <h3 className="font-display font-semibold text-xl mt-3 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm opacity-90">{item.desc}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-current opacity-70 font-mono text-meta uppercase flex justify-between">
                      <span>{item.meta}</span>
                      <span>↗</span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="sm:col-span-2 border-y border-rule py-12 text-center">
                  <p className="font-display text-xl font-semibold">
                    No items at this level yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
