"use client";

import { useState, FormEvent } from "react";
import { MonoLabel } from "./ui/MonoLabel";
import { Modal } from "./ui/Modal";

type FormState = "idle" | "submitting" | "done" | "duplicate";

type SubmitResult = "ok" | "duplicate";

async function submitApplication(
  payload: Record<string, unknown>
): Promise<SubmitResult> {
  const res = await fetch("/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (res.status === 409) return "duplicate";
  if (!res.ok) {
    let message = "Could not submit your application. Please try again.";
    try {
      const data = (await res.json()) as { error?: string };
      if (data?.error) message = data.error;
    } catch {
      /* keep default */
    }
    throw new Error(message);
  }
  return "ok";
}

function DuplicateMessage({ onDone }: { onDone: () => void }) {
  return (
    <div className="text-center py-6">
      <MonoLabel className="block mb-4 text-[var(--accent)] opacity-100">
        [ already on the list ]
      </MonoLabel>
      <h4 className="font-display font-semibold text-4xl md:text-5xl leading-[0.95]">
        WOOOWWW.
        <br />
        HOLD ON.
      </h4>
      <p className="mt-6 text-base md:text-lg text-[var(--fg-2)] max-w-md mx-auto">
        You&apos;re getting a little too excited to join, friend.
      </p>
      <p className="mt-2 text-base md:text-lg text-[var(--fg-2)] max-w-md mx-auto">
        We&apos;ll be in touch — if we haven&apos;t already.
      </p>
      <p className="mt-6 font-mono text-meta uppercase opacity-70">
        // hold your horses, lad.
      </p>
      <button onClick={onDone} className="btn-secondary mt-10">
        close
      </button>
    </div>
  );
}

// Hidden honeypot field — bots tend to fill every input they see; humans don't
// see this one because it's visually hidden. Backend silently drops anything
// where it's non-empty.
function Honeypot() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        left: "-9999px",
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    >
      <label>
        Company (leave blank)
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="brutal-border p-3 font-mono text-meta uppercase"
      style={{ borderColor: "currentColor" }}
    >
      <span className="text-[var(--accent)]">error · </span>
      <span className="opacity-80">{message}</span>
    </div>
  );
}

