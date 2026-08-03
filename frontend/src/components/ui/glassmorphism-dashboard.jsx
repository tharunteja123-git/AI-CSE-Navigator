// ─────────────────────────────────────────────────────────────────
// components/ui/glassmorphism-dashboard.jsx
// Dark glass SaaS-style dashboard — matches the Profile page's
// visual language (bg-[#050507], glass cards, indigo/violet accent).
// ─────────────────────────────────────────────────────────────────

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiAlertCircle, FiBriefcase, FiCalendar,
  FiTrendingUp, FiTool, FiArrowRight,
} from "react-icons/fi";
import {
  cn, fadeUp, stagger, staggerItem,
  scoreColor, calcSolvedPct, DAY_ABBR,
} from "../../lib/dashboard-utils";

// ── Glass Card (identical token to Profile's GlassCard) ────────────
function GlassCard({ children, className, hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl",
        "hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

function CardHeading({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-2.5 px-5 pt-5 pb-3">
      <div className="w-7 h-7 bg-indigo-500/15 border border-indigo-500/20 rounded-lg flex items-center justify-center">
        <Icon className="text-indigo-400 text-xs" />
      </div>
      <p className="font-semibold text-white text-sm tracking-tight">{title}</p>
    </div>
  );
}

// ── Quick link tile ─────────────────────────────────────────────
function QuickLinkTile({ to, emoji, label, desc, isNew }) {
  return (
    <motion.div variants={staggerItem}>
      <Link to={to} className="block h-full">
        <GlassCard className="h-full p-3.5 text-center">
          {isNew && (
            <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold bg-indigo-600 text-white px-1.5 py-0.5 rounded-full shadow-lg shadow-indigo-600/30 z-10">
              NEW
            </span>
          )}
          <div className="text-2xl mb-1.5">{emoji}</div>
          <div className="font-semibold text-white/85 text-xs">{label}</div>
          <div className="text-white/25 text-[11px] mt-0.5 hidden md:block">{desc}</div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}

// ── Circular score ring ─────────────────────────────────────────
function ScoreRing({ score = 0 }) {
  const clamped = Math.max(0, Math.min(100, score));
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c - (clamped / 100) * c;
  const colors = scoreColor(clamped);

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg viewBox="0 0 130 130" className="w-full h-full -rotate-90">
        <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <motion.circle
          cx="65" cy="65" r={r} fill="none" strokeWidth="10" strokeLinecap="round"
          stroke="url(#scoreGradient)"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className={colors.text} stopColor="currentColor" />
            <stop offset="100%" stopColor="currentColor" className="text-violet-500" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white tracking-tight">{clamped}</span>
        <span className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">Readiness</span>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export default function GlassmorphismDashboard({
  userName,
  quickLinks = [],
  assessLoading,
  assessment,
  progress = [],
  progressLoading,
  totalSolved = 0,
  totalProblems = 0,
}) {
  const solvedPct = calcSolvedPct(totalSolved, totalProblems);

  return (
    <section className="min-h-screen bg-[#050507] py-8 px-4">
      {/* Ambient background — same treatment as Profile */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/6 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-5">

        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
          className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Welcome back, {userName} <span className="inline-block">👋</span>
            </h1>
            <p className="text-white/35 text-sm mt-1">Your AI career dashboard</p>
          </div>
          <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-300 px-4 py-2 rounded-xl text-sm font-medium">
            🔥 {totalSolved} DSA problems solved
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {quickLinks.map((l) => <QuickLinkTile key={l.to} {...l} />)}
        </motion.div>

        {/* Main content */}
        {assessLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-white/30 text-sm">Loading your career assessment...</p>
          </div>
        ) : assessment ? (
          <div className="grid lg:grid-cols-3 gap-4">

            {/* Left column */}
            <div className="space-y-4">
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
                <GlassCard hover={false}>
                  <div className="p-6">
                    <ScoreRing score={assessment.score ?? assessment.readiness_score ?? 0} />
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
                <GlassCard hover={false}>
                  <CardHeading icon={FiAlertCircle} title="Missing Skills" />
                  <div className="px-5 pb-5 flex flex-wrap gap-2">
                    {(assessment.missing_skills || []).length ? (
                      assessment.missing_skills.map((s) => (
                        <span key={s} className="text-xs px-2.5 py-1 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300">
                          {s}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-white/20 italic">No gaps identified</p>
                    )}
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.15}>
                <GlassCard hover={false}>
                  <CardHeading icon={FiBriefcase} title="Target Companies" />
                  <div className="px-5 pb-5 flex flex-wrap gap-2">
                    {(assessment.target_companies || []).length ? (
                      assessment.target_companies.map((c) => (
                        <span key={c} className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-white/60">
                          {c}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-white/20 italic">Not set</p>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 space-y-4">

              {/* Weekly plan */}
              {assessment.weekly_plan && (
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
                  <GlassCard hover={false}>
                    <CardHeading icon={FiCalendar} title="This Week's Plan" />
                    <div className="px-5 pb-5 grid grid-cols-7 gap-1.5">
                      {Object.entries(assessment.weekly_plan).map(([day, topic]) => (
                        <div key={day} className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-2 text-center">
                          <div className="text-[10px] font-bold text-indigo-400 mb-1 uppercase tracking-wide">{DAY_ABBR(day)}</div>
                          <div className="text-[11px] text-white/55 leading-tight">{topic}</div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* DSA progress */}
              {!progressLoading && progress.length > 0 && (
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.15}>
                  <GlassCard hover={false}>
                    <CardHeading icon={FiTrendingUp} title="DSA Progress" />
                    <div className="px-5 pb-5 space-y-3">
                      <div className="flex items-center justify-between text-xs text-white/30 mb-1">
                        <span>Overall</span>
                        <span className="font-semibold text-indigo-400">{solvedPct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
                        <motion.div
                          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${solvedPct}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        />
                      </div>
                      {progress.map((topic, i) => {
                        const label = topic.label || topic.topic || topic.name || `Topic ${i + 1}`;
                        const solved = topic.solved ?? 0;
                        const total = topic.total ?? 0;
                        const pct = total ? Math.round((solved / total) * 100) : 0;
                        return (
                          <div key={label + i}>
                            <div className="flex items-center justify-between text-[11px] text-white/40 mb-1">
                              <span>{label}</span>
                              <span>{solved}/{total}</span>
                            </div>
                            <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500/50 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Recommended projects */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
                <GlassCard hover={false}>
                  <CardHeading icon={FiTool} title="Recommended Projects" />
                  <div className="px-5 pb-5 space-y-2">
                    {(assessment.recommended_projects || []).length ? (
                      assessment.recommended_projects.map((p, i) => (
                        <div key={i} className="flex items-center gap-3 p-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl">
                          <span className="w-6 h-6 bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-sm text-white/65">{p}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-white/20 italic px-1">No recommendations yet</p>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        ) : (
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
            <GlassCard hover={false}>
              <div className="text-center py-16 px-6">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-lg font-bold text-white mb-2">Complete Your Profile</h3>
                <p className="text-white/35 text-sm max-w-md mx-auto mb-6">
                  Setup your profile to get a personalized AI career assessment and roadmap
                </p>
                <Link to="/onboarding"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                  Setup Profile <FiArrowRight />
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </section>
  );
}