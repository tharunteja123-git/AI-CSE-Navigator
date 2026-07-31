
// ─────────────────────────────────────────────────────────────────
// lib/utils.js  —  shared helpers for UI components
// ─────────────────────────────────────────────────────────────────

/**
 * Merge class names (lightweight clsx replacement — no dependency needed)
 * Usage: cn("base", condition && "extra", "always")
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ── Password strength ─────────────────────────────────────────────
export const PASSWORD_CHECKS = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter",  test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter",  test: (p) => /[a-z]/.test(p) },
  { label: "One number",            test: (p) => /[0-9]/.test(p) },
];

export function getPasswordStrength(password) {
  const passed = PASSWORD_CHECKS.filter((c) => c.test(password)).length;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-red-500",
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-emerald-500",
  ];
  const textColors = [
    "text-red-400",
    "text-red-400",
    "text-orange-400",
    "text-yellow-400",
    "text-emerald-400",
  ];
  return {
    score: passed,
    label: labels[passed],
    barColor: colors[passed],
    textColor: textColors[passed],
    isStrong: passed === PASSWORD_CHECKS.length,
  };
}

// ── Social Icons ──────────────────────────────────────────────────
export function GoogleIconSVG({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z" fill="#EB4335" />
    </svg>
  );
}

export function GithubIconSVG({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

// ── Animation variants for framer-motion ──────────────────────────
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: (delay = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const slideUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ── Stats & Features data ─────────────────────────────────────────
export const REGISTER_STATS = [
  { value: "12,000+", label: "Students enrolled" },
  { value: "98%",     label: "Placement rate"    },
  { value: "200+",    label: "DSA problems"      },
  { value: "50+",     label: "Career roadmaps"   },
];

export const REGISTER_FEATURES = [
  { emoji: "-", text: "AI Career Mentor — chat anytime"         },
  { emoji: "-", text: "Mock Interviews with live compiler"      },
  { emoji: "-", text: "DSA Mastery Hub with 200+ problems"     },
  { emoji: "-", text: "Personalized career roadmaps"           },
  { emoji: "-", text: "Resume analyzer with ATS scoring"       },
  { emoji: "-", text: "Skill gap analysis vs real JDs"         },
];

export const TESTIMONIALS = [
  {
    initials: "PK",
    gradient: "from-indigo-400 to-violet-500",
    name: "Priya Krishnan",
    role: "Placed at Google · CSE 2024",
    quote:
      '"CSE Navigator\'s mock interviews and AI mentor helped me crack Google in just 3 months of focused prep."',
  },
  {
    initials: "AR",
    gradient: "from-blue-400 to-cyan-500",
    name: "Arjun Reddy",
    role: "SDE at Amazon · CSE 2025",
    quote:
      '"The DSA tracker and system design section is unmatched. I went from 0 to hired in 4 months."',
  },
];
