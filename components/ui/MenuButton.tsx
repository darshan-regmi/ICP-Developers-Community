"use client";

import { useEffect, useState } from "react";
import { Modal } from "./Modal";

const NAV = [
  { id: "hero", label: "home", key: "h" },
  { id: "about", label: "about", key: "a" },
  { id: "what", label: "what we do", key: "w" },
  { id: "events", label: "events", key: "e" },
  { id: "projects", label: "projects", key: "p" },
  { id: "team", label: "team", key: "t" },
  { id: "resources", label: "resources", key: "r" },
  { id: "join", label: "join", key: "j" },
];

export function MenuButton() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let chord = false;
    let chordTimer: ReturnType<typeof setTimeout> | null = null;

    const goto = (id: string) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "g" && !chord) {
        chord = true;
        if (chordTimer) clearTimeout(chordTimer);
        chordTimer = setTimeout(() => {
          chord = false;
        }, 1400);
        return;
      }
      if (chord) {
        const match = NAV.find((n) => n.key === e.key);
        if (match) goto(match.id);
        chord = false;
        if (chordTimer) clearTimeout(chordTimer);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="font-mono text-meta tracking-[0.08em] uppercase inline-flex items-center gap-1.5 bg-[var(--bg)] px-2.5 py-1.5 border border-rule hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)]"
      >
        <span className="flex flex-col gap-[3px]">
          <span className="block w-3 h-px bg-current" />
          <span className="block w-3 h-px bg-current" />
        </span>
        menu
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="NAVIGATE."
        kicker="§ menu · keyboard shortcuts"
        size="lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="font-mono text-meta uppercase opacity-60 mb-4">
              — sections —
            </div>
            <ul>
              {NAV.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(item.id);
                      el?.scrollIntoView({ behavior: "smooth" });
                      setOpen(false);
                    }}
                    className="group grid grid-cols-12 gap-3 py-3 border-t border-rule items-baseline hover:text-[var(--accent)]"
                  >
                    <span className="col-span-2 font-mono text-meta opacity-60">
                      0{i + 1}
                    </span>
                    <span className="col-span-7 font-display font-medium text-2xl">
                      {item.label}
                    </span>
                    <span className="col-span-3 font-mono text-meta text-right opacity-60 group-hover:opacity-100">
                      g {item.key}
                    </span>
                  </a>
                </li>
              ))}
              <li className="border-t border-rule" />
            </ul>
          </div>

          <div>
            <div className="font-mono text-meta uppercase opacity-60 mb-4">
              — shortcuts —
            </div>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex justify-between border-b border-rule pb-2">
                <span className="opacity-80">open this menu</span>
                <kbd className="px-1.5 border border-rule">?</kbd>
              </li>
              <li className="flex justify-between border-b border-rule pb-2">
                <span className="opacity-80">jump to a section</span>
                <span>
                  <kbd className="px-1.5 border border-rule">g</kbd>{" "}
                  <kbd className="px-1.5 border border-rule">letter</kbd>
                </span>
              </li>
              <li className="flex justify-between border-b border-rule pb-2">
                <span className="opacity-80">close any overlay</span>
                <kbd className="px-1.5 border border-rule">esc</kbd>
              </li>
            </ul>

            <p className="mt-8 font-mono text-meta uppercase opacity-60">
              tip · type{" "}
              <kbd className="px-1 border border-rule">g</kbd>{" "}
              <kbd className="px-1 border border-rule">p</kbd> to jump to projects
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
