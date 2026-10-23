import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Blog({ limit, withId = false }) {
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
    {
      id: "ports",
      title: "Exposed Open Ports",
      blurb: "Silent entry points attackers scan first.",
    },
    {
      id: "headers",
      title: "Missing Security Headers",
      blurb: "Small headers, big consequences.",
    },
    {
      id: "monitoring",
      title: "No Security Monitoring",
      blurb: "Breaches go unnoticed for months.",
    },
  ];

  const visiblePosts = limit ? posts.slice(0, limit) : posts;

  return (
    <section
      id={withId ? "blog" : undefined}
      className="border-t border-white/10 pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="show" variants={fade}>
          <h2 className="text-3xl font-semibold text-white">
            Cybersecurity insight
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 mt-8">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl transition hover:border-cyan-300/40"
              >
                <h3 className="text-white font-semibold">{post.title}</h3>
                <p className="text-gray-300 text-sm mt-2">{post.blurb}</p>

                <button
                  onClick={() => setActivePost(post.id)}
                  className="mt-4 text-cyan-300 inline-flex items-center hover:text-cyan-200 transition"
                >
                  Read more <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </article>
            ))}
          </div>

          {limit && (
            <div className="mt-10 text-center">
              <a
                href="/blogs"
                className="inline-flex items-center text-cyan-300 hover:text-cyan-200 text-sm transition"
              >
                More blogs <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          )}

          {activePost && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 p-6 bg-white/5 border border-white/10 rounded-2xl text-gray-200 max-w-4xl"
            >
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
                  <p className="mt-3 text-gray-300">
                    Most phishing attacks don’t break your systems — they
                    quietly impersonate your identity and wait for victims to
                    trust them.
                  </p>
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
                  <p className="mt-3 text-gray-300">
                    An expired SSL doesn’t fail silently — it publicly tells
                    every visitor that your site can’t be trusted.
                  </p>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-300 text-sm">
                    <li>Browser full-screen security warnings.</li>
                    <li>APIs stop working.</li>
                    <li>SEO ranking drops.</li>
                    <li>User trust collapses.</li>
                  </ul>
                </>
              )}

              {activePost === "ports" && (
                <>
                  <h3 className="text-2xl font-semibold text-white">
                    Exposed Open Ports Most Owners Never Check
                  </h3>
                  <p className="mt-3 text-gray-300">
                    Attackers don’t guess where to enter — they scan for doors
                    you forgot were open.
                  </p>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-300 text-sm">
                    <li>Unused ports left accessible.</li>
                    <li>Admin services exposed publicly.</li>
                    <li>Legacy services still listening.</li>
                    <li>Cloud security groups misconfigured.</li>
                    <li>No visibility into port changes.</li>
                  </ul>
                </>
              )}

              {activePost === "headers" && (
                <>
                  <h3 className="text-2xl font-semibold text-white">
                    Why Missing Security Headers Still Matter in 2025
                  </h3>
                  <p className="mt-3 text-gray-300">
                    Headers don’t stop attacks alone — but missing them makes
                    exploitation easier and quieter.
                  </p>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-300 text-sm">
                    <li>No protection against clickjacking.</li>
                    <li>Browser security features disabled by default.</li>
                    <li>Increased risk of script injection.</li>
                    <li>Inconsistent behavior across browsers.</li>
                    <li>Easy signals for automated scanners.</li>
                  </ul>
                </>
              )}

              {activePost === "monitoring" && (
                <>
                  <h3 className="text-2xl font-semibold text-white">
                    When Monitoring Is Missing, Breaches Go Unnoticed
                  </h3>
                  <p className="mt-3 text-gray-300">
                    Most damage happens after compromise — when no one is
                    watching.
                  </p>
                  <ul className="mt-4 list-disc list-inside space-y-2 text-gray-300 text-sm">
                    <li>No alerts for unusual traffic.</li>
                    <li>Logs never reviewed.</li>
                    <li>Delayed breach discovery.</li>
                    <li>Attackers maintain persistence.</li>
                    <li>Issues found only after user reports.</li>
                  </ul>
                </>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
