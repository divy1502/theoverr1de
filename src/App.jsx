import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");
const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
            { label: "HTTP Security Headers", ok: seed % 3 !== 0 },
            { label: "Cookie Flags (HttpOnly/SameSite)", ok: seed % 5 === 0 },
            { label: "Server Banner Exposure", ok: seed % 4 !== 0 },
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

  const start = () => setRunning(true);
  const reset = () => {
    setProgress(0);
    setResult(null);
    setRunning(false);
  };

  return { progress, running, result, start, reset };
}

const Header = () => (
  <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-[#0b0c10]/70 bg-[#0b0c10]/90 border-b border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="#" className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-cyan-400" />
        <span className="font-semibold tracking-wide text-white">Overr1de Labs</span>
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
        <a href="#tool" className="hover:text-white">Tool</a>
        <a href="#features" className="hover:text-white">Features</a>
        <a href="#pricing" className="hover:text-white">Pricing</a>
        <a href="#blog" className="hover:text-white">Blog</a>
        <a href="#contact" className="hover:text-white">Contact</a>
      </nav>
      <a
        href="#tool"
        className="inline-flex items-center rounded-xl bg-emerald-400/90 hover:bg-emerald-400 text-black font-semibold px-4 py-2 shadow-lg shadow-emerald-500/20"
      >
        Start Free Scan <ArrowRight className="ml-2 h-4 w-4" />
      </a>
    </div>
  </header>
);

const Hero = ({ onStart }) => (
  <section className="relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,174,239,0.15),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(0,255,136,0.10),transparent_35%)]" />
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28">
      <motion.div initial="hidden" animate="show" variants={fade} className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
          New: AI Security Report Card
        </span>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-white">
          Scan. Detect. <span className="text-cyan-300">Secure</span> — in 60 seconds.
        </h1>
        <p className="mt-4 text-lg text-gray-300/90">
          Run a free vulnerability scan and see what hackers see — before they do. No sign up. Instant results.
        </p>
        <div className="mt-8">
          <a
            href="#tool"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById("tool");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
              onStart?.();
            }}
            className="inline-flex items-center rounded-xl bg-emerald-400/90 hover:bg-emerald-400 text-black font-semibold px-6 py-3 text-base shadow-xl shadow-emerald-500/25"
          >
            Start Free Scan <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
        <div className="mt-8 flex items-center gap-6 text-sm text-gray-400">
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> SSL Check</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> Ports</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> Headers</div>
        </div>
      </motion.div>
    </div>
  </section>
);

const ProgressBar = ({ value }) => (
  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
    <div
      className="h-full bg-cyan-400 transition-[width] duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
);

