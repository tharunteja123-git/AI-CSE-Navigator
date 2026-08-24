import { useState, useRef, useCallback } from "react";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import arrays from "../data/coding/arrays";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import {
  FiCode, FiZap, FiTarget, FiCheck, FiBookOpen,
  FiArrowRight, FiChevronDown, FiChevronUp, FiStar,
  FiAward, FiClock, FiGrid, FiList, FiCopy,
  FiExternalLink, FiPlay, FiBarChart2, FiLayers,
  FiCheckCircle, FiX, FiRefreshCw, FiCpu, FiHash,
  FiAlertTriangle, FiTrendingUp, FiBox,
} from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────
// COLOR CONSTANTS
// ─────────────────────────────────────────────────────────────────
const DIFF_STYLE = {
  Easy:   { bg:"bg-emerald-500/15", text:"text-emerald-300", border:"border-emerald-500/25", dot:"bg-emerald-400" },
  Medium: { bg:"bg-amber-500/15",   text:"text-amber-300",   border:"border-amber-500/25",   dot:"bg-amber-400"   },
  Hard:   { bg:"bg-red-500/15",     text:"text-red-300",     border:"border-red-500/25",     dot:"bg-red-400"     },
};

const TAG_STYLE = {
  OPTIMAL:      "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  "O(n²)":      "bg-red-500/15 text-red-300 border-red-500/25",
  "O(n log n)": "bg-amber-500/15 text-amber-300 border-amber-500/25",
  "O(n)":       "bg-blue-500/15 text-blue-300 border-blue-500/25",
  "O(n space)": "bg-violet-500/15 text-violet-300 border-violet-500/25",
};

const NAV_TABS = [
  { id:"overview",  label:"Overview",  icon:<FiBookOpen className="text-xs"/> },
  { id:"syntax",    label:"Syntax",    icon:<FiCode className="text-xs"/> },
  { id:"patterns",  label:"Patterns",  icon:<FiLayers className="text-xs"/> },
  { id:"problems",  label:"Problems",  icon:<FiTarget className="text-xs"/> },
  { id:"quiz",      label:"Quiz",      icon:<FiZap className="text-xs"/> },
  { id:"tips",      label:"Tips",      icon:<FiStar className="text-xs"/> },
];

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
function DiffBadge({ diff }) {
  const s = DIFF_STYLE[diff] || DIFF_STYLE.Medium;
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border}`}>{diff}</span>;
}

function TagBadge({ tag }) {
  const s = TAG_STYLE[tag] || "bg-white/5 text-white/40 border-white/10";
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s}`}>{tag}</span>;
}

