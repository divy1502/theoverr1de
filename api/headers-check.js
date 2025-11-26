import { URL } from "url";

function parseTarget(raw) {
  try {
    const value = raw.startsWith("http") ? raw : `https://${raw}`;
    return new URL(value);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const { url } = req.query || {};

  if (!url) {
    res.status(400).json({ error: "Missing url query parameter" });
    return;
  }

  const parsed = parseTarget(url);
  if (!parsed) {
    res.status(400).json({ error: "Invalid url" });
    return;
  }

  const target = parsed.origin;

  try {
    // Use GET instead of HEAD because some sites don't like HEAD
    const response = await fetch(target, {
      method: "GET",
      redirect: "follow",
    });

    const get = (name) => response.headers.get(name) || null;

    const headers = {
      strictTransportSecurity: get("strict-transport-security"),
      contentSecurityPolicy: get("content-security-policy"),
      xFrameOptions: get("x-frame-options"),
      xContentTypeOptions: get("x-content-type-options"),
      referrerPolicy: get("referrer-policy"),
      permissionsPolicy: get("permissions-policy"),
    };

    res.status(200).json({ headers });
  } catch (err) {
    console.error("Headers check error:", err);
    res.status(500).json({ error: "Header lookup failed" });
  }
}
