import { slogans } from "@/data/headline";

export function Footer() {
  return (
    <footer className="gutter pb-16 pt-8 border-t border-rule">
      <div className="max-w-page mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 font-mono text-meta uppercase">
        <div className="space-y-2">
          <p className="opacity-60">
            <span className="opacity-100">{"// "}</span>
            {slogans.footer}
          </p>
          <p className="opacity-60">
            © {new Date().getFullYear()} ICP Developers&apos; Community · Informatics College Pokhara
          </p>
        </div>
        <div className="space-y-1 md:text-right">
          <p className="opacity-60">designed &amp; built in pokhara</p>
          <p className="opacity-60">
            tip: press <kbd className="px-1 border border-rule">?</kbd> for shortcuts
          </p>
        </div>
      </div>
    </footer>
  );
}
