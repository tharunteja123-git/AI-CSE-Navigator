// ─────────────────────────────────────────────────────────────────
// components/ui/saas-dashboard.jsx
// 21st.dev SaaS Dashboard — adapted for AI CSE Navigator
// Dark glass morphism design with animated stats, progress, tips
// ─────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight, FiZap, FiTrendingUp, FiCode,
  FiTarget, FiAward, FiClock, FiBell, FiChevronRight,
  FiRefreshCw, FiStar, FiBookOpen, FiActivity,
} from "react-icons/fi";
import {
  cn, DASHBOARD_STYLES, QUICK_ACTIONS, STAT_COLORS,
  getRingPath, TOPIC_DISPLAY, getTodayTip, getGreeting,
  scoreColor, scoreLabel,
} from "../../lib/dashboard-utils";

// ─── Micro Components ─────────────────────────────────────────────

function GlowDot({ color = "bg-emerald-400" }) {
  return (
    <span className={cn("inline-block w-1.5 h-1.5 rounded-full dash-pulse", color)} />
  );
}

function Badge({ children, color = "indigo" }) {
  const map = {
    indigo: "bg-indigo-500/15 border-indigo-500/25 text-indigo-300",
    emerald: "bg-emerald-500/15 border-emerald-500/25 text-emerald-300",
    amber: "bg-amber-500/15 border-amber-500/25 text-amber-300",
    red: "bg-red-500/15 border-red-500/25 text-red-300",
    hot: "bg-red-500/15 border-red-500/30 text-red-300",
    new: "bg-indigo-500/15 border-indigo-500/30 text-indigo-300",
  };
  return (
    <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wider", map[color] || map.indigo)}>
      {children}
    </span>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, colorIdx = 0, delay = 0 }) {
  const c = STAT_COLORS[colorIdx];
  return (
    <div className={cn("dash-card dash-fade-up p-5 border", c.bg, c.border)} style={{ animationDelay: `${delay}s` }}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", c.icon)}>
          <Icon className={cn("text-base", c.text)} />
        </div>
        <GlowDot color={c.text.replace("text-", "bg-")} />
      </div>
      <p className="text-[11px] text-white/30 uppercase tracking-widest mb-1">{label}</p>
      <p className={cn("text-2xl font-extrabold", c.text)}>{value}</p>
      {sub && <p className="text-xs text-white/30 mt-0.5">{sub}</p>}
    </div>
  );
}

// ─── Quick Action Card (from 21st.dev SaaS template style) ────────
function QuickActionCard({ to, emoji, label, desc, color, border, badge, delay = 0 }) {
  return (
    <Link to={to} className={cn(
      "dash-card dash-fade-up group relative p-4 border flex flex-col gap-2 cursor-pointer",
      border
    )} style={{ animationDelay: `${delay}s` }}>
      {/* gradient overlay */}
      <div className={cn("absolute inset-0 rounded-[18px] bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300", color)} />
      {badge && (
        <span className="absolute top-2.5 right-2.5">
          <Badge color={badge === "HOT" ? "hot" : "new"}>{badge}</Badge>
        </span>
      )}
      <span className="text-2xl relative z-10">{emoji}</span>
      <div className="relative z-10">
        <p className="font-bold text-white text-sm group-hover:text-white transition-colors">{label}</p>
        <p className="text-[11px] text-white/30 mt-0.5 group-hover:text-white/50 transition-colors leading-4">{desc}</p>
      </div>
      <FiChevronRight className="absolute bottom-3 right-3 text-white/10 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all text-xs" />
    </Link>
  );
}

// ─── SVG Progress Ring ────────────────────────────────────────────
function ProgressRing({ pct, size = 72, stroke = 5, color = "#6366f1" }) {
  const r = (size - stroke * 2) / 2;
  const { circ, dash } = getRingPath(pct, r);
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={circ - dash}
        strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
    </svg>
  );
}

// ─── DSA Topic Row ─────────────────────────────────────────────────
function TopicRow({ topic, solved, total }) {
  const info = TOPIC_DISPLAY[topic] || { name: topic, emoji: "📌", color: "#6366f1" };
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="text-base w-6 text-center flex-shrink-0">{info.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-white/70 truncate">{info.name}</p>
          <span className="text-[10px] text-white/30 ml-2 flex-shrink-0">{solved}/{total}</span>
        </div>
        <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: info.color }} />
        </div>
      </div>
      <span className="text-[10px] font-bold flex-shrink-0" style={{ color: info.color }}>{pct}%</span>
    </div>
  );
}

