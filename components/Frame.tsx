import Link from "next/link";
import { LiveTime } from "./ui/LiveTime";
import { ThemeToggle } from "./ui/ThemeToggle";
import { SectionIndex } from "./ui/SectionIndex";
import { MenuButton } from "./ui/MenuButton";

const pillBase =
  "bg-[var(--bg)] border border-rule px-2.5 py-1.5 inline-flex items-center";

export function Frame() {
  return (
    <>
      {/* Top-left: wordmark */}
      <div className="fixed top-3 left-3 md:top-5 md:left-5 z-40">
        <Link
          href="/"
          aria-label="ICP Developers' Community — home"
          className={`${pillBase} gap-2 font-mono text-meta tracking-[0.08em] uppercase`}
        >
          <span className="px-1.5 py-0.5 bg-[var(--fg)] text-[var(--bg)]">
            ICP
          </span>
          <span className="hidden sm:inline opacity-90">
            Developers&apos; Community
          </span>
          <span className="sm:hidden opacity-90">DC</span>
        </Link>
      </div>

      {/* Top-right: time + menu */}
      <div className="fixed top-3 right-3 md:top-5 md:right-5 z-40 flex items-center gap-2">
        <div className={`${pillBase} hidden sm:inline-flex`}>
          <LiveTime />
        </div>
        <MenuButton />
      </div>

      {/* Bottom-left: section index */}
      <div className="fixed bottom-3 left-3 md:bottom-5 md:left-5 z-40 hidden md:block">
        <div className={pillBase}>
          <SectionIndex />
        </div>
      </div>

      {/* Bottom-right: theme toggle */}
      <div className="fixed bottom-3 right-3 md:bottom-5 md:right-5 z-40">
        <div className={pillBase}>
          <ThemeToggle />
        </div>
      </div>

      {/* Hairline viewport frame (sits behind the corner pills) */}
      <div className="pointer-events-none fixed inset-3 md:inset-4 border border-rule z-20" />
    </>
  );
}
