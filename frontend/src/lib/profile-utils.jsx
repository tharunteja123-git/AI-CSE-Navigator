// ─────────────────────────────────────────────────────────────────
// lib/profile-utils.js  —  all data, helpers & variants for Profile
// ─────────────────────────────────────────────────────────────────
import { cn } from "./utils";
export { cn };

// ── Framer-motion variants ────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: (d = 0) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};

export const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// ── Select options ────────────────────────────────────────────────
export const CAREER_GOALS = [
  "Software Engineer at FAANG",
  "Full Stack Developer",
  "AI / ML Engineer",
  "Data Scientist",
  "DevOps / Cloud Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile Developer",
  "Startup Founder",
  "Research Scientist",
  "Other",
];

export const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export const DSA_LEVELS = [
  "Not started yet",
  "Arrays & Strings only",
  "Comfortable with basics",
  "Solving medium problems",
  "Solving hard problems",
  "Competitive programmer",
];

export const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated", "Working Professional"];

export const STUDY_HOURS = ["< 1 hr/day", "1–2 hrs/day", "2–4 hrs/day", "4–6 hrs/day", "6+ hrs/day"];

export const LEARNING_STYLES = ["Videos", "Articles & Docs", "Project-based", "Peer study", "Mixed"];

export const LANGUAGES_LIST = [
  "Python", "JavaScript", "Java", "C++", "C", "TypeScript",
  "Go", "Rust", "Kotlin", "Swift", "SQL", "Dart",
];

// ── Social platform config ────────────────────────────────────────
export const SOCIAL_PLATFORMS = [
  {
    key: "github",
    label: "GitHub",
    placeholder: "github.com/username",
    color: "text-white",
    bg: "bg-[#24292e]",
    border: "border-[#24292e]/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    placeholder: "linkedin.com/in/username",
    color: "text-white",
    bg: "bg-[#0A66C2]",
    border: "border-[#0A66C2]/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    key: "leetcode",
    label: "LeetCode",
    placeholder: "leetcode.com/u/username",
    color: "text-white",
    bg: "bg-[#FFA116]",
    border: "border-[#FFA116]/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
      </svg>
    ),
  },
  {
    key: "codeforces",
    label: "Codeforces",
    placeholder: "codeforces.com/profile/username",
    color: "text-white",
    bg: "bg-[#1F8ACB]",
    border: "border-[#1F8ACB]/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-15c0-.828.672-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z"/>
      </svg>
    ),
  },
  {
    key: "gfg",
    label: "GeeksforGeeks",
    placeholder: "geeksforgeeks.org/user/username",
    color: "text-white",
    bg: "bg-[#2f8d46]",
    border: "border-[#2f8d46]/30",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M21.45 14.315c-.143.28-.334.532-.565.745-.764.718-1.794.689-2.374.689H14.87c-.016.308-.016.642 0 .996h3.641c.58 0 1.61-.03 2.374.688.808.76.808 1.99 0 2.751-.764.718-1.794.689-2.374.689H12v-1.755h6.511c.58 0 .888-.09.888-.513 0-.423-.308-.513-.888-.513H15c-1.024 0-1.745-.235-2.164-.706-.42-.471-.42-1.177 0-1.648.067-.077.14-.148.217-.212C12.626 15.78 12 15.02 12 14.1c0-1.197 1.023-2.168 2.284-2.168h5.225c.58 0 .888-.09.888-.513 0-.423-.308-.513-.888-.513H12v-1.754h7.51c.58 0 1.61-.03 2.374.689.808.76.808 1.99 0 2.751-.143.135-.3.254-.467.353.33.237.595.541.773.901zM12 8h-1.768c.006-.127.013-.258.013-.39 0-2.046-1.754-3.71-3.923-3.71-2.169 0-3.922 1.664-3.922 3.71 0 .132.007.263.013.39H.607C.266 8 0 8.281 0 8.625v.75C0 9.718.266 10 .607 10h10.786c.341 0 .607-.282.607-.625v-.75C12 8.282 11.734 8 11.393 8H12zm-5.678 0H3.69c-.005-.13-.008-.26-.008-.39 0-1.187 1.03-2.157 2.3-2.157s2.3.97 2.3 2.157c0 .13-.003.26-.008.39z"/>
      </svg>
    ),
  },
  {
    key: "twitter",
    label: "Twitter / X",
    placeholder: "x.com/username",
    color: "text-white",
    bg: "bg-[#000000]",
    border: "border-white/20",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.732-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
      </svg>
    ),
  },
];

// ── Avatar initials helper ────────────────────────────────────────
export function getInitials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "U";
}

// ── Completion score ──────────────────────────────────────────────
export function calcCompletion(profile, social) {
  const fields = [
    profile?.career_goal,
    profile?.skill_level,
    profile?.dsa_level,
    profile?.current_year,
    profile?.languages,
    social?.github,
    social?.linkedin,
    social?.leetcode,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}