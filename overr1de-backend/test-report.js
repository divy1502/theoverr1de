const fs = require("fs");
const { generateReport } = require("./reports/render");

(async () => {
  const pdfBuffer = await generateReport({
    domain: "example.com",
    riskScore: 72,
    findings: [
      {
        title: "Missing Security Headers",
        severity: "Medium",
        description: "X-Frame-Options and CSP headers are missing.",
      },
      {
        title: "Open Port Detected",
        severity: "High",
        description: "Port 8080 is publicly accessible.",
      },
    ],
  });

  fs.writeFileSync("test-output.pdf", pdfBuffer);
  console.log("Wrote test-output.pdf");
})();
