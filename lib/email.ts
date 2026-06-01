// HTML email templates for the two application forms.
// Inline styles only — email clients ignore <style> tags reliably.

const ACCENT = "#00ADB5";
const INK = "#222831";
const SUB = "#393E46";
const RULE = "#e5e7eb";
const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

function esc(s: string | undefined | null): string {
  if (!s) return "";
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function link(href: string): string {
  const safe = esc(href);
  return `<a href="${safe}" style="color:${ACCENT};text-decoration:none;border-bottom:1px solid ${ACCENT}">${safe}</a>`;
}

function row(label: string, valueHtml: string): string {
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid ${RULE};color:${SUB};font-family:${MONO};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;width:140px;vertical-align:top;">${esc(label)}</td>
      <td style="padding:14px 0;border-bottom:1px solid ${RULE};font-family:${SANS};font-size:14px;color:${INK};vertical-align:top;word-break:break-all;">${valueHtml}</td>
    </tr>
  `;
}

function shell({
  kicker,
  name,
  rowsHtml,
  footerNote,
}: {
  kicker: string;
  name: string;
  rowsHtml: string;
  footerNote?: string;
}): string {
  return `
    <div style="font-family:${SANS};max-width:560px;margin:0 auto;padding:32px;color:${INK};background:#ffffff;">
      <div style="border-bottom:2px solid ${INK};padding-bottom:16px;margin-bottom:24px;">
        <div style="font-family:${MONO};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${ACCENT};">${esc(kicker)}</div>
        <h1 style="font-size:28px;margin:8px 0 0;letter-spacing:-0.02em;font-weight:600;">${esc(name)}</h1>
      </div>
      <table style="width:100%;border-collapse:collapse;">${rowsHtml}</table>
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid ${RULE};font-family:${MONO};font-size:11px;color:${SUB};letter-spacing:0.1em;text-transform:uppercase;">
        received ${esc(new Date().toISOString())} · icp dc apply pipeline${footerNote ? ` · ${esc(footerNote)}` : ""}
      </div>
    </div>
  `;
}

export type CoreTeamPayload = {
  name: string;
  email: string;
  github: string;
  projectRepo: string;
  projectLive: string;
};

export type GeneralPayload = {
  name: string;
  email: string;
  github: string;
  why: string;
};

export function coreTeamEmail(d: CoreTeamPayload): { subject: string; html: string } {
  const rowsHtml = [
    row("email", `<a href="mailto:${esc(d.email)}" style="color:${ACCENT};">${esc(d.email)}</a>`),
    row("github", link(d.github)),
    row("project · repo", link(d.projectRepo)),
    row("project · live", link(d.projectLive)),
  ].join("");

  return {
    subject: `[Core Team] ${d.name} — application`,
    html: shell({
      kicker: "§ application · core team",
      name: d.name,
      rowsHtml,
    }),
  };
}

/** Auto-reply sent to the applicant. Doubles as a delivery test — if it
 *  bounces, the admin inbox gets the bounce notice from Resend. */
export function applicantAutoReply(d: {
  name: string;
  type: "core" | "general";
}): { subject: string; html: string } {
  const isCore = d.type === "core";
  const kicker = isCore
    ? "§ confirmation · core team"
    : "§ confirmation · general membership";
  const nextStep = isCore
    ? "We'll review your project links and get back to you within a week."
    : "Hold tight — we'll send you a Discord invite and onboarding doc shortly.";

  const html = `
    <div style="font-family:${SANS};max-width:560px;margin:0 auto;padding:32px;color:${INK};background:#ffffff;">
      <div style="border-bottom:2px solid ${INK};padding-bottom:16px;margin-bottom:24px;">
        <div style="font-family:${MONO};font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${ACCENT};">${esc(kicker)}</div>
        <h1 style="font-size:28px;margin:8px 0 4px;letter-spacing:-0.02em;font-weight:600;">We got your application, ${esc(d.name.split(" ")[0] || d.name)}.</h1>
      </div>
      <p style="font-size:16px;line-height:1.55;color:${INK};margin:0 0 16px;">Thanks for applying to the ICP Developers&rsquo; Community.</p>
      <p style="font-size:15px;line-height:1.55;color:${SUB};margin:0 0 24px;">${esc(nextStep)}</p>
      <p style="font-size:14px;line-height:1.55;color:${SUB};margin:0 0 24px;">In the meantime, you can lurk in the Discord, browse the GitHub org, or read the colophon to see how this thing was built:</p>
      <p style="font-family:${MONO};font-size:13px;margin:0 0 8px;">→ <a href="https://discord.com/invite/7HpJhBjaMH" style="color:${ACCENT};text-decoration:none;border-bottom:1px solid ${ACCENT};">discord</a></p>
      <p style="font-family:${MONO};font-size:13px;margin:0 0 8px;">→ <a href="https://github.com/icpdevelopers" style="color:${ACCENT};text-decoration:none;border-bottom:1px solid ${ACCENT};">github org</a></p>
      <p style="font-family:${MONO};font-size:13px;margin:0 0 24px;">→ <a href="https://icp-developers-community.vercel.app/colophon" style="color:${ACCENT};text-decoration:none;border-bottom:1px solid ${ACCENT};">colophon</a></p>
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid ${RULE};font-family:${MONO};font-size:11px;color:${SUB};letter-spacing:0.1em;text-transform:uppercase;">
        // we learn by shipping. · icp developers&rsquo; community · pokhara
      </div>
    </div>
  `;

  return {
    subject: isCore
      ? "We got your core-team application · ICP DC"
      : "Welcome to ICP DC · we got your application",
    html,
  };
}

export function generalMemberEmail(d: GeneralPayload): { subject: string; html: string } {
  const rowsHtml = [
    row("email", `<a href="mailto:${esc(d.email)}" style="color:${ACCENT};">${esc(d.email)}</a>`),
    row("github", link(d.github)),
    row(
      "why join",
      `<div style="white-space:pre-wrap;line-height:1.5;">${esc(d.why)}</div>`
    ),
  ].join("");

  return {
    subject: `[General Member] ${d.name} — application`,
    html: shell({
      kicker: "§ application · general member",
      name: d.name,
      rowsHtml,
    }),
  };
}
