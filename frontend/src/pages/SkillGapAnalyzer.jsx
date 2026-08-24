import { useState, useRef } from "react";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  FiUser, FiGithub, FiLinkedin, FiGlobe, FiUpload,
  FiFileText, FiZap, FiTarget, FiCheck, FiX, FiAlertTriangle,
  FiArrowRight, FiBookOpen, FiTrendingUp, FiCode,
  FiCheckCircle, FiClock, FiStar, FiShield,
  FiExternalLink, FiChevronDown, FiChevronUp,
  FiRefreshCw, FiTrash2,
} from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────
const STEPS = [
  { id:"profile",  label:"Profile",     emoji:"👤" },
  { id:"resume",   label:"Resume",      emoji:"📄" },
  { id:"jd",       label:"Job Description", emoji:"📋" },
  { id:"projects", label:"Projects",    emoji:"🚀" },
  { id:"result",   label:"Analysis",    emoji:"📊" },
];

const SKILL_LEVELS = ["Beginner","Intermediate","Advanced","Expert"];
const CAREER_GOALS = ["Software Engineer","Full Stack Developer","Backend Developer","Frontend Developer","AI/ML Engineer","Data Scientist","DevOps Engineer","Mobile Developer"];
const DSA_LEVELS   = ["Just starting","Easy problems","Medium problems","Hard problems","Competitive level"];
const LANGS        = ["Python","JavaScript","TypeScript","Java","C++","C","Go","Rust","Kotlin","Swift","SQL","Dart"];

// ─────────────────────────────────────────────────────────────────
// GITHUB ANALYZER
// ─────────────────────────────────────────────────────────────────
async function analyzeGitHub(username) {
  if (!username.trim()) return null;
  const [reposRes, userRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
    fetch(`https://api.github.com/users/${username}`),
  ]);
  if (!reposRes.ok) throw new Error("GitHub user not found");
  const repos = await reposRes.json();
  const user  = await userRes.json();
  const langCounts = {};
  repos.forEach(r => { if (r.language) langCounts[r.language] = (langCounts[r.language]||0)+1; });
  const topLangs = Object.entries(langCounts).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([l,c])=>({lang:l,count:c}));
  const ownRepos   = repos.filter(r => !r.fork && !r.name.toLowerCase().includes("clone") && !r.name.toLowerCase().includes("tutorial"));
  const forkRepos  = repos.filter(r => r.fork);
  const cloneRepos = repos.filter(r => !r.fork && (r.name.toLowerCase().includes("clone")||r.name.toLowerCase().includes("copy")||r.name.toLowerCase().includes("tutorial")));
  const totalStars = repos.reduce((a,r)=>a+r.stargazers_count,0);
  return {
    username, name:user.name||username, avatar:user.avatar_url, bio:user.bio,
    followers:user.followers, public_repos:user.public_repos,
    topLangs, totalRepos:repos.length,
    ownRepos:ownRepos.length, forkRepos:forkRepos.length, cloneRepos:cloneRepos.length, totalStars,
    repos: repos.slice(0,12).map(r=>({
      name:r.name, description:r.description, stars:r.stargazers_count,
      language:r.language, isFork:r.fork,
      isClone:r.name.toLowerCase().includes("clone")||r.name.toLowerCase().includes("copy"),
      isTutorial:r.name.toLowerCase().includes("tutorial")||r.name.toLowerCase().includes("course"),
      url:r.html_url, updated:new Date(r.updated_at).toLocaleDateString(),
    })),
  };
}

// Extract text from uploaded resume file
async function extractResumeText(file) {
  const ext = file.name.split(".").pop().toLowerCase();
  if (ext === "txt") {
    return new Promise((res,rej) => {
      const reader = new FileReader();
      reader.onload = e => res(e.target.result);
      reader.onerror = () => rej(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }
  if (ext === "pdf") {
    try {
      let pdfjsLib;
      try { pdfjsLib = await import("pdfjs-dist"); }
      catch { pdfjsLib = await import("pdfjs-dist/build/pdf"); }
      try {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).href;
      } catch {
        try {
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).href;
        } catch { pdfjsLib.GlobalWorkerOptions.workerSrc = ""; }
      }
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data:new Uint8Array(buf), useWorkerFetch:false, isEvalSupported:false }).promise;
      let text = "";
      for (let i=1; i<=pdf.numPages; i++) {
        const page    = await pdf.getPage(i);
        const content = await page.getTextContent();
        let pageText  = ""; let lastY = null;
        for (const item of content.items) {
          if ("str" in item) {
            if (lastY !== null && Math.abs(item.transform[5]-lastY)>5) pageText += "\n";
            pageText += item.str + " "; lastY = item.transform[5];
          }
        }
        text += pageText + "\n";
      }
      const cleaned = text.replace(/\s{3,}/g,"  ").trim();
      if (!cleaned || cleaned.split(/\s+/).length < 10)
        throw new Error("No readable text in this PDF. Use a text-based PDF or paste as TXT.");
      return cleaned;
    } catch(err) {
      if (err.message.includes("Cannot find module")) throw new Error("PDF parsing needs pdfjs-dist — run: npm install pdfjs-dist");
      throw err;
    }
  }
  if (ext === "docx") {
    try {
      const mammoth = await import("mammoth");
      const buf     = await file.arrayBuffer();
      const result  = await mammoth.extractRawText({ arrayBuffer:buf });
      if (!result.value.trim()) throw new Error("No text found in DOCX.");
      return result.value;
    } catch(err) {
      if (err.message.includes("mammoth")) throw new Error("DOCX parsing needs mammoth — run: npm install mammoth");
      throw err;
    }
  }
  throw new Error("Unsupported format. Use PDF, DOCX, or TXT.");
}

// ─────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────
function ScoreRing({ score, size=120, stroke=10 }) {
  const r    = (size-stroke)/2;
  const circ = 2*Math.PI*r;
  const off  = circ*(1-score/100);
  const color= score>=75?"#22c55e":score>=50?"#eab308":score>=30?"#f97316":"#ef4444";
  const label= score>=75?"Strong Match":score>=50?"Moderate":score>=30?"Weak Match":"Poor Match";
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{width:size,height:size}}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={off}
          style={{transition:"stroke-dashoffset 1s ease",filter:`drop-shadow(0 0 8px ${color}60)`}}/>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold tabular-nums" style={{color}}>{score}%</span>
        <span className="text-[9px] font-bold text-white/30 uppercase tracking-wide">{label}</span>
      </div>
    </div>
  );
}

function StepIndicator({ current, completed }) {
  return (
    <div className="flex items-center">
      {STEPS.map((step,i) => {
        const isDone   = completed.includes(step.id);
        const isActive = current===step.id;
        const isLast   = i===STEPS.length-1;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 relative flex-shrink-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                isDone?"bg-emerald-500 border-emerald-500 text-white"
                :isActive?"bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                :"bg-white/[0.03] border-white/10 text-white/20"}`}>
                {isDone?<FiCheck className="text-xs"/>:<span className="text-xs">{step.emoji}</span>}
              </div>
              <span className={`text-[10px] font-bold whitespace-nowrap absolute -bottom-5 ${
                isActive?"text-white/70":isDone?"text-emerald-400":"text-white/20"}`}>
                {step.label}
              </span>
            </div>
            {!isLast&&<div className={`flex-1 h-px mx-2 transition-all ${isDone?"bg-emerald-500/50":"bg-white/[0.07]"}`}/>}
          </div>
        );
      })}
    </div>
  );
}

