import { resolveMx } from "node:dns/promises";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Common throwaway/disposable email domains. Not exhaustive — covers the
// most common ones a casual bad actor would reach for. Add more here if a
// new throwaway provider becomes a problem.
const DISPOSABLE_DOMAINS = new Set<string>([
  "10minutemail.com",
  "20minutemail.com",
  "33mail.com",
  "anonbox.net",
  "discard.email",
  "disposablemail.com",
  "dispostable.com",
  "fakeinbox.com",
  "getnada.com",
  "guerrillamail.com",
  "inboxbear.com",
  "mailcatch.com",
  "maildrop.cc",
  "mailinator.com",
  "mintemail.com",
  "moakt.com",
  "nada.email",
  "sharklasers.com",
  "spam4.me",
  "tempinbox.com",
  "tempmail.com",
  "tempmailaddress.com",
  "temp-mail.org",
  "throwaway.email",
  "throwawaymail.com",
  "trashmail.com",
  "yopmail.com",
]);

export type EmailCheck =
  | { ok: true }
  | { ok: false; reason: string };

/** Run all the no-friction checks we can do without sending mail.
 *  Returns { ok: true } when the address passes syntax + has MX records
 *  for its domain + isn't a known disposable provider. */
export async function validateEmail(input: string): Promise<EmailCheck> {
  const email = input.trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { ok: false, reason: "That email doesn't look quite right." };
  }

  const domain = email.split("@")[1];
  if (!domain) {
    return { ok: false, reason: "Missing domain in email." };
  }

  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      ok: false,
      reason: "Disposable email addresses aren't accepted. Please use a real inbox.",
    };
  }

  // Cheap, fast DNS lookup. Confirms the domain is set up to receive mail.
  try {
    const records = await resolveMx(domain);
    if (!records || records.length === 0) {
      return {
        ok: false,
        reason: "We couldn't find a mail server for that domain.",
      };
    }
  } catch {
    return {
      ok: false,
      reason: "We couldn't find a mail server for that domain.",
    };
  }

  return { ok: true };
}
