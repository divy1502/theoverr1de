import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Pricing from "./components/Pricing.jsx";
import {
  Shield,
  Lock,
  Globe,
  Server,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star,
  Mail,
  Github,
  Linkedin,
  Terminal,
  FileText,
  Zap,
  Rocket,
  AlertTriangle,
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
const Header = () => (
  <header className="sticky top-0 z-40 backdrop-blur bg-[#0b0c10]/80 border-b border-white/10">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <a className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-cyan-400" />
        <span className="text-white font-semibold">Overr1de Labs</span>
      </a>
      <nav className="hidden md:flex gap-8 text-sm text-gray-300">
        {["Tool", "Features", "Pricing", "Blog", "Contact"].map((t) => (
          <a key={t} href={"#" + t.toLowerCase()} className="hover:text-white">
            {t}
          </a>
        ))}
      </nav>
      <a
        href="#tool"
        className="rounded-xl bg-emerald-400 text-black px-4 py-2 font-semibold"
      >
        Start Free Scan <ArrowRight className="ml-2 h-4 w-4 inline" />
      </a>
    </div>
  </header>
);

/* ------------------------------------------
   HERO
------------------------------------------- */
const Hero = ({ onStart }) => (
  <section className="relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 py-28">
      <motion.div
        initial="hidden"
        animate="show"
        variants={fade}
        className="max-w-2xl"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> New: AI Security
          Report Card
        </span>
        <h1 className="mt-4 text-5xl font-semibold text-white">
          Scan. Detect. <span className="text-cyan-300">Secure</span> — in 60
          seconds.
        </h1>
        <p className="mt-4 text-lg text-gray-300/90">
          Run a free vulnerability scan — instant results. No signup.
        </p>
        <a
          href="#tool"
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById("tool")
              ?.scrollIntoView({ behavior: "smooth" });
            onStart?.();
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
   PROGRESS BAR
------------------------------------------- */
const ProgressBar = ({ value }) => (
  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
    <div className="h-full bg-cyan-400" style={{ width: `${value}%` }} />
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
    <section id="tool" className="relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div initial="hidden" whileInView="show" variants={fade}>
          {/* --- Title --- */}
          <h2 className="text-3xl font-semibold text-white flex items-center gap-2">
            <Terminal className="h-6 w-6 text-cyan-300" />
            Free Website Security Scan
          </h2>

          <p className="mt-2 text-gray-300 max-w-2xl">
            Paste your domain and run a surface-level SSL + Header scan.
          </p>

          {/* --- URL Input --- */}
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourdomain.com"
              className={cn(
                "w-full rounded-xl bg-[#1F2833] px-4 py-3 text-white border",
                valid
                  ? "border-white/10 focus:ring-emerald-400/40"
                  : "border-red-500/40"
              )}
            />
            <button
              onClick={handleStart}
              disabled={!valid || running}
              className={cn(
                "rounded-xl px-5 py-3 font-semibold flex items-center",
                running
                  ? "bg-gray-600/60 text-gray-300 cursor-not-allowed"
                  : "bg-emerald-400 hover:bg-emerald-300 text-black"
              )}
            >
              {running ? "Scanning…" : "Start Free Scan"}
              {!running && <ArrowRight className="ml-2 h-4 w-4" />}
            </button>
          </div>

          {/* --- Progress --- */}
          <div className="mt-6">
            <ProgressBar value={running ? progress : result ? 100 : 0} />
            <div className="mt-2 text-xs text-gray-400">
              {running
                ? `Running scan (${progress}%)`
                : result
                ? "Scan complete."
                : "Idle"}
            </div>
          </div>

          {/* --- Mock vulnerabilities --- */}
          {result && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex justify-between">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-cyan-300" /> Report Preview
                </h3>
                <div className="text-sm text-gray-300">
                  Score:{" "}
                  <span className="text-emerald-400 font-semibold">
                    {result.score}/100
                  </span>
                </div>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {result.issues.map((i, k) => (
                  <div
                    key={k}
                    className="flex justify-between bg-[#0b0c10] border border-white/10 px-4 py-3 rounded-xl"
                  >
                    <span className="text-gray-200">{i.label}</span>
                    {i.ok ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="h-4" /> OK
                      </span>
                    ) : (
                      <span className="text-amber-300 flex items-center gap-1">
                        <Lock className="h-4" /> Needs Fix
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- SSL Result --- */}
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

          {/* --- Headers --- */}
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

          {/* --- AI REPORT BTN --- */}
          {sslInfo && headerInfo && (
            <button
              onClick={generateAIReport}
              className="mt-6 px-5 py-3 rounded-xl bg-purple-500 text-black font-semibold shadow-lg"
            >
              Generate AI Report Card
            </button>
          )}

          {aiLoading && (
            <div className="mt-4 text-cyan-300 text-sm">
              Generating AI report…
            </div>
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
   REST OF THE SECTIONS (COMPRESSED)
------------------------------------------- */

const Features = () => (
  <section id="features" className="border-t border-white/10 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" variants={fade}>
        <h2 className="text-3xl font-semibold text-white">
          Why choose Overr1de?
        </h2>
        <p className="mt-2 text-gray-300 max-w-xl">
          Built for speed, clarity and trust. Enterprise-grade checks.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-8">
          {[
            [
              Shield,
              "Real-time Detection",
              "Find misconfigurations instantly.",
            ],
            [Globe, "AI Summaries", "Explained in plain English."],
            [Server, "Auto-Reports", "Weekly PDF email scans."],
            [Lock, "Business-Ready", "White-label deliverables."],
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

const Testimonials = () => (
  <section className="border-t border-white/10 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" variants={fade}>
        <h2 className="text-3xl font-semibold text-white">What users say</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {[
            [
              "Raj Patel",
              "Small Business Owner",
              "Found vulnerabilities we never knew existed.",
            ],
            [
              "Samir Desai",
              "Agency Founder",
              "AI summary saves hours each week.",
            ],
          ].map(([name, role, text], i) => (
            <div
              key={i}
              className="p-6 bg-white/5 border border-white/10 rounded-2xl"
            >
              <div className="flex text-amber-300 gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-200 mt-3">“{text}”</p>
              <div className="text-sm text-gray-400 mt-3">
                {name} · {role}
              </div>
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
    <section id="blog" className="border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="show" variants={fade}>
          <h2 className="text-3xl font-semibold text-white">
            Cybersecurity insights
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl"
              >
                <h3 className="text-white font-semibold">{post.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{post.blurb}</p>
                <button
                  onClick={() => setActivePost(post.id)}
                  className="mt-4 text-cyan-300 inline-flex items-center hover:text-cyan-200"
                >
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </article>
            ))}
          </div>

          {activePost && (
            <div className="mt-10 p-6 bg-white/5 border border-white/10 rounded-2xl text-gray-200 max-w-4xl">
              {activePost === "mistakes" && (
                <>
                  <h3 className="text-2xl font-semibold text-white">
                    Top 5 Security Mistakes Most Websites Make
                  </h3>
                  <p className="mt-3 text-gray-300">
                    Most small websites don’t get hacked by elite attackers —
                    they get hacked by simple misconfigurations.
                  </p>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-300 text-sm">
                    <li>Missing headers (HSTS, CSP, X-Frame-Options).</li>
                    <li>Weak or expired SSL certificates.</li>
                    <li>Server version leaking.</li>
                    <li>No regular scanning.</li>
                    <li>Cookies missing Secure / HttpOnly.</li>
                  </ul>
                </>
              )}

              {activePost === "phishing" && (
                <>
                  <h3 className="text-2xl font-semibold text-white">
                    Detect Domain Phishing Before It Hurts Your Brand
                  </h3>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-300 text-sm">
                    <li>Look-alike domains (go0gle.com).</li>
                    <li>Fake SSL to appear legitimate.</li>
                    <li>DNS hijacking signs.</li>
                    <li>Suspicious WHOIS patterns.</li>
                  </ul>
                </>
              )}

              {activePost === "ssl" && (
                <>
                  <h3 className="text-2xl font-semibold text-white">
                    What Happens When Your SSL Expires
                  </h3>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-300 text-sm">
                    <li>Browser full-screen security warnings.</li>
                    <li>APIs stop working.</li>
                    <li>SEO ranking drops.</li>
                    <li>User trust collapses.</li>
                  </ul>
                </>
              )}

              <button
                onClick={() => setActivePost(null)}
                className="mt-6 text-sm text-gray-400 hover:text-gray-200"
              >
                Close article
              </button>
            </div>
          )}
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
    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
      <h3 className="text-white font-semibold">Get security tips</h3>

      {!done ? (
        <div className="grid md:grid-cols-[1fr_auto] gap-3 mt-4">
          <input
            className="px-4 py-3 bg-[#1F2833] text-white rounded-xl border border-white/10"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="bg-cyan-400 text-black rounded-xl px-4 py-3"
          >
            Subscribe
          </button>
        </div>
      ) : (
        <div className="mt-4 text-emerald-400 flex items-center gap-2 text-sm">
          <CheckCircle2 className="h-4 w-4" /> You're in!
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
  <section id="contact" className="border-t border-white/10 py-16">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" variants={fade}>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold text-white">
              About & Contact
            </h2>
            <p className="text-gray-300 mt-2 max-w-md">
              Overr1de helps businesses stay protected with instant insights.
            </p>

            <div className="flex gap-4 text-gray-300 mt-6">
              {/* Email */}
              <a
                href="mailto:contact@overr1de.com"
                className="hover:text-white flex items-center gap-2"
              >
                <Mail className="h-4 w-4" /> contact@overr1de.com
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/divy1502"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-2"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/divy-brahmbhatt-287893348/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white flex items-center gap-2"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
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
  <footer className="border-t border-white/10 py-8">
    <div className="max-w-7xl mx-auto px-6 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left side */}
      <div className="text-center md:text-left">
        © {new Date().getFullYear()} Overr1de Labs.
      </div>

      {/* Right side */}
      <div className="flex flex-wrap items-center gap-4">
        <a className="hover:text-white cursor-pointer">Privacy</a>
        <a className="hover:text-white cursor-pointer">Terms</a>

        {/* GitHub */}
        <a
          href="https://github.com/divy1502"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          GitHub
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/divy-brahmbhatt-287893348/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-white"
        >
          LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

/* ------------------------------------------
   EXPORT APP
------------------------------------------- */
export default function App() {
  return (
    <main className="min-h-screen bg-[#0B0C10] text-gray-100">
      <Header />
      <Hero />
      <Tool />
      <Features />
      <Pricing />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
