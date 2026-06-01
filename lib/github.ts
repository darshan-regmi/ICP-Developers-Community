import type { Member } from "@/data/members";

/** Extracts the GitHub username from a member's socials array.
 *  Returns null if there's no github link or it isn't a real user URL. */
export function githubUsernameOf(member: Member): string | null {
  const link = member.socials.find((s) => s.label === "github");
  if (!link?.href || link.href === "#") return null;
  try {
    const url = new URL(link.href);
    if (url.hostname !== "github.com" && url.hostname !== "www.github.com") {
      return null;
    }
    const seg = url.pathname.replace(/^\/+/, "").split("/")[0];
    return seg || null;
  } catch {
    return null;
  }
}

/** Public, no-auth avatar URL. GitHub returns a 302 to
 *  avatars.githubusercontent.com — Next.js Image follows it transparently. */
export function githubAvatarUrl(username: string, size = 400): string {
  return `https://github.com/${encodeURIComponent(username)}.png?size=${size}`;
}
