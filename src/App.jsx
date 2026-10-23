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
          {["Tool", "Features", "Pricing", "Blog", "Contact"].map((t) => (
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
            INITIATE <ArrowRight className="ml-2 h-4 w-4" />
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
            className="md:hidden border-t border-hacker-green/20 bg-[#050b14] absolute top-16 left-0 right-0 shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-5 pb-6">
              {["Tool", "Features", "Pricing", "Blog", "Contact"].map((t) => (
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
  <section className="relative overflow-hidden min-h-[85vh] flex items-center border-b border-hacker-green/10">
    <div className="absolute inset-0 bg-hacker-900">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-hacker-green/20 animate-scanline" />
    </div>

    <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        className="max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-sm border border-hacker-cyan/40 bg-hacker-cyan/10 px-3 py-1.5 text-xs font-mono text-hacker-cyan">
          <Sparkles className="h-4 w-4" /> SYS.UPDATE: AI Vision Engine
        </span>
        <h1 className="mt-6 text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight">
          Scan. Detect. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-hacker-green to-hacker-cyan">Overr1de.</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400 font-mono">
          Enterprise-scale vulnerability scanning. Instant actionable insights. Zero barriers.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 items-center">
          <a
            href="#tool"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("tool")
                ?.scrollIntoView({ behavior: "smooth" });
              onStart?.();
            }}
            className="inline-flex items-center rounded-sm bg-hacker-green text-black px-8 py-4 font-mono font-bold shadow-[0_0_20px_rgba(0,255,102,0.4)] hover:shadow-[0_0_30px_rgba(0,255,102,0.6)] hover:-translate-y-0.5 transition-all"
          >
            COMMENCE HACK <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <span className="text-xs text-gray-500 font-mono">/* NO_SIGNUP_REQUIRED */</span>
        </div>
      </motion.div>

      {/* Dynamic AI Visual Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="hidden lg:block relative h-[420px] w-full rounded-sm border border-hacker-green/30 bg-[#050b14] overflow-hidden shadow-[0_0_40px_rgba(0,255,102,0.1)]"
      >
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,102,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,102,0.2)_1px,transparent_1px)] bg-[size:30px_30px] rounded-sm" />

        {/* Radar/Scan Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-hacker-green/40 rounded-full flex items-center justify-center">
          <div className="absolute top-0 bottom-1/2 left-1/2 right-0 bg-gradient-to-br from-hacker-green/40 to-transparent origin-bottom-left animate-[spin_4s_linear_infinite]" />
          <div className="absolute inset-6 border border-dashed border-hacker-cyan/30 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
          <div className="absolute inset-16 border border-hacker-green/20 rounded-full" />
          <Shield className="w-10 h-10 text-hacker-green opacity-80" />
        </div>

        {/* Floating Data Nodes */}
        <div className="absolute top-8 left-8 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-hacker-green animate-pulse" />
          <span className="text-xs font-mono text-hacker-green">SYS:SECURE</span>
        </div>
        <div className="absolute bottom-10 right-8 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-hacker-cyan animate-pulse delay-100" />
          <span className="text-xs font-mono text-hacker-cyan">NET:ACTIVE</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#050b14] to-transparent pointer-events-none" />

        {/* Simulated Code Scroll */}
        <div className="absolute bottom-4 left-6 right-6 h-[88px] overflow-hidden">
          <motion.div
            animate={{ y: [0, -120] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            className="text-[11px] font-mono text-hacker-green/60 leading-relaxed"
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
      </motion.div>
    </div>
  </section>
);

/* ------------------------------------------
   PROGRESS BAR
------------------------------------------- */
const ProgressBar = ({ value }) => (
  <div className="w-full h-1.5 bg-hacker-800 rounded-none overflow-hidden border border-hacker-green/20">
    <div className="h-full bg-hacker-green shadow-[0_0_8px_rgba(0,255,102,0.6)] transition-all duration-300" style={{ width: `${value}%` }} />
  </div>
);

/* ------------------------------------------
   TOOL (MAIN)
------------------------------------------- */
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
    <section id="tool" className="relative border-t border-hacker-green/20 bg-hacker-900 bg-hacker-grid py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="show" variants={fade} className="bg-hacker-800/80 backdrop-blur-md border border-hacker-green/30 p-8 rounded-sm shadow-[0_0_30px_rgba(0,255,102,0.05)]">
          {/* --- Title --- */}
          <h2 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            <Terminal className="h-7 w-7 text-hacker-green" />
            TARGET ACQUISITION
          </h2>

          <p className="mt-3 text-gray-400 font-mono text-sm">
            INPUT TARGET DOMAIN FOR SURFACE-LEVEL SSL + HEADER SCAN
          </p>

          {/* --- URL Input --- */}
          <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto]">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://target-domain.com"
              className={cn(
                "w-full rounded-sm bg-[#050b14] px-5 py-4 text-white font-mono focus:outline-none transition-all border",
                valid
                  ? "border-hacker-green/40 focus:border-hacker-green focus:shadow-[0_0_10px_rgba(0,255,102,0.2)]"
                  : "border-red-500/40"
              )}
            />
            <button
              onClick={handleStart}
              disabled={!valid || running}
              className={cn(
                "rounded-sm px-8 py-4 font-mono font-bold flex items-center justify-center transition-all",
                running
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                  : "bg-hacker-green text-black hover:bg-[#00e65c] shadow-[0_0_15px_rgba(0,255,102,0.3)]"
              )}
            >
              {running ? "SCANNING…" : "EXECUTE"}
              {!running && <ArrowRight className="ml-2 h-5 w-5" />}
            </button>
          </div>

          {/* --- Progress --- */}
          <div className="mt-8">
            <ProgressBar value={running ? progress : result ? 100 : 0} />
            <div className="mt-3 flex justify-between font-mono text-xs">
              <span className="text-gray-500">
                {running ? "STATUS: PROCESSING" : result ? "STATUS: COMPLETE" : "STATUS: STANDBY"}
              </span>
              <span className="text-hacker-green">{running ? `${progress}%` : result ? "100%" : "0%"}</span>
            </div>
          </div>

          {/* --- Mock vulnerabilities --- */}
          {result && (
            <div className="mt-10 border border-hacker-green/30 bg-[#050b14]/50 p-6 rounded-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-hacker-green" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-hacker-green/20 pb-4 mb-4 gap-4">
                <h3 className="text-white font-display font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-hacker-green" /> DIAGNOSTIC REPORT
                </h3>
                <div className="font-mono text-sm px-3 py-1 bg-hacker-green/10 border border-hacker-green/20 text-hacker-green rounded-sm inline-flex items-center">
                  VULNERABILITY SCORE:
                  <span className="ml-2 font-bold text-lg">{result.score}/100</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {result.issues.map((i, k) => (
                  <div
                    key={k}
                    className="flex justify-between items-center bg-hacker-800 border border-hacker-green/10 px-4 py-3 rounded-sm"
                  >
                    <span className="text-gray-300 font-mono text-sm">{i.label}</span>
                    {i.ok ? (
                      <span className="text-hacker-green font-mono text-xs flex items-center gap-1.5">
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
            <div className="mt-6 border border-hacker-cyan/30 bg-[#050b14]/50 p-6 rounded-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-hacker-cyan" />
              <h3 className="font-display font-bold text-white flex items-center gap-2 mb-4">
                <Lock className="h-5 w-5 text-hacker-cyan" /> SSL CERTIFICATE DATA
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 font-mono text-xs text-gray-400">
                <div className="bg-hacker-800/50 p-3 rounded-sm border border-white/5"><span className="text-gray-500 block mb-1">HOST</span> <span className="text-gray-200">{sslInfo.host}</span></div>
                <div className="bg-hacker-800/50 p-3 rounded-sm border border-white/5"><span className="text-gray-500 block mb-1">ISSUER</span> <span className="text-gray-200">{sslInfo.issuer || "Unknown"}</span></div>
                <div className="bg-hacker-800/50 p-3 rounded-sm border border-white/5">
                  <span className="text-gray-500 block mb-1">VALID FROM</span>
                  <span className="text-gray-200">{sslInfo.validFrom ? new Date(sslInfo.validFrom).toLocaleString() : "?"}</span>
                </div>
                <div className="bg-hacker-800/50 p-3 rounded-sm border border-white/5">
                  <span className="text-gray-500 block mb-1">VALID TO</span>
                  <span className="text-gray-200">{sslInfo.validTo ? new Date(sslInfo.validTo).toLocaleString() : "?"}</span>
                </div>
                <div className="bg-hacker-800/50 p-3 rounded-sm border border-white/5 col-span-full">
                  <span className="text-gray-500 inline-block mr-2">DAYS REMAINING:</span>
                  <span
                    className={cn("font-bold text-sm", sslInfo.isExpired ? "text-red-400" : "text-hacker-green")}
                  >
                    {sslInfo.isExpired ? "EXPIRED" : `${sslInfo.daysLeft ?? "?"} DAYS`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {sslError && (
            <div className="mt-4 font-mono text-sm text-red-400 bg-red-500/10 border border-red-500/40 px-4 py-3 rounded-sm">
              [ERR] SSL_VERIFY_FAILED: {sslError}
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
                    <div
                      className={cn("font-bold", value ? "text-hacker-green" : "text-red-400")}
                    >
                      {value || "MISSING"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {headerError && (
            <div className="mt-4 font-mono text-sm text-red-400 bg-red-500/10 border border-red-500/40 px-4 py-3 rounded-sm">
              [ERR] HEADER_FETCH_FAILED: {headerError}
            </div>
          )}

          {/* --- AI REPORT BTN --- */}
          {sslInfo && headerInfo && (
            <button
              onClick={generateAIReport}
              className="mt-8 w-full py-4 rounded-sm bg-purple-600/90 hover:bg-purple-500 text-white font-mono font-bold font-medium shadow-[0_0_20px_rgba(178,0,255,0.4)] transition-all border border-purple-400"
            >
              COMPILE AI THREAT REPORT
            </button>
          )}

          {aiLoading && (
            <div className="mt-6 flex justify-center items-center gap-2 font-mono text-hacker-cyan text-sm animate-pulse">
              <Zap className="h-4 w-4" /> COMPILING NEURAL NETWORK DATA...
            </div>
          )}

          {aiReport && (
            <div className="mt-6 p-6 bg-hacker-800 border border-purple-500/40 rounded-sm font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
              <span className="text-purple-400 mb-2 block"> OUTPUT GENERATED</span>
              {aiReport}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ------------------------------------------
   REST OF THE SECTIONS (COMPRESSED)
------------------------------------------- */

const Features = () => (
  <section id="features" className="border-t border-hacker-green/20 py-24 bg-hacker-900">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" variants={fade}>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase">
          Why Overr1de?
        </h2>
        <p className="mt-3 text-gray-400 font-mono text-sm max-w-xl">
          SYSTEM ADVANTAGES & ENTERPRISE-GRADE CAPABILITIES
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-12">
          {[
            [Shield, "Real-time Detection", "Find misconfigurations instantly.", "text-hacker-green", "border-hacker-green/40"],
            [Globe, "AI Summaries", "Explained in plain English.", "text-hacker-cyan", "border-hacker-cyan/40"],
            [Server, "Auto-Reports", "Weekly PDF email scans.", "text-purple-400", "border-purple-400/40"],
            [Lock, "Business-Ready", "White-label deliverables.", "text-amber-400", "border-amber-400/40"],
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
    <section id="blog" className="border-t border-hacker-green/20 py-20 bg-[#050b14]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="show" variants={fade}>
          <h2 className="text-3xl font-display font-bold text-white uppercase flex items-center gap-2">
            <FileText className="h-6 w-6 text-hacker-cyan" /> DB_RECORDS
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {posts.map((post) => {
              const isActive = activePost === post.id;
              
              return (
                <article
                  key={post.id}
                  className={cn(
                    "p-6 bg-hacker-800/80 rounded-sm transition-colors cursor-pointer group flex flex-col justify-start relative",
                    isActive 
                      ? "border border-hacker-cyan shadow-[0_0_20px_rgba(0,229,255,0.15)] md:col-span-3" 
                      : "border border-hacker-cyan/20 hover:border-hacker-cyan/60"
                  )}
                  onClick={() => !isActive && setActivePost(post.id)}
                >
                  {/* Glowing active indicator line */}
                  {isActive && <div className="absolute top-0 left-0 w-full h-1 bg-hacker-cyan animate-pulse" />}

                  <h3 className="text-white font-display font-bold uppercase text-lg">{post.title}</h3>
                  {!isActive && <p className="text-gray-400 font-mono text-xs mt-3">{post.blurb}</p>}
                  
                  {!isActive && (
                    <div className="mt-4 text-hacker-cyan inline-flex items-center text-sm font-mono font-bold group-hover:text-hacker-green">
                      DECRYPT FILE <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  )}

                  {/* Expanded Content Block within the Article */}
                  {isActive && (
                    <div 
                      className="mt-6 pt-6 border-t border-hacker-cyan/30 text-gray-300 max-w-4xl font-mono cursor-auto"
                      onClick={(e) => e.stopPropagation()} // Prevent clicking inner content from closing it
                    >
                      {activePost === "mistakes" && (
                        <>
                          <h3 className="text-xl font-display text-white uppercase text-hacker-cyan">
                            &gt; Execute: details.sh
                          </h3>
                          <p className="mt-4 text-sm leading-relaxed">
                            Most small websites don't get hacked by elite attackers — they get hacked by simple misconfigurations. Keep your perimeters tight.
                          </p>
                          <ul className="mt-5 list-disc list-inside space-y-3 text-sm text-hacker-green">
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
                          <h3 className="text-xl font-display text-white uppercase text-hacker-cyan">
                            &gt; Execute: details.sh
                          </h3>
                          <ul className="mt-4 list-disc list-inside space-y-3 text-sm text-hacker-cyan">
                            <li><span className="text-gray-300">Look-alike domains (go0gle.com).</span></li>
                            <li><span className="text-gray-300">Fake SSL to appear legitimate.</span></li>
                            <li><span className="text-gray-300">DNS hijacking signs.</span></li>
                            <li><span className="text-gray-300">Suspicious WHOIS patterns.</span></li>
                          </ul>
                        </>
                      )}

                      {activePost === "ssl" && (
                        <>
                          <h3 className="text-xl font-display text-white uppercase text-hacker-cyan">
                            &gt; Execute: details.sh
                          </h3>
                          <ul className="mt-4 list-disc list-inside space-y-3 text-sm text-purple-400">
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
                          className="text-xs font-bold font-mono text-gray-400 hover:text-white border px-4 py-2 border-gray-600 rounded-sm hover:bg-gray-800 transition-colors"
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
    <div className="p-6 bg-[#050b14] border border-hacker-green/20 rounded-sm">
      <h3 className="text-white font-display font-bold uppercase flex items-center gap-2">
        <Terminal className="w-5 h-5 text-hacker-green" /> Subscribe to Updates
      </h3>

      {!done ? (
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <input
            className="flex-1 px-4 py-3 bg-hacker-800 text-white font-mono text-sm border border-gray-700 outline-none focus:border-hacker-green rounded-sm"
            placeholder="sysadmin@network.local"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="bg-hacker-green text-black font-mono font-bold px-6 py-3 shadow-[0_0_10px_rgba(0,255,102,0.3)] hover:shadow-[0_0_15px_rgba(0,255,102,0.6)] hover:bg-[#00e65c] transition-all rounded-sm uppercase"
          >
            Connect
          </button>
        </div>
      ) : (
        <div className="mt-5 text-hacker-green font-mono flex items-center gap-2 text-sm border-l-2 border-hacker-green pl-3 py-1">
          <CheckCircle2 className="h-4 w-4" /> SECURE CONNECTION ESTABLISHED.
        </div>
      )}
    </div>
  );
};

/* ------------------------------------------
   CONTACT
------------------------------------------- */
/* ------------------------------------------
   CONTACT
------------------------------------------- */
const Contact = () => (
  <section id="contact" className="border-t border-hacker-green/20 py-24 bg-hacker-900 bg-hacker-grid">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" variants={fade}>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-display font-bold text-white uppercase">
              Comms & HQ
            </h2>
            <p className="text-gray-400 mt-4 max-w-md font-mono text-sm leading-relaxed border-l border-hacker-green pl-4">
              Overr1de helps businesses stay protected with instant insights. Transmitting from secure nodes globally.
            </p>

            <div className="flex flex-col gap-4 text-gray-300 mt-8 font-mono">
              {/* Email */}
              <a
                href="mailto:divy15workid@gmail.com"
                className="hover:text-hacker-cyan flex items-center gap-3 transition-colors"
                title="Establish encoded handshake"
              >
                <Mail className="h-5 w-5 text-hacker-cyan" /> <span>DIVY15WORKID@GMAIL.COM</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/divy1502"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-3 transition-colors"
              >
                <Github className="h-5 w-5" /> <span>GITHUB_REPOSITORY</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/divy-brahmbhatt-287893348/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#0077b5] flex items-center gap-3 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-[#0077b5]" /> <span>PROFESSIONAL_NETWORK</span>
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
  <footer className="border-t border-hacker-green/20 py-8 bg-[#050b14]">
    <div className="max-w-7xl mx-auto px-6 font-mono text-xs text-gray-500 flex flex-col md:flex-row items-center justify-between gap-4 border-l border-r border-hacker-green/10">
      {/* Left side */}
      <div className="text-center md:text-left px-4">
        SYS.TIME: {new Date().getFullYear()} // OVERR1DE.LABS [ALL RIGHTS SECURED]
      </div>

      {/* Right side */}
      <div className="flex flex-wrap items-center gap-6 px-4">
        <a className="hover:text-hacker-green cursor-pointer uppercase transition-colors">[PRIVACY_POLICY]</a>
        <a className="hover:text-hacker-green cursor-pointer uppercase transition-colors">[TERMS_OF_ENGAGEMENT]</a>

        {/* <a
          href="https://github.com/divy1502"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors uppercase"
        >
          [GH]
        </a>
        <a
          href="https://www.linkedin.com/in/divy-brahmbhatt-287893348/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white transition-colors uppercase"
        >
          [IN]
        </a> */}
      </div>
    </div>
  </footer>
);

/* ------------------------------------------
   EXPORT APP
------------------------------------------- */
export default function App() {
  return (
    <main className="min-h-screen bg-hacker-900 text-gray-100 selection:bg-hacker-green/30 selection:text-hacker-green">
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
