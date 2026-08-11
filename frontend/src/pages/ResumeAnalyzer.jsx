import React, { useState, useRef } from "react";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import {
  FiUpload, FiFileText, FiX, FiCheckCircle, FiAlertTriangle,
  FiZap, FiTarget, FiTrendingUp, FiEye, FiDownload, FiRefreshCw,
  FiStar, FiAward, FiArrowRight, FiInfo, FiChevronDown,
  FiChevronUp, FiClipboard, FiSearch, FiBriefcase, FiUser,
  FiBarChart2, FiShield, FiCode, FiBook,
} from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────
const MAX_FILE_MB  = 5;
const ACCEPTED_EXT = ["pdf", "doc", "docx", "txt"];
const SCORE_TIERS = [
  { min: 90, label: "Excellent",    color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/30", bar: "bg-emerald-500" },
  { min: 75, label: "Good",         color: "text-blue-400",    bg: "bg-blue-500/15",    border: "border-blue-500/30",    bar: "bg-blue-500" },
  { min: 60, label: "Average",      color: "text-yellow-400",  bg: "bg-yellow-500/15",  border: "border-yellow-500/30",  bar: "bg-yellow-500" },
  { min: 40, label: "Needs Work",   color: "text-orange-400",  bg: "bg-orange-500/15",  border: "border-orange-500/30",  bar: "bg-orange-500" },
  { min: 0,  label: "Poor",         color: "text-red-400",     bg: "bg-red-500/15",     border: "border-red-500/30",     bar: "bg-red-500" },
];

const SECTIONS_META = [
  { id: "contact",    label: "Contact Info",   icon: <FiUser className="text-xs"/> },
  { id: "summary",    label: "Summary",        icon: <FiFileText className="text-xs"/> },
  { id: "experience", label: "Experience",     icon: <FiBriefcase className="text-xs"/> },
  { id: "education",  label: "Education",      icon: <FiBook className="text-xs"/> },
  { id: "skills",     label: "Skills",         icon: <FiCode className="text-xs"/> },
  { id: "projects",   label: "Projects",       icon: <FiZap className="text-xs"/> },
];

const ROLES = [
  "Software Engineer", "Full Stack Developer", "Backend Developer",
  "Frontend Developer", "AI / ML Engineer", "Data Scientist",
  "DevOps Engineer", "Product Manager", "UI / UX Designer", "Data Analyst",
];

// ─────────────────────────────────────────────────────────────────
// REAL ATS SCORING ENGINE — client-side, deterministic
// ─────────────────────────────────────────────────────────────────
const ROLE_KEYWORDS = {
  "Software Engineer":     ["algorithms", "data structures", "system design", "oop", "rest api", "git", "ci/cd", "testing", "debugging", "agile", "java", "python", "c++", "javascript", "sql", "linux"],
  "Full Stack Developer":  ["react", "node", "express", "mongodb", "postgresql", "rest", "graphql", "html", "css", "javascript", "typescript", "docker", "git", "api", "frontend", "backend"],
  "Backend Developer":     ["api", "microservices", "database", "sql", "postgresql", "redis", "docker", "kubernetes", "rest", "grpc", "authentication", "jwt", "orm", "python", "java", "go"],
  "Frontend Developer":    ["react", "vue", "angular", "javascript", "typescript", "html", "css", "tailwind", "redux", "webpack", "responsive", "accessibility", "ui", "ux", "figma"],
  "AI / ML Engineer":      ["machine learning", "deep learning", "neural network", "pytorch", "tensorflow", "scikit", "nlp", "computer vision", "python", "data pipeline", "model training", "embeddings", "langchain", "transformers"],
  "Data Scientist":        ["python", "r", "pandas", "numpy", "matplotlib", "sql", "machine learning", "statistics", "hypothesis testing", "data visualization", "tableau", "power bi", "jupyter", "spark"],
  "DevOps Engineer":       ["docker", "kubernetes", "ci/cd", "jenkins", "github actions", "terraform", "ansible", "aws", "azure", "gcp", "linux", "bash", "monitoring", "prometheus", "grafana"],
  "Data Analyst":          ["sql", "excel", "tableau", "power bi", "python", "r", "data visualization", "dashboard", "reporting", "etl", "statistics", "business intelligence"],
  "Product Manager":       ["roadmap", "agile", "scrum", "stakeholder", "user story", "kpi", "product strategy", "market research", "a/b testing", "prioritization", "jira", "confluence"],
  "default":               ["python", "javascript", "sql", "git", "api", "database", "testing", "agile", "docker", "cloud", "linux", "rest", "oop", "algorithms", "data structures"],
};

const PENALTY_PATTERNS = [
  { pattern: /objective\s*:/i,           msg: "Has 'Objective' section (outdated — use Summary)", penalty: 5 },
  { pattern: /references available/i,   msg: "'References available upon request' is unnecessary", penalty: 3 },
  { pattern: /responsible for/gi,       msg: "Weak verb 'responsible for' detected", penalty: 3 },
  { pattern: /worked on|helped with/gi, msg: "Weak action verbs used", penalty: 3 },
  { pattern: /\bstreet\b|\bavenue\b|\brd\.\b/i, msg: "Full home address detected (privacy risk)", penalty: 2 },
];

const ACTION_VERBS = [
  "built", "developed", "designed", "implemented", "optimized", "scaled", "architected", "led", "managed",
  "created", "deployed", "automated", "improved", "reduced", "increased", "delivered", "launched", "mentored",
  "collaborated", "engineered", "integrated", "migrated", "refactored", "maintained", "resolved", "established",
];

const SECTION_PATTERNS = {
  contact:    /(?:email|phone|linkedin|github|@|\+91|\+1|\d{10})/i,
  summary:    /(?:summary|objective|profile|about me|professional summary)/i,
  experience: /(?:experience|employment|work history|professional experience|internship|intern)/i,
  education:  /(?:education|university|college|degree|b\.?tech|b\.?e|m\.?tech|bsc|msc|bachelor|master)/i,
  skills:     /(?:skills|technologies|tech stack|languages|tools|competencies)/i,
  projects:   /(?:projects|personal projects|academic projects|side projects|portfolio)/i,
  certifications: /(?:certification|certified|certificate|license|coursera|udemy)/i,
  achievements: /(?:achievement|award|recognition|honor|accomplishment)/i,
};

const QUANT_PATTERNS = /\d+%|\d+x|\$\d+|\d+\s*(?:users|customers|clients|requests|ms|seconds|hours|days|months|years|million|thousand|k\b|m\b)/i;

function runATSEngine(resumeText, targetRole, jobDesc) {
  const lower = resumeText.toLowerCase();
  const words = resumeText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const roleKws = ROLE_KEYWORDS[targetRole] || ROLE_KEYWORDS["default"];
  const jdKws   = jobDesc
    ? jobDesc.toLowerCase().match(/\b[a-z]{3,}\b/g)?.filter(w => w.length > 3) || []
    : [];
  const allKws  = [...new Set([...roleKws, ...jdKws.slice(0, 30)])];
  const foundKws   = allKws.filter(kw => lower.includes(kw.toLowerCase()));
  const missingKws = allKws.filter(kw => !lower.includes(kw.toLowerCase()));
  const kwScore    = Math.round((foundKws.length / Math.max(allKws.length, 1)) * 35);

  const sectionChecks = Object.entries(SECTION_PATTERNS).map(([name, pat]) => ({
    name, present: pat.test(resumeText)
  }));
  const corePresent = ["contact", "experience", "education", "skills"].filter(
    s => sectionChecks.find(x => x.name === s)?.present
  ).length;
  const bonusPresent = ["summary", "projects", "certifications", "achievements"].filter(
    s => sectionChecks.find(x => x.name === s)?.present
  ).length;
  const sectionScore = Math.min((corePresent / 4) * 15 + bonusPresent * 1.25, 20);

  const quantMatches = (resumeText.match(new RegExp(QUANT_PATTERNS.source, "gi")) || []).length;
  const quantScore   = Math.min(quantMatches * 2.5, 15);

  const verbCount  = ACTION_VERBS.filter(v => lower.includes(v)).length;
  const verbScore  = Math.min(verbCount * 1.0, 10);

  let lengthScore = 0;
  if (wordCount >= 400 && wordCount <= 800)       lengthScore = 10;
  else if (wordCount >= 250 && wordCount < 400)   lengthScore = 7;
  else if (wordCount > 800 && wordCount <= 1200)  lengthScore = 7;
  else if (wordCount > 1200)                      lengthScore = 4;
  else                                            lengthScore = 2;

  let formatScore = 0;
  if (/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText)) formatScore += 3;
  if (/(?:\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}|\+91\s?\d{10}/.test(resumeText)) formatScore += 2;
  if (/linkedin\.com/i.test(resumeText))  formatScore += 2;
  if (/github\.com/i.test(resumeText))    formatScore += 2;
  if (/portfolio|website|\.dev|\.io/i.test(resumeText)) formatScore += 1;

  let penalties = 0; const penaltyDetails = [];
  PENALTY_PATTERNS.forEach(({ pattern, msg, penalty }) => {
    const matches = resumeText.match(pattern);
    if (matches) { penalties += penalty; penaltyDetails.push({ msg, penalty }); }
  });

  const rawScore = kwScore + sectionScore + quantScore + verbScore + lengthScore + formatScore - penalties;
  const finalScore = Math.max(5, Math.min(98, Math.round(rawScore)));

  const subScores = {
    "Contact Info":  sectionChecks.find(x => x.name === "contact")?.present
      ? Math.min(50 + formatScore * 5, 100) : 20,
    "Summary":       sectionChecks.find(x => x.name === "summary")?.present
      ? Math.min(60 + verbScore * 3, 95) : 15,
    "Experience":    sectionChecks.find(x => x.name === "experience")?.present
      ? Math.min(40 + quantScore * 3.5 + verbScore * 2, 95) : 10,
    "Education":     sectionChecks.find(x => x.name === "education")?.present ? 85 : 10,
    "Skills":        sectionChecks.find(x => x.name === "skills")?.present
      ? Math.min(40 + kwScore * 1.5, 95) : 10,
    "Projects":      sectionChecks.find(x => x.name === "projects")?.present
      ? Math.min(50 + quantScore * 2, 90) : 20,
  };

  return {
    finalScore,
    breakdown: { kwScore, sectionScore: Math.round(sectionScore), quantScore, verbScore, lengthScore, formatScore, penalties },
    foundKws,
    missingKws: missingKws.slice(0, 20),
    sectionChecks,
    penaltyDetails,
    quantMatches,
    verbCount,
    wordCount,
    subScores,
    kwMatchPct: Math.round((foundKws.length / Math.max(allKws.length, 1)) * 100),
  };
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function getScoreTier(score) {
  return SCORE_TIERS.find(t => score >= t.min) || SCORE_TIERS[SCORE_TIERS.length - 1];
}

async function extractText(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "txt") {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = e => res(e.target.result);
      reader.onerror = () => rej(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }

  if (ext === "pdf") {
    try {
      let pdfjsLib;
      try {
        pdfjsLib = await import("pdfjs-dist");
      } catch {
        pdfjsLib = await import("pdfjs-dist/build/pdf");
      }
      const version = pdfjsLib.version || "4.0.379";
      if (pdfjsLib.GlobalWorkerOptions) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
      }
      const buf  = await file.arrayBuffer();
      const pdf  = await pdfjsLib.getDocument({
        data: new Uint8Array(buf),
        useWorkerFetch: false,
        isEvalSupported: false,
        useSystemFonts: true,
      }).promise;

      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page    = await pdf.getPage(i);
        const content = await page.getTextContent();
        let pageText = "";
        let lastY    = null;
        for (const item of content.items) {
          if ("str" in item) {
            if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
              pageText += "\n";
            }
            pageText += item.str + " ";
            lastY = item.transform[5];
          }
        }
        text += pageText + "\n";
      }
      text = text.replace(/\s{3,}/g, "  ").trim();
      if (!text || text.split(/\s+/).length < 10) {
        throw new Error(
          "No readable text found in this PDF. This may be a scanned image PDF — please use a text-based PDF, or copy-paste your resume text instead."
        );
      }
      return text;
    } catch (err) {
      if (
        err.message.includes("Cannot find module") ||
        err.message.includes("Failed to resolve")
      ) {
        throw new Error("PDF parsing requires pdfjs-dist. Run: npm install pdfjs-dist");
      }
      throw err;
    }
  }

  if (ext === "docx") {
    try {
      const mammoth = await import("mammoth");
      const buf     = await file.arrayBuffer();
      const result  = await mammoth.extractRawText({ arrayBuffer: buf });
      if (!result.value.trim()) throw new Error("No text found in this DOCX file.");
      return result.value;
    } catch (err) {
      if (err.message.includes("mammoth")) {
        throw new Error("DOCX parsing needs mammoth — run: npm install mammoth");
      }
      throw err;
    }
  }

  if (ext === "doc") {
    throw new Error("Legacy .doc format not supported in browser. Please save as .docx or .pdf");
  }

  throw new Error("Unsupported format. Upload PDF, DOCX, or TXT.");
}

