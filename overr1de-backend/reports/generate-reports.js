const PDFDocument = require("pdfkit");

function generateReport(data) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });

      const chunks = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // ===== PDF CONTENT =====
      doc
        .fontSize(22)
        .text("Overr1de Security Scan Report", { align: "center" });
      doc.moveDown();

      doc.fontSize(12);
      doc.text(`Domain: ${data.domain || "N/A"}`);
      doc.text(`Scan Date: ${new Date().toLocaleString()}`);
      doc.text(`Risk Score: ${data.riskScore ?? "N/A"}`);
      doc.moveDown();

      doc.fontSize(16).text("Findings", { underline: true });
      doc.moveDown(0.5);

      if (Array.isArray(data.findings)) {
        data.findings.forEach((f, i) => {
          doc.fontSize(12).text(`${i + 1}. ${f.title}`);
          doc.fontSize(10).text(`Severity: ${f.severity}`);
          doc.text(f.description);
          doc.moveDown();
        });
      } else {
        doc.fontSize(12).text("No findings available.");
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = { generateReport };
