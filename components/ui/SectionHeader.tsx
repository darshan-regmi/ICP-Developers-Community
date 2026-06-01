import { MonoLabel } from "./MonoLabel";

export function SectionHeader({
  index,
  slug,
  title,
  kicker,
}: {
  index: string;
  slug: string;
  title: string;
  kicker?: string;
}) {
  return (
    <div className="relative mb-16 md:mb-24">
      <div className="flex items-center gap-3">
        <MonoLabel>
          § {index} / {slug}
        </MonoLabel>
        <span className="rule h-px w-12" />
        {kicker && <MonoLabel>{kicker}</MonoLabel>}
      </div>
      <div className="relative mt-4">
        <h2 className="font-display font-semibold text-display-l text-[var(--fg)] relative z-10">
          {title}
        </h2>
        <span
          className="outline-num absolute -top-8 right-0 text-[clamp(8rem,18vw,16rem)] select-none pointer-events-none"
          aria-hidden
        >
          {index}
        </span>
      </div>
    </div>
  );
}
