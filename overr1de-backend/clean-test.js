const fs = require("fs");
const PDFDocument = require("pdfkit");

const doc = new PDFDocument({ autoFirstPage: true });
const stream = fs.createWriteStream("clean.pdf");

doc.pipe(stream);

doc.fontSize(20).text("CLEAN PDF TEST", { align: "center" });
doc.moveDown();
doc.fontSize(12).text("If this opens, the PDF system works.");

doc.end();

stream.on("finish", () => {
  console.log("CLEAN PDF GENERATED");
});
