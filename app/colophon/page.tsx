import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/Frame";
import { MonoLabel } from "@/components/ui/MonoLabel";

export const metadata: Metadata = {
  title: "Colophon — the builders",
  description:
    "Who built this site, what it was built with, and how. The back-page credits, the way they used to be done.",
  alternates: { canonical: "/colophon" },
};

export default function Colophon() {
  return (
    <main className="relative">
      <Frame />

      <section className="section gutter">
        <div className="max-w-page mx-auto">
          {/* Header */}
          <div className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-6">
              <MonoLabel>§ ∞ / colophon</MonoLabel>
              <span className="rule h-px w-12" />
              <MonoLabel>who · what · how</MonoLabel>
            </div>
            <h1 className="font-display font-semibold text-display-l text-[var(--fg)] leading-[0.95]">
              THE BUILDERS.
            </h1>
            <p className="mt-8 text-xl md:text-2xl text-[var(--fg-2)] max-w-3xl leading-snug">
              Two builders. One human, one model. This is the back-page credit
              — typeface, framework, principles, date — the way they used to be
              done.
            </p>
          </div>

          {/* HUMAN */}
          <div className="grid grid-cols-12 gap-6 border-t border-rule pt-10 pb-12">
            <div className="col-span-12 md:col-span-3 mb-2">
              <MonoLabel className="opacity-100">— human —</MonoLabel>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display font-semibold text-4xl md:text-5xl leading-none mb-3">
                DARSHAN REGMI
              </h2>
              <p className="font-mono text-meta opacity-70 uppercase mb-6">
                design · frontend · every decision worth making
              </p>
              <p className="text-lg text-[var(--fg-2)] max-w-2xl mb-6">
                Designed the system, wrote the components, made every typography
                call, and shipped this. Studies at Informatics College Pokhara.
                Builds Mobile App and Frontend things on the side.
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-meta uppercase">
                <a
                  href="https://darshanregmi.com.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-[var(--accent)]"
                >
                  portfolio ↗
                </a>
                <a
                  href="https://github.com/darshan-regmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-[var(--accent)]"
                >
                  github ↗
                </a>
                <a
                  href="https://linkedin.com/in/darshan-regmi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-[var(--accent)]"
                >
                  linkedin ↗
                </a>
                <a
                  href="mailto:darshan.regmi.a24@icp.edu.np"
                  className="underline underline-offset-4 hover:text-[var(--accent)]"
                >
                  email ↗
                </a>
              </div>
            </div>
          </div>

          {/* MODEL */}
          <div className="grid grid-cols-12 gap-6 border-t border-rule pt-10 pb-12">
            <div className="col-span-12 md:col-span-3 mb-2">
              <MonoLabel className="opacity-100">— paired with —</MonoLabel>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2 className="font-display font-semibold text-4xl md:text-5xl leading-none mb-3">
                CLAUDE
                <span className="text-[var(--accent)]"> (OPUS 4.7)</span>
              </h2>
              <p className="font-mono text-meta opacity-70 uppercase mb-6">
                by anthropic · pair programmer · second pair of eyes
              </p>
              <p className="text-lg text-[var(--fg-2)] max-w-2xl mb-6">
                Sparring partner during design and build. Wrote drafts, made
                arguments, lost a few, won a few. Helped translate vague intent
                into clean diffs at 2 AM. Did not pick the typefaces — those
                were a Darshan call.
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-meta uppercase">
                <a
                  href="https://claude.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-[var(--accent)]"
                >
                  claude.com ↗
                </a>
                <a
                  href="https://anthropic.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-[var(--accent)]"
                >
                  anthropic ↗
                </a>
              </div>
            </div>
          </div>

          {/* BUILT WITH */}
          <div className="grid grid-cols-12 gap-6 border-t border-rule pt-10 pb-12">
            <div className="col-span-12 md:col-span-3 mb-2">
              <MonoLabel className="opacity-100">— built with —</MonoLabel>
            </div>
            <div className="col-span-12 md:col-span-9">
              <ul className="font-mono text-base space-y-2">
                <li>
                  <span className="opacity-60 inline-block w-32">
                    framework
                  </span>
                  Next.js 14 · App Router
                </li>
                <li>
                  <span className="opacity-60 inline-block w-32">runtime</span>
                  React 18
                </li>
                <li>
                  <span className="opacity-60 inline-block w-32">language</span>
                  TypeScript
                </li>
                <li>
                  <span className="opacity-60 inline-block w-32">styling</span>
                  Tailwind CSS v3 · CSS variables
                </li>
                <li>
                  <span className="opacity-60 inline-block w-32">graphics</span>
                  hand-written SVG · Sharp for raster
                </li>
                <li>
                  <span className="opacity-60 inline-block w-32">hosting</span>
                  Vercel
                </li>
                <li>
                  <span className="opacity-60 inline-block w-32">source</span>
                  <a
                    href="https://github.com/darshan-regmi/ICP-Developers-Community"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-[var(--accent)]"
                  >
                    github.com/darshan-regmi/ICP-Developers-Community ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* SET IN */}
          <div className="grid grid-cols-12 gap-6 border-t border-rule pt-10 pb-12">
            <div className="col-span-12 md:col-span-3 mb-2">
              <MonoLabel className="opacity-100">— set in —</MonoLabel>
            </div>
            <div className="col-span-12 md:col-span-9">
              <ul className="space-y-4">
                <li>
                  <span className="font-display font-semibold text-3xl">
                    Space Grotesk
                  </span>
                  <span className="font-mono text-meta opacity-60 ml-3">
                    display · by florian karsten
                  </span>
                </li>
                <li>
                  <span className="font-sans text-3xl">Inter</span>
                  <span className="font-mono text-meta opacity-60 ml-3">
                    body · by rasmus andersson
                  </span>
                </li>
                <li>
                  <span className="font-mono text-3xl">JetBrains Mono</span>
                  <span className="font-mono text-meta opacity-60 ml-3">
                    monospace · by jetbrains
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* PRINCIPLES */}
          <div className="grid grid-cols-12 gap-6 border-t border-rule pt-10 pb-12">
            <div className="col-span-12 md:col-span-3 mb-2">
              <MonoLabel className="opacity-100">— principles —</MonoLabel>
            </div>
            <div className="col-span-12 md:col-span-9">
              <ul className="space-y-2 font-mono text-base">
                <li>
                  <span className="opacity-50">01 ·</span> the grid is the
                  source of truth.
                </li>
                <li>
                  <span className="opacity-50">02 ·</span> restraint is louder
                  than decoration.
                </li>
                <li>
                  <span className="opacity-50">03 ·</span> one accent color,
                  used like a scarce resource.
                </li>
                <li>
                  <span className="opacity-50">04 ·</span> no animation that
                  doesn&apos;t earn its keep.
                </li>
                <li>
                  <span className="opacity-50">05 ·</span> place is part of the
                  brand.
                </li>
              </ul>
            </div>
          </div>

          {/* THANKS */}
          <div className="grid grid-cols-12 gap-6 border-t border-rule pt-10 pb-12">
            <div className="col-span-12 md:col-span-3 mb-2">
              <MonoLabel className="opacity-100">— thanks —</MonoLabel>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="text-lg text-[var(--fg-2)] max-w-2xl">
                To the students of Informatics College Pokhara — the audience
                this whole thing was built for. To the open-source maintainers
                behind every line of code we didn&apos;t have to write. To
                Pokhara, for being a city worth building from.
              </p>
            </div>
          </div>

          {/* Closer */}
          <div className="border-t border-rule pt-10 mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="font-mono text-base md:text-xl text-[var(--fg-2)]">
              <span className="opacity-60">{"// "}</span>
              designed in pokhara · built on the internet.
            </p>
            <p className="font-mono text-meta uppercase opacity-60">
              v 0.1 · 2026
            </p>
          </div>

          {/* Back link */}
          <div className="mt-16">
            <Link href="/" className="btn-secondary">
              <span aria-hidden>←</span>
              back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
