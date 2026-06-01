import { KineticHeadline } from "./ui/KineticHeadline";
import { MonoLabel } from "./ui/MonoLabel";
import { headline } from "@/data/headline";
import { communityStatus } from "@/data/communityStatus";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen section gutter flex items-center"
    >
      <div className="absolute inset-0 grid-overlay pointer-events-none" aria-hidden />

      <div className="relative w-full max-w-page mx-auto grid grid-cols-12 gap-x-6 gap-y-12 items-end">
        <div className="col-span-12 lg:col-span-8">
          <div className="mb-6 flex items-center gap-3">
            <MonoLabel>§ 01 / hero</MonoLabel>
            <span className="rule h-px w-12" />
            <MonoLabel>cohort 06 · open</MonoLabel>
          </div>

          <h1 className="font-display font-semibold text-display-xl text-[var(--fg)]">
            <span className="block reveal-mask">
              <span className="reveal-inner block">{headline.staticLine}</span>
            </span>
            <span className="block reveal-mask" style={{ animationDelay: "120ms" }}>
              <span className="reveal-inner block">
                <KineticHeadline
                  variants={headline.variants}
                  intervalMs={headline.intervalMs}
                />
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-xl leading-snug text-[var(--fg-2)]">
            {headline.subline.prefix}{" "}
            <span className="text-[var(--fg)] underline decoration-1 underline-offset-4">
              {headline.subline.emphasis}
            </span>
            {headline.subline.suffix}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#join" className="btn-primary">
              Join the Community
              <span aria-hidden>→</span>
            </a>
            <a href="#projects" className="btn-secondary">
              Explore Projects
              <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="brutal-border bg-[var(--bg)] p-5 font-mono text-sm">
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <span className="opacity-60">{communityStatus.panelTitle}</span>
              <span className="inline-flex items-center gap-2 text-[var(--accent)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                {communityStatus.status}
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-[13px]">
              {communityStatus.rows.map((row) => (
                <li key={row.label}>
                  <span className="opacity-50">{">"}</span>{" "}
                  <span>{row.label}: </span>
                  <span
                    className={
                      row.accent
                        ? "text-[var(--accent)] font-medium"
                        : "font-medium"
                    }
                  >
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-3 border-t border-rule text-[11px] uppercase tracking-[0.1em] opacity-60">
              press <kbd className="px-1 border border-rule">?</kbd> for shortcuts &amp; nav
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 right-0 mx-auto text-center pointer-events-none">
        <MonoLabel className="opacity-50">scroll ↓</MonoLabel>
      </div>
    </section>
  );
}
