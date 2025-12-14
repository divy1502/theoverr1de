const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const Handlebars = require("handlebars");

Handlebars.registerHelper("eq", (a, b) => a === b);

async function generateReport(data) {
  const templatePath = path.join(__dirname, "overr1de-template.html");
  const templateHtml = fs.readFileSync(templatePath, "utf-8");

  const template = Handlebars.compile(templateHtml);
  const html = template(data);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return pdf;
}

module.exports = { generateReport };
