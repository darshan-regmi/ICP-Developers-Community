"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";

type NavItem =
  | { type: "section"; id: string; label: string; key: string; chord: string }
  | { type: "route"; href: string; label: string; key: string; chord: string };

const NAV: NavItem[] = [
  { type: "section", id: "hero", label: "home", key: "h", chord: "g h" },
  { type: "section", id: "about", label: "about", key: "a", chord: "g a" },
  { type: "section", id: "what", label: "what we do", key: "w", chord: "g w" },
  { type: "section", id: "events", label: "events", key: "e", chord: "g e" },
  { type: "section", id: "projects", label: "projects", key: "p", chord: "g p" },
  { type: "section", id: "team", label: "team", key: "t", chord: "g t" },
  { type: "section", id: "resources", label: "resources", key: "r", chord: "g r" },
  { type: "section", id: "join", label: "join", key: "j", chord: "g j" },
  { type: "route", href: "/colophon", label: "colophon", key: "c", chord: "g c" },
];

export function MenuButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let chord = false;
    let chordTimer: ReturnType<typeof setTimeout> | null = null;

    const clearChord = () => {
      chord = false;
      if (chordTimer) {
        clearTimeout(chordTimer);
        chordTimer = null;
      }
    };

    const goSection = (id: string) => {
      if (typeof window === "undefined") return;
      if (window.location.pathname === "/") {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(`/#${id}`);
      }
      setOpen(false);
    };

    const goRoute = (href: string) => {
      router.push(href);
      setOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA") return;

      // Chord completion takes priority — must run before the bare-? handler
      // so that `g ?` resolves to the colophon route instead of opening the menu.
      if (chord) {
        const match = NAV.find((n) => n.key === e.key);
        if (match) {
          e.preventDefault();
          if (match.type === "section") goSection(match.id);
          else goRoute(match.href);
        }
        clearChord();
        return;
      }

      // Bare `?` (Shift+/) opens the menu.
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "g") {
        chord = true;
        chordTimer = setTimeout(clearChord, 1400);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  const handleClick = (item: NavItem) => {
    if (item.type === "section") {
      if (typeof window === "undefined") return;
      if (window.location.pathname === "/") {
        const el = document.getElementById(item.id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        router.push(`/#${item.id}`);
      }
    } else {
      router.push(item.href);
    }
    setOpen(false);
  };

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
                <li key={item.label}>
                  <button
                    onClick={() => handleClick(item)}
                    className="group grid grid-cols-12 gap-3 py-3 border-t border-rule items-baseline hover:text-[var(--accent)] w-full text-left"
                  >
                    <span className="col-span-2 font-mono text-meta opacity-60">
                      {item.type === "route" ? "∞" : String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="col-span-7 font-display font-medium text-2xl">
                      {item.label}
                    </span>
                    <span className="col-span-3 font-mono text-meta text-right opacity-60 group-hover:opacity-100">
                      {item.chord}
                    </span>
                  </button>
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
                <span className="opacity-80">view the colophon</span>
                <span>
                  <kbd className="px-1.5 border border-rule">g</kbd>{" "}
                  <kbd className="px-1.5 border border-rule">c</kbd>
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
