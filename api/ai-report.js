export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Use POST" });
    return;
  }

  let body = "";
  await new Promise((resolve) => {
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", resolve);
  });

  let payload;
  try {
    payload = JSON.parse(body || "{}");
  } catch {
    res.status(400).json({ error: "Invalid JSON body" });
    return;
  }

  const { sslInfo, headerInfo } = payload || {};

  if (!sslInfo && !headerInfo) {
    res.status(400).json({ error: "Missing sslInfo and headerInfo" });
    return;
  }

  const lines = [];

  lines.push("Overr1de Labs – AI Security Snapshot\n");

  if (sslInfo) {
    lines.push(`Target: ${sslInfo.host || "unknown host"}`);

    if (sslInfo.isExpired) {
      lines.push(
        "- The SSL certificate appears to be expired. Browsers may show warnings and attackers can more easily intercept traffic."
      );
    } else if (typeof sslInfo.daysLeft === "number") {
      if (sslInfo.daysLeft < 15) {
        lines.push(
          `- The certificate is valid but only for about ${sslInfo.daysLeft} more days. Plan a renewal soon to avoid downtime.`
        );
      } else {
        lines.push(
          `- SSL certificate is valid for roughly ${sslInfo.daysLeft} more days, which is acceptable in the short term.`
        );
      }
    }
  }

  const headers = headerInfo?.headers || {};

  const missing = [];
  const good = [];

  if (!headers.strictTransportSecurity) {
    missing.push("Strict-Transport-Security (HSTS)");
  } else {
    good.push("Strict-Transport-Security");
  }

  if (!headers.contentSecurityPolicy) {
    missing.push("Content-Security-Policy");
  } else {
    good.push("Content-Security-Policy");
  }

  if (!headers.xFrameOptions) {
    missing.push("X-Frame-Options");
  } else {
    good.push("X-Frame-Options");
  }

  if (!headers.xContentTypeOptions) {
    missing.push("X-Content-Type-Options");
  } else {
    good.push("X-Content-Type-Options");
  }

  if (!headers.referrerPolicy) {
    missing.push("Referrer-Policy");
  } else {
    good.push("Referrer-Policy");
  }

  if (!headers.permissionsPolicy) {
    missing.push("Permissions-Policy");
  } else {
    good.push("Permissions-Policy");
  }

  if (good.length) {
    lines.push(
      `\n✅ Security headers in place: ${good.join(
        ", "
      )}. These help reduce common web exploits and leaks.`
    );
  }

  if (missing.length) {
    lines.push(
      `\n⚠️ Missing or weak headers: ${missing.join(
        ", "
      )}. Adding these will harden the site against clickjacking, XSS and data exposure.`
    );
  }

  lines.push(
    "\nNext steps:\n" +
      "- Renew or monitor your SSL certificate so it never expires.\n" +
      "- Add the missing security headers at your reverse proxy or app layer.\n" +
      "- Re-run this scan after each change to verify improvements."
  );

  res.status(200).json({ report: lines.join("\n") });
}
