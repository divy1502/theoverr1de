// api/ssl-check.js
import tls from "tls";
import { URL } from "url";

export default function handler(req, res) {
  const { url } = req.query || {};

  if (!url) {
    res.status(400).json({ error: "Missing ?url parameter" });
    return;
  }

  // Normalize the URL
  let target = url.trim();
  if (!/^https?:\/\//i.test(target)) {
    target = "https://" + target;
  }

  let host;
  let port;

  try {
    const parsed = new URL(target);
    host = parsed.hostname;
    port = parsed.port || 443;
  } catch (e) {
    res.status(400).json({ error: "Invalid URL" });
    return;
  }

  const socket = tls.connect(
    port,
    host,
    { servername: host, timeout: 8000 },
    () => {
      try {
        const cert = socket.getPeerCertificate();
        if (!cert || Object.keys(cert).length === 0) {
          res.status(500).json({ error: "No certificate returned by server" });
          socket.end();
          return;
        }

        const now = Date.now();
        const validFrom = new Date(cert.valid_from);
        const validTo = new Date(cert.valid_to);

        const daysLeft = Math.round(
          (validTo.getTime() - now) / (1000 * 60 * 60 * 24)
        );

        res.status(200).json({
          host,
          issuer: cert.issuer?.O || cert.issuer?.CN || null,
          subject: cert.subject?.CN || null,
          validFrom: validFrom.toISOString(),
          validTo: validTo.toISOString(),
          daysLeft,
          isExpired: now > validTo.getTime(),
        });

        socket.end();
      } catch (err) {
        res.status(500).json({ error: "Failed to read certificate" });
        socket.end();
      }
    }
  );

  socket.on("error", (err) => {
    res
      .status(500)
      .json({ error: "TLS connection failed", detail: err.message });
  });

  socket.setTimeout(8000, () => {
    res.status(504).json({ error: "TLS connection timed out" });
    socket.destroy();
  });
}
