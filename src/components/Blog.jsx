import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const posts = [
  {
    id: "mistakes",
    title: "Top 5 Security Mistakes",
    blurb: "Common misconfigurations and quick fixes.",
    heading: "Top 5 Security Mistakes Most Websites Make",
    intro:
      "Most small websites don’t get hacked by elite attackers — they get hacked by simple misconfigurations.",
    points: [
      "Missing headers (HSTS, CSP, X-Frame-Options).",
      "Weak or expired SSL certificates.",
      "Server version leaking.",
      "No regular scanning.",
      "Cookies missing Secure / HttpOnly.",
    ],
  },
  {
    id: "phishing",
    title: "Detect Domain Phishing",
    blurb: "Catch look-alike domains early.",
    heading: "Detect Domain Phishing Before It Hurts Your Brand",
    intro:
      "Most phishing attacks don’t break your systems — they quietly impersonate your identity and wait for victims to trust them.",
    points: [
      "Look-alike domains (go0gle.com).",
      "Fake SSL to appear legitimate.",
      "DNS hijacking signs.",
      "Suspicious WHOIS patterns.",
    ],
  },
  {
    id: "ssl",
    title: "When SSL Certificates Expire",
    blurb: "What breaks & how to prevent it.",
    heading: "What Happens When Your SSL Expires",
    intro:
      "An expired SSL doesn’t fail silently — it publicly tells every visitor that your site can’t be trusted.",
    points: [
      "Browser full-screen security warnings.",
      "APIs stop working.",
      "SEO ranking drops.",
      "User trust collapses.",
    ],
  },
  {
    id: "ports",
    title: "Exposed Open Ports",
    blurb: "Silent entry points attackers scan first.",
    heading: "Exposed Open Ports Most Owners Never Check",
    intro: "Attackers don’t guess where to enter — they scan for doors you forgot were open.",
    points: [
      "Unused ports left accessible.",
      "Admin services exposed publicly.",
      "Legacy services still listening.",
      "Cloud security groups misconfigured.",
      "No visibility into port changes.",
    ],
  },
  {
    id: "headers",
    title: "Missing Security Headers",
    blurb: "Small headers, big consequences.",
    heading: "Why Missing Security Headers Still Matter",
    intro:
      "Headers don’t stop attacks alone — but missing them makes exploitation easier and quieter.",
    points: [
      "No protection against clickjacking.",
      "Browser security features disabled by default.",
      "Increased risk of script injection.",
      "Inconsistent behavior across browsers.",
      "Easy signals for automated scanners.",
    ],
  },
  {
    id: "monitoring",
    title: "No Security Monitoring",
    blurb: "Breaches go unnoticed for months.",
    heading: "When Monitoring Is Missing, Breaches Go Unnoticed",
    intro: "Most damage happens after compromise — when no one is watching.",
    points: [
      "No alerts for unusual traffic.",
      "Logs never reviewed.",
      "Delayed breach discovery.",
      "Attackers maintain persistence.",
      "Issues found only after user reports.",
    ],
  },
];

export default function Blog({ limit, withId = false }) {
  const [activePost, setActivePost] = useState(null);

  const visiblePosts = limit ? posts.slice(0, limit) : posts;
  const active = posts.find((p) => p.id === activePost);

  return (
    <section
      id={withId ? "blog" : undefined}
      className="border-t border-hacker-green/20 py-20 bg-[#050b14]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="show" variants={fade}>
          <h2 className="text-3xl font-display font-bold text-white uppercase flex items-center gap-2">
            <FileText className="h-6 w-6 text-hacker-cyan" /> Cybersecurity insight
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-10">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className={
                  "p-6 bg-hacker-800/80 rounded-sm transition-colors border " +
                  (activePost === post.id
                    ? "border-hacker-cyan shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                    : "border-hacker-cyan/20 hover:border-hacker-cyan/60")
                }
              >
                <h3 className="text-white font-display font-bold uppercase text-lg">{post.title}</h3>
                <p className="text-gray-400 font-mono text-xs mt-3">{post.blurb}</p>

                <button
                  onClick={() => setActivePost(activePost === post.id ? null : post.id)}
                  className="mt-4 text-hacker-cyan inline-flex items-center text-sm font-mono font-bold hover:text-hacker-green transition-colors"
                >
                  {activePost === post.id ? "Close" : "Read more"} <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </article>
            ))}
          </div>

          {limit && (
            <div className="mt-10 text-center">
              <a
                href="/blogs"
                className="inline-flex items-center text-hacker-cyan hover:text-hacker-green font-mono text-sm transition-colors"
              >
                More blogs <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}

          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 p-6 bg-hacker-800 border border-hacker-cyan/40 rounded-sm text-gray-300 max-w-4xl font-mono relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-hacker-cyan" />
              <h3 className="text-2xl font-display font-bold text-white">{active.heading}</h3>
              <p className="mt-4 text-sm leading-relaxed">{active.intro}</p>
              <ul className="mt-5 list-disc list-inside space-y-2 text-sm marker:text-hacker-green">
                {active.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