// ─────────────────────────────────────────────────────────────────
// CODE BLOCK — VS Code style
// ─────────────────────────────────────────────────────────────────
function CodeBlock({ code, lang = "python", title }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 2000);
    });
  };
  const lines = code.split("\n");
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.07] shadow-xl">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60"/>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"/>
            <div className="w-3 h-3 rounded-full bg-emerald-500/60"/>
          </div>
          <span className="text-[11px] text-white/30 font-mono">{title || `${lang}.py`}</span>
        </div>
        <button onClick={copy}
          className="flex items-center gap-1.5 text-[10px] font-semibold text-white/25 hover:text-white/70 transition-colors px-2 py-1 rounded bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06]">
          <FiCopy className="text-[9px]"/> {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="flex bg-[#0d1117] overflow-auto" style={{maxHeight:"380px"}}>
        <div className="select-none flex-shrink-0 py-3 px-2.5 border-r border-white/[0.05] text-right min-w-[38px]">
          {lines.map((_,i) => (
            <div key={i} className="text-[10px] text-white/15 font-mono leading-5 h-5">{i+1}</div>
          ))}
        </div>
        <pre className="flex-1 py-3 px-4 text-[12px] font-mono leading-5 overflow-x-auto whitespace-pre text-emerald-300"
          style={{fontFamily:'"Fira Code","Cascadia Code","Consolas",monospace'}}>
          {code}
        </pre>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// OVERVIEW SECTION
// ─────────────────────────────────────────────────────────────────
function OverviewSection() {
  const [solvedCount] = useState(() => {
    try { return Object.values(JSON.parse(localStorage.getItem("array-solved")||"{}")).filter(Boolean).length; }
    catch { return 0; }
  });

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
        <div className="p-6 relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full -translate-y-12 translate-x-12 blur-2xl"/>
          <div className="relative">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 bg-blue-500/15 border border-blue-500/25 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                {arrays.emoji}
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-white tracking-tight">{arrays.name}</h2>
                <p className="text-white/40 text-sm mt-1 leading-5 max-w-xl">{arrays.definition.short}</p>
              </div>
            </div>
            {/* Analogy */}
            <div className="p-4 rounded-xl bg-indigo-500/8 border border-indigo-500/15 mb-4">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1.5">💡 Real World Analogy</p>
              <p className="text-sm text-white/60 leading-6">{arrays.definition.analogy}</p>
            </div>
            {/* Why learn */}
            <div className="flex items-start gap-2.5 p-4 rounded-xl bg-amber-500/6 border border-amber-500/15">
              <FiAlertTriangle className="text-amber-400 text-sm flex-shrink-0 mt-0.5"/>
              <p className="text-sm text-white/60 leading-6">{arrays.whyLearn.importance}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label:"Total Problems", value:arrays.total,       color:"text-blue-400",    icon:"🎯" },
          { label:"Solved",         value:solvedCount,        color:"text-emerald-400", icon:"✅" },
          { label:"Patterns",       value:arrays.patterns.length, color:"text-violet-400",icon:"🧩" },
          { label:"Languages",      value:arrays.languages.length,color:"text-amber-400", icon:"💻" },
        ].map((s,i) => (
          <div key={i} className="rounded-2xl border border-white/[0.07] bg-[#0d1117] p-4 text-center">
            <div className="text-xl mb-1.5">{s.icon}</div>
            <p className={`text-2xl font-extrabold tabular-nums ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-white/25 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Complexity Table */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.06] bg-[#161b22]">
          <FiBarChart2 className="text-blue-400 text-sm"/>
          <p className="font-bold text-white/70 text-sm">Time & Space Complexity</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="text-left px-5 py-2.5 font-bold text-white/30 uppercase tracking-wider text-[10px]">Operation</th>
                <th className="px-5 py-2.5 font-bold text-white/30 uppercase tracking-wider text-[10px]">Time</th>
                <th className="px-5 py-2.5 font-bold text-white/30 uppercase tracking-wider text-[10px]">Space</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {arrays.definition.complexity.map((row, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-white/65 font-medium">{row.op}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                      row.time.includes("O(1)")?"text-emerald-300 bg-emerald-500/10":
                      row.time.includes("O(n)")?"text-amber-300 bg-amber-500/10":
                      "text-blue-300 bg-blue-500/10"
                    }`}>{row.time}</span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="font-mono text-white/35">{row.space}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Properties */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] p-5">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-4">Key Properties</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {arrays.definition.properties.map((prop, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.025] border border-white/[0.05]">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5"/>
              <p className="text-xs text-white/55 leading-5">{prop}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning objectives */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] p-5">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-4">Learning Objectives</p>
        <div className="space-y-2.5">
          {arrays.learningObjectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-indigo-600/20 text-indigo-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</div>
              <p className="text-sm text-white/60 leading-5">{obj}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Use cases */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] p-5">
        <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-4">Real World Use Cases</p>
        <div className="grid sm:grid-cols-2 gap-2">
          {arrays.whyLearn.useCases.map((uc, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <FiCheckCircle className="text-emerald-400 text-xs flex-shrink-0 mt-0.5"/>
              <p className="text-xs text-white/50 leading-5">{uc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SYNTAX SECTION — language tabs
// ─────────────────────────────────────────────────────────────────
function SyntaxSection() {
  const [activeLang, setActiveLang] = useState(0);
  const lang = arrays.languages[activeLang];

  return (
    <div className="space-y-4">
      {/* Lang tabs */}
      <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
        {arrays.languages.map((l, i) => (
          <button key={i} onClick={() => setActiveLang(i)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeLang===i ? "bg-[#161b22] text-white shadow-sm" : "text-white/30 hover:text-white/60"
            }`}>
            <span>{l.emoji}</span>
            <span className="hidden sm:inline">{l.lang}</span>
          </button>
        ))}
      </div>

      {/* Code */}
      <CodeBlock code={lang.syntax} lang={lang.lang.toLowerCase()} title={`arrays.${lang.lang === "SQL" ? "sql" : lang.lang === "JavaScript" ? "js" : lang.lang === "Java" ? "java" : lang.lang === "C++" ? "cpp" : "py"}`}/>

      {/* Quick reference badge */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.025] border border-white/[0.05]">
        <FiCode className="text-white/20 text-sm flex-shrink-0"/>
        <p className="text-xs text-white/35 leading-5">
          <strong className="text-white/55">{lang.emoji} {lang.lang}</strong> — Full syntax reference with time complexity annotations.
          Copy, run, and experiment in your IDE.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PATTERNS SECTION
// ─────────────────────────────────────────────────────────────────
function PatternsSection() {
  const [activePattern, setActivePattern] = useState(0);
  const p = arrays.patterns[activePattern];

  return (
    <div className="space-y-4">
      {/* Pattern selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {arrays.patterns.map((pat, i) => (
          <button key={i} onClick={() => setActivePattern(i)}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              activePattern===i
                ? "border-indigo-500/35 bg-indigo-600/10"
                : "border-white/[0.07] bg-[#0d1117] hover:border-white/15"
            }`}>
            <p className="text-base mb-1">{pat.emoji}</p>
            <p className={`text-xs font-bold leading-tight ${activePattern===i?"text-white":"text-white/55"}`}>{pat.name}</p>
            <p className="text-[10px] text-white/20 mt-1 font-mono">{pat.timeComplexity}</p>
          </button>
        ))}
      </div>

      {/* Pattern detail */}
      {p && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/[0.06] bg-[#161b22]">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{p.emoji}</span>
                <div>
                  <h3 className="font-extrabold text-white text-base">{p.name}</h3>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-[10px] text-white/30 font-mono bg-white/[0.04] px-2 py-0.5 rounded">Time: {p.timeComplexity}</span>
                    <span className="text-[10px] text-white/30 font-mono bg-white/[0.04] px-2 py-0.5 rounded">Space: {p.spaceComplexity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* When to use / avoid */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-emerald-500/6 border border-emerald-500/15">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">✅ Use When</p>
                  <p className="text-xs text-white/55 leading-5">{p.when}</p>
                </div>
                <div className="p-4 rounded-xl bg-red-500/6 border border-red-500/15">
                  <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">❌ Avoid When</p>
                  <p className="text-xs text-white/55 leading-5">{p.avoid}</p>
                </div>
              </div>

              {/* Steps */}
              <div>
                <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-3">Steps to Apply</p>
                <div className="space-y-2">
                  {p.steps.map((step, si) => (
                    <div key={si} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{si+1}</span>
                      <p className="text-sm text-white/60 leading-5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Template code */}
              <div>
                <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-3">Code Template</p>
                <CodeBlock code={p.template} title={`${p.name.toLowerCase().replace(/\s+/g,"_")}_template.py`}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PROBLEMS SECTION — LeetCode style
// ─────────────────────────────────────────────────────────────────
function ProblemsSection() {
  const [activeProb, setActiveProb]     = useState(0);
  const [activeApproach, setActiveApproach] = useState(null);
  const [solved, setSolved]             = useState(() => {
    try { return JSON.parse(localStorage.getItem("array-solved")||"{}"); }
    catch { return {}; }
  });
  const [aiLoading, setAiLoading]       = useState(false);
  const [aiHint, setAiHint]             = useState("");
  const [showAI, setShowAI]             = useState(false);

  const prob = arrays.problems[activeProb];

  const toggleSolved = (name) => {
    const next = { ...solved, [name]: !solved[name] };
    setSolved(next);
    try { localStorage.setItem("array-solved", JSON.stringify(next)); } catch {}
  };

  const getAIHint = async () => {
    setAiLoading(true); setShowAI(true); setAiHint("");
    try {
      const d = await api.chat(`You are a coding interview coach.

Problem: ${prob.name}
Statement: ${prob.statement}
Example: ${prob.example}

Student asked for a hint. Give:
1. One key insight (1 sentence, no spoilers)
2. The right thinking pattern to use
3. One follow-up question to guide them

Keep it under 100 words. No code yet.`);
      setAiHint(d.response || "");
    } catch { setAiHint("Failed to get hint. Try again."); }
    setAiLoading(false);
  };

  const doneCnt = arrays.problems.filter(p => solved[p.name]).length;

  return (
    <div className="flex gap-4 min-h-[600px]">

      {/* LEFT: Problem list */}
      <div className="w-52 flex-shrink-0 flex flex-col gap-1">
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-[10px] font-bold text-white/25 uppercase tracking-wider">{arrays.problems.length} problems</span>
          <span className="text-[10px] font-bold text-emerald-400">{doneCnt} done</span>
        </div>
        {arrays.problems.map((p, i) => {
          const ds = DIFF_STYLE[p.difficulty] || DIFF_STYLE.Medium;
          const isActive = activeProb === i;
          const isDone   = !!solved[p.name];
          return (
            <button key={i} onClick={() => { setActiveProb(i); setActiveApproach(null); setShowAI(false); setAiHint(""); }}
              className={`w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all ${
                isActive
                  ? "border-indigo-500/30 bg-indigo-600/10"
                  : "border-transparent hover:bg-white/[0.03] hover:border-white/[0.07]"
              }`}>
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                isDone ? "bg-emerald-500 border-emerald-500" : "border-white/15"
              }`}>
                {isDone && <FiCheck className="text-white text-[8px]"/>}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-[11px] font-semibold leading-tight truncate ${isActive?"text-white":"text-white/55"}`}>{p.name}</p>
              </div>
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ds.dot}`}/>
            </button>
          );
        })}

        {/* Practice links */}
        <div className="mt-4 space-y-1.5">
          <p className="text-[10px] font-bold text-white/15 uppercase tracking-wider px-1 mb-2">Practice More</p>
          {arrays.practice_links.slice(0,4).map((pl, i) => (
            <a key={i} href={pl.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.025] border border-white/[0.05] hover:border-white/15 transition-all group">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${pl.color}`}/>
              <p className="text-[10px] text-white/40 group-hover:text-white/70 truncate">{pl.platform}</p>
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT: Problem detail */}
      {prob && (
        <div className="flex-1 min-w-0 space-y-4 overflow-y-auto">

          {/* Problem header */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
            <div className="px-5 py-4 bg-[#161b22] border-b border-white/[0.06]">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <DiffBadge diff={prob.difficulty}/>
                    {prob.platforms.map((plat, pi) => (
                      <a key={pi} href={plat.url} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-white/35 hover:text-white/70 hover:border-white/20 transition-all flex items-center gap-1">
                        {plat.id} <FiExternalLink className="text-[8px]"/>
                      </a>
                    ))}
                  </div>
                  <h3 className="font-extrabold text-white text-base">{prob.name}</h3>
                </div>
                <button onClick={() => toggleSolved(prob.name)}
                  className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg border flex-shrink-0 transition-all ${
                    solved[prob.name]
                      ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-300"
                      : "bg-white/[0.03] border-white/[0.07] text-white/30 hover:border-emerald-500/25 hover:text-emerald-400"
                  }`}>
                  <FiCheck className="text-xs"/> {solved[prob.name] ? "Solved ✓" : "Mark Solved"}
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm text-white/70 leading-6">{prob.statement}</p>

              {/* Example */}
              <div className="rounded-xl bg-white/[0.025] border border-white/[0.05] overflow-hidden">
                <div className="px-4 py-2 bg-white/[0.02] border-b border-white/[0.04]">
                  <span className="text-[10px] font-bold text-white/25 uppercase tracking-wider">Example</span>
                </div>
                <div className="px-4 py-3 font-mono text-xs text-white/60 leading-6">{prob.example}</div>
              </div>

              {/* Constraints */}
              <div className="flex flex-wrap gap-2">
                {prob.constraints.map((c, ci) => (
                  <span key={ci} className="text-[10px] font-mono bg-white/[0.04] border border-white/[0.06] text-white/35 px-2.5 py-1 rounded-lg">{c}</span>
                ))}
              </div>

              {/* Companies */}
              <div>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-wider mb-2">Asked at</p>
                <div className="flex flex-wrap gap-1.5">
                  {prob.companies.map((co, ci) => (
                    <span key={ci} className="text-[10px] bg-white/[0.03] border border-white/[0.07] text-white/40 px-2 py-0.5 rounded">{co}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Approaches */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest px-1">
              {prob.approaches.length} Approaches — Click to expand
            </p>
            {prob.approaches.map((appr, ai) => {
              const isOpen = activeApproach === ai;
              return (
                <div key={ai} className={`rounded-2xl border transition-all ${
                  isOpen ? "border-indigo-500/25" : "border-white/[0.07]"
                } bg-[#0d1117] overflow-hidden`}>
                  <button onClick={() => setActiveApproach(isOpen ? null : ai)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors">
                    <span className="text-xl flex-shrink-0">{appr.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="font-bold text-sm text-white/80">{appr.title}</p>
                        <TagBadge tag={appr.tag}/>
                      </div>
                      <p className="text-[11px] text-white/30 font-mono">{appr.complexity}</p>
                    </div>
                    <FiChevronDown className={`text-white/25 flex-shrink-0 transition-transform ${isOpen?"rotate-180":""}`}/>
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/[0.06] p-5 space-y-4">
                      {/* Idea */}
                      <div className="p-4 rounded-xl bg-indigo-500/6 border border-indigo-500/15">
                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1.5">Core Idea</p>
                        <p className="text-sm text-white/60 leading-6">{appr.idea}</p>
                      </div>
                      {/* When to use */}
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.025] border border-white/[0.05]">
                        <span className="text-[10px] font-bold text-white/25 uppercase tracking-wider flex-shrink-0">When:</span>
                        <p className="text-[11px] text-white/50">{appr.when}</p>
                      </div>
                      {/* Code */}
                      <CodeBlock code={appr.code} title={`approach_${ai+1}_${appr.tag.toLowerCase().replace(/[^a-z0-9]/g,"_")}.py`}/>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* AI Hints + Follow-ups */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
            <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.06] bg-[#161b22]">
              <FiZap className="text-indigo-400 text-sm"/>
              <p className="font-bold text-white/70 text-sm">AI Hints & Interview Prep</p>
            </div>
            <div className="p-5 space-y-4">
              {/* Get hint button */}
              <button onClick={getAIHint} disabled={aiLoading}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600/15 border border-indigo-500/25 text-indigo-300 text-xs font-bold hover:bg-indigo-600/25 transition-all disabled:opacity-40">
                {aiLoading
                  ? <><div className="w-3 h-3 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin"/> Getting hint...</>
                  : <><FiZap className="text-xs"/> Get AI Hint (no spoilers)</>
                }
              </button>

              {showAI && (
                <div className="p-4 rounded-xl bg-indigo-500/6 border border-indigo-500/15">
                  {aiLoading ? (
                    <div className="flex items-center gap-2 text-white/30 text-xs">
                      <div className="w-3 h-3 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"/>
                      Crafting hint...
                    </div>
                  ) : (
                    <div className="text-sm text-white/65 leading-6">{aiHint}</div>
                  )}
                </div>
              )}

              {/* Static hints */}
              <div>
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-wider mb-2">Starter Hints</p>
                {prob.ai.hints.map((hint, hi) => (
                  <div key={hi} className="flex items-start gap-2 mb-1.5">
                    <span className="text-amber-400 text-xs flex-shrink-0 mt-0.5">💡</span>
                    <p className="text-xs text-white/45 leading-5">{hint}</p>
                  </div>
                ))}
              </div>

              {/* Interview questions */}
              {prob.ai.interviewQuestions?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-wider mb-2">Interview Follow-ups</p>
                  {prob.ai.interviewQuestions.map((q, qi) => (
                    <div key={qi} className="flex items-start gap-2 mb-1.5">
                      <FiArrowRight className="text-indigo-400 text-xs flex-shrink-0 mt-0.5"/>
                      <p className="text-xs text-white/45 leading-5">{q}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Follow-up problems */}
              {prob.ai.followUps?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-wider mb-2">Related Problems</p>
                  <div className="flex flex-wrap gap-2">
                    {prob.ai.followUps.map((fu, fi) => (
                      <span key={fi} className="text-[11px] bg-white/[0.03] border border-white/[0.07] text-white/40 px-2.5 py-1 rounded-lg">{fu}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// QUIZ SECTION
// ─────────────────────────────────────────────────────────────────
function QuizSection() {
  const [current, setCurrent]   = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore]       = useState(0);
  const [done, setDone]         = useState(false);
  const [answers, setAnswers]   = useState([]);

  const q = arrays.quiz[current];

  const choose = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.answer;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { q: q.q, chosen: idx, correct, answer: q.answer }]);
  };

  const next = () => {
    if (current < arrays.quiz.length - 1) { setCurrent(c => c+1); setSelected(null); }
    else setDone(true);
  };

  const restart = () => { setCurrent(0); setSelected(null); setScore(0); setDone(false); setAnswers([]); };

  if (done) {
    const pct = Math.round((score / arrays.quiz.length) * 100);
    return (
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] p-8 text-center">
          <div className="text-6xl font-extrabold mb-2"
            style={{color: pct>=80?"#22c55e":pct>=60?"#eab308":"#ef4444"}}>
            {score}/{arrays.quiz.length}
          </div>
          <p className="text-white/50 text-lg font-semibold mb-1">
            {pct>=80?"🎉 Excellent!":pct>=60?"👍 Good effort":pct>=40?"📚 Keep practicing":"💪 Review the concepts"}
          </p>
          <p className="text-white/30 text-sm mb-6">{pct}% correct</p>
          <button onClick={restart}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all mx-auto">
            <FiRefreshCw className="text-sm"/> Retake Quiz
          </button>
        </div>
        {/* Review */}
        <div className="space-y-3">
          {answers.map((a, i) => (
            <div key={i} className={`rounded-xl p-4 border ${a.correct?"border-emerald-500/20 bg-emerald-500/5":"border-red-500/20 bg-red-500/5"}`}>
              <div className="flex items-start gap-2 mb-2">
                {a.correct ? <FiCheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5"/> : <FiX className="text-red-400 flex-shrink-0 mt-0.5"/>}
                <p className="text-sm text-white/70 font-semibold">{a.q}</p>
              </div>
              <p className="text-xs text-white/40 ml-5">
                {a.correct ? "Correct" : `Your answer: ${arrays.quiz[i].options[a.chosen]} → Correct: ${arrays.quiz[i].options[a.answer]}`}
              </p>
              {!a.correct && (
                <p className="text-xs text-white/35 mt-1.5 ml-5 italic">{arrays.quiz[i].explanation}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-2">
        {arrays.quiz.map((_,i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all ${
            i < current ? "bg-indigo-500" : i===current ? "bg-indigo-400 animate-pulse" : "bg-white/[0.07]"
          }`}/>
        ))}
        <span className="text-[10px] text-white/25 font-mono flex-shrink-0">{current+1}/{arrays.quiz.length}</span>
      </div>

      {/* Question card */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
        <div className="px-6 py-5 bg-[#161b22] border-b border-white/[0.06]">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 bg-indigo-600/20 text-indigo-300 text-[11px] font-bold rounded-full flex items-center justify-center">{current+1}</span>
            <span className="text-[10px] text-white/20 font-bold uppercase tracking-wider">Question</span>
          </div>
          <p className="text-base font-bold text-white leading-6">{q.q}</p>
        </div>

        <div className="p-6 space-y-2.5">
          {q.options.map((opt, oi) => {
            const isChosen  = selected === oi;
            const isCorrect = oi === q.answer;
            const revealed  = selected !== null;
            return (
              <button key={oi} onClick={() => choose(oi)} disabled={revealed}
                className={`w-full text-left flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  !revealed
                    ? "border-white/[0.07] hover:border-indigo-500/30 hover:bg-indigo-500/5 bg-white/[0.02]"
                    : isCorrect
                    ? "border-emerald-500/40 bg-emerald-500/10"
                    : isChosen && !isCorrect
                    ? "border-red-500/40 bg-red-500/10"
                    : "border-white/[0.04] bg-white/[0.01] opacity-50"
                }`}>
                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  !revealed ? "border-white/15 text-white/30"
                  : isCorrect ? "border-emerald-500 bg-emerald-500 text-white"
                  : isChosen ? "border-red-500 bg-red-500 text-white"
                  : "border-white/10 text-white/20"
                }`}>
                  {revealed ? (isCorrect ? "✓" : isChosen ? "✗" : String.fromCharCode(65+oi))
                    : String.fromCharCode(65+oi)}
                </div>
                <p className={`text-sm flex-1 ${revealed && isCorrect ? "text-emerald-300 font-semibold" : revealed && isChosen ? "text-red-300" : "text-white/65"}`}>{opt}</p>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {selected !== null && (
          <div className="px-6 pb-6 space-y-4">
            <div className={`p-4 rounded-xl border ${selected === q.answer ? "bg-emerald-500/8 border-emerald-500/20" : "bg-red-500/8 border-red-500/20"}`}>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                {selected === q.answer ? <><span className="text-emerald-400">✅</span><span className="text-emerald-400">Correct!</span></> : <><span className="text-red-400">❌</span><span className="text-red-400">Incorrect</span></>}
              </p>
              <p className="text-sm text-white/60 leading-6">{q.explanation}</p>
            </div>
            <button onClick={next}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all">
              {current < arrays.quiz.length - 1 ? "Next Question →" : "See Results →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TIPS SECTION
// ─────────────────────────────────────────────────────────────────
function TipsSection() {
  return (
    <div className="space-y-4 max-w-3xl">
      {/* Interview tips */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.06] bg-[#161b22]">
          <FiTarget className="text-indigo-400 text-sm"/>
          <p className="font-bold text-white/70 text-sm">Interview Tips</p>
        </div>
        <div className="p-5 space-y-3">
          {arrays.interviewTips.map((tip, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.025] border border-white/[0.05]">
              <span className="w-6 h-6 rounded-full bg-indigo-600/15 text-indigo-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>
              <p className="text-sm text-white/60 leading-5">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Common mistakes */}
      <div className="rounded-2xl border border-red-500/15 bg-red-500/5 overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-red-500/10 bg-red-500/5">
          <FiAlertTriangle className="text-red-400 text-sm"/>
          <p className="font-bold text-red-300 text-sm">Common Mistakes to Avoid</p>
        </div>
        <div className="p-5 space-y-3">
          {arrays.mistakes.map((mistake, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <FiX className="text-red-400 text-xs flex-shrink-0 mt-0.5"/>
              <p className="text-sm text-white/55 leading-5">{mistake}</p>
            </div>
          ))}
        </div>
      </div>

      {/* All practice links */}
      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
        <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.06] bg-[#161b22]">
          <FiTrendingUp className="text-emerald-400 text-sm"/>
          <p className="font-bold text-white/70 text-sm">Practice Platforms</p>
        </div>
        <div className="p-5 grid sm:grid-cols-2 gap-3">
          {arrays.practice_links.map((pl, i) => (
            <a key={i} href={pl.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.025] border border-white/[0.05] hover:border-white/15 transition-all group">
              <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${pl.color}`}/>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white/70 group-hover:text-white transition-colors truncate">{pl.platform}</p>
                <p className="text-[10px] text-white/25 mt-0.5">{pl.problems}</p>
              </div>
              {pl.recommended && <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">⭐ Top</span>}
              <FiExternalLink className="text-white/15 group-hover:text-white/40 transition-colors text-xs flex-shrink-0"/>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function ArrayMastery() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":  return <OverviewSection/>;
      case "syntax":    return <SyntaxSection/>;
      case "patterns":  return <PatternsSection/>;
      case "problems":  return <ProblemsSection/>;
      case "quiz":      return <QuizSection/>;
      case "tips":      return <TipsSection/>;
      default:          return <OverviewSection/>;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#060810] -mx-4 sm:-mx-6 -mt-4">

        {/* ── TOP BAR ── */}
        <div className="sticky top-0 z-20 bg-[#060810]/95 backdrop-blur-xl border-b border-white/[0.07]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Breadcrumb + title */}
            <div className="flex items-center gap-3 py-3.5 border-b border-white/[0.05]">
              <div className="w-9 h-9 bg-blue-500/15 border border-blue-500/25 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {arrays.emoji}
              </div>
              <div>
                <h1 className="font-extrabold text-white text-sm leading-tight">{arrays.name}</h1>
                <p className="text-[10px] text-white/30 mt-0.5">
                  {arrays.total} problems · {arrays.patterns.length} patterns · {arrays.languages.length} languages
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider hidden sm:block">Prerequisites:</span>
                <div className="flex gap-1.5 hidden sm:flex">
                  {arrays.prerequisites.slice(0,3).map((p,i) => (
                    <span key={i} className="text-[10px] bg-white/[0.04] border border-white/[0.07] text-white/30 px-2 py-0.5 rounded-full">{p}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab nav */}
            <div className="flex items-center gap-1 py-2 overflow-x-auto">
              {NAV_TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                    activeTab===tab.id
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/25"
                      : "text-white/35 hover:text-white/65 hover:bg-white/[0.04]"
                  }`}>
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          {renderContent()}
        </div>
      </div>
    </DashboardLayout>
  );
}