// ─── Announcement Banner (from 21st.dev hero) ──────────────────────
function AnnouncementBanner({ text, linkText, to }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/15 transition-all text-xs text-white/50 hover:text-white/70 group">
      <GlowDot color="bg-indigo-400" />
      <span>{text}</span>
      <FiArrowRight className="text-[10px] group-hover:translate-x-0.5 transition-transform" />
      <span className="font-semibold text-indigo-400">{linkText}</span>
    </Link>
  );
}

// ─── Career Score Widget ──────────────────────────────────────────
function CareerScoreWidget({ assessment }) {
  if (!assessment) return null;
  const score = assessment.career_score || assessment.score || 0;
  const role = assessment.suggested_role || assessment.career_path || "Software Engineer";

  return (
    <div className="dash-card border border-indigo-500/15 bg-indigo-500/5 p-5 dash-fade-up dash-fade-up-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] text-white/30 uppercase tracking-widest mb-0.5">Career Score</p>
          <p className="font-bold text-white text-sm">{role}</p>
        </div>
        <div className="relative">
          <ProgressRing pct={score} size={72} color="#6366f1" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-extrabold text-indigo-400">{score}</span>
          </div>
        </div>
      </div>
      <div className={cn("text-xs font-bold mb-3", scoreColor(score))}>
        {scoreLabel(score)}
      </div>
      <div className="space-y-2">
        {assessment.top_skills?.slice(0, 3).map((skill, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0" />
            <p className="text-xs text-white/50">{skill}</p>
          </div>
        ))}
      </div>
      <Link to="/career-path" className="mt-4 flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
        View full analysis <FiArrowRight className="text-[10px]" />
      </Link>
    </div>
  );
}

// ─── Daily Tip Widget ─────────────────────────────────────────────
function DailyTipWidget() {
  const tip = getTodayTip();
  return (
    <div className="dash-card border border-amber-500/15 bg-amber-500/5 p-4 dash-fade-up dash-fade-up-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-amber-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-base">💡</span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">Today's Tip</p>
          <p className="text-xs text-white/55 leading-5">{tip}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Activity Feed Item ───────────────────────────────────────────
function ActivityItem({ emoji, text, time, color = "bg-indigo-500/15" }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
      <div className={cn("w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-sm", color)}>
        {emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/60 leading-4">{text}</p>
        <p className="text-[10px] text-white/20 mt-0.5">{time}</p>
      </div>
    </div>
  );
}

// ─── Roadmap Teaser ───────────────────────────────────────────────
function RoadmapTeaser({ goal = "Software Engineer" }) {
  const steps = [
    { done: true,  label: "DSA Basics"       },
    { done: true,  label: "Data Structures"  },
    { done: false, label: "System Design"    },
    { done: false, label: "Mock Interviews"  },
    { done: false, label: "Apply & Offer"    },
  ];
  const done = steps.filter((s) => s.done).length;
  return (
    <div className="dash-card border border-white/[0.07] p-5 dash-fade-up dash-fade-up-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] text-white/30 uppercase tracking-widest mb-0.5">Your Roadmap</p>
          <p className="font-bold text-white text-sm">{goal}</p>
        </div>
        <Badge color="indigo">{done}/{steps.length} done</Badge>
      </div>
      <div className="relative">
        <div className="absolute left-[11px] top-0 bottom-0 w-px bg-white/[0.06]" />
        <div className="space-y-3">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3 relative">
              <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center z-10 flex-shrink-0 transition-all",
                s.done ? "bg-indigo-600 border-indigo-500" : "bg-[#0a0a0c] border-white/15")}>
                {s.done && <FiCheck className="text-white text-[9px]" />}
              </div>
              <p className={cn("text-xs", s.done ? "text-white/70 line-through" : "text-white/40")}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      <Link to="/roadmap" className="mt-4 flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
        View full roadmap <FiArrowRight className="text-[10px]" />
      </Link>
    </div>
  );
}

