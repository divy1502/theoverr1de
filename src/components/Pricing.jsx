import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Shield,
  Zap,
  Rocket,
  FileText,
  Mail,
  AlertTriangle,
} from "lucide-react";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showMoreOneTime, setShowMoreOneTime] = useState(false);
  const [showMorePro, setShowMorePro] = useState(false);
  const [showMoreBiz, setShowMoreBiz] = useState(false);

  return (
    <section
      id="pricing"
      className="border-t border-white/10 py-20 relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(45,255,196,0.09),transparent_70%)]" />
      <div className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div initial="hidden" whileInView="show" variants={fade}>
          <h2 className="text-3xl md:text-4xl font-semibold text-white text-center">
            Choose Your Security Plan
          </h2>
          <p className="text-gray-300 text-center mt-2 text-sm md:text-base">
            Simple pricing. No contracts. Scale from testing to full protection.
          </p>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            {/* FREE */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
              className="bg-gradient-to-b from-white/5 to-white/0 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_30px_-16px_rgba(0,0,0,0.8)]"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-white font-semibold text-xl">Free</h3>
                </div>

                <p className="text-3xl font-bold text-white mt-3">$0</p>
                <p className="text-gray-400 text-sm mt-1">
                  Perfect for testing.
                </p>

                <ul className="mt-6 space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />1 scan
                    per day
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    SSL + header checks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Basic email summary
                  </li>
                </ul>
              </div>

              <button className="mt-6 w-full py-2 rounded-xl font-medium bg-white/5 hover:bg-white/10 text-white text-sm border border-white/10">
                Start Free
              </button>
            </motion.div>

            {/* PRO (Upgraded with detailed breakdown like One-Time Scan) */}
            <motion.div
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
              className="bg-gradient-to-b from-cyan-500/10 to-cyan-500/0 backdrop-blur-xl border border-cyan-400/50 rounded-2xl p-6 shadow-[0_0_40px_-8px_rgba(34,211,238,0.6)] flex flex-col justify-start"
            >
              <div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cyan-300" />
                  <h3 className="text-white font-semibold text-xl">Pro</h3>
                </div>

                <p className="text-3xl font-bold text-white mt-3">$9/mo</p>
                <p className="text-gray-400 text-sm mt-1">
                  For small teams & indie devs.
                </p>

                <ul className="mt-6 space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>
                      <span className="font-medium text-white">
                        Scan up to 5 sites
                      </span>
                      <span className="block text-xs text-gray-400">
                        Perfect for multiple client or side projects.
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>
                      <span className="font-medium text-white">
                        Generate PDF reports
                      </span>
                      <span className="block text-xs text-gray-400">
                        Clean, professional, client-ready PDF exported
                        instantly.
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>
                      <span className="font-medium text-white">
                        Email alerts on critical issues
                      </span>
                      <span className="block text-xs text-gray-400">
                        Get notified instantly when a new vulnerability appears.
                      </span>
                    </span>
                  </li>
                </ul>

                {/* Expandable More Details Section */}
                <button
                  onClick={() => setShowMorePro((v) => !v)}
                  className="mt-4 text-xs text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
                >
                  {showMorePro ? "Hide details" : "What’s inside Pro?"}
                </button>

                {showMorePro && (
                  <div className="mt-4 text-xs text-gray-400 border-t border-white/10 pt-3 space-y-2">
                    <p>
                      <span className="text-emerald-300 font-medium">
                        • Full Scan Engine:
                      </span>{" "}
                      Complete SSL, DNS, headers, security-policy checks.
                    </p>
                    <p>
                      <span className="text-emerald-300 font-medium">
                        • Multi-Site Dashboard:
                      </span>{" "}
                      Manage up to 5 sites with history logs.
                    </p>
                    <p>
                      <span className="text-emerald-300 font-medium">
                        • Auto PDF Delivery:
                      </span>{" "}
                      Perfect for sending security reports to clients.
                    </p>
                    <p>
                      <span className="text-emerald-300 font-medium">
                        • Vulnerability Alerts:
                      </span>{" "}
                      Automatic emails for high-risk findings.
                    </p>
                    <p>
                      <span className="text-emerald-300 font-medium">
                        • Ideal for:
                      </span>{" "}
                      Freelancers, indie devs, students building their
                      portfolio.
                    </p>
                  </div>
                )}
              </div>

              <button className="mt-6 w-full py-2 rounded-xl font-medium bg-cyan-400 text-black hover:bg-cyan-300 transition text-sm">
                Upgrade
              </button>
            </motion.div>

            {/* BUSINESS (Upgraded with professional detailed tile) */}
            <motion.div
              whileHover={{ y: -4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
              className="relative bg-gradient-to-br from-purple-600/25 via-purple-900/10 to-fuchsia-500/10 border border-purple-400/50 rounded-2xl p-6 shadow-[0_0_55px_-4px_rgba(168,85,247,0.65)] backdrop-blur-xl flex flex-col justify-start"
            >
              <div className="absolute -top-3 right-4 bg-purple-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Save 48%
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-purple-300" />
                  <h3 className="text-white font-semibold text-xl flex items-center gap-2">
                    Business
                    <span className="text-xs bg-purple-400/20 text-purple-200 px-2 py-0.5 rounded-lg">
                      Best Value
                    </span>
                  </h3>
                </div>

                <p className="text-3xl font-bold text-purple-200 mt-3">
                  $15/mo
                </p>
                <p className="text-gray-300 text-sm mt-1">
                  Unlimited power. Built for agencies & studios.
                </p>

                <ul className="mt-6 space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>
                      <span className="font-medium text-white">
                        Unlimited sites
                      </span>
                      <span className="block text-xs text-gray-400">
                        No limits. Scan every client you manage.
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>
                      <span className="font-medium text-white">
                        White-label PDF reports
                      </span>
                      <span className="block text-xs text-gray-400">
                        Add your own brand, logo, colors & send to clients.
                      </span>
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>
                      <span className="font-medium text-white">
                        Team seats & dashboards
                      </span>
                      <span className="block text-xs text-gray-400">
                        Collaborate with your team inside shared workspaces.
                      </span>
                    </span>
                  </li>
                </ul>

                {/* Expandable Advanced Features */}
                <button
                  onClick={() => setShowMoreBiz((v) => !v)}
                  className="mt-4 text-xs text-purple-300 hover:text-purple-200 underline underline-offset-4"
                >
                  {showMoreBiz
                    ? "Hide advanced features"
                    : "Show advanced features"}
                </button>

                {showMoreBiz && (
                  <div className="mt-4 text-xs text-gray-300 border-t border-white/10 pt-3 space-y-2">
                    <p>
                      <span className="text-purple-300 font-medium">
                        • Agency Mode:
                      </span>{" "}
                      Separate dashboards for each client project.
                    </p>
                    <p>
                      <span className="text-purple-300 font-medium">
                        • White-Label Branding:
                      </span>{" "}
                      Your logo, your colors, your identity.
                    </p>
                    <p>
                      <span className="text-purple-300 font-medium">
                        • Priority Support:
                      </span>{" "}
                      Faster help, priority queue.
                    </p>
                    <p>
                      <span className="text-purple-300 font-medium">
                        • API Access:
                      </span>{" "}
                      Automate daily/weekly scans for clients (coming soon).
                    </p>
                    <p>
                      <span className="text-purple-300 font-medium">
                        • Ideal for:
                      </span>{" "}
                      Agencies, consultants, studios, managed service providers.
                    </p>
                  </div>
                )}
              </div>

              <button className="mt-6 w-full py-2 rounded-xl font-medium bg-purple-400 text-black hover:bg-purple-300 transition text-sm">
                Go Business
              </button>
            </motion.div>

            {/* ONE-TIME PAYMENT OPTIONS */}
            <motion.div
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
              className="bg-gradient-to-b from-white/8 to-white/0 backdrop-blur-xl border border-white/12 rounded-2xl p-6 shadow-[0_0_35px_-14px_rgba(0,0,0,0.9)] flex flex-col justify-buisness"
            >
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-emerald-300" />
                  <h3 className="text-white font-semibold text-xl">
                    One-Time Scan
                  </h3>
                </div>

                <p className="text-3xl font-bold text-white mt-3">$15–$40</p>
                <p className="text-gray-400 text-sm mt-1">
                  Pay once. Get a detailed, client-ready report.
                </p>

                <ul className="mt-6 space-y-2 text-gray-300 text-sm">
                  {/* 1. Full PDF Report */}
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>
                      <span className="font-medium text-white">
                        Full PDF Website Security Report
                      </span>
                      <span className="block text-xs text-gray-400">
                        Deep scan + professional PDF emailed to you.
                      </span>
                    </span>
                  </li>

                  {/* 2. Fix Blueprint */}
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>
                      <span className="font-medium text-white">
                        Fix Recommendation Blueprint
                      </span>
                      <span className="block text-xs text-gray-400">
                        Priority list of what to fix first, with clear steps.
                      </span>
                    </span>
                  </li>

                  {/* 3. Pre-Launch Check */}
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5" />
                    <span>
                      <span className="font-medium text-white">
                        Pre-Launch Security Check
                      </span>
                      <span className="block text-xs text-gray-400">
                        One-time audit before your site goes live.
                      </span>
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => setShowMoreOneTime((v) => !v)}
                  className="mt-4 text-xs text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
                >
                  {showMoreOneTime
                    ? "Hide details"
                    : "What’s inside each option?"}
                </button>

                {showMoreOneTime && (
                  <div className="mt-3 text-xs text-gray-400 space-y-1 border-t border-white/10 pt-3">
                    <p>
                      <span className="text-emerald-300 font-medium">
                        • $15
                      </span>{" "}
                      – Single full PDF report.
                    </p>
                    <p>
                      <span className="text-emerald-300 font-medium">
                        • $25
                      </span>{" "}
                      – Report + Fix Blueprint.
                    </p>
                    <p>
                      <span className="text-emerald-300 font-medium">
                        • $40
                      </span>{" "}
                      – Deep audit + pre-launch review.
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedPlan("one-time")}
                className="mt-6 w-full py-2 rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white text-sm border border-white/15 flex items-center justify-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Get Report
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Simple Modal for One-Time Plan */}
      {selectedPlan === "one-time" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="w-full max-w-md bg-[#050712] border border-white/15 rounded-2xl p-6 shadow-[0_0_60px_-12px_rgba(34,211,238,0.7)]"
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-emerald-300" />
              <h3 className="text-lg font-semibold text-white">
                One-Time Security Report
              </h3>
            </div>

            <p className="text-sm text-gray-300">
              Choose one of the one-time options at checkout. We&apos;ll run the
              scan and email you a clean, client-ready PDF with all findings and
              recommendations.
            </p>

            <div className="mt-4 text-xs text-gray-400 space-y-1">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Full PDF report with risk scores and fixes.
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Priority fix list so you know what to handle first.
              </p>
              <p className="flex items-center gap-2">
                <AlertTriangle className="h-3 w-3 text-amber-300" />
                Ideal for audits, client deliverables, and pre-launch checks.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white border border-white/15"
              >
                Close
              </button>
              <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-400 text-black hover:bg-emerald-300 flex items-center gap-2">
                Proceed to Checkout
                <Zap className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
