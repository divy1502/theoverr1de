export default async function handler(req, res) {
  console.log("📩 API HIT: /api/collect-email");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body || {};

  if (!email) {
    console.log("❌ No email received");
    return res.status(400).json({ error: "Email is required" });
  }

  console.log("✅ New subscriber:", email);

  return res.status(200).json({ success: true });
}
