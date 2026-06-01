// Server-side hCaptcha token verification.
//
// Returns null on success, or a user-facing error string on failure.
// If HCAPTCHA_SECRET_KEY is unset, verification is skipped (local dev
// convenience). Production deployments must set the secret.

const VERIFY_URL = "https://api.hcaptcha.com/siteverify";

type SiteVerifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

export async function verifyHcaptcha(
  token: string | undefined,
  remoteIp?: string,
): Promise<string | null> {
  const secret = process.env.HCAPTCHA_SECRET_KEY;

  if (!secret) {
    console.warn(
      "[hcaptcha] HCAPTCHA_SECRET_KEY not set — skipping verification",
    );
    return null;
  }

  if (!token) {
    return "Please complete the captcha before submitting.";
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.append("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const data = (await res.json()) as SiteVerifyResponse;
    if (!data.success) {
      console.warn("[hcaptcha] verification failed", data["error-codes"]);
      return "Captcha verification failed. Please try again.";
    }
    return null;
  } catch (err) {
    console.error("[hcaptcha] verification error", err);
    return "Could not verify captcha. Please try again.";
  }
}