// ─────────────────────────────────────────────────────────────────
// UI COMPONENTS
// ─────────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 120, strokeW = 10 }) {
  const r   = (size - strokeW) / 2;
  const circ= 2 * Math.PI * r;
  const off = circ * (1 - score / 100);
  const tier= getScoreTier(score);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(255,255,255,0.05)" strokeWidth={strokeW}/>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="currentColor" strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={off}
          className={`${tier.color} transition-all duration-1000`}
          style={{ filter: `drop-shadow(0 0 6px currentColor)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-extrabold tabular-nums ${tier.color}`}>{score}</span>
        <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">/ 100</span>
        <span className={`text-[9px] font-bold mt-0.5 ${tier.color}`}>{tier.label}</span>
      </div>
    </div>
  );
}

function MiniScoreBar({ label, score, icon }) {
  const tier = getScoreTier(score);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-white/30">{icon}</span>
          <span className="text-xs text-white/55 font-medium">{label}</span>
        </div>
        <span className={`text-xs font-bold tabular-nums ${tier.color}`}>{score}/100</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${tier.bar}`}
          style={{ width: `${score}%` }}/>
      </div>
    </div>
  );
}

function FileDropZone({ file, onFile, onRemove, extracting }) {
  const [drag, setDrag] = useState(false);
  const inputRef       = useRef(null);

  const validate = (f) => {
    if (!f) return;
    const ext = f.name.split(".").pop().toLowerCase();
    if (!ACCEPTED_EXT.includes(ext)) { toast.error(`Unsupported format. Use PDF, DOCX, or TXT`); return; }
    if (f.size > MAX_FILE_MB * 1024 * 1024) { toast.error(`File too large. Max ${MAX_FILE_MB}MB`); return; }
    onFile(f);
  };

  const onDrop = (e) => { e.preventDefault(); setDrag(false); validate(e.dataTransfer.files?.[0]); };

  if (file) {
    return (
      <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/8 p-4 flex items-center gap-4">
        <div className="w-11 h-11 bg-emerald-500/15 rounded-xl flex items-center justify-center flex-shrink-0">
          <FiFileText className="text-emerald-400 text-lg"/>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate">{file.name}</p>
          <p className="text-white/35 text-xs mt-0.5">
            {(file.size / 1024).toFixed(0)} KB · {file.name.split(".").pop().toUpperCase()}
            {extracting && <span className="ml-2 text-indigo-400 animate-pulse">· Extracting text...</span>}
          </p>
        </div>
        <button onClick={onRemove}
          className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 hover:text-red-400 text-white/30 flex items-center justify-center transition-all flex-shrink-0">
          <FiX className="text-sm"/>
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 overflow-hidden group ${
        drag ? "border-indigo-400 bg-indigo-500/10" : "border-white/[0.10] hover:border-indigo-400/50 hover:bg-white/[0.02]"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center py-10 px-6 text-center">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all ${drag ? "bg-indigo-500/20 scale-110" : "bg-white/[0.04] group-hover:bg-indigo-500/10 group-hover:scale-105"}`}>
          <FiUpload className={`text-2xl transition-colors ${drag ? "text-indigo-400" : "text-white/20 group-hover:text-indigo-400"}`}/>
        </div>
        <p className="text-white/70 font-bold text-sm mb-1">
          {drag ? "Drop your resume here" : "Drag & drop your resume"}
        </p>
        <p className="text-white/25 text-xs mb-4">or click to browse</p>
        <div className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all">
          <FiUpload className="text-xs"/> Choose File
        </div>
        <p className="text-white/15 text-[10px] mt-3">PDF · DOCX · TXT · Max {MAX_FILE_MB}MB</p>
      </div>
      <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,.txt" hidden
        onChange={e => validate(e.target.files?.[0])}/>
    </div>
  );
}

