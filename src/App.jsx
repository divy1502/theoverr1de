import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Blog from "./components/Blog.jsx";

import {
  Shield,
  Lock,
  Globe,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Terminal,
  FileText,
  Zap,
  Menu,
  X,
} from "lucide-react";

const cn = (...c) => c.filter(Boolean).join(" ");

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const NAV = ["Tool", "Features", "Blog", "Contact"];

/* ------------------------------------------
   HEADER
------------------------------------------- */
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-hacker-900/80 border-b border-hacker-green/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a className="flex items-center gap-2" href="#">
          <Shield className="h-6 w-6 text-hacker-cyan" />
          <span className="text-white font-display font-bold">Overr1de Labs</span>
        </a>
        <nav className="hidden md:flex gap-8 text-sm text-gray-300 font-mono">
          {NAV.map((t) => (
            <a key={t} href={"#" + t.toLowerCase()} className="hover:text-hacker-green transition-colors">
              {t}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href="#tool"
            className="rounded-sm bg-hacker-green text-black px-4 py-2 font-mono font-bold shadow-[0_0_15px_rgba(0,255,102,0.3)] hover:shadow-[0_0_20px_rgba(0,255,102,0.5)] transition-all flex items-center"
          >
            START FREE SCAN <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-hacker-green/20 bg-[#050b14] absolute top-16 left-0 right-0 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-5 pb-6">
              {NAV.map((t) => (
                <a
                  key={t}
                  href={"#" + t.toLowerCase()}
                  className="text-gray-300 hover:text-hacker-green font-mono uppercase font-bold text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  &gt; {t}
                </a>
              ))}
              <div className="pt-4 border-t border-hacker-green/10">
                <a
                  href="#tool"
                  className="rounded-sm bg-hacker-green text-black px-4 py-3 font-mono font-bold w-full flex justify-between items-center transition-all uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Free Scan
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

/* ------------------------------------------
   HERO
------------------------------------------- */
const Hero = () => (
  <section className="relative overflow-hidden min-h-[85vh] flex items-center border-b border-hacker-green/10">
    <div className="absolute inset-0 bg-hacker-900">
      <div className="absolute inset-0 bg-hacker-grid opacity-60" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-hacker-green/20 animate-scanline" />
    </div>

    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial="hidden" animate="show" variants={fade} className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-sm border border-hacker-cyan/40 bg-hacker-cyan/10 px-3 py-1.5 text-xs font-mono text-hacker-cyan">
          <Sparkles className="h-4 w-4" /> Free surface-level security scan
        </span>
        <h1 className="mt-6 text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight">
          Scan. Detect. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-hacker-green to-hacker-cyan">Secure.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 font-mono">
          Check your site's SSL certificate and HTTP security headers in seconds.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 items-center">
          <a
            href="#tool"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center rounded-sm bg-hacker-green text-black px-8 py-4 font-mono font-bold shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:shadow-[0_0_30px_rgba(0,255,102,0.6)] hover:-translate-y-0.5 transition-all"
          >
            START FREE SCAN <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <span className="text-xs text-gray-500 font-mono">/* NO_SIGNUP_REQUIRED */</span>
        </div>
      </motion.div>

      {/* Decorative scan visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        aria-hidden="true"
        className="hidden lg:block relative h-[420px] w-full rounded-sm border border-hacker-green/30 bg-[#050b14] overflow-hidden shadow-[0_0_40px_rgba(0,255,102,0.1)]"
      >
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,102,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,102,0.2)_1px,transparent_1px)] bg-[size:30px_30px] rounded-sm" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-hacker-green/40 rounded-full flex items-center justify-center">
          <div className="absolute top-0 bottom-1/2 left-1/2 right-0 bg-gradient-to-br from-hacker-green/40 to-transparent origin-bottom-left animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-6 border border-dashed border-hacker-cyan/30 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
          <div className="absolute inset-16 border border-hacker-green/20 rounded-full" />
          <Shield className="w-10 h-10 text-hacker-green opacity-80" />
        </div>

        <div className="absolute top-8 left-8 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-hacker-green animate-pulse" />
          <span className="text-xs font-mono text-hacker-green">SSL</span>
        </div>
        <div className="absolute bottom-10 right-8 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-hacker-cyan animate-pulse delay-100" />
          <span className="text-xs font-mono text-hacker-cyan">HEADERS</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050b14] to-transparent pointer-events-none" />

        <div className="absolute bottom-4 left-6 right-6 h-[88px] overflow-hidden">
          <motion.div
            animate={{ y: [0, -120] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="text-[11px] font-mono text-hacker-green/60 leading-relaxed"
          >
            <div>&gt; Resolving host...</div>
            <div>&gt; Opening TLS connection...</div>
            <div>&gt; Reading certificate issuer.</div>
            <div>&gt; Checking certificate expiry.</div>
            <div>&gt; Fetching response headers.</div>
            <div>&gt; Strict-Transport-Security</div>
            <div>&gt; Content-Security-Policy</div>
            <div>&gt; X-Frame-Options</div>
            <div>&gt; X-Content-Type-Options</div>
            <div>&gt; Referrer-Policy</div>
            <div>&gt; Permissions-Policy</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------
   PROGRESS BAR (honest: indeterminate while scanning)
------------------------------------------- */
const ProgressBar = ({ scanning, done }) => (
  <div className="w-full h-1.5 bg-hacker-800 overflow-hidden border border-hacker-green/20">
    <div
      className={cn(
        "h-full bg-hacker-green shadow-[0_0_8px_rgba(0,255,102,0.6)] transition-all duration-700",
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
    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
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

    const headers = fetch(`/api/headers-check?url=${encodeURIComponent(safeUrl)}`)
      .then((r) => r.json())
      .then((data) => (data.error ? setHeaderError(data.error) : setHeaderInfo(data)))
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
    <section id="tool" className="relative border-t border-hacker-green/20 bg-hacker-900 bg-hacker-grid py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          variants={fade}
          className="bg-hacker-800/80 backdrop-blur-md border border-hacker-green/30 p-8 rounded-sm shadow-[0_0_30px_rgba(0,255,102,0.05)]"
        >
          <h2 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            <Terminal className="h-7 w-7 text-hacker-green" />
            Free Website Security Scan
          </h2>

          <p className="mt-3 text-gray-400 font-mono text-sm">
            Paste your domain and run a surface-level SSL + header scan.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto]">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              placeholder="https://yourdomain.com"
              className={cn(
                "w-full rounded-sm bg-[#050b14] px-5 py-4 text-white font-mono focus:outline-none transition-all border",
                valid || url.trim() === ""
                  ? "border-hacker-green/40 focus:border-hacker-green focus:shadow-[0_0_10px_rgba(0,255,102,0.2)]"
                  : "border-red-500/40",
              )}
            />
            <button
              onClick={handleStart}
              disabled={!valid || scanning}
              className={cn(
                "rounded-sm px-8 py-4 font-mono font-bold flex items-center justify-center transition-all",
                !valid || scanning
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                  : "bg-hacker-green text-black hover:bg-[#00e65c] shadow-[0_0_15px_rgba(0,255,102,0.3)]",
              )}
            >
              {scanning ? "SCANNING…" : "SCAN"}
              {!scanning && <ArrowRight className="ml-2 h-5 w-5" />}
            </button>
          </div>

          <div className="mt-8">
            <ProgressBar scanning={scanning} done={scanned} />
            <div className="mt-3 font-mono text-xs text-gray-500 flex items-center gap-1.5">
              {scanning ? (
                "STATUS: RUNNING SCAN…"
              ) : scanned ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-hacker-green" /> STATUS: COMPLETE
                </>
              ) : (
                "STATUS: IDLE"
              )}
            </div>
          </div>

          {/* --- SSL Result --- */}
          {sslInfo && (
            <div className="mt-6 border border-hacker-cyan/30 bg-[#050b14]/50 p-6 rounded-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-hacker-cyan" />
              <h3 className="font-display font-bold text-white flex items-center gap-2 mb-4">
                <Lock className="h-5 w-5 text-hacker-cyan" /> SSL CERTIFICATE
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs text-gray-400">
                <div className="bg-hacker-800/50 p-3 rounded-sm border border-white/5">
                  <span className="text-gray-500 block mb-1">HOST</span>
                  <span className="text-gray-200 break-all">{sslInfo.host}</span>
                </div>
                <div className="bg-hacker-800/50 p-3 rounded-sm border border-white/5">
                  <span className="text-gray-500 block mb-1">ISSUER</span>
                  <span className="text-gray-200">{sslInfo.issuer || "Unknown"}</span>
                </div>
                <div className="bg-hacker-800/50 p-3 rounded-sm border border-white/5">
                  <span className="text-gray-500 block mb-1">VALID FROM</span>
                  <span className="text-gray-200">
                    {sslInfo.validFrom ? new Date(sslInfo.validFrom).toLocaleString() : "?"}
                  </span>
                </div>
                <div className="bg-hacker-800/50 p-3 rounded-sm border border-white/5">
                  <span className="text-gray-500 block mb-1">VALID TO</span>
                  <span className="text-gray-200">
                    {sslInfo.validTo ? new Date(sslInfo.validTo).toLocaleString() : "?"}
                  </span>
                </div>
                <div className="bg-hacker-800/50 p-3 rounded-sm border border-white/5 col-span-full">
                  <span className="text-gray-500 inline-block mr-2">DAYS LEFT:</span>
                  <span className={cn("font-bold text-sm", sslInfo.isExpired ? "text-red-400" : "text-hacker-green")}>
                    {sslInfo.isExpired ? "EXPIRED" : `${sslInfo.daysLeft ?? "?"} DAYS`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {sslError && (
            <div className="mt-4 font-mono text-sm text-red-400 bg-red-500/10 border border-red-500/40 px-4 py-3 rounded-sm">
              SSL check failed: {sslError}
            </div>
          )}

          {/* --- Headers --- */}
          {headerInfo && (
            <div className="mt-6 border border-purple-500/30 bg-[#050b14]/50 p-6 rounded-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
              <h3 className="font-display font-bold text-white flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-purple-400" /> HTTP SECURITY HEADERS
              </h3>

              <div className="grid sm:grid-cols-2 gap-3 font-mono text-xs">
                {[
                  ["Strict-Transport-Security", headerInfo.headers?.strictTransportSecurity],
                  ["Content-Security-Policy", headerInfo.headers?.contentSecurityPolicy],
                  ["X-Frame-Options", headerInfo.headers?.xFrameOptions],
                  ["X-Content-Type-Options", headerInfo.headers?.xContentTypeOptions],
                  ["Referrer-Policy", headerInfo.headers?.referrerPolicy],
                  ["Permissions-Policy", headerInfo.headers?.permissionsPolicy],
                ].map(([label, value], i) => (
                  <div
                    key={i}
                    className="bg-hacker-800/50 border border-white/5 rounded-sm px-4 py-3 flex flex-col justify-between"
                  >
                    <div className="text-gray-500 mb-2 truncate">{label}</div>
                    <div className={cn("font-bold break-all", value ? "text-hacker-green" : "text-amber-300")}>
                      {value || "MISSING"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {headerError && (
            <div className="mt-4 font-mono text-sm text-red-400 bg-red-500/10 border border-red-500/40 px-4 py-3 rounded-sm">
              Header check failed: {headerError}
            </div>
          )}

          {sslInfo && headerInfo && (
            <button
              onClick={generateAIReport}
              disabled={aiLoading}
              className="mt-8 w-full py-4 rounded-sm bg-purple-600/90 hover:bg-purple-500 text-white font-mono font-bold shadow-[0_0_20px_rgba(178,0,255,0.4)] transition-all border border-purple-400 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              GENERATE REPORT SUMMARY
            </button>
          )}

          {aiLoading && (
            <div className="mt-6 flex justify-center items-center gap-2 font-mono text-hacker-cyan text-sm animate-pulse">
              <Zap className="h-4 w-4" /> Generating report…
            </div>
          )}

          {aiReport && (
            <div className="mt-6 p-6 bg-hacker-800 border border-purple-500/40 rounded-sm font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
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
  <section id="features" className="border-t border-hacker-green/20 py-24 bg-hacker-900">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" variants={fade}>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase">
          What the scanner checks
        </h2>
        <p className="mt-3 text-gray-400 font-mono text-sm max-w-xl">
          A fast, honest, surface-level look at two things that quietly break most sites.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            [Lock, "SSL Inspection", "Live certificate, issuer and expiry check.", "text-hacker-green", "border-hacker-green/40"],
            [Globe, "Header Analysis", "Checks six key HTTP security headers.", "text-hacker-cyan", "border-hacker-cyan/40"],
            [FileText, "Plain-English Report", "Clear, readable remediation guidance.", "text-purple-400", "border-purple-400/40"],
          ].map(([Icon, title, desc, colorClass, borderClass], i) => (
            <div
              key={i}
              className={`p-6 bg-hacker-800/50 border-t-2 ${borderClass} rounded-sm shadow-md transition-transform hover:-translate-y-1`}
            >
              <Icon className={`h-8 w-8 ${colorClass}`} />
              <h3 className="mt-4 text-white font-display font-bold uppercase">{title}</h3>
              <p className="text-gray-400 font-mono text-xs mt-3 leading-relaxed">{desc}</p>
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
  <section id="contact" className="border-t border-hacker-green/20 py-24 bg-hacker-900 bg-hacker-grid">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" variants={fade}>
        <h2 className="text-3xl font-display font-bold text-white uppercase">About & Contact</h2>
        <p className="text-gray-400 mt-4 max-w-md font-mono text-sm leading-relaxed border-l border-hacker-green pl-4">
          Overr1de Labs is a personal project exploring lightweight website security tooling.
        </p>

        <div className="flex flex-wrap gap-6 text-gray-300 mt-8 font-mono text-sm">
          {/* TODO: replace with a real address you control before publishing */}
          <a href="mailto:you@yourdomain.com" className="hover:text-hacker-cyan flex items-center gap-2 transition-colors">
            <Mail className="h-5 w-5 text-hacker-cyan" /> Email
          </a>

          <a
            href="https://www.linkedin.com/in/divy-brahmbhatt-287893348/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#0077b5] flex items-center gap-2 transition-colors"
          >
            <Linkedin className="h-5 w-5 text-[#0077b5]" /> LinkedIn
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
  <footer className="border-t border-hacker-green/20 py-8 bg-[#050b14]">
    <div className="max-w-7xl mx-auto px-6 font-mono text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-center md:text-left">© {new Date().getFullYear()} Overr1de Labs.</div>

      <div className="flex flex-wrap items-center gap-6">
        <a
          href="https://github.com/divy1502"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-hacker-green flex items-center gap-1.5 transition-colors"
        >
          <Github className="h-4 w-4" /> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/divy-brahmbhatt-287893348/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-hacker-green flex items-center gap-1.5 transition-colors"
        >
          <Linkedin className="h-4 w-4" /> LinkedIn
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
    <main className="min-h-screen bg-hacker-900 text-gray-100 selection:bg-hacker-green/30 selection:text-hacker-green">
      <Header />
      <Hero />
      <Tool />
      <Features />
      <Contact />
      <Blog withId />
      <Footer />
    </main>
  );
}