function CoreTeamForm({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      type: "core" as const,
      name: fd.get("name"),
      email: fd.get("email"),
      github: fd.get("github"),
      projectRepo: fd.get("projectRepo"),
      projectLive: fd.get("projectLive"),
      company: fd.get("company"), // honeypot
    };

    try {
      const result = await submitApplication(payload);
      setState(result === "duplicate" ? "duplicate" : "done");
    } catch (err) {
      setState("idle");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (state === "duplicate") {
    return <DuplicateMessage onDone={onDone} />;
  }

  if (state === "done") {
    return (
      <div className="text-center py-6">
        <MonoLabel className="block mb-3 opacity-100">
          [ application received ]
        </MonoLabel>
        <h4 className="font-display font-semibold text-3xl">
          Thanks for applying.
        </h4>
        <p className="mt-3 text-base text-[var(--fg-2)]">
          We&apos;ll review your project links and get back to you within a
          week.
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
        Core team is for builders ready to ship. Share one project
        you&apos;ve built — that&apos;s the bar.{" "}
        <span className="text-[var(--fg)]">
          Open to @icp.edu.np students only.
        </span>
      </p>

      <Honeypot />

      <div>
        <label className="field-label" htmlFor="ct-name">
          name
        </label>
        <input
          id="ct-name"
          name="name"
          className="field"
          type="text"
          required
          placeholder="full name"
          autoComplete="name"
        />
      </div>
      <div>
        <label className="field-label" htmlFor="ct-email">
          email
        </label>
        <input
          id="ct-email"
          name="email"
          className="field"
          type="email"
          required
          placeholder="you@icp.edu.np"
          pattern="[^@\s]+@icp\.edu\.np$"
          title="Must be an @icp.edu.np address"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
        />
      </div>
      <div>
        <label className="field-label" htmlFor="ct-github">
          github profile url
        </label>
        <input
          id="ct-github"
          name="github"
          className="field"
          type="url"
          required
          placeholder="https://github.com/your-handle"
        />
      </div>
      <div>
        <label className="field-label" htmlFor="ct-project">
          project repo url
        </label>
        <input
          id="ct-project"
          name="projectRepo"
          className="field"
          type="url"
          required
          placeholder="https://github.com/you/project"
        />
      </div>
      <div>
        <label className="field-label" htmlFor="ct-live">
          project live url
        </label>
        <input
          id="ct-live"
          name="projectLive"
          className="field"
          type="url"
          required
          placeholder="https://your-project.example.com"
        />
      </div>

      {error && <ErrorBox message={error} />}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary w-full justify-center disabled:opacity-60"
      >
        {state === "submitting" ? "sending…" : "submit application →"}
      </button>
    </form>
  );
}

function GeneralMemberForm({ onDone }: { onDone: () => void }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      type: "general" as const,
      name: fd.get("name"),
      email: fd.get("email"),
      github: fd.get("github"),
      why: fd.get("why"),
      company: fd.get("company"), // honeypot
    };

    try {
      const result = await submitApplication(payload);
      setState(result === "duplicate" ? "duplicate" : "done");
    } catch (err) {
      setState("idle");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (state === "duplicate") {
    return <DuplicateMessage onDone={onDone} />;
  }

  if (state === "done") {
    return (
      <div className="text-center py-6">
        <MonoLabel className="block mb-3 opacity-100">[ welcome ]</MonoLabel>
        <h4 className="font-display font-semibold text-3xl">You&apos;re in.</h4>
        <p className="mt-3 text-base text-[var(--fg-2)]">
          We&apos;ll be in touch with a Discord invite and onboarding doc
          shortly.
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
        Tell us a little about why you&apos;re joining and we&apos;ll send you
        everything you need to get started.{" "}
        <span className="text-[var(--fg)]">
          Open to @icp.edu.np students only.
        </span>
      </p>

      <Honeypot />

      <div>
        <label className="field-label" htmlFor="gm-name">
          name
        </label>
        <input
          id="gm-name"
          name="name"
          className="field"
          type="text"
          required
          placeholder="full name"
          autoComplete="name"
        />
      </div>
      <div>
        <label className="field-label" htmlFor="gm-email">
          email
        </label>
        <input
          id="gm-email"
          name="email"
          className="field"
          type="email"
          required
          placeholder="you@icp.edu.np"
          pattern="[^@\s]+@icp\.edu\.np$"
          title="Must be an @icp.edu.np address"
          autoComplete="email"
          inputMode="email"
          spellCheck={false}
        />
      </div>
      <div>
        <label className="field-label" htmlFor="gm-github">
          github profile url
        </label>
        <input
          id="gm-github"
          name="github"
          className="field"
          type="url"
          required
          placeholder="https://github.com/your-handle"
        />
      </div>
      <div>
        <label className="field-label" htmlFor="gm-why">
          why do you want to join?
        </label>
        <textarea
          id="gm-why"
          name="why"
          className="field"
          required
          rows={4}
          placeholder="a few sentences is fine"
        />
      </div>

      {error && <ErrorBox message={error} />}

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary w-full justify-center disabled:opacity-60"
      >
        {state === "submitting" ? "sending…" : "submit application →"}
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
            href="https://discord.com/invite/7HpJhBjaMH"
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
          <button
            onClick={() => setOpenForm("general")}
            className="btn-secondary"
          >
            apply as general member
            <span aria-hidden>↗</span>
          </button>
        </div>

        <p className="mt-6 font-mono text-meta uppercase opacity-60 max-w-xl mx-auto">
          general membership is open to all students · core team is by
          application
        </p>

        {/* Socials row */}
        <div className="mt-16 max-w-2xl mx-auto border-t border-b border-rule py-5 flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-meta uppercase">
          {["github ↗", "discord ↗", "email"].map((s) => (
            <a
              key={s}
              href={
                s === "discord ↗"
                  ? "https://discord.com/invite/7HpJhBjaMH"
                  : s === "github ↗"
                    ? "https://github.com/icpdevelopers"
                    : s === "email"
                      ? "mailto:dev@icp.edu.np"
                      : "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] underline underline-offset-4"
            >
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