function AuthBadge({ repo }) {
  if (repo.isFork||repo.isClone) return <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/20">⚠️ Copied</span>;
  if (repo.isTutorial)           return <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/20">📘 Tutorial</span>;
  if (repo.stars>0)              return <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">⭐ Original</span>;
  return                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">✅ Own</span>;
}

function StepCard({ id, current, title, emoji, onToggle, badge, children }) {
  const isActive = current===id;
  return (
    <div className={`rounded-2xl border transition-all ${isActive?"border-indigo-500/25 shadow-lg shadow-indigo-500/5":"border-white/[0.07]"} bg-[#0d1117] overflow-hidden`}>
      <button onClick={onToggle} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${isActive?"bg-indigo-600/20":"bg-white/[0.04]"}`}>{emoji}</div>
        <p className={`font-bold text-sm flex-1 ${isActive?"text-white":"text-white/60"}`}>{title}</p>
        {badge&&<span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">{badge}</span>}
        {isActive?<FiChevronUp className="text-white/25 flex-shrink-0"/>:<FiChevronDown className="text-white/25 flex-shrink-0"/>}
      </button>
      {isActive&&<div className="px-5 pb-5 border-t border-white/[0.06]"><div className="pt-5">{children}</div></div>}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, icon }) {
  return (
    <div>
      <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest block mb-1.5 flex items-center gap-1.5">
        {icon&&<span className="text-white/25">{icon}</span>}{label}
      </label>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        className="w-full bg-[#161b22] border border-white/[0.07] text-white/65 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500/40 placeholder:text-white/15 transition-colors"/>
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest block mb-1.5">{label}</label>
      <select value={value} onChange={e=>onChange(e.target.value)}
        className="w-full bg-[#161b22] border border-white/[0.07] text-white/65 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500/40 transition-colors">
        {options.map(o=><option key={o} value={o}>{o||"Select..."}</option>)}
      </select>
    </div>
  );
}

function PriorityBadge({ p }) {
  const s = p==="high"?"bg-red-500/15 text-red-300 border-red-500/25"
    :p==="medium"?"bg-amber-500/15 text-amber-300 border-amber-500/25"
    :"bg-emerald-500/15 text-emerald-300 border-emerald-500/25";
  return <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${s}`}>{p}</span>;
}

