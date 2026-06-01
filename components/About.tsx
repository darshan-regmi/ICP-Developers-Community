import { SectionHeader } from "./ui/SectionHeader";
import { MonoLabel } from "./ui/MonoLabel";
import { threeTruths } from "@/data/threeTruths";
import { slogans } from "@/data/headline";

export function About() {
  return (
    <section id="about" className="section gutter relative">
      <div className="max-w-page mx-auto">
        <SectionHeader index="02" slug="about" title="THREE TRUTHS." kicker="who we are" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
          {threeTruths.map((t, i) => (
            <div key={t.label} className="relative">
              <div className="flex items-center gap-2 mb-4">
                <MonoLabel>0{i + 1}</MonoLabel>
                <span className="rule h-px flex-1" />
              </div>
              <MonoLabel className="block mb-3 text-[var(--fg)] opacity-100">
                {t.label}
              </MonoLabel>
              <p className="text-2xl md:text-[1.625rem] leading-tight font-display font-medium text-[var(--fg)]">
                {t.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 md:mt-32 border-t border-rule pt-8">
          <p className="font-mono text-lg md:text-2xl text-[var(--fg-2)]">
            <span className="opacity-60">{"// "}</span>
            {slogans.aboutOutro}
          </p>
        </div>
      </div>
    </section>
  );
}
