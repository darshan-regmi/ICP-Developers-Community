"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionHeader } from "./ui/SectionHeader";
import { MonoLabel } from "./ui/MonoLabel";
import { members, rosterSummary, type Member } from "@/data/members";
import { githubUsernameOf, githubAvatarUrl } from "@/lib/github";

function Avatar({ member, dim = false }: { member: Member; dim?: boolean }) {
  const username = githubUsernameOf(member);
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = username && !imageFailed;

  return (
    <>
      {/* Initials sit behind — visible while the image loads, and after a 404. */}
      <span
        className={`absolute inset-0 flex items-center justify-center font-display text-3xl md:text-5xl font-semibold transition-opacity duration-200 ${dim ? "group-hover:opacity-0" : ""} opacity-80`}
      >
        {member.initials}
      </span>

      {showImage && (
        <Image
          src={githubAvatarUrl(username, 400)}
          alt=""
          fill
          sizes="(max-width: 768px) 25vw, 160px"
          className={`object-cover transition-opacity duration-200 ${dim ? "group-hover:opacity-0" : ""}`}
          onError={() => setImageFailed(true)}
          unoptimized={false}
        />
      )}
    </>
  );
}

export function Team() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="team" className="section gutter relative">
      <div className="max-w-page mx-auto">
        <SectionHeader
          index="06"
          slug="team"
          title="THE TEAM."
          kicker="core organizers"
        />

        <ul className="border-t border-rule">
          {members.map((m, i) => (
            <li
              key={m.name}
              className={`border-b border-rule transition-[padding] duration-300 ${
                open === i ? "py-8" : "py-5"
              }`}
              onMouseEnter={() => setOpen(i)}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => setOpen(i)}
              tabIndex={0}
            >
              <div className="grid grid-cols-12 gap-4 items-center cursor-pointer">
                <h3 className="col-span-12 md:col-span-5 font-display font-semibold text-2xl md:text-4xl leading-none">
                  {m.name}
                </h3>
                <span className="hidden md:block md:col-span-1 rule h-px" />
                <span className="col-span-8 md:col-span-4 font-mono text-meta opacity-70 uppercase">
                  {m.role}
                </span>
                <span className="col-span-4 md:col-span-2 font-mono text-meta text-right">
                  {open === i ? "—" : "+"}
                </span>
              </div>

              {open === i && (
                <div className="grid grid-cols-12 gap-4 mt-6">
                  <div className="col-span-3 md:col-span-2">
                    {m.portfolio ? (
                      <a
                        href={m.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${m.name}'s portfolio`}
                        className="group aspect-square brutal-border relative overflow-hidden bg-[var(--bg-2)] cursor-pointer hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-0 block"
                      >
                        <Avatar member={m} dim />
                        <span className="absolute inset-0 flex flex-col items-center justify-center font-mono text-meta uppercase text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 text-center px-2 z-10">
                          <span>view</span>
                          <span>portfolio ↗</span>
                        </span>
                      </a>
                    ) : (
                      <div className="aspect-square brutal-border relative overflow-hidden bg-[var(--bg-2)]">
                        <Avatar member={m} />
                      </div>
                    )}
                  </div>
                  <div className="col-span-9 md:col-span-7 flex flex-col justify-center">
                    <p className="text-lg md:text-xl leading-snug text-[var(--fg-2)]">
                      {m.quote}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-3 flex md:justify-end items-end gap-4 font-mono text-meta uppercase">
                    {m.socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="hover:text-[var(--accent)] underline underline-offset-4"
                      >
                        {s.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex items-center justify-between flex-wrap gap-4">
          <MonoLabel>
            {rosterSummary.organizers} organizers · {rosterSummary.members} members ·{" "}
            {rosterSummary.alumni} alumni
          </MonoLabel>
          <a href="#join" className="btn-secondary">
            apply to core team
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
