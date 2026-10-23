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
      className="border-t border-hacker-green/20 py-24 relative overflow-hidden bg-hacker-900"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(0,255,102,0.05),transparent_70%)]" />
      <div className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full bg-hacker-cyan/5 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial="hidden" whileInView="show" variants={fade}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase text-center flex items-center justify-center gap-3">
            <Zap className="w-8 h-8 text-hacker-green" /> 
            ACCESS TIERS
          </h2>
          <p className="text-gray-400 font-mono text-center mt-4 text-sm md:text-base">
            SELECT CLEARANCE LEVEL. NO CONTRACTS. SCALE INFRASTRUCTURE.
          </p>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {/* FREE */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 0 20px rgba(0,255,102,0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-hacker-800/80 backdrop-blur-md border border-white/10 hover:border-hacker-green/50 rounded-sm p-6 flex flex-col justify-between transition-colors relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-gray-400" />
                  <h3 className="text-white font-display font-bold text-xl uppercase">Guest</h3>
                </div>

                <p className="text-4xl font-display font-bold text-white mt-4">$0</p>
                <p className="text-gray-500 font-mono text-xs mt-2 border-b border-white/10 pb-4">
                  Perfect for basic diagnostics.
                </p>

                <ul className="mt-4 space-y-3 text-gray-300 font-mono text-xs">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-gray-500" /> 1 scan per day
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-gray-500" /> SSL + header checks
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-gray-500" /> Basic email summary
                  </li>
                </ul>
              </div>

              <button className="mt-8 w-full py-3 rounded-sm font-mono font-bold bg-white/5 hover:bg-white/10 text-white text-sm border border-white/10 transition-colors uppercase">
                Initialize Free
              </button>
            </motion.div>

            {/* PRO */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 0 30px rgba(0,229,255,0.3)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="min-h-[520px] bg-hacker-800/80 backdrop-blur-md border border-hacker-cyan/30 rounded-sm p-6 flex flex-col justify-start relative shadow-[0_0_20px_rgba(0,229,255,0.1)] group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-hacker-cyan opacity-80 group-hover:shadow-[0_0_15px_rgba(0,229,255,1)] transition-shadow" />
              
              <div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-hacker-cyan" />
                  <h3 className="text-white font-display font-bold text-xl uppercase">Pro</h3>
                </div>

                <p className="text-4xl font-display font-bold text-hacker-cyan mt-4">$9<span className="text-lg text-gray-500">/mo</span></p>
                <p className="text-gray-400 font-mono text-xs mt-2 border-b border-hacker-cyan/20 pb-4">
                  For small teams & indie ops.
                </p>

                <ul className="mt-4 space-y-3 text-gray-300 font-mono text-xs">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-hacker-cyan mt-0.5" />
                    <span>
                      <span className="font-bold text-white block mb-1">Scan up to 5 sites</span>
                      <span className="text-gray-500">Perfect for multi-client tracking.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-hacker-cyan mt-0.5" />
                    <span>
                      <span className="font-bold text-white block mb-1">PDF Reports</span>
                      <span className="text-gray-500">Client-ready diagnostics exported instantly.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-hacker-cyan mt-0.5" />
                    <span>
                      <span className="font-bold text-white block mb-1">Alert Systems</span>
                      <span className="text-gray-500">Instant notification on vulnerability spikes.</span>
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => setShowMorePro((v) => !v)}
                  className="mt-4 text-[10px] font-mono text-hacker-cyan hover:text-white transition-colors"
                >
                  {showMorePro ? "[-] COLLAPSE_DATA" : "[+] EXPAND_DATA"}
                </button>

                {showMorePro && (
                  <div className="mt-4 text-[11px] font-mono text-gray-400 border-l border-hacker-cyan/30 pl-3 space-y-2">
                    <p><span className="text-white">API Engine:</span> SSL, DNS, policy checks.</p>
                    <p><span className="text-white">Dashboard:</span> Centralized logging.</p>
                    <p><span className="text-white">Alerts:</span> Critical path notifications.</p>
                  </div>
                )}
              </div>

              <button className="mt-auto w-full py-3 rounded-sm font-mono font-bold bg-hacker-cyan text-black hover:bg-hacker-cyan/80 transition shadow-[0_0_15px_rgba(0,229,255,0.3)] uppercase">
                Authorize Overr1de
              </button>
            </motion.div>

            {/* BUSINESS */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 0 35px rgba(178,0,255,0.4)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="min-h-[520px] bg-hacker-800/80 backdrop-blur-md border border-purple-500/50 rounded-sm p-6 flex flex-col justify-start relative shadow-[0_0_25px_rgba(178,0,255,0.15)] group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-purple-500 opacity-90 group-hover:shadow-[0_0_20px_rgba(178,0,255,1)] transition-shadow animate-pulse-glow" />
              <div className="absolute top-4 right-4 bg-purple-500 text-black font-mono text-[9px] font-bold px-2 py-1 rounded-sm shadow-[0_0_10px_rgba(178,0,255,0.5)]">
                BEST_VALUE
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-purple-400" />
                  <h3 className="text-white font-display font-bold text-xl uppercase">Enterprise</h3>
                </div>

                <p className="text-4xl font-display font-bold text-purple-400 mt-4">$15<span className="text-lg text-gray-500">/mo</span></p>
                <p className="text-gray-400 font-mono text-xs mt-2 border-b border-purple-500/20 pb-4">
                  Unlimited power. Built for agencies.
                </p>

                <ul className="mt-4 space-y-3 text-gray-300 font-mono text-xs">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5" />
                    <span>
                      <span className="font-bold text-white block mb-1">Unlimited Sites</span>
                      <span className="text-gray-500">Scan every node you manage.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5" />
                    <span>
                      <span className="font-bold text-white block mb-1">White-label Output</span>
                      <span className="text-gray-500">Rebrand reports with your insignia.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5" />
                    <span>
                      <span className="font-bold text-white block mb-1">Team Commands</span>
                      <span className="text-gray-500">Multi-user access and shared logs.</span>
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => setShowMoreBiz((v) => !v)}
                  className="mt-4 text-[10px] font-mono text-purple-400 hover:text-white transition-colors"
                >
                  {showMoreBiz ? "[-] COLLAPSE_DATA" : "[+] EXPAND_DATA"}
                </button>

                {showMoreBiz && (
                  <div className="mt-4 text-[11px] font-mono text-gray-400 border-l border-purple-500/30 pl-3 space-y-2">
                    <p><span className="text-white">Agency Mode:</span> Sub-command nodes.</p>
                    <p><span className="text-white">API Access:</span> Core root access.</p>
                    <p><span className="text-white">Priority:</span> Level 1 support queue.</p>
                  </div>
                )}
              </div>

              <button className="mt-auto w-full py-3 rounded-sm font-mono font-bold bg-purple-500 text-black hover:bg-purple-400 transition shadow-[0_0_15px_rgba(178,0,255,0.4)] uppercase">
                Acquire Node
              </button>
            </motion.div>

            {/* ONE-TIME */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 0 25px rgba(0,255,102,0.3)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-hacker-800/80 backdrop-blur-md border border-hacker-green/40 hover:border-hacker-green/70 rounded-sm p-6 shadow-[0_0_15px_rgba(0,255,102,0.05)] flex flex-col justify-between group overflow-hidden relative transition-colors"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-hacker-green opacity-60 group-hover:shadow-[0_0_15px_rgba(0,255,102,1)] transition-shadow" />
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-hacker-green" />
                  <h3 className="text-white font-display font-bold text-xl uppercase">Single Hit</h3>
                </div>

                <p className="text-4xl font-display font-bold text-hacker-green mt-4">$15<span className="text-base text-gray-400"><span className="mx-1 font-mono">-</span>$40</span></p>
                <p className="text-gray-400 font-mono text-xs mt-2 border-b border-hacker-green/20 pb-4">
                  Pay once. Extract deep intel.
                </p>

                <ul className="mt-4 space-y-3 text-gray-300 font-mono text-xs">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-hacker-green mt-0.5" />
                    <span>
                      <span className="font-bold text-white block mb-1">Comprehensive PDF</span>
                      <span className="text-gray-500">Deep scan + emailed directly.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-hacker-green mt-0.5" />
                    <span>
                      <span className="font-bold text-white block mb-1">Patch Blueprint</span>
                      <span className="text-gray-500">Priority list to close vulnerabilities.</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-hacker-green mt-0.5" />
                    <span>
                      <span className="font-bold text-white block mb-1">Zero Deployment Risk</span>
                      <span className="text-gray-500">Pre-launch security audit check.</span>
                    </span>
                  </li>
                </ul>

                <button
                  onClick={() => setShowMoreOneTime((v) => !v)}
                  className="mt-4 text-[10px] font-mono text-hacker-green hover:text-white transition-colors"
                >
                  {showMoreOneTime ? "[-] COLLAPSE_DATA" : "[+] EXPAND_DATA"}
                </button>

                {showMoreOneTime && (
                  <div className="mt-4 text-[11px] font-mono text-gray-400 space-y-2 border-l border-hacker-green/30 pl-3">
                    <p><span className="text-white">$15</span> – Master PDF report.</p>
                    <p><span className="text-white">$25</span> – Report + Fix Blueprint.</p>
                    <p><span className="text-white">$40</span> – Deep audit review.</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setSelectedPlan("one-time")}
                className="mt-8 w-full py-3 rounded-sm font-mono font-bold bg-[#050b14] hover:bg-hacker-green/10 text-hacker-green text-sm border border-hacker-green/50 flex items-center justify-center gap-2 transition-colors uppercase hover:shadow-[0_0_15px_rgba(0,255,102,0.2)]"
              >
                <Mail className="h-4 w-4" /> Extract Intel
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modal - One-Time Plan */}
      {selectedPlan === "one-time" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050b14]/90 backdrop-blur-md px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-hacker-800 border-2 border-hacker-green rounded-sm p-6 shadow-[0_0_50px_rgba(0,255,102,0.2)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-hacker-green animate-pulse" />
            
            <div className="flex items-center gap-3 mb-4 border-b border-hacker-green/20 pb-4">
              <FileText className="h-6 w-6 text-hacker-green" />
              <h3 className="text-xl font-display font-bold text-white uppercase">
                Extraction Protocol
              </h3>
            </div>

            <p className="text-xs font-mono text-gray-400 leading-relaxed">
              Select one-time payload at checkout. System will execute full scan protocol and transmit clean, client-ready PDF directly to your comms panel.
            </p>

            <div className="mt-5 text-xs text-gray-300 font-mono space-y-3 bg-[#050b14] p-4 border border-hacker-green/10 rounded-sm">
              <p className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 mt-1 rounded-full bg-hacker-green shadow-[0_0_5px_rgba(0,255,102,0.8)]" />
                <span>Full diagnostic report with risk mapping.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 mt-1 rounded-full bg-hacker-cyan shadow-[0_0_5px_rgba(0,229,255,0.8)]" />
                <span>Priority node repair list.</span>
              </p>
              <p className="flex items-start gap-3">
                <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5" />
                <span className="text-amber-400/80">Ideal for client deliverables / pre-launch.</span>
              </p>
            </div>

            <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setSelectedPlan(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-sm font-mono text-xs font-bold text-gray-400 hover:text-white border border-gray-600 hover:bg-gray-800 transition-colors uppercase"
              >
                Abort
              </button>
              <button className="w-full sm:w-auto px-6 py-3 rounded-sm font-mono text-xs font-bold bg-hacker-green text-black hover:bg-[#00e65c] shadow-[0_0_15px_rgba(0,255,102,0.3)] flex items-center justify-center gap-2 transition-all uppercase">
                Proceed to Checkout <Zap className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