const Tool = () => {
  const [url, setUrl] = useState("");
  const valid = useMemo(() => /^(https?:\\/\\/)?([\\w-]+\\.)+[\\w-]{2,}(\\/.*)?$/i.test(url || ""), [url]);
  const { progress, running, result, start, reset } = useMockScan(url);

  const handleStart = () => {
    if (!valid) return;
    reset();
    start();
  };

  return (
    <section id="tool" className="relative border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade}>
          <h2 className="text-2xl md:text-3xl font-semibold text-white flex items-center gap-2">
            <Terminal className="h-6 w-6 text-cyan-300"/> Free Website Security Scan
          </h2>
          <p className="mt-2 text-gray-300 max-w-2xl">
            Paste your domain and run a quick surface-level check for SSL, headers and basic exposure. This is a demo — full audits unlock in Pro.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://yourdomain.com"
              className={cn(
                "w-full rounded-xl bg-[#1F2833] text-white placeholder:text-gray-500/70 px-4 py-3 border",
                valid ? "border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" : "border-red-500/40"
              )}
            />
            <button
              onClick={handleStart}
              disabled={!valid || running}
              className={cn(
                "inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold",
                running ? "bg-gray-600/60 text-gray-300 cursor-not-allowed" : "bg-emerald-400/90 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/25"
              )}
            >
              {running ? "Scanning…" : "Start Free Scan"} {running ? null : <ArrowRight className="ml-2 h-4 w-4" />}
            </button>
          </div>

          <div className="mt-6">
            <ProgressBar value={running ? progress : result ? 100 : 0} />
            <div className="mt-2 text-xs text-gray-400">
              {running ? `Running fingerprinting & header checks (${progress}%)` : result ? "Scan complete. View results below." : "Idle"}
            </div>
          </div>

          {result && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-cyan-300"/> Report Preview</h3>
                <div className="text-sm text-gray-300">Vulnerability Score: <span className="font-semibold text-emerald-400">{result.score}/100</span></div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {result.issues.map((it, i) => (
                  <div key={i} className="flex items-center justify-between rounded-xl bg-[#0b0c10] border border-white/10 px-4 py-3">
                    <div className="flex items-center gap-3 text-gray-200"><Server className="h-4 w-4 text-cyan-300"/> {it.label}</div>
                    {it.ok ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-sm"><CheckCircle2 className="h-4 w-4"/> OK</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-amber-300 text-sm"><Lock className="h-4 w-4"/> Needs Fix</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-xl bg-cyan-400/90 hover:bg-cyan-400 text-black font-medium px-4 py-2">View full report</button>
                <button className="rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium px-4 py-2">Download PDF</button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => (
  <section id="features" className="relative border-t border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade}>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Why choose Overr1de?</h2>
        <p className="mt-2 text-gray-300 max-w-2xl">Built for speed, clarity and trust. Enterprise-grade checks, human-readable results.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Shield, title: "Real-time Detection", desc: "Find misconfigurations and obvious exposures before attackers do." },
            { icon: Globe, title: "AI Report Summaries", desc: "Plain-English explanations with prioritized fixes and impact." },
            { icon: Server, title: "Weekly Auto-Reports", desc: "Schedule recurring scans and get PDF reports via email." },
            { icon: Lock, title: "Business-Ready", desc: "White-label deliverables for agencies and internal teams." },
          ].map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <f.icon className="h-6 w-6 text-cyan-300"/>
              <h3 className="mt-3 text-white font-semibold">{f.title}</h3>
              <p className="mt-2 text-gray-300 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="relative border-t border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade}>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Simple, transparent pricing</h2>
        <p className="mt-2 text-gray-300 max-w-2xl">Start free. Upgrade when you need automation, PDFs and white‑labeling.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[ 
            { name: "Free", price: "$0", cta: "Start Free", features: ["1 scan/day", "SSL + Header checks", "Email summary"]},
            { name: "Pro", price: "$9/mo", cta: "Upgrade", highlight:true, features: ["5 sites", "PDF reports", "Email alerts", "Scheduler"]},
            { name: "Business", price: "$29/mo", cta: "Subscribe", features: ["Unlimited sites", "White‑label", "Priority support", "Team seats"]},
          ].map((p, i) => (
            <div key={i} className={cn("rounded-2xl border bg-white/5 p-6 flex flex-col", p.highlight ? "border-cyan-400/40 shadow-[0_0_40px_-12px_rgba(0,174,239,0.5)]" : "border-white/10") }>
              <div className="flex items-baseline justify-between">
                <h3 className="text-white font-semibold">{p.name}</h3>
                {p.highlight && <span className="text-xs text-cyan-300">Most Popular</span>}
              </div>
              <div className="mt-2 text-3xl font-bold text-white">{p.price}</div>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400"/> {f}</li>
                ))}
              </ul>
              <button className={cn("mt-6 rounded-xl px-4 py-2 font-medium", p.highlight ? "bg-cyan-400/90 hover:bg-cyan-400 text-black" : "bg-white/10 hover:bg-white/15 text-white")}>{p.cta}</button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="relative border-t border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade}>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">What users say</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            {
              name: "Raj Patel",
              role: "Small Business Owner",
              text:
                "Found vulnerabilities we never knew existed. The report made fixes straightforward for our dev. Totally worth it.",
            },
            {
              name: "Samir Desai",
              role: "Agency Founder",
              text:
                "We use Overr1de to baseline every client site. The AI summary saves us hours writing deliverables.",
            },
          ].map((t, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">

              <div className="flex items-center gap-2 text-amber-300">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-gray-200">“{t.text}”</p>
              <div className="mt-3 text-sm text-gray-400">{t.name} · {t.role}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const Blog = () => (
  <section id="blog" className="relative border-t border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade}>
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Cybersecurity tips & insights</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Top 5 Website Security Mistakes",
              blurb: "The most common misconfigurations we see on small business sites (and quick wins).",
            },
            {
              title: "How to Detect Domain Phishing",
              blurb: "Simple monitoring tactics to catch look‑alike domains before customers do.",
            },
            {
              title: "When SSL Certificates Expire",
              blurb: "What breaks, how browsers react and how to avoid midnight incidents.",
            },
          ].map((p, i) => (
            <article key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-white font-semibold">{p.title}</h3>
              <p className="mt-2 text-gray-300 text-sm">{p.blurb}</p>
              <button className="mt-4 text-cyan-300 hover:text-cyan-200 inline-flex items-center">Read more <ArrowRight className="ml-2 h-4 w-4"/></button>
            </article>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="relative border-t border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fade}>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">About & contact</h2>
            <p className="mt-2 text-gray-300 max-w-xl">
              Overr1de helps businesses protect what matters most — their data. We simplify cybersecurity through automation, education and clear reporting.
            </p>
            <div className="mt-6 flex items-center gap-4 text-gray-300">
              <a className="inline-flex items-center gap-2 hover:text-white" href="#"><Mail className="h-4 w-4"/> contact@overr1de.com</a>
              <a className="inline-flex items-center gap-2 hover:text-white" href="#"><Github className="h-4 w-4"/> GitHub</a>
              <a className="inline-flex items-center gap-2 hover:text-white" href="#"><Linkedin className="h-4 w-4"/> LinkedIn</a>
            </div>
          </div>
          <Newsletter />
        </div>
      </motion.div>
    </div>
  </section>
);

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-white font-semibold">Get security tips (1x/week)</h3>
      <p className="mt-1 text-gray-300 text-sm">Actionable fixes, no spam. Join the list.</p>
      {!done ? (
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl bg-[#1F2833] text-white placeholder:text-gray-500/70 px-4 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          />
          <button
            onClick={() => setDone(true)}
            className="rounded-xl bg-cyan-400/90 hover:bg-cyan-400 text-black font-medium px-4 py-3"
          >
            Subscribe
          </button>
        </div>
      ) : (
        <div className="mt-4 text-emerald-400 text-sm inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4"/>You're in! Watch your inbox.</div>
      )}
    </div>
  );
};

const Footer = () => (
  <footer className="border-t border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-gray-400 flex flex-col md:flex-row items-center justify-between">
      <div>© {new Date().getFullYear()} Overr1de Labs. All rights reserved.</div>
      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-white">Privacy</a>
        <a href="#" className="hover:text-white">Terms</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  const heroStart = () => {};
  return (
    <main className="min-h-screen bg-[#0B0C10] text-gray-100">
      <Header />
      <Hero onStart={heroStart} />
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