// tiny check for roadmap
function FiCheck({ className }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6.5L4.5 9 10 3.5" />
    </svg>
  );
}

// ─── MAIN EXPORTED COMPONENT ──────────────────────────────────────
export default function SaaSDashboard({
  user, assessment, progress = [], totalSolved = 0, totalProblems = 0,
  assessLoading, progressLoading, onRefresh,
}) {
  const [tip] = useState(getTodayTip);
  const greeting = getGreeting();
  const firstName = user?.full_name?.split(" ")[0] || "Student";
  const topTopics = [...progress].sort((a, b) => (b.solved / b.total || 0) - (a.solved / a.total || 0)).slice(0, 5);
  const daysStreak = 7; // TODO: wire to backend

  const statCards = [
    { icon: FiCode,     label: "DSA Solved",     value: totalSolved,                         sub: `of ${totalProblems} total`,  colorIdx: 0 },
    { icon: FiTarget,   label: "Career Score",   value: assessment?.career_score ?? "—",    sub: scoreLabel(assessment?.career_score || 0).split(" ")[0], colorIdx: 1 },
    { icon: FiActivity, label: "Day Streak",     value: `${daysStreak}🔥`,                  sub: "Keep it up!",                colorIdx: 2 },
    { icon: FiAward,    label: "Mock Rounds",    value: assessment?.mock_rounds ?? "0",     sub: "interviews done",            colorIdx: 3 },
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white" style={{ fontFamily: "Inter, sans-serif" }}>
      <style>{DASHBOARD_STYLES}</style>

      {/* ── Background ambience ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-blue-500/4 rounded-full blur-[60px]" />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── HERO HEADER (from 21st.dev SaaS hero pattern) ── */}
        <div className="mb-8 dash-fade-up dash-fade-up-1">
          <AnnouncementBanner
            text="New: AI Mock Interviews with live compiler are live!"
            linkText="Try now →"
            to="/mock-interview"
          />
          <div className="mt-5 flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ letterSpacing: "-0.04em" }}>
                <span className="dash-gradient-text">{greeting}, {firstName} 👋</span>
              </h1>
              <p className="text-white/35 text-sm mt-2 max-w-xl leading-relaxed">
                Your AI-powered career command center. Track DSA, practice interviews, and land your dream role.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={onRefresh}
                className="flex items-center gap-2 h-9 px-4 rounded-xl border border-white/10 bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white transition-all text-xs font-medium">
                <FiRefreshCw className="text-xs" /> Refresh
              </button>
              <Link to="/assessment"
                className="flex items-center gap-2 h-9 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all text-xs font-semibold shadow-lg shadow-indigo-500/20">
                <FiZap className="text-xs" /> Take Assessment
              </Link>
            </div>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {statCards.map((s, i) => (
            <StatCard key={s.label} {...s} delay={0.05 * (i + 1)} />
          ))}
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid lg:grid-cols-3 gap-4 mb-4">

          {/* ── LEFT: Quick Actions (spans 2 cols) ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Quick Actions Grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-bold text-white/25 uppercase tracking-widest">Quick Actions</p>
                <GlowDot color="bg-indigo-400" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {QUICK_ACTIONS.map((a, i) => (
                  <QuickActionCard key={a.to} {...a} delay={0.05 * i} />
                ))}
              </div>
            </div>

            {/* DSA Progress */}
            <div className="dash-card border border-white/[0.07] dash-fade-up dash-fade-up-6">
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-indigo-500/15 rounded-lg flex items-center justify-center">
                    <FiCode className="text-indigo-400 text-xs" />
                  </div>
                  <p className="font-semibold text-white text-sm">DSA Progress</p>
                </div>
                <Link to="/coding-tracker" className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 transition-colors">
                  Full tracker <FiArrowRight className="text-[10px]" />
                </Link>
              </div>
              {progressLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 dash-spin border-2 border-indigo-500/20 border-t-indigo-500 rounded-full" />
                </div>
              ) : topTopics.length > 0 ? (
                <div className="px-5 py-3 divide-y divide-white/[0.03]">
                  {topTopics.map((t) => (
                    <TopicRow key={t.topic} {...t} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-white/25">No progress yet</p>
                  <Link to="/coding-tracker" className="mt-2 inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold">
                    Start tracking <FiArrowRight className="text-[10px]" />
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="dash-card border border-white/[0.07] dash-fade-up dash-fade-up-7">
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/[0.05]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-violet-500/15 rounded-lg flex items-center justify-center">
                    <FiBell className="text-violet-400 text-xs" />
                  </div>
                  <p className="font-semibold text-white text-sm">Recent Activity</p>
                </div>
                <Badge color="indigo">Live</Badge>
              </div>
              <div className="px-5 py-2">
                <ActivityItem emoji="💻" text="Solved Two Pointers — Move Zeroes" time="2 hours ago" color="bg-indigo-500/15" />
                <ActivityItem emoji="🎯" text="Completed Mock Interview Round 3" time="Yesterday" color="bg-violet-500/15" />
                <ActivityItem emoji="📄" text="Resume analyzed — ATS Score 74/100" time="2 days ago" color="bg-emerald-500/15" />
                <ActivityItem emoji="🔍" text="Skill gap analysis for SDE role" time="3 days ago" color="bg-amber-500/15" />
                <ActivityItem emoji="🤖" text="Asked AI Mentor about System Design" time="4 days ago" color="bg-pink-500/15" />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Widgets ── */}
          <div className="space-y-4">

            {/* Career Score */}
            {assessLoading ? (
              <div className="dash-card border border-white/[0.07] flex items-center justify-center py-12">
                <div className="w-7 h-7 dash-spin border-2 border-indigo-500/20 border-t-indigo-500 rounded-full" />
              </div>
            ) : assessment ? (
              <CareerScoreWidget assessment={assessment} />
            ) : (
              <div className="dash-card border border-indigo-500/15 bg-indigo-500/5 p-5 text-center dash-fade-up dash-fade-up-4">
                <div className="w-12 h-12 bg-indigo-500/15 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">🎯</div>
                <p className="font-bold text-white mb-1">No Assessment Yet</p>
                <p className="text-xs text-white/35 mb-4 leading-5">Take your career assessment to get a personalized score and roadmap</p>
                <Link to="/assessment" className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl transition-colors">
                  <FiZap className="text-xs" /> Start Assessment
                </Link>
              </div>
            )}

            {/* Roadmap Teaser */}
            <RoadmapTeaser goal={assessment?.suggested_role || "Software Engineer"} />

            {/* Daily Tip */}
            <DailyTipWidget />

            {/* Study Resources */}
            <div className="dash-card border border-white/[0.07] p-5 dash-fade-up dash-fade-up-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-emerald-500/15 rounded-lg flex items-center justify-center">
                  <FiBookOpen className="text-emerald-400 text-xs" />
                </div>
                <p className="font-semibold text-white text-sm">Resources</p>
              </div>
              <div className="space-y-2">
                {[
                  { to: "/concept-hub", emoji: "🧠", label: "Concept Hub", sub: "CS fundamentals & AI" },
                  { to: "/roadmap",     emoji: "🗺️", label: "Your Roadmap", sub: "Weekly study plan" },
                  { to: "/career-path", emoji: "🚀", label: "Career Paths", sub: "Explore roles & salaries" },
                ].map((r) => (
                  <Link key={r.to} to={r.to}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group">
                    <span className="text-base">{r.emoji}</span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-white/70 group-hover:text-white transition-colors">{r.label}</p>
                      <p className="text-[10px] text-white/25">{r.sub}</p>
                    </div>
                    <FiChevronRight className="text-white/15 group-hover:text-white/40 text-xs transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── BOTTOM BANNER (21st.dev CTA style) ── */}
        <div className="dash-card dash-fade-up border border-indigo-500/15 bg-gradient-to-r from-indigo-500/8 via-violet-500/5 to-transparent p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FiStar className="text-amber-400 text-sm" />
              <p className="font-bold text-white">Complete your profile to unlock personalized recommendations</p>
            </div>
            <p className="text-xs text-white/35">Add your social links, skills, and coding profiles for a better experience</p>
          </div>
          <Link to="/profile"
            className="flex items-center gap-2 h-9 px-5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-white/90 transition-all shadow-lg flex-shrink-0 group">
            Update Profile
            <FiArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}