function AnalysisMarkdown({ raw }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-[#161b22]">
        <FiZap className="text-indigo-400 text-sm"/>
        <p className="text-sm font-bold text-white">Detailed AI Analysis</p>
        <span className="ml-auto text-[10px] text-white/40 font-mono">Powered by Gemini AI</span>
      </div>
      <div className="p-5 overflow-y-auto max-h-[65vh]">
        <ReactMarkdown
          components={{
            h1: ({ node, ...props }) => (
              <h1 className="text-base font-extrabold text-white mt-4 mb-2 pb-1 border-b border-white/10" {...props} />
            ),
            h2: ({ node, ...props }) => (
              <h2 className="text-sm font-bold text-indigo-300 mt-5 mb-2.5 flex items-center gap-1.5 tracking-wide" {...props} />
            ),
            h3: ({ node, ...props }) => (
              <h3 className="text-xs font-bold text-slate-100 mt-3.5 mb-1.5" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-xs text-slate-200 leading-relaxed mb-3.5 font-normal" {...props} />
            ),
            ul: ({ node, ...props }) => (
              <ul className="list-disc list-inside space-y-1.5 my-2.5 text-xs text-slate-200" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal list-inside space-y-1.5 my-2.5 text-xs text-slate-200" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="text-xs text-slate-200 leading-relaxed my-1" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong className="font-extrabold text-white" {...props} />
            ),
            em: ({ node, ...props }) => (
              <em className="italic text-slate-300" {...props} />
            ),
            code: ({ node, inline, ...props }) => (
              <code className="text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded text-[11px] font-mono border border-indigo-500/30" {...props} />
            ),
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-2 border-indigo-500 bg-indigo-500/10 p-3 rounded-r-lg text-xs text-indigo-200 italic my-3" {...props} />
            ),
            hr: ({ node, ...props }) => (
              <hr className="border-white/10 my-4" {...props} />
            )
          }}
        >
          {raw}
        </ReactMarkdown>
      </div>
    </div>
  );
}

