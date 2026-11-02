import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pricing from "./components/pricing.jsx";
import {
  Shield,
  Lock,
  Globe,
  Server,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Terminal,
  FileText,
  Zap,
  Rocket,
  AlertTriangle,
  Menu,
  X,
} from "lucide-react";

const cn = (...c) => c.filter(Boolean).join(" ");

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ------------------------------------------
   MOCK SCAN (kept same)
------------------------------------------- */
function useMockScan(url) {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!running) return;
    setProgress(0);
    setResult(null);
    let p = 0;

    const id = setInterval(() => {
      p = Math.min(100, p + Math.ceil(Math.random() * 12));
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => {
          const seed = url?.length || 7;
          const issues = [
            { label: "SSL Configuration", ok: seed % 2 === 0 },
            { label: "HTTP Headers", ok: seed % 3 !== 0 },
            { label: "Cookie Flags", ok: seed % 5 === 0 },
            { label: "Server Exposure", ok: seed % 4 !== 0 },
          ];
          const score = Math.max(
            52,
            96 - issues.filter((i) => !i.ok).length * 12 - (seed % 7)
          );
          setResult({ score, issues });
          setRunning(false);
        }, 400);
      }
    }, 240);

    return () => clearInterval(id);
  }, [running, url]);

  return {
    progress,
    running,
    result,
    start: () => setRunning(true),
    reset: () => {
      setProgress(0);
      setResult(null);
      setRunning(false);
    },
  };
}

/* ------------------------------------------
   SHARED UI
------------------------------------------- */
const Logo = () => (
  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-hacker-green/40 bg-hacker-green/10">
    <Shield className="h-4 w-4 text-hacker-signal" />
  </span>
);

const WindowBar = ({ children }) => (
  <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
    <div className="window-dots">
      <span />
      <span />
      <span />
    </div>
    {children}
  </div>
);

const NAV = ["Tool", "Features", "Pricing", "Blog", "Contact"];

