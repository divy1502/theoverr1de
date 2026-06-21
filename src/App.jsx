import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Blog from "./components/Blog.jsx";

import {
  Shield,
  Lock,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Mail,
  Linkedin,
  Terminal,
  FileText,
} from "lucide-react";

const cn = (...c) => c.filter(Boolean).join(" ");

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ------------------------------------------
   HEADER
------------------------------------------- */
const Header = () => (
  <header className="sticky top-0 z-40 backdrop-blur bg-[#0b0c10]/80 border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-cyan-400" />
        <span className="text-white font-semibold">Overr1de Labs</span>
      </a>
      <nav className="hidden md:flex gap-8 text-sm text-gray-300">
        <a href="#tool" className="hover:text-white">
          Tool
        </a>
        <a href="#features" className="hover:text-white">
          Features
        </a>
        <a href="#blog" className="hover:text-white">
          Blog
        </a>
        <a href="#contact" className="hover:text-white">
          Contact
        </a>
      </nav>

      <div className="hidden md:flex items-center gap-4">
        <a
          href="#tool"
          className="rounded-xl bg-emerald-400 text-black px-4 py-2 font-semibold"
        >
          Start Free Scan <ArrowRight className="ml-2 h-4 w-4 inline" />
        </a>
      </div>
    </div>
  </header>
);

