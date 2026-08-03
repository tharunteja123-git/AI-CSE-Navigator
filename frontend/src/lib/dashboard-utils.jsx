// ── Animation keyframes (injected via style tag) ──────────────────
export const DASHBOARD_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .dash-fade-up {
    animation: dashFadeUp 0.6s ease-out forwards;
    opacity: 0;
  }
  .dash-fade-up-1 { animation-delay: 0.05s; }
  .dash-fade-up-2 { animation-delay: 0.10s; }
  .dash-fade-up-3 { animation-delay: 0.15s; }
  .dash-fade-up-4 { animation-delay: 0.20s; }
  .dash-fade-up-5 { animation-delay: 0.25s; }
  .dash-fade-up-6 { animation-delay: 0.30s; }
  .dash-fade-up-7 { animation-delay: 0.35s; }
  .dash-fade-up-8 { animation-delay: 0.40s; }

  @keyframes dashFadeUp {
    from { opacity: 0; transform: translateY(14px); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0);    filter: blur(0);   }
  }

  @keyframes dashPulse {
    0%,100% { opacity: 1; }
    50%      { opacity: 0.4; }
  }

  @keyframes dashSpin {
    to { transform: rotate(360deg); }
  }

  @keyframes dashSlideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .dash-pulse  { animation: dashPulse  1.6s ease-in-out infinite; }
  .dash-spin   { animation: dashSpin   0.9s linear infinite; }
  .dash-slide  { animation: dashSlideDown 0.3s ease-out; }

  .dash-card {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(16px);
    transition: border-color 0.25s, background 0.25s, transform 0.2s, box-shadow 0.2s;
    border-radius: 18px;
    position: relative;
    overflow: hidden;
  }
  .dash-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 60%);
    pointer-events: none;
  }
  .dash-card:hover {
    border-color: rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.04);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.4);
  }

  .dash-glow-indigo {
    box-shadow: 0 0 80px rgba(99,102,241,0.12), 0 0 40px rgba(99,102,241,0.06);
  }
  .dash-gradient-text {
    background: linear-gradient(to bottom, #ffffff, rgba(255,255,255,0.6));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .dash-gradient-text-indigo {
    background: linear-gradient(135deg, #818cf8, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

// ── Quick action links ────────────────────────────────────────────
export const QUICK_ACTIONS = [
  { to: "/mock-interview",  emoji: "🎯", label: "Mock Interview",  desc: "Practice with AI compiler",   color: "from-indigo-500/20 to-blue-500/20",    border: "border-indigo-500/20",  badge: "HOT"  },
  { to: "/coding-tracker",  emoji: "💻", label: "DSA Tracker",    desc: "200+ problems ready",          color: "from-violet-500/20 to-purple-500/20",  border: "border-violet-500/20", badge: ""     },
  { to: "/skill-gap",       emoji: "🔍", label: "Skill Gap",      desc: "Analyze any JD instantly",    color: "from-pink-500/20 to-rose-500/20",      border: "border-pink-500/20",   badge: "NEW"  },
  { to: "/concept-hub",     emoji: "🧠", label: "Concept Hub",    desc: "CS fundamentals & AI",         color: "from-cyan-500/20 to-teal-500/20",      border: "border-cyan-500/20",   badge: "NEW"  },
  { to: "/resume-analyzer", emoji: "📄", label: "Resume AI",      desc: "ATS score & feedback",         color: "from-emerald-500/20 to-green-500/20",  border: "border-emerald-500/20", badge: ""    },
  { to: "/interview-ai",    emoji: "🤖", label: "AI Mentor",      desc: "Ask anything, anytime",        color: "from-amber-500/20 to-yellow-500/20",   border: "border-amber-500/20",  badge: ""     },
  { to: "/roadmap",         emoji: "🗺️", label: "Roadmap",        desc: "Your weekly study plan",       color: "from-sky-500/20 to-blue-500/20",       border: "border-sky-500/20",    badge: ""     },
  { to: "/jobs",            emoji: "💼", label: "Jobs",           desc: "Live openings for you",        color: "from-orange-500/20 to-red-500/20",     border: "border-orange-500/20", badge: ""     },
];

// ── Motivational tips ─────────────────────────────────────────────
export const DAILY_TIPS = [
  "Solve 2 LeetCode problems today — consistency beats intensity 💪",
  "Review a system design concept for 15 minutes — small steps lead to FAANG 🏆",
  "Update your GitHub with today's solutions — recruiters notice activity 👀",
  "Practice explaining your approach out loud — interviews are 50% communication 🗣️",
  "Read one tech blog post — staying curious is what separates good from great 🚀",
  "Do a mock interview session today — practice under pressure 🎯",
  "Connect with 2 professionals on LinkedIn — your network is your net worth 🌐",
];

// ── Stat card configs ─────────────────────────────────────────────
export const STAT_COLORS = [
  { bg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-400", icon: "bg-indigo-500/15" },
  { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", icon: "bg-violet-500/15" },
  { bg: "bg-emerald-500/10",border: "border-emerald-500/20",text: "text-emerald-400",icon: "bg-emerald-500/15"},
  { bg: "bg-amber-500/10",  border: "border-amber-500/20",  text: "text-amber-400",  icon: "bg-amber-500/15"  },
];

// ── Progress ring helper ──────────────────────────────────────────
export function getRingPath(pct, r = 30) {
  const circ = 2 * Math.PI * r;
  return { circ, dash: (pct / 100) * circ };
}

// ── DSA topic display names ───────────────────────────────────────
export const TOPIC_DISPLAY = {
  arrays:          { name: "Arrays",        emoji: "📊", color: "#6366f1" },
  strings:         { name: "Strings",       emoji: "🔤", color: "#8b5cf6" },
  linked_list:     { name: "Linked List",   emoji: "🔗", color: "#06b6d4" },
  trees:           { name: "Trees",         emoji: "🌳", color: "#10b981" },
  graphs:          { name: "Graphs",        emoji: "🕸️", color: "#f59e0b" },
  dp:              { name: "Dynamic Prog",  emoji: "⚡", color: "#ef4444" },
  sorting:         { name: "Sorting",       emoji: "🔢", color: "#ec4899" },
  binary_search:   { name: "Binary Search", emoji: "🔍", color: "#3b82f6" },
  two_pointers:    { name: "Two Pointers",  emoji: "👆", color: "#0ea5e9" },
  hashing:         { name: "Hashing",       emoji: "#️⃣", color: "#14b8a6" },
};

// ── Random tip for today ──────────────────────────────────────────
export function getTodayTip() {
  const day = new Date().getDay();
  return DAILY_TIPS[day % DAILY_TIPS.length];
}

// ── Greeting ──────────────────────────────────────────────────────
export function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ── Score color ───────────────────────────────────────────────────
export function scoreColor(s) {
  if (s >= 80) return "text-emerald-400";
  if (s >= 60) return "text-yellow-400";
  return "text-red-400";
}

export function scoreLabel(s) {
  if (s >= 80) return "Interview Ready 🏆";
  if (s >= 60) return "Getting There 💪";
  if (s >= 40) return "Keep Practicing 📚";
  return "Just Starting 🚀";
}