"use client";

import { useState, FormEvent } from "react";
import { MonoLabel } from "./ui/MonoLabel";
import { Modal } from "./ui/Modal";

type FormState = "idle" | "submitting" | "done";

function CoreTeamForm({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<FormState>("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setTimeout(() => setState("done"), 600);
  };

  if (state === "done") {
    return (
      <div className="text-center py-6">
        <MonoLabel className="block mb-3 opacity-100">[ application received ]</MonoLabel>
        <h4 className="font-display font-semibold text-3xl">Thanks for applying.</h4>
        <p className="mt-3 text-base text-[var(--fg-2)]">
          We&apos;ll review your project links and get back to you within a week.
        </p>
        <button onClick={onDone} className="btn-secondary mt-8">
          close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <p className="text-base text-[var(--fg-2)]">
        Core team is for builders who are ready to ship and help run the community.
        Share one project you&apos;ve built — that&apos;s the bar.
      </p>

      <div>
        <label className="field-label" htmlFor="ct-name">name</label>
        <input id="ct-name" className="field" type="text" required placeholder="full name" />
      </div>
      <div>
        <label className="field-label" htmlFor="ct-college">college</label>
        <input id="ct-college" className="field" type="text" required placeholder="e.g. Informatics College Pokhara" />
      </div>
      <div>
        <label className="field-label" htmlFor="ct-email">college email</label>
        <input id="ct-email" className="field" type="email" required placeholder="you@college.edu.np" />
      </div>
      <div>
        <label className="field-label" htmlFor="ct-github">github profile url</label>
        <input id="ct-github" className="field" type="url" required placeholder="https://github.com/your-handle" />
      </div>
      <div>
        <label className="field-label" htmlFor="ct-project">project repo url</label>
        <input id="ct-project" className="field" type="url" required placeholder="https://github.com/you/project" />
      </div>
      <div>
        <label className="field-label" htmlFor="ct-live">project live url</label>
        <input id="ct-live" className="field" type="url" required placeholder="https://your-project.example.com" />
      </div>

      <button type="submit" disabled={state === "submitting"} className="btn-primary w-full justify-center">
        {state === "submitting" ? "submitting…" : "submit application →"}
      </button>
    </form>
  );
}

function GeneralMemberForm({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<FormState>("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setTimeout(() => setState("done"), 600);
  };

  if (state === "done") {
    return (
      <div className="text-center py-6">
        <MonoLabel className="block mb-3 opacity-100">[ welcome ]</MonoLabel>
        <h4 className="font-display font-semibold text-3xl">You&apos;re in.</h4>
        <p className="mt-3 text-base text-[var(--fg-2)]">
          Check your email for a Discord invite and an onboarding doc.
        </p>
        <button onClick={onDone} className="btn-secondary mt-8">
          close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <p className="text-base text-[var(--fg-2)]">
        Open to all students. Tell us a little about why you&apos;re joining and
        we&apos;ll send you everything you need to get started.
      </p>

      <div>
        <label className="field-label" htmlFor="gm-name">name</label>
        <input id="gm-name" className="field" type="text" required placeholder="full name" />
      </div>
      <div>
        <label className="field-label" htmlFor="gm-college">college</label>
        <input id="gm-college" className="field" type="text" required placeholder="e.g. Informatics College Pokhara" />
      </div>
      <div>
        <label className="field-label" htmlFor="gm-email">college email</label>
        <input id="gm-email" className="field" type="email" required placeholder="you@college.edu.np" />
      </div>
      <div>
        <label className="field-label" htmlFor="gm-github">github profile url</label>
        <input id="gm-github" className="field" type="url" required placeholder="https://github.com/your-handle" />
      </div>
      <div>
        <label className="field-label" htmlFor="gm-why">why do you want to join?</label>
        <textarea
          id="gm-why"
          className="field"
          required
          rows={4}
          placeholder="a few sentences is fine"
        />
      </div>

      <button type="submit" disabled={state === "submitting"} className="btn-primary w-full justify-center">
        {state === "submitting" ? "submitting…" : "submit application →"}
      </button>
    </form>
  );
}

export function Join() {
  const [openForm, setOpenForm] = useState<"core" | "general" | null>(null);

  return (
    <section id="join" className="section gutter relative">
      <div className="max-w-page mx-auto text-center">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <MonoLabel>§ 08 / join</MonoLabel>
          <span className="rule h-px w-12" />
          <MonoLabel>the door</MonoLabel>
        </div>

        <h2 className="font-display font-semibold text-display-xl leading-[0.9] tracking-[-0.04em]">
          DON&apos;T WAIT
          <br />
          UNTIL YOU&apos;RE READY.
        </h2>

        <p className="mt-10 md:mt-12 font-display text-3xl md:text-5xl font-semibold text-[var(--accent)]">
          YOU ARE.
        </p>

        <div className="mt-14 flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
          <a
            href="https://discord.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            join discord
            <span aria-hidden>→</span>
          </a>
          <button onClick={() => setOpenForm("core")} className="btn-secondary">
            apply to core team
            <span aria-hidden>↗</span>
          </button>
          <button onClick={() => setOpenForm("general")} className="btn-secondary">
            apply as general member
            <span aria-hidden>↗</span>
          </button>
        </div>

        <p className="mt-6 font-mono text-meta uppercase opacity-60 max-w-xl mx-auto">
          general membership is open to all students · core team is by application
        </p>

        {/* Socials row */}
        <div className="mt-16 max-w-2xl mx-auto border-t border-b border-rule py-5 flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-meta uppercase">
          {["github ↗", "instagram ↗", "x ↗", "linkedin ↗", "email", "newsletter"].map((s) => (
            <a key={s} href="#" className="hover:text-[var(--accent)] underline underline-offset-4">
              {s}
            </a>
          ))}
        </div>

        <div className="mt-20 font-mono text-meta opacity-60">
          Pokhara, Nepal
        </div>
      </div>

      <Modal
        open={openForm === "core"}
        onClose={() => setOpenForm(null)}
        title="APPLY TO CORE TEAM."
        kicker="§ 08 · core team intake"
      >
        <CoreTeamForm onDone={() => setOpenForm(null)} />
      </Modal>

      <Modal
        open={openForm === "general"}
        onClose={() => setOpenForm(null)}
        title="APPLY AS GENERAL MEMBER."
        kicker="§ 08 · general membership"
      >
        <GeneralMemberForm onDone={() => setOpenForm(null)} />
      </Modal>
    </section>
  );
}
