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

const cn = (...c) => c.filter(Boolean).join(" ");

const Feature = ({ title, desc }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="h-4 w-4 text-hacker-signal mt-0.5 shrink-0" />
    <span>
      <span className="font-bold text-white block mb-1">{title}</span>
      <span className="text-gray-500">{desc}</span>
    </span>
  </li>
);

const PlanCard = ({ highlighted, children }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={cn(
      "relative rounded-xl border p-7 flex flex-col transition-colors",
      highlighted
        ? "border-hacker-green/60 bg-gradient-to-b from-hacker-green/[0.12] to-hacker-800 shadow-[0_30px_60px_-30px_rgba(0,138,53,0.6)]"
        : "border-white/[0.08] bg-hacker-800/80 hover:border-white/20"
    )}
  >
    {children}
  </motion.div>
);

const PlanHeader = ({ Icon, name, price, suffix, tagline }) => (
  <>
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
        <Icon className="h-4 w-4 text-hacker-signal" />
      </span>
      <h3 className="text-white font-display font-bold text-lg uppercase">{name}</h3>
    </div>
    <p className="text-4xl font-display font-bold text-white mt-6 tracking-tight">
      {price}
      {suffix}
    </p>
    <p className="text-gray-400 font-mono text-xs mt-2 pb-6 border-b border-white/[0.06]">{tagline}</p>
  </>
);

const ExpandToggle = ({ open, onClick }) => (
  <button
    onClick={onClick}
    className="mt-5 self-start text-[11px] font-mono text-hacker-signal hover:text-white transition-colors"
  >
    {open ? "[-] COLLAPSE_DATA" : "[+] EXPAND_DATA"}
  </button>
);