/* ------------------------------------------
   HERO
------------------------------------------- */
const Hero = () => (
  <section className="relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 py-28">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        className="max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> Free surface-level
          security scan
        </span>
        <h1 className="mt-4 text-5xl font-semibold text-white">
          Scan. Detect. <span className="text-cyan-300">Secure</span> — in
          seconds.
        </h1>
        <p className="mt-4 text-lg text-gray-300/90">
          Check your site's SSL certificate and HTTP security headers. No
          signup.
        </p>
        <a
          href="#tool"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("tool")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center rounded-xl bg-emerald-400 text-black px-6 py-3 mt-8 font-semibold"
        >
          Start Free Scan <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------
   PROGRESS BAR (honest: indeterminate while scanning)
------------------------------------------- */
const ProgressBar = ({ scanning, done }) => (
  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
    <div
      className={cn(
        "h-full bg-cyan-400 transition-all duration-700",
        scanning ? "w-2/3 animate-pulse" : done ? "w-full" : "w-0",
      )}
    />
  </div>
);

/* ------------------------------------------
   TOOL (MAIN) — driven only by real checks
------------------------------------------- */
const Tool = () => {
  const [url, setUrl] = useState("");

  // Validate + normalize the URL on the client (real input validation,
  // not a length check). Server-side validation still required for SSRF.
  const parsedUrl = useMemo(() => {
    const trimmed = url.trim();
    if (!trimmed) return null;
    const normalized = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    try {
      const u = new URL(normalized);
      return u.protocol === "https:" || u.protocol === "http:" ? u : null;
    } catch {
      return null;
    }
  }, [url]);

  const valid = Boolean(parsedUrl);
  const safeUrl = parsedUrl?.href ?? "";

  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const [sslInfo, setSslInfo] = useState(null);
  const [sslError, setSslError] = useState(null);
  const [headerInfo, setHeaderInfo] = useState(null);
  const [headerError, setHeaderError] = useState(null);
  const [aiReport, setAiReport] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleStart = async () => {
    if (!valid || scanning) return;

    setScanning(true);
    setScanned(false);

    setSslInfo(null);
    setSslError(null);
    setHeaderInfo(null);
    setHeaderError(null);
    setAiReport(null);

    const ssl = fetch(`/api/ssl-check?url=${encodeURIComponent(safeUrl)}`)
      .then((r) => r.json())
      .then((data) => (data.error ? setSslError(data.error) : setSslInfo(data)))
      .catch(() => setSslError("Request failed"));

    const headers = fetch(
      `/api/headers-check?url=${encodeURIComponent(safeUrl)}`,
    )
      .then((r) => r.json())
      .then((data) =>
        data.error ? setHeaderError(data.error) : setHeaderInfo(data),
      )
      .catch(() => setHeaderError("Request failed"));

    await Promise.allSettled([ssl, headers]);

    setScanning(false);
    setScanned(true);
  };

  const generateAIReport = async () => {
    if (!sslInfo && !headerInfo) return;

    setAiLoading(true);
    setAiReport(null);

    try {
      const res = await fetch("/api/ai-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sslInfo, headerInfo }),
      });

      const data = await res.json();
      if (data.error) setAiReport("Report error: " + data.error);
      else setAiReport(data.report);
    } catch (e) {
      setAiReport("Report failed.");
    }

    setAiLoading(false);
  };

  return (
    <section id="tool" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div initial="hidden" whileInView="show" variants={fade}>
          <h2 className="text-3xl font-semibold text-white flex items-center gap-2">
            <Terminal className="h-6 w-6 text-cyan-300" />
            Free Website Security Scan
          </h2>

          <p className="mt-2 text-gray-300 max-w-2xl">
            Paste your domain and run a surface-level SSL + header scan.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourdomain.com"
              className={cn(
                "w-full rounded-xl bg-[#1F2833] px-4 py-3 text-white border",
                valid || url.trim() === ""
                  ? "border-white/10 focus:ring-emerald-400/40"
                  : "border-red-500/40",
              )}
            />
            <button
              onClick={handleStart}
              disabled={!valid || scanning}
              className={cn(
                "rounded-xl px-5 py-3 font-semibold flex items-center",
                !valid || scanning
                  ? "bg-gray-600/60 text-gray-300 cursor-not-allowed"
                  : "bg-emerald-400 hover:bg-emerald-300 text-black",
              )}
            >
              {scanning ? "Scanning…" : "Start Free Scan"}
              {!scanning && <ArrowRight className="ml-2 h-4 w-4" />}
            </button>
          </div>

          <div className="mt-6">
            <ProgressBar scanning={scanning} done={scanned} />
            <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
              {scanning ? (
                "Running scan…"
              ) : scanned ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Scan
                  complete.
                </>
              ) : (
                "Idle"
              )}
            </div>
          </div>

          {sslInfo && (
            <div className="mt-6 p-6 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-cyan-300" /> SSL Certificate
              </h3>

              <div className="grid md:grid-cols-2 gap-3 mt-3 text-sm text-gray-200">
                <div>Host: {sslInfo.host}</div>
                <div>Issuer: {sslInfo.issuer || "Unknown"}</div>
                <div>
                  Valid From:{" "}
                  {sslInfo.validFrom
                    ? new Date(sslInfo.validFrom).toLocaleString()
                    : "?"}
                </div>
                <div>
                  Valid To:{" "}
                  {sslInfo.validTo
                    ? new Date(sslInfo.validTo).toLocaleString()
                    : "?"}
                </div>
                <div>
                  Days Left:{" "}
                  <span
                    className={
                      sslInfo.isExpired ? "text-red-400" : "text-emerald-400"
                    }
                  >
                    {sslInfo.isExpired
                      ? "Expired"
                      : `${sslInfo.daysLeft ?? "?"} days`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {sslError && (
            <div className="mt-4 text-sm text-red-200 bg-red-500/10 border border-red-500/40 px-4 py-3 rounded-xl">
              SSL check failed: {sslError}
            </div>
          )}

          {headerInfo && (
            <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-cyan-300" /> HTTP Security
                Headers
              </h3>

              <div className="grid md:grid-cols-2 gap-3 mt-3 text-sm text-gray-200">
                {[
                  [
                    "Strict-Transport-Security",
                    headerInfo.headers?.strictTransportSecurity,
                  ],
                  [
                    "Content-Security-Policy",
                    headerInfo.headers?.contentSecurityPolicy,
                  ],
                  ["X-Frame-Options", headerInfo.headers?.xFrameOptions],
                  [
                    "X-Content-Type-Options",
                    headerInfo.headers?.xContentTypeOptions,
                  ],
                  ["Referrer-Policy", headerInfo.headers?.referrerPolicy],
                  ["Permissions-Policy", headerInfo.headers?.permissionsPolicy],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="bg-[#0b0c10] border border-white/10 rounded-xl px-4 py-3"
                  >
                    <div className="text-gray-400 text-xs">{label}</div>
                    <div
                      className={value ? "text-emerald-400" : "text-amber-300"}
                    >
                      {value || "Missing"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {headerError && (
            <div className="mt-4 text-sm text-red-200 bg-red-500/10 border border-red-500/40 px-4 py-3 rounded-xl">
              Header check failed: {headerError}
            </div>
          )}

          {sslInfo && headerInfo && (
            <button
              onClick={generateAIReport}
              className="mt-6 px-5 py-3 rounded-xl bg-cyan-400 text-black font-semibold shadow-lg"
            >
              Generate Report Summary
            </button>
          )}

          {aiLoading && (
            <div className="mt-4 text-cyan-300 text-sm">Generating report…</div>
          )}

          {aiReport && (
            <div className="mt-6 p-6 bg-white/5 border border-white/10 rounded-2xl text-gray-200 whitespace-pre-wrap">
              {aiReport}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------
   FEATURES — only claims we can actually back
------------------------------------------- */
const Features = () => (
  <section id="features" className="border-t border-white/10 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" variants={fade}>
        <h2 className="text-3xl font-semibold text-white">
          What the scanner checks
        </h2>
        <p className="mt-2 text-gray-300 max-w-xl">
          A fast, honest, surface-level look at two things that quietly break
          most sites.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            [
              Lock,
              "SSL Inspection",
              "Live certificate, issuer and expiry check.",
            ],
            [Globe, "Header Analysis", "Checks six key HTTP security headers."],
            [
              FileText,
              "Plain-English Report",
              "Clear, readable remediation guidance.",
            ],
          ].map(([Icon, title, desc], i) => (
            <div
              key={i}
              className="p-5 bg-white/5 border border-white/10 rounded-2xl"
            >
              <Icon className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-3 text-white font-semibold">{title}</h3>
              <p className="text-gray-300 text-sm mt-2">{desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------
   CONTACT (single column, no fake email)
------------------------------------------- */
const Contact = () => (
  <section id="contact" className="border-t border-white/10 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" variants={fade}>
        <h2 className="text-3xl font-semibold text-white">About & Contact</h2>
        <p className="text-gray-300 mt-2 max-w-md">
          Overr1de Labs is a personal project exploring lightweight website
          security tooling.
        </p>

        <div className="flex gap-4 text-gray-300 mt-6">
          {/* TODO: replace with a real address you control before publishing */}
          <a
            href="mailto:you@yourdomain.com"
            className="hover:text-white flex items-center gap-2"
          >
            <Mail className="h-4 w-4" /> Email
          </a>

          <a
            href="https://www.linkedin.com/in/divy-brahmbhatt-287893348/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white flex items-center gap-2"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------
   FOOTER
------------------------------------------- */
const Footer = () => (
  <footer className="border-t border-white/10 py-8">
    <div className="max-w-7xl mx-auto px-6 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-center md:text-left">
        © {new Date().getFullYear()} Overr1de Labs.
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <a
          href="https://github.com/divy1502"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/divy-brahmbhatt-287893348/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

/* ------------------------------------------
   EXPORT APP (single page, no router)
------------------------------------------- */
export default function App() {
  return (
    <>
      <Header />
      <Hero />
      <Tool />
      <Features />
      <Contact />
      <Blog withId />
      <Footer />
    </>
  );
}
