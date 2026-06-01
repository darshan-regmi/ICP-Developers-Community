"use client";

import { useState } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { MonoLabel } from "./ui/MonoLabel";
import { Modal } from "./ui/Modal";
import { modules, type Module } from "@/data/modules";

export function WhatWeDo() {
  const [active, setActive] = useState<Module | null>(null);

  return (
    <section id="what" className="section gutter relative">
      <div className="max-w-page mx-auto">
        <SectionHeader
          index="03"
          slug="what-we-do"
          title="SIX MODULES."
          kicker="what you'll do"
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {modules.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m)}
              className={`group brutal-border p-6 md:p-8 flex flex-col justify-between min-h-[200px] text-left ${m.tall ? "md:min-h-[420px]" : ""} ${m.span} hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white focus:bg-[var(--accent)] focus:border-[var(--accent)] focus:text-white outline-none cursor-pointer relative`}
            >
              <div className="flex items-start justify-between w-full">
                <MonoLabel className="opacity-100">
                  {m.id} / {m.title}
                </MonoLabel>
                <span className="font-mono text-meta group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  ↗
                </span>
              </div>
              <div className="mt-12">
                <h3 className="font-display font-semibold text-3xl md:text-4xl mb-3">
                  {m.title}
                </h3>
                <p className="text-base md:text-lg max-w-md opacity-90">{m.body}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-current opacity-70 flex justify-between w-full">
                <span className="font-mono text-meta uppercase">
                  cadence · {m.meta}
                </span>
                <span className="font-mono text-meta uppercase">read more →</span>
              </div>
            </button>
          ))}
        </div>

        <Modal
          open={!!active}
          onClose={() => setActive(null)}
          title={active?.title ?? ""}
          kicker={active ? `module · ${active.id}` : ""}
          size="lg"
        >
          {active && (
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-[var(--fg-2)]">{active.body}</p>

              <dl className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-rule py-5">
                <div>
                  <dt className="font-mono text-meta uppercase opacity-60 mb-1">
                    format
                  </dt>
                  <dd className="text-sm">{active.detail.format}</dd>
                </div>
                <div>
                  <dt className="font-mono text-meta uppercase opacity-60 mb-1">
                    cadence
                  </dt>
                  <dd className="text-sm">{active.detail.cadence}</dd>
                </div>
                <div>
                  <dt className="font-mono text-meta uppercase opacity-60 mb-1">
                    who it's for
                  </dt>
                  <dd className="text-sm">{active.detail.audience}</dd>
                </div>
              </dl>

              <div>
                <h4 className="font-mono text-meta uppercase opacity-60 mb-3">
                  — examples —
                </h4>
                <ul className="space-y-2">
                  {active.detail.examples.map((ex) => (
                    <li key={ex} className="flex gap-3 text-base">
                      <span className="opacity-50 font-mono">◦</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="brutal-border p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="font-mono text-meta uppercase opacity-60">
                    next step
                  </div>
                  <p className="text-base mt-1">{active.detail.nextStep}</p>
                </div>
                <a
                  href="#join"
                  onClick={() => setActive(null)}
                  className="btn-primary shrink-0"
                >
                  join →
                </a>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