const ExpandBody = ({ children }) => (
  <div className="mt-4 text-[11px] font-mono text-gray-400 border-l border-hacker-green/30 pl-3 space-y-2">
    {children}
  </div>
);

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showMoreOneTime, setShowMoreOneTime] = useState(false);
  const [showMorePro, setShowMorePro] = useState(false);
  const [showMoreBiz, setShowMoreBiz] = useState(false);

  return (
    <section
      id="pricing"
      className="border-t border-white/[0.06] py-24 relative overflow-hidden bg-hacker-900 scroll-mt-16"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,138,53,0.10),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade}>
          <h2 className="section-title uppercase text-center flex items-center justify-center gap-3">
            <Zap className="w-7 h-7 text-hacker-signal" />
            ACCESS TIERS
          </h2>
          <p className="text-gray-400 font-mono text-center mt-4 text-sm">
            SELECT CLEARANCE LEVEL. NO CONTRACTS. SCALE INFRASTRUCTURE.
          </p>

          {/* Pricing Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-16 items-stretch">
            {/* FREE */}
            <PlanCard>
              <PlanHeader Icon={Shield} name="Guest" price="$0" tagline="Perfect for basic diagnostics." />

              <ul className="mt-6 space-y-3 text-gray-300 font-mono text-xs">
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

              <div className="mt-auto pt-8">
                <button className="btn-secondary w-full py-3 text-sm uppercase">Initialize Free</button>
              </div>
            </PlanCard>

            {/* PRO */}
            <PlanCard>
              <PlanHeader
                Icon={Zap}
                name="Pro"
                price="$9"
                suffix={<span className="text-base text-gray-500 font-normal">/mo</span>}
                tagline="For small teams & indie ops."
              />

              <ul className="mt-6 space-y-4 text-gray-300 font-mono text-xs">
                <Feature title="Scan up to 5 sites" desc="Perfect for multi-client tracking." />
                <Feature title="PDF Reports" desc="Client-ready diagnostics exported instantly." />
                <Feature title="Alert Systems" desc="Instant notification on vulnerability spikes." />
              </ul>

              <ExpandToggle open={showMorePro} onClick={() => setShowMorePro((v) => !v)} />

              {showMorePro && (
                <ExpandBody>
                  <p><span className="text-white">API Engine:</span> SSL, DNS, policy checks.</p>
                  <p><span className="text-white">Dashboard:</span> Centralized logging.</p>
                  <p><span className="text-white">Alerts:</span> Critical path notifications.</p>
                </ExpandBody>
              )}

              <div className="mt-auto pt-8">
                <button className="btn-secondary w-full py-3 text-sm uppercase">Authorize Overr1de</button>
              </div>
            </PlanCard>

            {/* BUSINESS */}
            <PlanCard highlighted>
              <div className="absolute top-6 right-6 rounded-full bg-hacker-green text-white font-mono text-[10px] font-bold px-2.5 py-1">
                BEST_VALUE
              </div>

              <PlanHeader
                Icon={Rocket}
                name="Enterprise"
                price="$15"
                suffix={<span className="text-base text-gray-500 font-normal">/mo</span>}
                tagline="Unlimited power. Built for agencies."
              />

              <ul className="mt-6 space-y-4 text-gray-300 font-mono text-xs">
                <Feature title="Unlimited Sites" desc="Scan every node you manage." />
                <Feature title="White-label Output" desc="Rebrand reports with your insignia." />
                <Feature title="Team Commands" desc="Multi-user access and shared logs." />
              </ul>

              <ExpandToggle open={showMoreBiz} onClick={() => setShowMoreBiz((v) => !v)} />

              {showMoreBiz && (
                <ExpandBody>
                  <p><span className="text-white">Agency Mode:</span> Sub-command nodes.</p>
                  <p><span className="text-white">API Access:</span> Core root access.</p>
                  <p><span className="text-white">Priority:</span> Level 1 support queue.</p>
                </ExpandBody>
              )}

              <div className="mt-auto pt-8">
                <button className="btn-primary w-full py-3 text-sm uppercase">Acquire Node</button>
              </div>
            </PlanCard>

            {/* ONE-TIME */}
            <PlanCard>
              <PlanHeader
                Icon={FileText}
                name="Single Hit"
                price="$15"
                suffix={
                  <span className="text-base text-gray-500 font-normal">
                    <span className="mx-1">-</span>$40
                  </span>
                }
                tagline="Pay once. Extract deep intel."
              />

              <ul className="mt-6 space-y-4 text-gray-300 font-mono text-xs">
                <Feature title="Comprehensive PDF" desc="Deep scan + emailed directly." />
                <Feature title="Patch Blueprint" desc="Priority list to close vulnerabilities." />
                <Feature title="Zero Deployment Risk" desc="Pre-launch security audit check." />
              </ul>

              <ExpandToggle open={showMoreOneTime} onClick={() => setShowMoreOneTime((v) => !v)} />

              {showMoreOneTime && (
                <ExpandBody>
                  <p><span className="text-white">$15</span> – Master PDF report.</p>
                  <p><span className="text-white">$25</span> – Report + Fix Blueprint.</p>
                  <p><span className="text-white">$40</span> – Deep audit review.</p>
                </ExpandBody>
              )}

              <div className="mt-auto pt-8">
                <button
                  onClick={() => setSelectedPlan("one-time")}
                  className="btn-secondary w-full py-3 text-sm uppercase"
                >
                  <Mail className="h-4 w-4" /> Extract Intel
                </button>
              </div>
            </PlanCard>
          </div>
        </motion.div>
      </div>

      {/* Modal - One-Time Plan */}
      {selectedPlan === "one-time" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={() => setSelectedPlan(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md card bg-hacker-800 p-7 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-3 mb-5 border-b border-white/[0.06] pb-5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-hacker-green/40 bg-hacker-green/10">
                <FileText className="h-4 w-4 text-hacker-signal" />
              </span>
              <h3 className="text-lg font-display font-bold text-white uppercase">
                Extraction Protocol
              </h3>
            </div>

            <p className="text-xs font-mono text-gray-400 leading-relaxed">
              Select one-time payload at checkout. System will execute full scan protocol and transmit clean, client-ready PDF directly to your comms panel.
            </p>

            <div className="mt-5 text-xs text-gray-300 font-mono space-y-3 bg-hacker-900 p-4 border border-white/[0.06] rounded-lg">
              <p className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 mt-1 rounded-full bg-hacker-signal shrink-0" />
                <span>Full diagnostic report with risk mapping.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 mt-1 rounded-full bg-hacker-signal shrink-0" />
                <span>Priority node repair list.</span>
              </p>
              <p className="flex items-start gap-3">
                <AlertTriangle className="h-3 w-3 text-amber-400 mt-0.5 shrink-0" />
                <span className="text-amber-400/80">Ideal for client deliverables / pre-launch.</span>
              </p>
            </div>

            <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setSelectedPlan(null)}
                className="btn-secondary w-full sm:w-auto px-6 py-3 text-xs uppercase"
              >
                Abort
              </button>
              <button className="btn-primary w-full sm:w-auto px-6 py-3 text-xs uppercase">
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
