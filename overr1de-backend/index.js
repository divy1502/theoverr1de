const express = require("express");
const { generateReport } = require("./reports/render");

const app = express();
app.use(express.json({ limit: "2mb" }));

app.get("/", (req, res) => res.send("Overr1de backend running"));

app.post("/generate-report", async (req, res) => {
  try {
    const pdf = await generateReport(req.body);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=overr1de-report.pdf",
    });
    res.send(pdf);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF generation failed" });
  }
});

app.listen(3000, () => console.log("Backend running: http://localhost:3000"));