function AnalysisResult({ result, fileName, role, atsData }) {
  const atsMatch = result.match(/(?:ATS.*?Score|ATS Match|Overall Score).*?[:：]\s*(\d+)/i);
  const atsScore = atsData?.finalScore ?? (atsMatch ? Math.min(100, parseInt(atsMatch[1])) : 72);
  const tier = getScoreTier(atsScore);

  const subScores = atsData?.subScores || {
    "Contact Info":  parseInt((result.match(/contact.*?(\d+)\/100/i) || [])[1] || "85"),
    "Summary":       parseInt((result.match(/summary.*?(\d+)\/100/i) || [])[1] || "70"),
    "Experience":    parseInt((result.match(/experience.*?(\d+)\/100/i) || [])[1] || "78"),
    "Education":     parseInt((result.match(/education.*?(\d+)\/100/i) || [])[1] || "90"),
    "Skills":        parseInt((result.match(/skills.*?(\d+)\/100/i) || [])[1] || "65"),
    "Projects":      parseInt((result.match(/project.*?(\d+)\/100/i) || [])[1] || "80"),
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
        <div className="flex items-stretch flex-col sm:flex-row">
          <div className={`sm:w-48 flex flex-col items-center justify-center py-7 px-6 border-b sm:border-b-0 sm:border-r border-white/[0.06] gap-3 ${tier.bg}`}>
            <ScoreRing score={atsScore}/>
            <div className={`text-center px-3 py-1 rounded-full border text-[11px] font-bold ${tier.border} ${tier.color} ${tier.bg}`}>
              {atsScore >= 80 ? "✅ ATS Ready" : atsScore >= 60 ? "⚠️ Needs Tuning" : "❌ Needs Work"}
            </div>
          </div>

          <div className="flex-1 p-5">
            <div className="flex items-start justify-between mb-4 gap-3">
              <div>
                <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-1">ATS Analysis Complete</p>
                <h3 className="text-white font-extrabold text-base leading-tight">{fileName}</h3>
                {role && <p className="text-indigo-400 text-xs mt-0.5 font-semibold">Target: {role}</p>}
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-3xl font-extrabold tabular-nums ${tier.color}`}>{atsScore}%</p>
                <p className={`text-[11px] font-bold ${tier.color}`}>{tier.label}</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {Object.entries(subScores).map(([label, score]) => {
                const meta = SECTIONS_META.find(s => label.toLowerCase().includes(s.id));
                return <MiniScoreBar key={label} label={label} score={score} icon={meta?.icon || <FiFileText className="text-xs"/>}/>;
              })}
            </div>
          </div>
        </div>

        <div className="h-1 bg-white/[0.04]">
          <div className={`h-full ${tier.bar} transition-all duration-1000`} style={{ width: `${atsScore}%` }}/>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: <FiTarget />,      label: "ATS Score",   value: `${atsScore}/100`, color: "text-indigo-400", bg: "bg-indigo-500/8" },
          { icon: <FiTrendingUp />,  label: "Readability", value: atsScore >= 75 ? "High" : "Medium", color: "text-emerald-400", bg: "bg-emerald-500/8" },
          { icon: <FiShield />,      label: "Format",      value: atsScore >= 70 ? "Clean" : "Issues", color: "text-violet-400", bg: "bg-violet-500/8" },
        ].map(s => (
          <div key={s.label} className={`rounded-xl ${s.bg} border border-white/[0.05] p-3 text-center`}>
            <div className={`${s.color} flex justify-center mb-1.5 text-lg`}>{s.icon}</div>
            <p className={`text-sm font-extrabold ${s.color} tabular-nums`}>{s.value}</p>
            <p className="text-[10px] text-white/25 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <AnalysisMarkdown raw={result} />

      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => navigator.clipboard?.writeText(result).then(() => toast.success("Analysis copied!"))}
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.07] text-white/55 hover:text-white hover:bg-white/[0.07] text-xs font-bold transition-all">
          <FiClipboard className="text-sm"/> Copy Analysis
        </button>
        <button onClick={() => {
          const a = document.createElement("a");
          a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(result);
          a.download = "resume_analysis.txt";
          a.click();
        }} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600/20 border border-indigo-500/25 text-indigo-300 hover:bg-indigo-600/30 text-xs font-bold transition-all">
          <FiDownload className="text-sm"/> Download Report
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  const tips = [
    { icon: "📏", text: "Keep resume to 1 page for <3 yrs experience" },
    { icon: "🔑", text: "Use keywords from the job description" },
    { icon: "📊", text: "Quantify achievements with numbers and metrics" },
    { icon: "🤖", text: "ATS bots reject 75% of resumes — formatting matters" },
    { icon: "✍️", text: "Use strong action verbs: built, led, improved, scaled" },
    { icon: "📁", text: "Use PDF format unless job portal requires DOCX" },
  ];
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
      <div className="p-8 text-center border-b border-white/[0.06]">
        <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <FiFileText className="text-indigo-400 text-2xl"/>
        </div>
        <h3 className="text-white font-bold text-base mb-2">Upload Your Resume to Analyse</h3>
        <p className="text-white/35 text-sm max-w-xs mx-auto leading-5">
          Get your ATS score, keyword gaps, section-by-section feedback, and rewrite suggestions — in seconds.
        </p>
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Pro Tips</p>
        <div className="grid sm:grid-cols-2 gap-2.5">
          {tips.map((t, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.025] border border-white/[0.04]">
              <span className="text-base flex-shrink-0">{t.icon}</span>
              <p className="text-xs text-white/40 leading-4">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function ResumeAnalyzer() {
  const [file,         setFile]         = useState(null);
  const [resumeText,   setResumeText]   = useState("");
  const [jobDesc,      setJobDesc]      = useState("");
  const [targetRole,   setTargetRole]   = useState("");
  const [result,       setResult]       = useState("");
  const [atsData,      setAtsData]      = useState(null);
  const [loading,      setLoading]      = useState(false);
  const [extracting,   setExtracting]   = useState(false);
  const [showJD,       setShowJD]       = useState(false);
  const [inputMode,    setInputMode]    = useState("upload");
  const [analysisType, setAnalysisType] = useState("full");

  const handleFile = async (f) => {
    setFile(f); setResumeText(""); setResult(""); setAtsData(null);
    setExtracting(true);
    try {
      const text = await extractText(f);
      setResumeText(text);
      toast.success(`✅ Resume loaded — ${text.split(/\s+/).length} words extracted`);
    } catch (err) {
      toast.error(err.message);
      setFile(null);
    }
    setExtracting(false);
  };

  const handleRemove = () => { setFile(null); setResumeText(""); setResult(""); setAtsData(null); };

  const analyze = async () => {
    const text = resumeText.trim();
    if (!text) { toast.error("Please upload a resume or paste your text first"); return; }
    if (text.split(/\s+/).length < 30) { toast.error("Resume seems too short. Please upload your complete resume."); return; }

    setLoading(true); setResult(""); setAtsData(null);

    const jobContext = jobDesc.trim()
      ? `\n\nJOB DESCRIPTION TO MATCH AGAINST:\n${jobDesc}\n`
      : "";

    const ats = runATSEngine(text, targetRole, jobDesc);
    setAtsData(ats);

    const roleContext = targetRole
      ? `Target Role: ${targetRole}`
      : "Target Role: Not specified";

    const scoreSummary = `
PRE-COMPUTED ATS SCORES (these are FIXED — do NOT change them):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall ATS Score:    ${ats.finalScore}/100
Keyword Match:        ${ats.breakdown.kwScore}/35  (${ats.kwMatchPct}% of role keywords found)
Sections Present:     ${Math.round(ats.breakdown.sectionScore)}/20
Quantification:       ${ats.breakdown.quantScore}/15  (${ats.quantMatches} measurable results found)
Action Verbs:         ${ats.breakdown.verbScore}/10  (${ats.verbCount} strong verbs found)
Length/Completeness:  ${ats.breakdown.lengthScore}/10  (${ats.wordCount} words)
Contact/Format:       ${ats.breakdown.formatScore}/10
Penalties Applied:    -${ats.breakdown.penalties} (${ats.penaltyDetails.map(p => p.msg).join("; ") || "none"})
Keywords FOUND (${ats.foundKws.length}): ${ats.foundKws.slice(0, 15).join(", ")}
Keywords MISSING (${ats.missingKws.length}): ${ats.missingKws.slice(0, 15).join(", ")}
Sections detected: ${ats.sectionChecks.filter(s => s.present).map(s => s.name).join(", ")}
Sections MISSING:  ${ats.sectionChecks.filter(s => !s.present).map(s => s.name).join(", ")}
Sub-scores:
- Contact Info:  ${ats.subScores["Contact Info"]}/100
- Summary:       ${ats.subScores["Summary"]}/100
- Experience:    ${ats.subScores["Experience"]}/100
- Education:     ${ats.subScores["Education"]}/100
- Skills:        ${ats.subScores["Skills"]}/100
- Projects:      ${ats.subScores["Projects"]}/100
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  const prompts = {
      full: `You are a strict ATS Resume Analyst. Your job is to explain WHY this resume got these specific scores and HOW to fix each issue.
${roleContext}
${jobDesc ? `\nJOB DESCRIPTION:\n${jobDesc}\n` : ""}
Analyze this resume thoroughly:
${scoreSummary}
RESUME TEXT:
${text}
${jobContext}

IMPORTANT RULES:
1. Use EXACTLY the scores above — do NOT invent different numbers
2. Reference SPECIFIC text from the resume when giving feedback
3. Be HARSH and HONEST — do not sugarcoat issues
4. A score below 60 means this resume will be rejected by ATS — say so clearly
5. Every suggestion must reference actual resume text

Write your analysis in this EXACT format:
## ATS Score: ${ats.finalScore}/100

## Executive Summary
[2-3 brutally honest sentences about why this resume got ${ats.finalScore}/100. Reference specific problems.]

## ✅ Strengths
${ats.foundKws.length > 0 ? `- Found ${ats.foundKws.length} relevant keywords: ${ats.foundKws.slice(0, 8).join(", ")}` : "- Very few strengths found"}
${ats.quantMatches > 0 ? `- ${ats.quantMatches} quantified achievements detected` : ""}
${ats.verbCount > 3 ? `- ${ats.verbCount} strong action verbs used` : ""}
[Add 2-3 more specific strengths from the resume text]

## ❌ Critical Issues
${ats.missingKws.length > 8 ? `- Missing ${ats.missingKws.length} key role-specific keywords — major ATS penalty` : ""}
${ats.quantMatches < 2 ? "- Only " + ats.quantMatches + " quantified results — ATS scores lower for unquantified bullets" : ""}
${ats.verbScore < 5 ? "- Weak action verbs — use words like: built, deployed, optimized, architected" : ""}
${ats.penaltyDetails.map(p => `- ${p.msg} (-${p.penalty} points)`).join("\n")}
[List 3-4 more specific issues found in the actual resume text]

## 🔑 Missing Keywords (Add These)
${ats.missingKws.slice(0, 12).map(kw => `- **${kw}** — critical for ${targetRole || "this role"}`).join("\n")}

## 📊 Section-by-Section Review
**Contact Info:** ${ats.subScores["Contact Info"]}/100 — [specific feedback on their contact section]
**Summary:** ${ats.subScores["Summary"]}/100 — [specific feedback or "Section missing — add immediately"]
**Experience:** ${ats.subScores["Experience"]}/100 — [specific feedback on bullet points and quantification]
**Education:** ${ats.subScores["Education"]}/100 — [specific feedback]
**Skills:** ${ats.subScores["Skills"]}/100 — [specific feedback on skills listed vs missing]
**Projects:** ${ats.subScores["Projects"]}/100 — [specific feedback or "Section missing"]

## ✍️ Rewrite Suggestions
[Pick 2-3 actual bullet points from the resume and show before/after]
Before: [exact text from resume]
After: [improved version with metrics and strong verbs]

## 🚀 Top 5 Action Items (Priority Order)
1. [Most impactful fix based on score breakdown]
2. [Second most impactful]
3. [Third]
4. [Fourth]
5. [Fifth]

## ✅ Final Verdict
${ats.finalScore >= 80 ? "READY TO SUBMIT ✅" : ats.finalScore >= 60 ? "NEEDS IMPROVEMENT ⚠️" : "NOT ATS READY ❌"} — Score: ${ats.finalScore}/100
[2 sentences on overall readiness and the single most important thing to fix]`,

      quick: `You are an expert resume reviewer. Do a QUICK scan of this resume:
${roleContext}
${scoreSummary}
RESUME: ${text}

Provide:
## ATS Score: ${ats.finalScore}/100

## Top 3 Strengths
[Reference actual resume text]

## Top 3 Critical Fixes
${ats.missingKws.length > 5 ? `1. Add missing keywords: ${ats.missingKws.slice(0, 5).join(", ")}` : ""}
${ats.quantMatches < 3 ? `2. Add ${3 - ats.quantMatches} more quantified results (numbers, %, $ amounts)` : ""}
[Add more based on the resume]

## Must-Add Keywords
${ats.missingKws.slice(0, 8).join(", ")}

## One-Line Verdict
${ats.finalScore >= 75 ? "Strong resume — minor tweaks needed." : ats.finalScore >= 55 ? "Average resume — significant improvements required before applying." : "Weak ATS performance — major rewrite needed before any applications."}`,

      "ats-only": `You are an ATS (Applicant Tracking System) expert. Evaluate this resume purely from an ATS perspective:
${roleContext}
${jobDesc ? `\nJOB DESCRIPTION:\n${jobDesc}\n` : ""}
${scoreSummary}
RESUME: ${text}

Provide:
## ATS Score: ${ats.finalScore}/100

## Keyword Match Rate
${ats.kwMatchPct}% — Found ${ats.foundKws.length} of ${ats.foundKws.length + ats.missingKws.length} target keywords.

## Format & Section Compliance
${ats.sectionChecks.filter(s => s.present).length} of 8 standard sections present.

## Missing High-Value Keywords
${ats.missingKws.slice(0, 10).join(", ")}

## Penalties & Formatting Flags
${ats.penaltyDetails.length > 0 ? ats.penaltyDetails.map(p => `- ${p.msg}`).join("\n") : "No critical formatting flags detected."}`,
    };

    try {
      const data = await api.chat(prompts[analysisType] || prompts.full);
      setResult(data.response || "");
      toast.success("✅ Analysis complete!");
    } catch {
      toast.error("Analysis failed. Please check your API key.");
    }
    setLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-1 pb-10 font-sans">
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 bg-indigo-600/12 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-4">
            <FiZap className="text-xs"/> AI-Powered Real ATS Resume Engine
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1.5">Resume Analyzer</h1>
          <p className="text-white/40 text-sm">Upload your resume · Get deterministic ATS score · Fix keyword gaps · Land FAANG interviews</p>
        </div>

        <div className="grid lg:grid-cols-[360px_1fr] gap-5">
          {/* LEFT: Input panel */}
          <div className="space-y-4">
            <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
              {[
                { id: "upload", label: "Upload File", icon: <FiUpload className="text-xs"/> },
                { id: "paste",  label: "Paste Text",  icon: <FiClipboard className="text-xs"/> },
              ].map(m => (
                <button key={m.id}
                  data-inputmode={m.id}
                  onClick={() => { setInputMode(m.id); setResult(""); setFile(null); setResumeText(""); setAtsData(null); }}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                    inputMode === m.id
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/30"
                      : "text-white/30 hover:text-white/60"
                  }`}>
                  {m.icon}{m.label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#161b22]">
                <FiFileText className="text-white/30 text-sm"/>
                <p className="text-sm font-bold text-white/60">
                  {inputMode === "upload" ? "Upload Resume" : "Paste Resume Text"}
                </p>
                {resumeText && (
                  <span className="ml-auto text-[10px] text-emerald-400 font-bold font-mono">
                    {resumeText.split(/\s+/).length} words
                  </span>
                )}
              </div>
              <div className="p-4">
                {inputMode === "upload" ? (
                  <FileDropZone file={file} onFile={handleFile} onRemove={handleRemove} extracting={extracting}/>
                ) : (
                  <textarea
                    value={resumeText}
                    onChange={e => { setResumeText(e.target.value); setResult(""); setAtsData(null); }}
                    rows={12}
                    className="w-full bg-transparent text-white/65 text-xs font-mono leading-5 outline-none resize-none placeholder:text-white/15 border-0"
                    placeholder={`Paste your complete resume text here...\n\nInclude all sections:\n— Contact Info\n— Professional Summary\n— Work Experience\n— Education\n— Skills\n— Projects\n— Certifications`}
                  />
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#161b22]">
                <FiTarget className="text-white/30 text-sm"/>
                <p className="text-sm font-bold text-white/60">Target Role</p>
                <span className="ml-auto text-[10px] text-white/20">Optional but recommended</span>
              </div>
              <div className="p-4">
                <select value={targetRole} onChange={e => setTargetRole(e.target.value)}
                  className="w-full bg-[#161b22] border border-white/[0.07] text-white/60 text-xs rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500/50">
                  <option value="">Select target role (optional)</option>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
              <button
                onClick={() => setShowJD(v => !v)}
                className="w-full flex items-center gap-2 px-4 py-3 bg-[#161b22] hover:bg-[#1c2128] transition-colors">
                <FiBriefcase className="text-white/30 text-sm"/>
                <p className="text-sm font-bold text-white/60">Job Description</p>
                <span className="ml-auto flex items-center gap-1.5">
                  {jobDesc && <span className="w-2 h-2 rounded-full bg-emerald-500"/>}
                  <span className="text-[10px] text-white/20">Boosts ATS accuracy</span>
                  {showJD ? <FiChevronUp className="text-white/25 text-xs"/> : <FiChevronDown className="text-white/25 text-xs"/>}
                </span>
              </button>
              {showJD && (
                <div className="p-4">
                  <textarea
                    value={jobDesc}
                    onChange={e => setJobDesc(e.target.value)}
                    rows={6}
                    className="w-full bg-transparent text-white/55 text-xs font-mono leading-5 outline-none resize-none placeholder:text-white/15 border-0"
                    placeholder="Paste the job description here for precise keyword matching and ATS scoring against this specific role..."
                  />
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#161b22]">
                <FiBarChart2 className="text-white/30 text-sm"/>
                <p className="text-sm font-bold text-white/60">Analysis Type</p>
              </div>
              <div className="p-3 space-y-2">
                {[
                  { id: "full",     label: "Full Analysis",  desc: "Complete review with rewrites · ~30s", icon: "🔬" },
                  { id: "quick",    label: "Quick Scan",     desc: "Top issues & score only · ~10s",       icon: "⚡" },
                  { id: "ats-only", label: "ATS Only",       desc: "Keyword & format compliance · ~10s",   icon: "🤖" },
                ].map(t => (
                  <button key={t.id} onClick={() => setAnalysisType(t.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      analysisType === t.id
                        ? "border-indigo-500/40 bg-indigo-600/10"
                        : "border-white/[0.05] bg-transparent hover:bg-white/[0.02]"
                    }`}>
                    <span className="text-lg flex-shrink-0">{t.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold ${analysisType === t.id ? "text-white" : "text-white/50"}`}>{t.label}</p>
                      <p className="text-[10px] text-white/25 mt-0.5">{t.desc}</p>
                    </div>
                    {analysisType === t.id && <FiCheckCircle className="text-indigo-400 flex-shrink-0 text-sm"/>}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={analyze}
              disabled={loading || extracting || !resumeText.trim()}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Evaluating ATS Engine...</>
                : <><FiZap className="text-sm"/> Analyse My Resume</>
              }
            </button>

            <div className="bg-amber-500/6 border border-amber-500/15 rounded-xl px-4 py-3 space-y-2">
              <div className="flex items-start gap-2">
                <FiInfo className="text-amber-400 flex-shrink-0 mt-0.5 text-sm"/>
                <div>
                  <p className="text-[10px] text-amber-300/70 leading-normal mb-1">
                    All PDF & DOCX text extraction takes place securely in your web browser.
                  </p>
                  <code className="block bg-amber-500/10 px-2.5 py-1.5 rounded text-amber-300 font-mono text-[10px]">
                    npm install pdfjs-dist mammoth
                  </code>
                  <p className="text-[10px] text-amber-300/40 mt-1.5 leading-4">
                    TXT files work without any install. If PDF fails, use the
                    <button
                      onClick={() => {
                        document.querySelector('[data-inputmode="paste"]')?.click();
                      }}
                      className="underline ml-0.5 hover:text-amber-300/70"
                    >Paste Text</button> mode instead.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Result panel */}
          <div>
            {loading ? (
              <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] flex flex-col items-center justify-center py-24 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"/>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FiZap className="text-indigo-400 text-lg"/>
                  </div>
                </div>
                <p className="text-white font-bold text-base mb-2">Executing Client-Side ATS Engine</p>
                <div className="space-y-1.5 text-left max-w-52 mx-auto">
                  {["Checking keyword density", "Auditing core section presence", "Scoring quantification metrics", "Detecting ATS red flag penalties"].map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white/35">
                      <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 200}ms` }}/>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            ) : result ? (
              <AnalysisResult
                result={result}
                fileName={file?.name || "Pasted Resume"}
                role={targetRole}
                atsData={atsData}
              />
            ) : (
              <EmptyState/>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}