import tls from "tls";
import { URL } from "url";

function parseTarget(raw) {
  try {
    const value = raw.startsWith("http") ? raw : `https://${raw}`;
    return new URL(value);
  } catch {
    return null;
  }
}

function getCertificate(hostname) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      443,
      hostname,
      {
        servername: hostname,
        rejectUnauthorized: false, // we just want the cert, not to validate it fully
      },
      () => {
        const cert = socket.getPeerCertificate();
        socket.end();
        resolve(cert);
      }
    );

    socket.setTimeout(4000, () => {
      socket.destroy(new Error("Timeout"));
    });

    socket.on("error", (err) => {
      reject(err);
    });
  });
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

  try {
    const cert = await getCertificate(parsed.hostname);

    if (!cert || !cert.valid_from || !cert.valid_to) {
      res.status(500).json({ error: "No certificate information found" });
      return;
    }

    const validFrom = new Date(cert.valid_from);
    const validTo = new Date(cert.valid_to);
    const now = new Date();

    const isExpired = validTo < now;
    const daysLeftRaw = (validTo - now) / (1000 * 60 * 60 * 24);
    const daysLeft = Math.max(Math.round(daysLeftRaw), 0);

    const issuerObj = cert.issuer || {};
    const issuer =
      issuerObj.O || issuerObj.CN || issuerObj.organizationalUnitName || null;

    res.status(200).json({
      host: parsed.hostname,
      issuer,
      validFrom,
      validTo,
      isExpired,
      daysLeft,
    });
  } catch (err) {
    console.error("SSL check error:", err);
    res.status(500).json({ error: "SSL lookup failed" });
  }
}
