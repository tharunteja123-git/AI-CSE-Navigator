// ─────────────────────────────────────────────────────────────────
// lib/dashboard-utils.js — data, helpers & variants for Dashboard
// ─────────────────────────────────────────────────────────────────
import { cn } from "./utils";
export { cn };

// ── Framer-motion variants (shared with Profile for visual consistency) ──
export const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ── Quick links ────────────────────────────────────────────────────
export const QUICK_LINKS = [
  { to: "/mock-interview",  emoji: "🎯", label: "Mock Interview",  desc: "Practice with AI", isNew: true },
  { to: "/skill-gap",       emoji: "🔍", label: "Skill Gap",       desc: "Analyze any JD",   isNew: true },
  { to: "/roadmap",         emoji: "🗺️", label: "Roadmap",         desc: "Weekly plan" },
  { to: "/resume-analyzer", emoji: "📄", label: "Resume",          desc: "ATS check" },
  { to: "/interview-ai",    emoji: "🤖", label: "AI Mentor",       desc: "Ask anything" },
  { to: "/jobs",            emoji: "💼", label: "Jobs",            desc: "Find opportunities" },
];

// ── Greeting helper ──────────────────────────────────────────────
export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export function firstName(fullName) {
  return fullName?.split(" ")[0] || "Student";
}

// ── Score color helper (readiness / career score ring) ────────────
export function scoreColor(score = 0) {
  if (score >= 80) return { from: "from-emerald-400", to: "to-emerald-600", text: "text-emerald-400" };
  if (score >= 50) return { from: "from-indigo-400", to: "to-violet-600", text: "text-indigo-400" };
  return { from: "from-orange-400", to: "to-red-500", text: "text-orange-400" };
}

// ── DSA progress helpers ───────────────────────────────────────────
export function calcSolvedPct(totalSolved = 0, totalProblems = 0) {
  if (!totalProblems) return 0;
  return Math.round((totalSolved / totalProblems) * 100);
}

export const DAY_ABBR = (day) => day.slice(0, 3);