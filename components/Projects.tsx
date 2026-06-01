"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { MonoLabel } from "./ui/MonoLabel";
import { Modal } from "./ui/Modal";
import {
  projects,
  featuredCount,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

const FILTERS = ["all", "web", "ai", "tools", "games", "hardware"] as const;
type Filter = (typeof FILTERS)[number];

function Specimen({
  project,
  flip,
  onOpen,
  totalCount,
}: {
  project: Project;
  flip: boolean;
  onOpen: () => void;
  totalCount: number;
}) {
  return (
    <article className="border-t border-rule py-12 md:py-20">
      <div className="grid grid-cols-12 gap-6 md:gap-8 items-start">
        <div
          className={`col-span-12 md:col-span-7 ${
            flip ? "md:order-2 md:col-start-6" : ""
          }`}
        >
          <button
            onClick={onOpen}
            className="brutal-border aspect-[16/10] w-full relative overflow-hidden group cursor-pointer text-left"
            style={{
              background:
                "repeating-linear-gradient(45deg, var(--bg-2), var(--bg-2) 12px, var(--bg) 12px, var(--bg) 24px)",
            }}
            aria-label={`Open ${project.name}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-display-m font-semibold text-[var(--fg)] opacity-40 group-hover:opacity-100 transition-opacity">
                {project.name}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-[var(--fg)] text-[var(--bg)] px-4 py-3 flex items-center justify-between translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="font-mono text-meta uppercase">open details</span>
              <span className="font-mono text-meta">→</span>
            </div>
          </button>
        </div>

        <div
          className={`col-span-12 md:col-span-4 ${
            flip ? "md:order-1 md:col-start-2" : "md:col-start-9"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <MonoLabel className="opacity-100">
              PROJECT {project.n} / {String(totalCount).padStart(2, "0")}
            </MonoLabel>
          </div>
          <h3 className="font-display font-semibold text-4xl md:text-5xl leading-[0.95] mb-4">
            {project.name}
          </h3>
          <p className="text-lg text-[var(--fg-2)] mb-6">{project.tag}</p>

          <dl className="font-mono text-meta uppercase space-y-2 border-t border-rule pt-4">
            <div className="flex justify-between gap-4">
              <dt className="opacity-60">stack</dt>
              <dd className="text-right">{project.stack.join(" · ")}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="opacity-60">team</dt>
              <dd>{project.team}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="opacity-60">year</dt>
              <dd>{project.year}</dd>
            </div>
          </dl>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button
              onClick={onOpen}
              className="font-mono text-meta uppercase underline underline-offset-4 hover:text-[var(--accent)]"
            >
              details ↗
            </button>
            {project.live && (
              <a
                href={project.live}
                className="font-mono text-meta uppercase underline underline-offset-4 hover:text-[var(--accent)]"
              >
                live ↗
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                className="font-mono text-meta uppercase underline underline-offset-4 hover:text-[var(--accent)]"
              >
                github ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === (filter as ProjectCategory));
  }, [filter]);

  const visible = showAll ? filtered : filtered.slice(0, featuredCount);
  const hasMore = filtered.length > featuredCount;

  return (
    <section id="projects" className="section gutter relative">
      <div className="max-w-page mx-auto">
        <SectionHeader
          index="05"
          slug="projects"
          title="PROJECTS."
          kicker={`${projects.length} shipped`}
        />

        <div className="flex flex-wrap gap-2 mb-12 font-mono text-meta uppercase">
          {FILTERS.map((f) => {
            const count =
              f === "all"
                ? projects.length
                : projects.filter((p) => p.category === f).length;
            const isActive = f === filter;
            return (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  setShowAll(false);
                }}
                className={`px-3 py-1.5 border transition-colors ${
                  isActive
                    ? "bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]"
                    : "border-rule hover:border-[var(--fg)]"
                } ${count === 0 ? "opacity-40" : ""}`}
                disabled={count === 0}
              >
                [ {f} · {count} ]
              </button>
            );
          })}
        </div>

        {visible.length > 0 ? (
          visible.map((p, i) => (
            <Specimen
              key={p.n}
              project={p}
              flip={i % 2 === 1}
              onOpen={() => setActive(p)}
              totalCount={projects.length}
            />
          ))
        ) : (
          <div className="border-y border-rule py-20 text-center">
            <p className="font-display text-2xl font-semibold">
              No projects in this track yet.
            </p>
          </div>
        )}

        <div className="border-t border-rule" />

        {hasMore && (
          <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="font-mono text-meta uppercase opacity-70">
              showing {visible.length} of {filtered.length}
              {filter !== "all" ? ` · ${filter}` : ""}
            </p>
            <button
              onClick={() => setShowAll((s) => !s)}
              className="btn-primary self-start md:self-auto"
            >
              {showAll ? "show less" : `view all projects (${filtered.length})`}
              <span aria-hidden>{showAll ? "↑" : "→"}</span>
            </button>
          </div>
        )}

        <Modal
          open={!!active}
          onClose={() => setActive(null)}
          title={active?.name ?? ""}
          kicker={
            active
              ? `project ${active.n} / ${String(projects.length).padStart(2, "0")} · ${active.category}`
              : ""
          }
          size="lg"
        >
          {active && (
            <div className="space-y-6">
              <div
                className="brutal-border aspect-[16/8] relative overflow-hidden"
                style={{
                  background:
                    "repeating-linear-gradient(45deg, var(--bg-2), var(--bg-2) 12px, var(--bg) 12px, var(--bg) 24px)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-display-m font-semibold opacity-50">
                    {active.name}
                  </span>
                </div>
              </div>

              <p className="text-lg md:text-xl text-[var(--fg-2)]">{active.tag}</p>
              <p className="text-base leading-relaxed">{active.description}</p>

              <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-rule py-5 font-mono text-meta uppercase">
                <div>
                  <dt className="opacity-60 mb-1">year</dt>
                  <dd>{active.year}</dd>
                </div>
                <div>
                  <dt className="opacity-60 mb-1">team</dt>
                  <dd>{active.team} builders</dd>
                </div>
                <div>
                  <dt className="opacity-60 mb-1">category</dt>
                  <dd>{active.category}</dd>
                </div>
                <div>
                  <dt className="opacity-60 mb-1">stack</dt>
                  <dd className="break-words">{active.stack.join(" · ")}</dd>
                </div>
              </dl>

              <div>
                <h4 className="font-mono text-meta uppercase opacity-60 mb-3">
                  — contributors —
                </h4>
                <ul className="flex flex-wrap gap-2 font-mono text-meta uppercase">
                  {active.contributors.map((c) => (
                    <li key={c} className="border border-rule px-2 py-1">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 flex-wrap pt-2">
                {active.live && (
                  <a href={active.live} className="btn-primary">
                    visit live ↗
                  </a>
                )}
                {active.repo && (
                  <a href={active.repo} className="btn-secondary">
                    github ↗
                  </a>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
