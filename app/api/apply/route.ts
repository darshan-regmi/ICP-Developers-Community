import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  coreTeamEmail,
  generalMemberEmail,
  applicantAutoReply,
  type CoreTeamPayload,
  type GeneralPayload,
} from "@/lib/email";
import { validateEmail } from "@/lib/email-validation";
import { site } from "@/data/site";

const FROM = process.env.RESEND_FROM || "ICP DC <onboarding@resend.dev>";
const TO = process.env.APPLY_TO_EMAIL || "dev@icp.edu.np";
// Create a Resend Audience for applicants and paste its id into
// RESEND_AUDIENCE_ID in .env.local + Vercel env vars. If unset, dedup is
// skipped silently — the form still works but lets duplicates through.
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || "";
const REQUIRED_DOMAIN = site.membership.emailDomain;

// DNS lookups and Resend SDK both require Node runtime (not edge).
export const runtime = "nodejs";

function isUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function clean(s: unknown, max = 500): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

function splitName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

type ApplyBody = {
  type?: "core" | "general";
  name?: string;
  email?: string;
  github?: string;
  projectRepo?: string;
  projectLive?: string;
  why?: string;
  company?: string; // honeypot
};

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let body: ApplyBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: silently drop bot submissions.
  if (clean(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const type = body.type;
  if (type !== "core" && type !== "general") {
    return NextResponse.json({ error: "Invalid application type." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const github = clean(body.github, 300);

  if (!name || !email || !github) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  // 1) Syntax + disposable + MX checks.
  const emailCheck = await validateEmail(email);
  if (!emailCheck.ok) {
    return NextResponse.json({ error: emailCheck.reason }, { status: 400 });
  }

  // 2) Restrict to the configured college domain.
  const emailDomain = email.split("@")[1];
  if (emailDomain !== REQUIRED_DOMAIN) {
    return NextResponse.json(
      {
        error: `Applications are open to @${REQUIRED_DOMAIN} addresses only. Please use your college email.`,
      },
      { status: 400 }
    );
  }

  if (!isUrl(github)) {
    return NextResponse.json(
      { error: "GitHub URL must start with http(s)://" },
      { status: 400 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  // 3) Dedup — has this email already applied?
  //    Best-effort: if the lookup itself errors (network, auth, audience
  //    missing) we proceed without blocking. We do NOT want to lock people
  //    out because a third-party hiccup.
  if (AUDIENCE_ID) {
    try {
      const existing = await resend.contacts.get({
        email,
        audienceId: AUDIENCE_ID,
      });
      if (existing.data && !existing.error) {
        return NextResponse.json({ duplicate: true }, { status: 409 });
      }
    } catch (err) {
      console.warn("[apply] dedup lookup failed (non-fatal)", err);
    }
  } else {
    console.warn(
      "[apply] RESEND_AUDIENCE_ID not set — duplicate-submission check disabled"
    );
  }

  try {
    let adminSubject: string;
    let adminHtml: string;

    if (type === "core") {
      const projectRepo = clean(body.projectRepo, 300);
      const projectLive = clean(body.projectLive, 300);
      if (!projectRepo || !projectLive) {
        return NextResponse.json(
          { error: "Project repo and live URL are required for core team." },
          { status: 400 }
        );
      }
      if (!isUrl(projectRepo) || !isUrl(projectLive)) {
        return NextResponse.json(
          { error: "Project URLs must start with http(s)://" },
          { status: 400 }
        );
      }
      const payload: CoreTeamPayload = {
        name,
        email,
        github,
        projectRepo,
        projectLive,
      };
      ({ subject: adminSubject, html: adminHtml } = coreTeamEmail(payload));
    } else {
      const why = clean(body.why, 2000);
      if (!why) {
        return NextResponse.json(
          { error: "Please tell us why you want to join." },
          { status: 400 }
        );
      }
      const payload: GeneralPayload = { name, email, github, why };
      ({ subject: adminSubject, html: adminHtml } = generalMemberEmail(payload));
    }

    // 4) Notify the admin.
    const { error: adminErr } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: adminSubject,
      html: adminHtml,
    });
    if (adminErr) {
      console.error("[apply] admin send failed", adminErr);
      return NextResponse.json(
        { error: "Could not send the application. Please try again." },
        { status: 502 }
      );
    }

    // 5) Auto-reply to the applicant. Doubles as a delivery test —
    //    bounces land in the admin inbox so we know the address was dead.
    const reply = applicantAutoReply({ name, type });
    const { error: replyErr } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: TO,
      subject: reply.subject,
      html: reply.html,
    });
    if (replyErr) {
      console.warn("[apply] auto-reply failed (non-fatal)", replyErr);
    }

    // 6) Record the contact so a second attempt gets dedup'd. Non-fatal —
    //    the application already went out, this just powers future checks.
    if (AUDIENCE_ID) {
      try {
        const { firstName, lastName } = splitName(name);
        await resend.contacts.create({
          email,
          firstName,
          lastName,
          unsubscribed: false,
          audienceId: AUDIENCE_ID,
        });
      } catch (err) {
        console.warn("[apply] contact create failed (non-fatal)", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[apply] unexpected error", err);
    return NextResponse.json(
      { error: "Something went wrong on our side." },
      { status: 500 }
    );
  }
}