/* ------------------------------------------
   HEADER
------------------------------------------- */
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-hacker-900/70 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a className="flex items-center gap-3" href="#">
          <Logo />
          <span className="text-white font-display font-bold tracking-tight">Overr1de Labs</span>
        </a>
        <nav className="hidden md:flex items-center gap-1 text-sm text-gray-400 font-mono">
          {NAV.map((t) => (
            <a
              key={t}
              href={"#" + t.toLowerCase()}
              className="rounded-md px-3 py-2 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              {t}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href="#tool" className="btn-primary px-4 py-2 text-sm">
            INITIATE <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <button
          className="md:hidden text-gray-300 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
            className="md:hidden border-t border-white/[0.06] bg-hacker-900 absolute top-16 left-0 right-0 shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-5 pb-6">
              {NAV.map((t) => (
                <a
                  key={t}
                  href={"#" + t.toLowerCase()}
                  className="text-gray-300 hover:text-hacker-signal font-mono uppercase font-bold text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  &gt; {t}
                </a>
              ))}
              <div className="pt-4 border-t border-white/[0.06]">
                <a
                  href="#tool"
                  className="btn-primary w-full px-4 py-3 justify-between uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  INITIALIZE SYS.SCAN
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
const Hero = ({ onStart }) => (
  <section className="relative overflow-hidden border-b border-white/[0.06]">
    <div className="absolute inset-0 bg-hacker-900">
      <div className="absolute inset-0 bg-grid-fade" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[480px] w-[900px] rounded-full bg-hacker-green/[0.12] blur-[120px]" />

      {/* Scanning beam: glowing trail with a sharp leading edge, sweeping top to bottom */}
      <div className="absolute inset-0 pointer-events-none opacity-0 motion-safe:animate-scan-beam">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-hacker-green/[0.10]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-hacker-signal/80 to-transparent shadow-[0_0_12px_2px_rgba(61,190,107,0.45)]" />
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32 relative z-10 w-full grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">
      <motion.div initial="hidden" animate="show" variants={fade} className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-hacker-green/30 bg-hacker-green/10 px-3 py-1.5 text-xs font-mono text-hacker-signal">
          <Sparkles className="h-3.5 w-3.5" /> SYS.UPDATE: AI Vision Engine
        </span>
        <h1 className="mt-8 text-5xl md:text-7xl font-display font-bold text-white tracking-tighter leading-[1.05]">
          Scan. Detect. <br />
          <span className="text-hacker-signal">Overr1de.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-gray-400 font-mono leading-relaxed max-w-xl">
          Enterprise-scale vulnerability scanning. Instant actionable insights. Zero barriers.
        </p>
        <div className="mt-10 flex flex-wrap gap-5 items-center">
          <a
            href="#tool"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" });
              onStart?.();
            }}
            className="btn-primary px-7 py-4"
          >
            COMMENCE HACK <ArrowRight className="h-5 w-5" />
          </a>
          <span className="text-xs text-gray-500 font-mono">/* NO_SIGNUP_REQUIRED */</span>
        </div>
      </motion.div>

      {/* Dynamic AI Visual Element */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="hidden lg:block card overflow-hidden shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
      >
        <WindowBar>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="flex items-center gap-1.5 text-hacker-signal">
              <span className="w-1.5 h-1.5 rounded-full bg-hacker-signal animate-pulse" />
              SYS:SECURE
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse delay-100" />
              NET:ACTIVE
            </span>
          </div>
        </WindowBar>

        <div className="relative h-[380px]">
          <div className="absolute inset-0 bg-hacker-grid" />

          {/* Radar/Scan Element */}
          <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-white/10 rounded-full flex items-center justify-center">
            <div className="absolute top-0 bottom-1/2 left-1/2 right-0 bg-gradient-to-br from-hacker-green/40 to-transparent origin-bottom-left animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-6 border border-dashed border-white/10 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
            <div className="absolute inset-16 border border-hacker-green/30 rounded-full" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-hacker-green/40 bg-hacker-900">
              <Shield className="w-6 h-6 text-hacker-signal" />
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-hacker-800 to-transparent pointer-events-none" />

          {/* Simulated Code Scroll */}
          <div className="absolute bottom-5 left-6 right-6 h-[88px] overflow-hidden">
            <motion.div
              animate={{ y: [0, -120] }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="text-[11px] font-mono text-gray-400 leading-relaxed"
            >
              <div>[AI] Analyzing payload structure... OK</div>
              <div>[AI] Checking TLS handshake latency.</div>
              <div>[AI] Packet tracing routing hops.</div>
              <div>[AI] Decrypting header fragments.</div>
              <div>[AI] 0x00A1F memory sector clean.</div>
              <div>[AI] Validating SSL certificate chain.</div>
              <div>[AI] Security tokens present.</div>
              <div>[AI] Handshake stable.</div>
              <div>[AI] Penetration test authorized.</div>
              <div>[AI] Deploying countermeasures.</div>
              <div>[AI] Scan complete. Awaiting command.</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------
   PROGRESS BAR
------------------------------------------- */
const ProgressBar = ({ value }) => (
  <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
    <div className="h-full rounded-full bg-hacker-green transition-all duration-300" style={{ width: `${value}%` }} />
  </div>
);

/* ------------------------------------------
   TOOL (MAIN)
------------------------------------------- */
const Tool = () => {
  const [url, setUrl] = useState("");
  const valid = useMemo(() => !!url && url.trim().length > 3, [url]);

  const { progress, running, result, start, reset } = useMockScan(url);

  const [sslInfo, setSslInfo] = useState(null);
  const [sslError, setSslError] = useState(null);
  const [headerInfo, setHeaderInfo] = useState(null);
  const [headerError, setHeaderError] = useState(null);
  const [aiReport, setAiReport] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleStart = () => {
    if (!valid) return;

    reset();
    start();

    setSslInfo(null);
    setSslError(null);
    setHeaderInfo(null);
    setHeaderError(null);
    setAiReport(null);

    // SSL check
    fetch(`/api/ssl-check?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setSslError(data.error);
        else setSslInfo(data);
      })
      .catch(() => setSslError("Request failed"));

    // Headers check
    fetch(`/api/headers-check?url=${encodeURIComponent(url)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setHeaderError(data.error);
        else setHeaderInfo(data);
      })
      .catch(() => setHeaderError("Request failed"));
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
      if (data.error) setAiReport("AI report error: " + data.error);
      else setAiReport(data.report);
    } catch (e) {
      setAiReport("AI report failed.");
    }

    setAiLoading(false);
  };

  return (
    <section id="tool" className="relative bg-hacker-900 py-24 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fade}
          className="card overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
        >
          <WindowBar />

          <div className="p-6 sm:p-10">
            {/* --- Title --- */}
            <h2 className="section-title flex items-center gap-3">
              <Terminal className="h-7 w-7 text-hacker-signal" />
              TARGET ACQUISITION
            </h2>

            <p className="mt-3 text-gray-400 font-mono text-sm">
              INPUT TARGET DOMAIN FOR SURFACE-LEVEL SSL + HEADER SCAN
            </p>

            {/* --- URL Input --- */}
            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                placeholder="https://target-domain.com"
                className={cn(
                  "w-full rounded-lg bg-hacker-900 px-5 py-4 text-white font-mono placeholder:text-gray-600 focus:outline-none transition-all border",
                  !url || valid
                    ? "border-white/10 focus:border-hacker-green focus:ring-4 focus:ring-hacker-green/15"
                    : "border-red-500/50 focus:ring-4 focus:ring-red-500/10"
                )}
              />
              <button
                onClick={handleStart}
                disabled={!valid || running}
                className={cn(
                  "px-8 py-4",
                  running || !valid
                    ? "inline-flex items-center justify-center gap-2 rounded-lg font-mono font-semibold bg-white/[0.04] text-gray-500 cursor-not-allowed border border-white/10"
                    : "btn-primary"
                )}
              >
                {running ? "SCANNING…" : "EXECUTE"}
                {!running && <ArrowRight className="h-5 w-5" />}
              </button>
            </div>

            {/* --- Progress --- */}
            <div className="mt-8">
              <ProgressBar value={running ? progress : result ? 100 : 0} />
              <div className="mt-3 flex justify-between font-mono text-xs">
                <span className="text-gray-500">
                  {running ? "STATUS: PROCESSING" : result ? "STATUS: COMPLETE" : "STATUS: STANDBY"}
                </span>
                <span className="text-hacker-signal">{running ? `${progress}%` : result ? "100%" : "0%"}</span>
              </div>
            </div>

            {/* --- Mock vulnerabilities --- */}
            {result && (
              <div className="mt-10 rounded-xl border border-white/[0.08] bg-hacker-900/60 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.06] pb-4 mb-4 gap-4">
                  <h3 className="text-white font-display font-bold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-hacker-signal" /> DIAGNOSTIC REPORT
                  </h3>
                  <div className="font-mono text-xs px-3 py-1.5 bg-hacker-green/10 border border-hacker-green/30 text-hacker-signal rounded-full inline-flex items-center">
                    VULNERABILITY SCORE:
                    <span className="ml-2 font-bold text-base">{result.score}/100</span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {result.issues.map((i, k) => (
                    <div
                      key={k}
                      className="flex justify-between items-center bg-white/[0.02] border border-white/[0.06] px-4 py-3 rounded-lg"
                    >
                      <span className="text-gray-300 font-mono text-sm">{i.label}</span>
                      {i.ok ? (
                        <span className="text-hacker-signal font-mono text-xs flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4" /> SECURE
                        </span>
                      ) : (
                        <span className="text-red-400 font-mono text-xs flex items-center gap-1.5">
                          <AlertTriangle className="h-4 w-4" /> EXPOSED
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* --- SSL Result --- */}
            {sslInfo && (
              <div className="mt-6 rounded-xl border border-white/[0.08] bg-hacker-900/60 p-6">
                <h3 className="font-display font-bold text-white flex items-center gap-2 mb-4">
                  <Lock className="h-5 w-5 text-hacker-cyan" /> SSL CERTIFICATE DATA
                </h3>

                <div className="grid sm:grid-cols-2 gap-3 font-mono text-xs text-gray-400">
                  <div className="bg-white/[0.02] p-3 rounded-lg border border-white/[0.06]"><span className="text-gray-500 block mb-1">HOST</span> <span className="text-gray-200">{sslInfo.host}</span></div>
                  <div className="bg-white/[0.02] p-3 rounded-lg border border-white/[0.06]"><span className="text-gray-500 block mb-1">ISSUER</span> <span className="text-gray-200">{sslInfo.issuer || "Unknown"}</span></div>
                  <div className="bg-white/[0.02] p-3 rounded-lg border border-white/[0.06]">
                    <span className="text-gray-500 block mb-1">VALID FROM</span>
                    <span className="text-gray-200">{sslInfo.validFrom ? new Date(sslInfo.validFrom).toLocaleString() : "?"}</span>
                  </div>
                  <div className="bg-white/[0.02] p-3 rounded-lg border border-white/[0.06]">
                    <span className="text-gray-500 block mb-1">VALID TO</span>
                    <span className="text-gray-200">{sslInfo.validTo ? new Date(sslInfo.validTo).toLocaleString() : "?"}</span>
                  </div>
                  <div className="bg-white/[0.02] p-3 rounded-lg border border-white/[0.06] col-span-full">
                    <span className="text-gray-500 inline-block mr-2">DAYS REMAINING:</span>
                    <span
                      className={cn("font-bold text-sm", sslInfo.isExpired ? "text-red-400" : "text-hacker-signal")}
                    >
                      {sslInfo.isExpired ? "EXPIRED" : `${sslInfo.daysLeft ?? "?"} DAYS`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {sslError && (
              <div className="mt-4 font-mono text-sm text-red-400 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-lg">
                [ERR] SSL_VERIFY_FAILED: {sslError}
              </div>
            )}

            {/* --- Headers --- */}
            {headerInfo && (
              <div className="mt-6 rounded-xl border border-white/[0.08] bg-hacker-900/60 p-6">
                <h3 className="font-display font-bold text-white flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-hacker-purple" /> HTTP SECURITY HEADERS
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
                      className="bg-white/[0.02] border border-white/[0.06] rounded-lg px-4 py-3 flex flex-col justify-between"
                    >
                      <div className="text-gray-500 mb-2 truncate">{label}</div>
                      <div className={cn("font-bold break-all", value ? "text-hacker-signal" : "text-red-400")}>
                        {value || "MISSING"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {headerError && (
              <div className="mt-4 font-mono text-sm text-red-400 bg-red-500/10 border border-red-500/30 px-4 py-3 rounded-lg">
                [ERR] HEADER_FETCH_FAILED: {headerError}
              </div>
            )}

            {/* --- AI REPORT BTN --- */}
            {sslInfo && headerInfo && (
              <button onClick={generateAIReport} className="btn-primary mt-8 w-full py-4">
                <Sparkles className="h-4 w-4" /> COMPILE AI THREAT REPORT
              </button>
            )}

            {aiLoading && (
              <div className="mt-6 flex justify-center items-center gap-2 font-mono text-hacker-signal text-sm animate-pulse">
                <Zap className="h-4 w-4" /> COMPILING NEURAL NETWORK DATA...
              </div>
            )}

            {aiReport && (
              <div className="mt-6 p-6 bg-hacker-900/60 border border-white/[0.08] rounded-xl font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                <span className="text-hacker-signal mb-2 block"> OUTPUT GENERATED</span>
                {aiReport}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------
   REST OF THE SECTIONS (COMPRESSED)
------------------------------------------- */

const Features = () => (
  <section id="features" className="border-t border-white/[0.06] py-24 bg-hacker-900 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
        <div className="max-w-2xl">
          <h2 className="section-title uppercase">Why Overr1de?</h2>
          <p className="mt-4 text-gray-400 font-mono text-sm">
            SYSTEM ADVANTAGES & ENTERPRISE-GRADE CAPABILITIES
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 mt-14 rounded-xl border border-white/[0.08] overflow-hidden bg-white/[0.06] gap-px">
          {[
            [Shield, "Real-time Detection", "Find misconfigurations instantly."],
            [Globe, "AI Summaries", "Explained in plain English."],
            [Server, "Auto-Reports", "Weekly PDF email scans."],
            [Lock, "Business-Ready", "White-label deliverables."],
          ].map(([Icon, title, desc], i) => (
            <div key={i} className="group p-8 bg-hacker-800 transition-colors hover:bg-hacker-700">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-hacker-green/30 bg-hacker-green/10 transition-colors group-hover:border-hacker-green/60">
                <Icon className="h-5 w-5 text-hacker-signal" />
              </span>
              <h3 className="mt-6 text-white font-display font-bold uppercase">{title}</h3>
              <p className="text-gray-400 font-mono text-sm mt-3 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);


/* ------------------------------------------
   BLOG SECTION
------------------------------------------- */
const Blog = () => {
  const [activePost, setActivePost] = useState(null);

  const posts = [
    {
      id: "mistakes",
      title: "Top 5 Security Mistakes",
      blurb: "Common misconfigurations and quick fixes.",
    },
    {
      id: "phishing",
      title: "Detect Domain Phishing",
      blurb: "Catch look-alike domains early.",
    },
    {
      id: "ssl",
      title: "When SSL Certificates Expire",
      blurb: "What breaks & how to prevent it.",
    },
  ];

  return (
    <section id="blog" className="border-t border-white/[0.06] py-24 bg-hacker-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
          <h2 className="section-title uppercase flex items-center gap-3">
            <FileText className="h-7 w-7 text-hacker-signal" /> DB_RECORDS
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {posts.map((post) => {
              const isActive = activePost === post.id;

              return (
                <article
                  key={post.id}
                  className={cn(
                    "card p-7 transition-all cursor-pointer group flex flex-col justify-start relative",
                    isActive
                      ? "border-hacker-green/50 md:col-span-3 cursor-auto"
                      : "hover:border-hacker-green/40 hover:-translate-y-0.5"
                  )}
                  onClick={() => !isActive && setActivePost(post.id)}
                >
                  <h3 className="text-white font-display font-bold uppercase text-lg">{post.title}</h3>
                  {!isActive && <p className="text-gray-400 font-mono text-sm mt-3">{post.blurb}</p>}

                  {!isActive && (
                    <div className="mt-6 pt-5 border-t border-white/[0.06] text-hacker-signal inline-flex items-center text-sm font-mono font-bold">
                      DECRYPT FILE <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  )}

                  {/* Expanded Content Block within the Article */}
                  {isActive && (
                    <div
                      className="mt-6 pt-6 border-t border-white/[0.08] text-gray-300 max-w-4xl font-mono"
                      onClick={(e) => e.stopPropagation()} // Prevent clicking inner content from closing it
                    >
                      {activePost === "mistakes" && (
                        <>
                          <h3 className="text-base font-display uppercase text-hacker-signal">
                            &gt; Execute: details.sh
                          </h3>
                          <p className="mt-4 text-sm leading-relaxed">
                            Most small websites don't get hacked by elite attackers — they get hacked by simple misconfigurations. Keep your perimeters tight.
                          </p>
                          <ul className="mt-5 list-disc list-inside space-y-3 text-sm text-hacker-signal">
                            <li><span className="text-gray-300">Missing headers (HSTS, CSP, X-Frame-Options).</span></li>
                            <li><span className="text-gray-300">Weak or expired SSL certificates.</span></li>
                            <li><span className="text-gray-300">Server version leaking.</span></li>
                            <li><span className="text-gray-300">No regular scanning interval set.</span></li>
                            <li><span className="text-gray-300">Cookies missing Secure / HttpOnly flags.</span></li>
                          </ul>
                        </>
                      )}

                      {activePost === "phishing" && (
                        <>
                          <h3 className="text-base font-display uppercase text-hacker-signal">
                            &gt; Execute: details.sh
                          </h3>
                          <ul className="mt-4 list-disc list-inside space-y-3 text-sm text-hacker-signal">
                            <li><span className="text-gray-300">Look-alike domains (go0gle.com).</span></li>
                            <li><span className="text-gray-300">Fake SSL to appear legitimate.</span></li>
                            <li><span className="text-gray-300">DNS hijacking signs.</span></li>
                            <li><span className="text-gray-300">Suspicious WHOIS patterns.</span></li>
                          </ul>
                        </>
                      )}

                      {activePost === "ssl" && (
                        <>
                          <h3 className="text-base font-display uppercase text-hacker-signal">
                            &gt; Execute: details.sh
                          </h3>
                          <ul className="mt-4 list-disc list-inside space-y-3 text-sm text-hacker-signal">
                            <li><span className="text-gray-300">Browser full-screen security warnings appear.</span></li>
                            <li><span className="text-gray-300">Secure APIs stop functioning.</span></li>
                            <li><span className="text-gray-300">SEO rankings plunge rapidly.</span></li>
                            <li><span className="text-gray-300">User trust evaporates immediately.</span></li>
                          </ul>
                        </>
                      )}

                      <div className="mt-8">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePost(null);
                          }}
                          className="btn-secondary px-4 py-2 text-xs"
                        >
                          [ CLOSE_FILE ]
                        </button>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------
   NEWSLETTER FIXED VERSION
------------------------------------------- */
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubscribe = () => {
    console.log("📩 Email:", email);
    setDone(true);
  };

  return (
    <div className="card p-8">
      <h3 className="text-white font-display font-bold uppercase flex items-center gap-2">
        <Terminal className="w-5 h-5 text-hacker-signal" /> Subscribe to Updates
      </h3>

      {!done ? (
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <input
            className="flex-1 px-4 py-3 bg-hacker-900 text-white font-mono text-sm border border-white/10 outline-none focus:border-hacker-green focus:ring-4 focus:ring-hacker-green/15 rounded-lg placeholder:text-gray-600 transition-all"
            placeholder="sysadmin@network.local"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSubscribe} className="btn-primary px-6 py-3 uppercase">
            Connect
          </button>
        </div>
      ) : (
        <div className="mt-6 text-hacker-signal font-mono flex items-center gap-2 text-sm rounded-lg border border-hacker-green/30 bg-hacker-green/10 px-4 py-3">
          <CheckCircle2 className="h-4 w-4" /> SECURE CONNECTION ESTABLISHED.
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------
   CONTACT
------------------------------------------- */
const Contact = () => (
  <section id="contact" className="relative border-t border-white/[0.06] py-24 bg-hacker-900 scroll-mt-16 overflow-hidden">
    <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 h-[400px] w-[800px] rounded-full bg-hacker-green/[0.08] blur-[120px] pointer-events-none" />
    <div className="max-w-7xl mx-auto px-6 relative">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="section-title uppercase">Comms & HQ</h2>
            <p className="text-gray-400 mt-5 max-w-md font-mono text-sm leading-relaxed">
              Overr1de helps businesses stay protected with instant insights. Transmitting from secure nodes globally.
            </p>

            <div className="flex flex-col gap-3 text-gray-300 mt-10 font-mono text-sm max-w-md">
              {/* Email */}
              <a
                href="mailto:divy15workid@gmail.com"
                className="card px-5 py-4 flex items-center gap-3 transition-colors hover:border-hacker-green/40 hover:text-white"
                title="Establish encoded handshake"
              >
                <Mail className="h-5 w-5 text-hacker-signal" /> <span>DIVY15WORKID@GMAIL.COM</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/divy1502"
                target="_blank"
                rel="noreferrer"
                className="card px-5 py-4 flex items-center gap-3 transition-colors hover:border-hacker-green/40 hover:text-white"
              >
                <Github className="h-5 w-5 text-gray-400" /> <span>GITHUB_REPOSITORY</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/divy-brahmbhatt-287893348/"
                target="_blank"
                rel="noreferrer"
                className="card px-5 py-4 flex items-center gap-3 transition-colors hover:border-hacker-green/40 hover:text-white"
              >
                <Linkedin className="h-5 w-5 text-gray-400" /> <span>PROFESSIONAL_NETWORK</span>
              </a>
            </div>
          </div>

          <Newsletter />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------
   FOOTER
------------------------------------------- */
const Footer = () => (
  <footer className="border-t border-white/[0.06] py-10 bg-hacker-900">
    <div className="max-w-7xl mx-auto px-6 font-mono text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Left side */}
      <div className="flex items-center gap-3 text-center md:text-left">
        <Logo />
        <span>SYS.TIME: {new Date().getFullYear()} // OVERR1DE.LABS [ALL RIGHTS SECURED]</span>
      </div>

      {/* Right side */}
      <div className="flex flex-wrap items-center gap-6">
        <a className="hover:text-white cursor-pointer uppercase transition-colors">[PRIVACY_POLICY]</a>
        <a className="hover:text-white cursor-pointer uppercase transition-colors">[TERMS_OF_ENGAGEMENT]</a>
      </div>
    </div>
  </footer>
);

/* ------------------------------------------
   EXPORT APP
------------------------------------------- */
export default function App() {
  return (
    <main className="min-h-screen bg-hacker-900 text-gray-100 selection:bg-hacker-green/40 selection:text-white">
      <Header />
      <Hero />
      <Tool />
      <Features />
      <Pricing />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