// ─────────────────────────────────────────────────────────────────
// RESUME DROP ZONE
// ─────────────────────────────────────────────────────────────────
function ResumeDropZone({ file, onFile, onRemove, extracting }) {
  const [drag, setDrag] = useState(false);
  const inputRef        = useRef(null);

  const validate = (f) => {
    if (!f) return;
    const ext = f.name.split(".").pop().toLowerCase();
    if (!["pdf","doc","docx","txt"].includes(ext)) { toast.error("Use PDF, DOCX, or TXT"); return; }
    if (f.size > 5*1024*1024) { toast.error("File too large. Max 5MB"); return; }
    onFile(f);
  };

  if (file) return (
    <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/8 p-4 flex items-center gap-4">
      <div className="w-12 h-12 bg-emerald-500/15 rounded-2xl flex items-center justify-center flex-shrink-0">
        <FiFileText className="text-emerald-400 text-xl"/>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm truncate">{file.name}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-white/35 text-xs">{(file.size/1024).toFixed(0)} KB · {file.name.split(".").pop().toUpperCase()}</p>
          {extracting && <span className="text-indigo-400 text-xs animate-pulse font-semibold">· Extracting text...</span>}
        </div>
        {!extracting && <p className="text-emerald-400 text-[10px] font-bold mt-1">✓ Resume loaded successfully</p>}
      </div>
      <button onClick={onRemove}
        className="w-8 h-8 rounded-xl bg-white/5 hover:bg-red-500/15 hover:text-red-400 text-white/30 flex items-center justify-center transition-all flex-shrink-0">
        <FiTrash2 className="text-xs"/>
      </button>
    </div>
  );

  return (
    <div
      onDragOver={e=>{e.preventDefault();setDrag(true);}}
      onDragLeave={()=>setDrag(false)}
      onDrop={e=>{e.preventDefault();setDrag(false);validate(e.dataTransfer.files?.[0]);}}
      onClick={()=>inputRef.current?.click()}
      className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden group ${
        drag?"border-indigo-400 bg-indigo-500/10":"border-white/[0.10] hover:border-indigo-400/50 bg-white/[0.01] hover:bg-white/[0.02]"}`}>
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{backgroundImage:"linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",backgroundSize:"24px 24px"}}/>
      <div className="relative flex flex-col items-center justify-center py-10 px-6 text-center">
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all ${drag?"bg-indigo-500/20 scale-110":"bg-white/[0.04] group-hover:bg-indigo-500/10 group-hover:scale-105"}`}>
          <FiUpload className={`text-2xl transition-colors ${drag?"text-indigo-400":"text-white/20 group-hover:text-indigo-400"}`}/>
        </div>
        <p className="text-white/70 font-bold text-sm mb-1">
          {drag?"Drop your resume here":"Drag & drop your resume"}
        </p>
        <p className="text-white/25 text-xs mb-4">or click to browse files</p>
        <div className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all">
          <FiUpload className="text-xs"/> Choose Resume File
        </div>
        <p className="text-white/15 text-[10px] mt-3">PDF · DOCX · TXT · Max 5MB</p>
      </div>
      <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,.txt" hidden
        onChange={e=>validate(e.target.files?.[0])}/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────
export default function SkillGap() {
  const { user } = useAuth();

  const [step,       setStep]       = useState("profile");
  const [completed,  setCompleted]  = useState([]);

  // Profile
  const [github,      setGithub]      = useState("");
  const [linkedin,    setLinkedin]    = useState("");
  const [portfolio,   setPortfolio]   = useState("");
  const [name,        setName]        = useState(user?.full_name||"");
  const [careerGoal,  setCareerGoal]  = useState("");
  const [skillLevel,  setSkillLevel]  = useState("Intermediate");
  const [dsaLevel,    setDsaLevel]    = useState("Medium problems");
  const [selLangs,    setSelLangs]    = useState([]);
  const [extraSkills, setExtraSkills] = useState("");
  const [yoe,         setYoe]         = useState("Fresher");
  const [ghData,      setGhData]      = useState(null);
  const [ghLoading,   setGhLoading]   = useState(false);
  const [ghError,     setGhError]     = useState("");

  // Resume
  const [resumeFile,       setResumeFile]       = useState(null);
  const [resumeText,       setResumeText]        = useState("");
  const [resumeExtracting, setResumeExtracting]  = useState(false);
  const [resumePasteMode,  setResumePasteMode]   = useState(false);

  // JD
  const [jd, setJd] = useState("");

  // Projects
  const [projectNotes, setProjectNotes] = useState("");

  // Result
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleLang = (lang) =>
    setSelLangs(p=>p.includes(lang)?p.filter(l=>l!==lang):[...p,lang]);

  const fetchGitHub = async () => {
    if (!github.trim()) return;
    setGhLoading(true); setGhError(""); setGhData(null);
    try {
      const data = await analyzeGitHub(github.replace("https://github.com/","").replace(/\//g,"").trim());
      setGhData(data);
      const detected = data.topLangs.map(l=>l.lang).filter(l=>LANGS.includes(l));
      setSelLangs(prev=>[...new Set([...prev,...detected])]);
      toast.success(`✅ GitHub loaded — ${data.public_repos} repos`);
    } catch(err) { setGhError(err.message); toast.error(err.message); }
    setGhLoading(false);
  };

  const handleResumeFile = async (file) => {
    if (!file) return;
    setResumeFile(file); setResumeText(""); setResumeExtracting(true);
    try {
      const text = await extractResumeText(file);
      setResumeText(text);
      toast.success(`✅ Resume extracted — ${text.split(/\s+/).length} words`);
    } catch(err) {
      toast.error(err.message);
      setResumeFile(null);
    }
    setResumeExtracting(false);
  };

  const completeStep = (id) => setCompleted(p=>p.includes(id)?p:[...p,id]);
  const goToStep = (id) => { completeStep(step); setStep(id); };

  // ─────────────────────────────────────────────────────────────────
  // CLIENT-SIDE PRE-VALIDATION ENGINE
  // Runs BEFORE AI — detects resume/GitHub mismatch so AI can't ignore
  // ─────────────────────────────────────────────────────────────────
  const runPreValidation = () => {
    const resumeLower = resumeText.toLowerCase();
    const warnings    = [];
    const flags       = {};

    // 1. NAME CHECK — does resume mention the entered name?
    if (name.trim()) {
      const firstName = name.trim().split(/\s+/)[0].toLowerCase();
      if (firstName.length > 2 && !resumeLower.includes(firstName)) {
        warnings.push(`⚠️ Name "${name}" not found in resume — you may have uploaded someone else's resume`);
        flags.nameMismatch = true;
      }
    }

    // 2. GITHUB USERNAME CHECK — does resume mention the GitHub username?
    if (github.trim() && ghData) {
      const ghUser = github.trim().toLowerCase();
      if (!resumeLower.includes(ghUser) && !resumeLower.includes("github.com/" + ghUser)) {
        warnings.push(`⚠️ GitHub username "${github}" not found in resume — the GitHub profile may not belong to the resume owner`);
        flags.githubMismatch = true;
      }
    }

    // 3. LANGUAGE CONSISTENCY — languages on GitHub vs mentioned in resume
    if (ghData && ghData.topLangs.length > 0) {
      const ghTopLang   = ghData.topLangs[0]?.lang?.toLowerCase() || "";
      const resumeHasGhLang = ghTopLang && resumeLower.includes(ghTopLang);
      if (!resumeHasGhLang && ghTopLang) {
        warnings.push(`⚠️ GitHub's top language "${ghData.topLangs[0]?.lang}" is not mentioned in the resume — data sources may not match`);
        flags.languageMismatch = true;
      }
    }

    // 4. EMAIL CONSISTENCY — basic sanity
    const resumeHasEmail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i.test(resumeText);
    if (!resumeHasEmail) {
      warnings.push("ℹ️ No email found in resume — may be incomplete or scanned image");
      flags.noEmail = true;
    }

    // 5. RESUME MIN LENGTH CHECK
    const wordCount = resumeText.split(/\s+/).filter(Boolean).length;
    if (wordCount < 80) {
      warnings.push(`⚠️ Resume has only ${wordCount} words — too short to be a complete resume`);
      flags.tooShort = true;
    }

    // 6. SELF-REPORTED LANGS vs RESUME — do selected langs appear in resume?
    if (selLangs.length > 0) {
      const missingFromResume = selLangs.filter(l => !resumeLower.includes(l.toLowerCase()));
      if (missingFromResume.length > selLangs.length * 0.5) {
        warnings.push(`⚠️ You selected ${selLangs.join(", ")} but ${missingFromResume.join(", ")} not found in resume — selected skills may not match your actual resume`);
        flags.skillsNotInResume = true;
      }
    }

    return { warnings, flags };
  };

  const analyze = async () => {
    if (!resumeText.trim()) { toast.error("Please upload your resume first"); setStep("resume"); return; }
    if (!jd.trim())         { toast.error("Please paste a job description"); setStep("jd"); return; }

    // Run client-side validation BEFORE calling AI
    const { warnings, flags } = runPreValidation();

    // Show critical mismatches as blocking warnings
    if (flags.nameMismatch || flags.githubMismatch) {
      const proceed = window.confirm(
        `Potential data mismatch detected:\n\n${warnings.join("\n\n")}\n\n` +
        `This may cause incorrect analysis results.\n` +
        `Are you sure the resume and GitHub profile belong to the same person?\n\n` +
        `Click OK to continue anyway, or Cancel to fix the data.`
      );
      if (!proceed) return;
    }

    setLoading(true); setResult(null); completeStep("projects"); setStep("result");

    try {
      // Build SEPARATE, CLEARLY LABELLED data blocks so AI can't confuse them
      const resumeBlock = `
=== RESUME (uploaded file — SOURCE OF TRUTH for skills and experience) ===
${resumeText.slice(0, 4000)}
=== END RESUME ===`.trim();

      const githubBlock = ghData ? `
=== GITHUB PROFILE (github.com/${github}) ===
Name on GitHub: ${ghData.name}
Bio: ${ghData.bio || "None"}
Public repos: ${ghData.public_repos}
Original repos: ${ghData.ownRepos}
Forked repos: ${ghData.forkRepos}
Clones/Tutorial repos: ${ghData.cloneRepos}
Total stars: ${ghData.totalStars}
Top languages by repo count: ${ghData.topLangs.map(l=>`${l.lang}(${l.count})`).join(", ")}
Recent repos: ${ghData.repos.slice(0,6).map(r=>`${r.name}[${r.isFork?"FORK":r.isClone?"CLONE":r.isTutorial?"TUTORIAL":"ORIGINAL"}]${r.language?" ("+r.language+")":""}`).join(", ")}
=== END GITHUB ===` : "=== GITHUB: Not provided ===";

      const selfBlock = `
=== SELF-REPORTED INFO (what the student says about themselves) ===
Name entered: ${name || "Not entered"}
Career goal: ${careerGoal || "Not specified"}
Experience: ${yoe}
Self-rated skill level: ${skillLevel}
Self-rated DSA: ${dsaLevel}
Self-selected languages: ${selLangs.join(", ") || "None selected"}
Additional skills claimed: ${extraSkills || "None"}
Extra project notes: ${projectNotes || "None"}
LinkedIn: ${linkedin || "Not provided"}
Portfolio: ${portfolio || "Not provided"}
=== END SELF-REPORTED ===`;

      const validationBlock = warnings.length > 0 ? `
=== PRE-VALIDATION FLAGS (detected automatically — MUST factor into scoring) ===
${warnings.join("\n")}
${flags.nameMismatch ? "CRITICAL: Name mismatch — resume may not belong to this person" : ""}
${flags.githubMismatch ? "CRITICAL: GitHub not linked in resume — these may be different people's data" : ""}
${flags.languageMismatch ? "WARNING: GitHub languages don't match resume — inconsistency detected" : ""}
${flags.skillsNotInResume ? "WARNING: Self-selected skills not found in resume text — may be inflated" : ""}
=== END FLAGS ===` : "=== PRE-VALIDATION: No mismatches detected ===";

      const jdBlock = `
=== JOB DESCRIPTION ===
${jd}
=== END JD ===`;

      const prompt = `You are a strict senior engineering recruiter at a top tech company (Google/Amazon level). Your job is to give BRUTALLY HONEST, ACCURATE assessment.

CRITICAL INSTRUCTIONS — READ CAREFULLY:
1. The RESUME is the PRIMARY source of truth for skills. Only count skills that APPEAR in the resume text.
2. Self-reported data (languages selected, skill level) is SUPPLEMENTARY — do NOT treat it as proof of skill.
3. GitHub data is SEPARATE from the resume. If the GitHub username is not in the resume, note this inconsistency.
4. If pre-validation flags show mismatches, PENALIZE the match score significantly and call it out.
5. Do NOT give high scores (>75) unless the resume CLEARLY demonstrates those skills.
6. Be specific — reference actual text from the resume in your analysis.
7. A fresher resume claiming senior-level skills gets a lower score, not higher.

${validationBlock}

${resumeBlock}

${githubBlock}

${selfBlock}

${jdBlock}

SCORING RULES:
- Base the match_score ONLY on what the RESUME says vs what the JD requires
- If GitHub and resume belong to different people (name mismatch): deduct 20 points and flag it
- If resume is too short (<100 words): deduct 15 points
- If self-selected skills don't appear in resume: ignore those skills in scoring
- Do NOT inflate scores — a weak resume gets 20-40, an average one gets 40-65, a strong one 65-85

Return ONLY valid JSON (no markdown, no backticks):
{
  "match_score": <0-100, strictly based on RESUME text vs JD — not self-reported data>,
  "role": "<job title from JD>",
  "company_type": "<startup|product|service|MNC>",
  "experience_required": "<what JD requires>",
  "verdict": "<2 brutally honest sentences referencing specific resume content and gaps>",

  "data_integrity": {
    "resume_github_match": <true|false — does GitHub username appear in resume?>,
    "name_in_resume": <true|false — does entered name appear in resume?>,
    "flags": ["<any mismatch or warning detected>"],
    "integrity_score": <0-100 — how consistent are all data sources>
  },

  "matched_skills": ["<skill that APPEARS IN RESUME TEXT and is required by JD>"],
  "missing_skills": [
    {
      "skill": "<exact skill name from JD>",
      "priority": "<high|medium|low>",
      "in_resume": <true|false>,
      "why": "<why JD needs this>",
      "learn_in": "<realistic weeks>",
      "resource": "<specific free resource>"
    }
  ],

  "strengths": ["<specific strength with reference to resume text>"],
  "gaps": ["<specific honest gap — reference what JD wants vs what resume shows>"],

  "resume_quality": {
    "score": <0-100>,
    "word_count": <number>,
    "has_metrics": <true|false — does resume have numbers/% achievements?>,
    "has_projects": <true|false>,
    "has_links": <true|false — GitHub/LinkedIn/portfolio in resume?>,
    "issues": ["<specific resume writing problem>"],
    "rewrites": [{"before": "<weak resume line>", "after": "<improved version>"}]
  },

  "project_authenticity": {
    "score": <0-100>,
    "verdict": "<honest assessment — cross-reference GitHub repos with resume projects>",
    "resume_projects_found": ["<project mentioned in resume>"],
    "github_vs_resume_match": "<do GitHub repos align with what resume claims?>",
    "issues": ["<specific inconsistency between GitHub and resume>"],
    "suggestions": ["<specific project to build for this role>"]
  },

  "resume_keywords": ["<exact keyword from JD missing from resume text>"],

  "learning_path": [
    {"week": 1, "focus": "<highest priority missing skill>", "task": "<specific daily action>", "resource": "<resource>"},
    {"week": 2, "focus": "<topic>", "task": "<specific action>", "resource": "<resource>"},
    {"week": 3, "focus": "<topic>", "task": "<specific action>", "resource": "<resource>"},
    {"week": 4, "focus": "<topic>", "task": "<specific action>", "resource": "<resource>"},
    {"week": 5, "focus": "<topic>", "task": "<specific action>", "resource": "<resource>"},
    {"week": 6, "focus": "<topic>", "task": "<specific action>", "resource": "<resource>"}
  ],

  "interview_topics": [
    {"topic": "<name>", "importance": "high|medium", "tip": "<specific prep tip based on resume gaps>"}
  ],

  "salary_expectation": "<realistic range for THIS resume — not generic>",
  "readiness": "not_ready|with_prep|almost_ready|ready",
  "timeline_to_ready": "<realistic estimate>"
}`;

      const data = await api.chat(prompt);
      const raw  = (data.response||"").trim().replace(/```json|```/g,"").trim();
      const parsed = JSON.parse(raw);

      // Client-side score cap if mismatches detected
      if (flags.nameMismatch && parsed.match_score > 50) {
        parsed.match_score = Math.min(parsed.match_score, 45);
        parsed.verdict = "⚠️ Data mismatch detected: " + parsed.verdict;
      }
      if (flags.githubMismatch && parsed.match_score > 60) {
        parsed.match_score = Math.min(parsed.match_score, 55);
      }

      setResult(parsed);
    } catch(e) {
      console.error(e);
      toast.error("Analysis failed. Please check your inputs and try again.");
    }
    setLoading(false);
  };

  // ─────────────────────────────────────────────────────────────────
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#060810] -mx-4 sm:-mx-6 -mt-4 px-4 sm:px-6 pb-12">

        {/* HEADER */}
        <div className="max-w-5xl mx-auto pt-8 mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-600/12 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-4">
            <FiZap className="text-xs"/> AI Skill Gap Analyzer
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mb-1.5">
            Match Your Resume to Any Job
          </h1>
          <p className="text-white/40 text-sm">
            Upload resume → paste JD → get an honest gap analysis with 6-week learning plan
          </p>
        </div>

        {/* STEP INDICATOR */}
        <div className="max-w-5xl mx-auto mb-14 pt-2">
          <StepIndicator current={step} completed={completed}/>
        </div>

        <div className="max-w-5xl mx-auto space-y-4">

          {/* ══ STEP 1: PROFILE ══ */}
          <StepCard id="profile" current={step} title="Your Profile" emoji="👤"
            onToggle={()=>setStep(step==="profile"?"":"profile")}
            badge={selLangs.length>0?`${selLangs.length} skills`:null}>
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="Your Name" value={name} onChange={setName} placeholder="Rahul Kumar"/>
                <SelectField label="Career Goal" value={careerGoal} onChange={setCareerGoal} options={["", ...CAREER_GOALS]}/>
                <SelectField label="Experience" value={yoe} onChange={setYoe} options={["Fresher","0–1 yr","1–2 yr","2–4 yr","4+ yr"]}/>
                <SelectField label="Skill Level" value={skillLevel} onChange={setSkillLevel} options={SKILL_LEVELS}/>
              </div>
              <SelectField label="DSA Level" value={dsaLevel} onChange={setDsaLevel} options={DSA_LEVELS}/>
              <div>
                <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest block mb-2">Languages You Know</label>
                <div className="flex flex-wrap gap-2">
                  {LANGS.map(lang=>(
                    <button key={lang} onClick={()=>toggleLang(lang)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                        selLangs.includes(lang)?"bg-indigo-600/20 border-indigo-500/40 text-indigo-300"
                        :"bg-white/[0.03] border-white/10 text-white/35 hover:border-white/25 hover:text-white/60"}`}>
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <InputField label="Other Skills / Frameworks / Tools" value={extraSkills} onChange={setExtraSkills}
                placeholder="React, FastAPI, Docker, AWS, Machine Learning..."/>
              {/* GitHub */}
              <div>
                <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                  <FiGithub className="text-xs text-white/30"/> GitHub Username
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center bg-[#161b22] border border-white/[0.07] rounded-xl overflow-hidden focus-within:border-indigo-500/40">
                    <span className="px-3 text-white/20 text-sm font-mono flex-shrink-0">github.com/</span>
                    <input value={github} onChange={e=>setGithub(e.target.value)}
                      onKeyDown={e=>e.key==="Enter"&&fetchGitHub()}
                      placeholder="yourusername"
                      className="flex-1 bg-transparent text-white/70 text-sm outline-none py-2.5 pr-3 placeholder:text-white/15"/>
                  </div>
                  <button onClick={fetchGitHub} disabled={ghLoading||!github.trim()}
                    className="px-4 py-2.5 rounded-xl bg-[#161b22] border border-white/[0.07] text-white/50 hover:text-white/80 hover:border-indigo-500/30 text-xs font-bold transition-all disabled:opacity-30">
                    {ghLoading?<div className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"/>:"Fetch →"}
                  </button>
                </div>
                {ghError&&<p className="text-xs text-red-400 mt-1.5">{ghError}</p>}
                {ghData&&(
                  <div className="mt-3 rounded-xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
                    <div className="flex items-center gap-3 p-4 border-b border-white/[0.05]">
                      <img src={ghData.avatar} alt={ghData.name} className="w-10 h-10 rounded-full flex-shrink-0"/>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white text-sm">{ghData.name}</p>
                        {ghData.bio&&<p className="text-xs text-white/35 truncate">{ghData.bio}</p>}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-center"><p className="text-xs font-bold text-white/70">{ghData.public_repos}</p><p className="text-[9px] text-white/25">Repos</p></div>
                        <div className="text-center"><p className="text-xs font-bold text-amber-400">{ghData.totalStars}⭐</p><p className="text-[9px] text-white/25">Stars</p></div>
                      </div>
                    </div>
                    {ghData.topLangs.length>0&&(
                      <div className="p-4">
                        <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider mb-2">Auto-detected languages</p>
                        <div className="flex flex-wrap gap-2">
                          {ghData.topLangs.map(({lang,count})=>(
                            <div key={lang} className="flex items-center gap-1.5 text-xs bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-lg">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"/>
                              <span className="text-white/60 font-mono">{lang}</span>
                              <span className="text-white/20">×{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* LinkedIn + Portfolio */}
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="LinkedIn" value={linkedin} onChange={setLinkedin}
                  placeholder="linkedin.com/in/yourname" icon={<FiLinkedin className="text-xs"/>}/>
                <InputField label="Portfolio" value={portfolio} onChange={setPortfolio}
                  placeholder="yourportfolio.com" icon={<FiGlobe className="text-xs"/>}/>
              </div>
              <button onClick={()=>goToStep("resume")}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all">
                Continue to Resume <FiArrowRight/>
              </button>
            </div>
          </StepCard>

          {/* ══ STEP 2: RESUME ══ */}
          <StepCard id="resume" current={step} title="Your Resume" emoji="📄"
            onToggle={()=>setStep(step==="resume"?"":"resume")}
            badge={resumeText?`${resumeText.split(/\s+/).length} words`:null}>
            <div className="space-y-5">

              {/* Mode toggle */}
              <div className="flex items-center gap-1 p-1 bg-white/[0.04] rounded-xl border border-white/[0.06]">
                {[
                  {id:false, label:"Upload File",  icon:<FiUpload className="text-xs"/>},
                  {id:true,  label:"Paste Text",   icon:<FiFileText className="text-xs"/>},
                ].map(m=>(
                  <button key={String(m.id)} onClick={()=>{setResumePasteMode(m.id);setResumeFile(null);setResumeText("");}}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      resumePasteMode===m.id?"bg-indigo-600 text-white shadow-sm":"text-white/30 hover:text-white/60"}`}>
                    {m.icon}{m.label}
                  </button>
                ))}
              </div>

              {!resumePasteMode ? (
                /* Upload mode */
                <div className="space-y-4">
                  <ResumeDropZone
                    file={resumeFile}
                    onFile={handleResumeFile}
                    onRemove={()=>{setResumeFile(null);setResumeText("");}}
                    extracting={resumeExtracting}
                  />

                  {/* Resume text preview after extraction */}
                  {resumeText && !resumeExtracting && (
                    <div className="rounded-xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/[0.06]">
                        <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider">Extracted Text Preview</span>
                        <span className="text-[10px] text-emerald-400 font-bold">{resumeText.split(/\s+/).length} words extracted</span>
                      </div>
                      <div className="p-4 max-h-40 overflow-y-auto">
                        <pre className="text-xs text-white/40 leading-5 font-mono whitespace-pre-wrap break-words">
                          {resumeText.slice(0,600)}{resumeText.length>600?"...":""}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* Install hint */}
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-500/6 border border-amber-500/15">
                    <FiAlertTriangle className="text-amber-400 text-xs flex-shrink-0 mt-0.5"/>
                    <div>
                      <p className="text-[10px] text-amber-300/70 font-bold mb-1">For PDF/DOCX parsing install:</p>
                      <code className="text-[10px] bg-amber-500/10 text-amber-300 font-mono px-2 py-0.5 rounded">
                        npm install pdfjs-dist mammoth
                      </code>
                      <p className="text-[10px] text-amber-300/40 mt-1">TXT files work without any install.</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Paste mode */
                <div className="space-y-3">
                  <div className="relative">
                    <textarea value={resumeText} onChange={e=>setResumeText(e.target.value)} rows={14}
                      className="w-full bg-[#161b22] border border-white/[0.07] text-white/65 text-xs font-mono leading-5 rounded-xl px-4 py-3.5 outline-none resize-none focus:border-indigo-500/40 placeholder:text-white/15"
                      placeholder={`Paste your complete resume text here...\n\nInclude all sections:\n— Contact Info\n— Summary / Objective\n— Work Experience\n— Education\n— Skills\n— Projects\n— Certifications`}
                    />
                    <div className="absolute bottom-3 right-3 text-[10px] text-white/15 font-mono">
                      {resumeText.split(/\s+/).filter(Boolean).length} words
                    </div>
                  </div>
                  {resumeText.trim().length>50&&(
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
                      <FiCheckCircle className="text-emerald-400 text-sm flex-shrink-0"/>
                      <p className="text-xs text-emerald-300 font-semibold">
                        Resume ready — {resumeText.trim().split(/\s+/).length} words
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={()=>goToStep("profile")}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white/70 text-sm font-bold transition-all">
                  ← Back
                </button>
                <button onClick={()=>goToStep("jd")} disabled={!resumeText.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all disabled:opacity-40">
                  Continue to Job Description <FiArrowRight/>
                </button>
              </div>
            </div>
          </StepCard>

          {/* ══ STEP 3: JOB DESCRIPTION (paste only) ══ */}
          <StepCard id="jd" current={step} title="Job Description" emoji="📋"
            onToggle={()=>setStep(step==="jd"?"":"jd")}
            badge={jd.trim().length>50?"JD added":null}>
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5">Paste Job Description</p>
                <p className="text-xs text-white/25 mb-3 leading-5">
                  Copy from LinkedIn, Naukri, company website, or any job portal and paste here.
                </p>
                <div className="relative">
                  <textarea value={jd} onChange={e=>setJd(e.target.value)} rows={14}
                    className="w-full bg-[#161b22] border border-white/[0.07] text-white/65 text-sm rounded-xl px-4 py-3.5 outline-none resize-none focus:border-indigo-500/40 placeholder:text-white/15 leading-6 font-mono"
                    placeholder={`Paste the full job description here...\n\nExample:\nWe are looking for a Backend Engineer with 2+ years of experience in Python and FastAPI.\nYou will build scalable microservices, integrate with PostgreSQL and Redis,\nand deploy to AWS using Docker and Kubernetes...\n\nRequirements:\n- 2+ years Python\n- FastAPI or Django\n- PostgreSQL\n- Docker\n- AWS (EC2, S3, RDS)`}
                  />
                  <div className="absolute bottom-3 right-3 text-[10px] text-white/15 font-mono">
                    {jd.split(/\s+/).filter(Boolean).length} words
                  </div>
                </div>
              </div>

              {jd.trim().length>50&&(
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
                  <FiCheckCircle className="text-emerald-400 text-sm flex-shrink-0"/>
                  <p className="text-xs text-emerald-300 font-semibold">
                    JD detected — {jd.trim().split(/\s+/).length} words · AI will extract all requirements
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={()=>goToStep("resume")}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white/70 text-sm font-bold transition-all">
                  ← Back
                </button>
                <button onClick={()=>goToStep("projects")} disabled={jd.trim().length<50}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all disabled:opacity-40">
                  Continue to Projects <FiArrowRight/>
                </button>
              </div>
            </div>
          </StepCard>

          {/* ══ STEP 4: PROJECTS ══ */}
          <StepCard id="projects" current={step} title="Your Projects" emoji="🚀"
            onToggle={()=>setStep(step==="projects"?"":"projects")}
            badge={ghData?`${ghData.ownRepos} own repos`:null}>
            <div className="space-y-5">
              {ghData?.repos?.length>0 ? (
                <div>
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      {label:"Original", value:ghData.ownRepos,   color:"text-emerald-400", desc:"Built by you"},
                      {label:"Forks",    value:ghData.forkRepos,  color:"text-amber-400",   desc:"From others"},
                      {label:"Clones",   value:ghData.cloneRepos, color:"text-red-400",     desc:"Likely copied"},
                      {label:"Stars ⭐", value:ghData.totalStars, color:"text-yellow-400",  desc:"Stars earned"},
                    ].map((s,i)=>(
                      <div key={i} className="rounded-xl border border-white/[0.07] bg-[#0d1117] p-3 text-center">
                        <p className={`text-xl font-extrabold tabular-nums ${s.color}`}>{s.value}</p>
                        <p className="text-[10px] font-bold text-white/50 mt-0.5">{s.label}</p>
                        <p className="text-[9px] text-white/20">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                  {(ghData.forkRepos+ghData.cloneRepos)>ghData.ownRepos&&(
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/8 border border-red-500/20 mb-4">
                      <FiAlertTriangle className="text-red-400 flex-shrink-0 mt-0.5"/>
                      <div>
                        <p className="text-sm font-bold text-red-300">⚠️ More copied repos than originals</p>
                        <p className="text-xs text-red-300/60 mt-0.5 leading-5">
                          Recruiters check GitHub. {ghData.forkRepos+ghData.cloneRepos} forked/cloned vs {ghData.ownRepos} original.
                          Build 2–3 strong original projects before applying.
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    {ghData.repos.slice(0,8).map((repo,i)=>(
                      <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${
                        repo.isFork||repo.isClone?"border-red-500/15 bg-red-500/5"
                        :repo.isTutorial?"border-amber-500/15 bg-amber-500/5"
                        :"border-white/[0.06] bg-white/[0.02]"}`}>
                        <FiCode className="text-white/20 text-sm flex-shrink-0"/>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-xs font-bold text-white/75 truncate">{repo.name}</p>
                            <AuthBadge repo={repo}/>
                          </div>
                          {repo.description&&<p className="text-[10px] text-white/30 mt-0.5 truncate">{repo.description}</p>}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {repo.language&&<span className="text-[9px] text-white/30 font-mono">{repo.language}</span>}
                          {repo.stars>0&&<span className="text-[9px] text-amber-400">⭐{repo.stars}</span>}
                          <a href={repo.url} target="_blank" rel="noopener noreferrer"
                            className="text-white/15 hover:text-white/50 transition-colors">
                            <FiExternalLink className="text-xs"/>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-6 text-center">
                  <FiGithub className="text-white/15 text-3xl mx-auto mb-3"/>
                  <p className="text-sm text-white/40 font-semibold mb-1">No GitHub data</p>
                  <p className="text-xs text-white/20 leading-5">Add your GitHub username in Profile to see authenticity check.</p>
                </div>
              )}
              <div>
                <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest block mb-2">
                  Additional Projects / Context (optional)
                </label>
                <textarea value={projectNotes} onChange={e=>setProjectNotes(e.target.value)} rows={3}
                  className="w-full bg-[#161b22] border border-white/[0.07] text-white/60 text-sm rounded-xl px-4 py-3 outline-none resize-none focus:border-indigo-500/40 placeholder:text-white/15 leading-6"
                  placeholder="Hackathon wins, internship projects, freelance work, published apps, Kaggle medals..."/>
              </div>
              <div className="flex gap-3">
                <button onClick={()=>goToStep("jd")}
                  className="px-4 py-2.5 rounded-xl border border-white/10 text-white/40 hover:text-white/70 text-sm font-bold transition-all">
                  ← Back
                </button>
                <button onClick={analyze} disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all disabled:opacity-40">
                  {loading
                    ?<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Analysing...</>
                    :<><FiZap className="text-sm"/>Analyse My Skill Gap</>}
                </button>
              </div>
            </div>
          </StepCard>

          {/* ══ STEP 5: RESULT ══ */}
          {(loading||result) && step==="result" && (
            <div className="space-y-4">
              {loading ? (
                <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] p-12 text-center">
                  <div className="relative w-14 h-14 mx-auto mb-5">
                    <div className="absolute inset-0 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"/>
                    <div className="absolute inset-3 border-2 border-violet-500/20 border-b-violet-500 rounded-full animate-spin" style={{animationDirection:"reverse"}}/>
                  </div>
                  <p className="text-white/60 font-semibold mb-3">Analysing resume against job description...</p>
                  <div className="space-y-1.5 max-w-xs mx-auto">
                    {["Reading your resume","Extracting JD requirements","Matching skills","Checking project authenticity","Building 6-week plan"].map((s,i)=>(
                      <div key={i} className="flex items-center gap-2 text-xs text-white/25">
                        <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay:`${i*150}ms`}}/>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              ) : result && (
                <>
                  {/* Hero score */}
                  <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
                    <div className={`flex items-stretch flex-col sm:flex-row`}>
                      <div className={`sm:w-52 flex flex-col items-center justify-center py-8 px-6 border-b sm:border-b-0 sm:border-r border-white/[0.06] gap-4 ${
                        result.match_score>=75?"bg-emerald-500/5":result.match_score>=50?"bg-amber-500/5":"bg-red-500/5"}`}>
                        <ScoreRing score={result.match_score} size={120}/>
                        <div className={`text-xs font-bold px-3 py-1.5 rounded-full border text-center ${
                          result.readiness==="ready"?"bg-emerald-500/15 text-emerald-300 border-emerald-500/25"
                          :result.readiness==="almost_ready"?"bg-blue-500/15 text-blue-300 border-blue-500/25"
                          :result.readiness==="with_prep"?"bg-amber-500/15 text-amber-300 border-amber-500/25"
                          :"bg-red-500/15 text-red-300 border-red-500/25"}`}>
                          {result.readiness==="ready"?"✅ Apply Now"
                            :result.readiness==="almost_ready"?"🔵 Almost Ready"
                            :result.readiness==="with_prep"?"⚡ Needs Prep"
                            :"❌ Not Ready Yet"}
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <p className="text-[10px] font-bold text-white/25 uppercase tracking-widest mb-1">Target Role</p>
                            <h2 className="text-xl font-extrabold text-white">{result.role}</h2>
                            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                              <span className="text-[10px] bg-white/[0.04] border border-white/[0.07] text-white/40 px-2 py-0.5 rounded-full">{result.company_type}</span>
                              {result.experience_required&&<span className="text-[10px] text-white/25">{result.experience_required}</span>}
                              {result.salary_expectation&&<span className="text-[10px] text-emerald-400 font-bold">{result.salary_expectation}</span>}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[10px] text-white/25 font-bold uppercase tracking-widest">Ready in</p>
                            <p className="text-sm font-extrabold text-indigo-300">{result.timeline_to_ready}</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.025] border border-white/[0.05]">
                          <p className="text-[10px] font-bold text-white/25 uppercase tracking-wider mb-1.5">AI Verdict</p>
                          <p className="text-sm text-white/65 leading-6 italic">{result.verdict}</p>
                        </div>
                      </div>
                    </div>
                    <div className="h-1 bg-white/[0.04]">
                      <div className={`h-full transition-all duration-1000 ${result.match_score>=75?"bg-emerald-500":result.match_score>=50?"bg-amber-500":"bg-red-500"}`}
                        style={{width:`${result.match_score}%`}}/>
                    </div>
                  </div>

                  {/* ── DATA INTEGRITY CHECK ── */}
                  {result.data_integrity && (
                    <div className={`rounded-2xl border overflow-hidden ${
                      result.data_integrity.integrity_score >= 80
                        ? "border-emerald-500/20 bg-emerald-500/5"
                        : result.data_integrity.integrity_score >= 50
                        ? "border-amber-500/20 bg-amber-500/5"
                        : "border-red-500/25 bg-red-500/8"
                    }`}>
                      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.06]">
                        <FiShield className={`text-sm ${result.data_integrity.integrity_score>=80?"text-emerald-400":result.data_integrity.integrity_score>=50?"text-amber-400":"text-red-400"}`}/>
                        <p className="font-bold text-white/80 text-sm">Data Integrity Check</p>
                        <div className="ml-auto flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${result.data_integrity.integrity_score>=80?"bg-emerald-500":result.data_integrity.integrity_score>=50?"bg-amber-500":"bg-red-500"}`}
                              style={{width:`${result.data_integrity.integrity_score}%`}}/>
                          </div>
                          <span className={`text-xs font-extrabold tabular-nums ${result.data_integrity.integrity_score>=80?"text-emerald-400":result.data_integrity.integrity_score>=50?"text-amber-400":"text-red-400"}`}>
                            {result.data_integrity.integrity_score}/100
                          </span>
                        </div>
                      </div>
                      <div className="px-5 py-4 space-y-3">
                        {/* Source checks */}
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label:"Name in Resume",    value:result.data_integrity.name_in_resume,    ok:"Name matches",   bad:"Name not found in resume" },
                            { label:"GitHub in Resume",  value:result.data_integrity.resume_github_match,ok:"GitHub linked", bad:"GitHub not linked in resume" },
                          ].map((c,i) => (
                            <div key={i} className={`flex items-center gap-2.5 p-3 rounded-xl border ${
                              c.value?"border-emerald-500/15 bg-emerald-500/8":"border-red-500/15 bg-red-500/8"}`}>
                              {c.value
                                ? <FiCheckCircle className="text-emerald-400 text-sm flex-shrink-0"/>
                                : <FiX className="text-red-400 text-sm flex-shrink-0"/>}
                              <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{c.label}</p>
                                <p className={`text-xs font-semibold ${c.value?"text-emerald-300":"text-red-300"}`}>
                                  {c.value ? c.ok : c.bad}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Flags */}
                        {result.data_integrity.flags?.filter(f=>f).length > 0 && (
                          <div className="space-y-1.5">
                            {result.data_integrity.flags.filter(f=>f).map((flag,i) => (
                              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-red-500/8 border border-red-500/15">
                                <FiAlertTriangle className="text-red-400 text-xs flex-shrink-0 mt-0.5"/>
                                <p className="text-xs text-red-300/80 leading-5">{flag}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {result.data_integrity.integrity_score < 70 && (
                          <div className="p-3 rounded-xl bg-amber-500/8 border border-amber-500/20">
                            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-1">How to Fix</p>
                            <ul className="space-y-1">
                              {!result.data_integrity.name_in_resume && <li className="text-xs text-white/50">• Add your full name to the resume header</li>}
                              {!result.data_integrity.resume_github_match && <li className="text-xs text-white/50">• Add your GitHub URL (github.com/{github}) to the resume contacts section</li>}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ── RESUME QUALITY ── */}
                  {result.resume_quality && (
                    <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
                      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-white/[0.06] bg-[#161b22]">
                        <FiFileText className="text-indigo-400 text-sm"/>
                        <p className="font-bold text-white/80 text-sm">Resume Quality</p>
                        <span className={`ml-auto text-sm font-extrabold ${result.resume_quality.score>=75?"text-emerald-400":result.resume_quality.score>=50?"text-amber-400":"text-red-400"}`}>
                          {result.resume_quality.score}/100
                        </span>
                      </div>
                      <div className="p-5 space-y-4">
                        {/* Quick checks */}
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { label:"Word Count",    value:result.resume_quality.word_count, unit:"words",   ok:result.resume_quality.word_count>=200 },
                            { label:"Has Metrics",   value:result.resume_quality.has_metrics?"Yes":"No",     ok:result.resume_quality.has_metrics },
                            { label:"Has Projects",  value:result.resume_quality.has_projects?"Yes":"No",    ok:result.resume_quality.has_projects },
                            { label:"Has Links",     value:result.resume_quality.has_links?"Yes":"No",       ok:result.resume_quality.has_links },
                          ].map((c,i) => (
                            <div key={i} className={`p-2.5 rounded-xl border text-center ${c.ok?"border-emerald-500/15 bg-emerald-500/6":"border-red-500/15 bg-red-500/6"}`}>
                              <p className={`text-sm font-bold ${c.ok?"text-emerald-300":"text-red-400"}`}>{c.value}{c.unit?" "+c.unit:""}</p>
                              <p className="text-[9px] text-white/30 mt-0.5">{c.label}</p>
                            </div>
                          ))}
                        </div>
                        {/* Issues */}
                        {result.resume_quality.issues?.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">Issues Found</p>
                            {result.resume_quality.issues.map((issue,i) => (
                              <div key={i} className="flex items-start gap-2 mb-1.5">
                                <FiX className="text-red-400 text-xs flex-shrink-0 mt-0.5"/>
                                <p className="text-xs text-white/55">{issue}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {/* Before/After rewrites */}
                        {result.resume_quality.rewrites?.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-2">Bullet Point Rewrites</p>
                            <div className="space-y-2">
                              {result.resume_quality.rewrites.map((rw,i) => (
                                <div key={i} className="rounded-xl overflow-hidden border border-white/[0.06]">
                                  <div className="px-3 py-2 bg-red-500/8 border-b border-white/[0.04]">
                                    <p className="text-[10px] font-bold text-red-400 mb-1">❌ Before</p>
                                    <p className="text-xs text-white/60 font-mono leading-relaxed whitespace-pre-wrap break-words break-all">{rw.before}</p>
                                  </div>
                                  <div className="px-3 py-2 bg-emerald-500/6">
                                    <p className="text-[10px] font-bold text-emerald-400 mb-1">✅ After</p>
                                    <p className="text-xs text-emerald-300/90 font-mono leading-relaxed whitespace-pre-wrap break-words break-all">{rw.after}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Matched / Strengths */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <FiCheckCircle className="text-emerald-400 text-sm"/>
                        <p className="font-bold text-emerald-300 text-sm">Skills You Have ({result.matched_skills?.length||0})</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(result.matched_skills||[]).map((s,i)=>(
                          <span key={i} className="text-xs bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg font-mono">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-indigo-500/15 bg-indigo-500/5 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <FiStar className="text-indigo-400 text-sm"/>
                        <p className="font-bold text-indigo-300 text-sm">Your Strengths</p>
                      </div>
                      <div className="space-y-2">
                        {(result.strengths||[]).map((s,i)=>(
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-1.5"/>
                            <p className="text-xs text-white/60 leading-5">{s}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Missing skills */}
                  {result.missing_skills?.length>0&&(
                    <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
                      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06] bg-[#161b22]">
                        <FiAlertTriangle className="text-amber-400 text-sm"/>
                        <p className="font-bold text-white/80 text-sm">Missing Skills ({result.missing_skills.length})</p>
                        <span className="ml-auto text-[10px] text-white/20">Priority order</span>
                      </div>
                      <div className="divide-y divide-white/[0.04]">
                        {[...result.missing_skills].sort((a,b)=>["high","medium","low"].indexOf(a.priority)-["high","medium","low"].indexOf(b.priority)).map((skill,i)=>(
                          <div key={i} className="flex items-start gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors">
                            <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${skill.priority==="high"?"bg-red-500":skill.priority==="medium"?"bg-amber-500":"bg-emerald-500"}`}/>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <p className="font-bold text-white/80 text-sm">{skill.skill}</p>
                                <PriorityBadge p={skill.priority}/>
                                <span className="text-[10px] text-white/20 flex items-center gap-1"><FiClock className="text-[9px]"/>{skill.learn_in}</span>
                              </div>
                              <p className="text-xs text-white/40 leading-5 mb-1.5">{skill.why}</p>
                              <a href={`https://www.google.com/search?q=${encodeURIComponent(skill.resource)}`}
                                target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors">
                                <FiBookOpen className="text-[9px]"/> {skill.resource} <FiExternalLink className="text-[9px]"/>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project authenticity */}
                  {result.project_authenticity&&(
                    <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
                      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06] bg-[#161b22]">
                        <FiShield className="text-violet-400 text-sm"/>
                        <p className="font-bold text-white/80 text-sm">Project Authenticity</p>
                        <span className={`ml-auto text-sm font-extrabold ${result.project_authenticity.score>=70?"text-emerald-400":result.project_authenticity.score>=40?"text-amber-400":"text-red-400"}`}>
                          {result.project_authenticity.score}/100
                        </span>
                      </div>
                      <div className="p-5 space-y-4">
                        <p className="text-sm text-white/60 leading-6 italic">{result.project_authenticity.verdict}</p>
                        {result.project_authenticity.issues?.length>0&&(
                          <div>
                            <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-2">Issues Found</p>
                            {result.project_authenticity.issues.map((issue,i)=>(
                              <div key={i} className="flex items-start gap-2 mb-1.5">
                                <FiX className="text-red-400 text-xs flex-shrink-0 mt-0.5"/>
                                <p className="text-xs text-white/50">{issue}</p>
                              </div>
                            ))}
                          </div>
                        )}
                        {result.project_authenticity.suggestions?.length>0&&(
                          <div>
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-2">Build These Projects</p>
                            {result.project_authenticity.suggestions.map((s,i)=>(
                              <div key={i} className="flex items-start gap-2 mb-1.5">
                                <FiArrowRight className="text-emerald-400 text-xs flex-shrink-0 mt-0.5"/>
                                <p className="text-xs text-white/55">{s}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 6-week plan */}
                  {result.learning_path?.length>0&&(
                    <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] overflow-hidden">
                      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-white/[0.06] bg-[#161b22]">
                        <FiTrendingUp className="text-indigo-400 text-sm"/>
                        <p className="font-bold text-white/80 text-sm">{result.learning_path.length}-Week Learning Plan</p>
                      </div>
                      <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {result.learning_path.map((week,i)=>(
                          <div key={i} className="rounded-xl bg-white/[0.025] border border-white/[0.05] p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0">{week.week}</div>
                              <p className="text-xs font-bold text-white/70">{week.focus}</p>
                            </div>
                            <p className="text-xs text-white/45 leading-5 mb-2">{week.task}</p>
                            <p className="text-[10px] text-indigo-400 font-semibold">{week.resource}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interview topics + Resume keywords */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {result.interview_topics?.length>0&&(
                      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <FiTarget className="text-rose-400 text-sm"/>
                          <p className="font-bold text-white/80 text-sm">Interview Topics</p>
                        </div>
                        <div className="space-y-2.5">
                          {result.interview_topics.map((t,i)=>(
                            <div key={i} className={`flex items-start gap-2.5 p-2.5 rounded-lg ${
                              t.importance==="high"?"bg-red-500/8 border border-red-500/15":"bg-white/[0.025] border border-white/[0.05]"}`}>
                              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${t.importance==="high"?"bg-red-500":"bg-white/20"}`}/>
                              <div>
                                <p className="text-xs font-bold text-white/70">{t.topic||t}</p>
                                {t.tip&&<p className="text-[10px] text-white/30 mt-0.5 leading-4">{t.tip}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.resume_keywords?.length>0&&(
                      <div className="rounded-2xl border border-white/[0.07] bg-[#0d1117] p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <FiFileText className="text-amber-400 text-sm"/>
                          <p className="font-bold text-white/80 text-sm">Add to Resume</p>
                        </div>
                        <p className="text-xs text-white/30 mb-3 leading-4">JD keywords missing from your resume. Add naturally.</p>
                        <div className="flex flex-wrap gap-2">
                          {result.resume_keywords.map((kw,i)=>(
                            <span key={i} className="text-[11px] bg-amber-500/10 border border-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg font-mono">{kw}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Redo */}
                  <button onClick={()=>{setResult(null);setStep("profile");setCompleted([]);setResumeFile(null);setResumeText("");setJd("");}}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/[0.07] text-white/40 hover:text-white/70 hover:border-white/15 text-sm font-bold transition-all">
                    <FiRefreshCw className="text-sm"/> Start New Analysis
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}