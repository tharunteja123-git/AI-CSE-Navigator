import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText, FolderKanban, Building2, MessageSquare, Code2, HelpCircle,
  Activity, Gauge, Mic2, SpellCheck, Star, ClipboardCheck,
} from "lucide-react";
import { BioluminescentGrid, BioluminescentGridItem } from "../components/ui/bioluminescent-grid";

/*
  Resume text extraction uses pdfjs-dist (PDF) and mammoth (DOCX).
  Install once in your project:

    npm install pdfjs-dist mammoth

  Both are dynamically imported inside extractTextFromFile(), so the
  rest of the app still builds even before you install them — you'll
  just get a friendly inline error until you do.

  For the display/body font pairing referenced below (Fraunces + Inter
  + IBM Plex Mono), add this to your index.html <head>:

    <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
*/

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const CATEGORIES = [
  "Technical",
  "Projects",
  "Resume",
  "Behavioral",
  "HR",
  "DSA",
  "SQL",
  "System Design",
  "Python",
  "React",
  "FastAPI",
  "AI / ML",
];

const ROLE_OPTIONS = [
  "AI Engineer",
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
  "Data Scientist",
  "DevOps Engineer",
];

const COMPANY_OPTIONS = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Accenture",
  "TCS",
  "Infosys",
  "Wipro",
  "Zoho",
  "Startup",
];

const EXPERIENCE_OPTIONS = ["Student", "Fresher", "0-2 Years", "2-5 Years", "5+ Years"];

const AMBER = "#E8963C";
const TEAL = "#1F6F63";

const AI_FEATURE_ITEMS = [
  { icon: FileText, title: "Resume Based Questions", description: "Questions generated directly from what's on your resume.", accent: AMBER, className: "col-span-2 row-span-2" },
  { icon: FolderKanban, title: "Project Deep Dive", description: "Drills into the projects you actually built.", accent: TEAL, className: "" },
  { icon: Building2, title: "Company Specific Questions", description: "Tailored to your target company's interview style.", accent: AMBER, className: "" },
  { icon: MessageSquare, title: "Behavioral Interview", description: "STAR-style questions on teamwork and conflict.", accent: TEAL, className: "row-span-2" },
  { icon: Code2, title: "Technical Interview", description: "Core concepts across your strongest languages.", accent: AMBER, className: "col-span-2" },
  { icon: HelpCircle, title: "Follow-up Questions", description: "Digs deeper based on how you answer.", accent: TEAL, className: "" },
  { icon: Activity, title: "Real-time Feedback", description: "Live cues while you're still talking.", accent: AMBER, className: "" },
  { icon: Gauge, title: "Confidence Analysis", description: "Reads tone and pacing to gauge confidence.", accent: TEAL, className: "col-span-2 row-span-2" },
  { icon: Mic2, title: "Communication Analysis", description: "Clarity, filler words, and structure.", accent: AMBER, className: "" },
  { icon: SpellCheck, title: "Grammar Checking", description: "Flags grammar slips in spoken answers.", accent: TEAL, className: "" },
  { icon: Star, title: "Answer Quality Score", description: "Scores each answer against what great looks like.", accent: AMBER, className: "row-span-2" },
  { icon: ClipboardCheck, title: "Final Interview Report", description: "A full writeup of strengths and gaps to work on.", accent: TEAL, className: "col-span-2" },
];

// keyword -> canonical skill name, used to scan extracted resume text
const SKILL_KEYWORDS = {
  Python: ["python", "django", "flask"],
  FastAPI: ["fastapi"],
  React: ["react.js", "react ", "redux", "next.js", "nextjs"],
  SQL: ["sql", "mysql", "postgres", "postgresql", "sqlite"],
  JavaScript: ["javascript", "typescript", "node.js", "nodejs"],
  Docker: ["docker", "container"],
  AWS: ["aws", "amazon web services", "ec2", "s3"],
  "Machine Learning": ["machine learning", "scikit", "tensorflow", "pytorch", "keras"],
  Git: ["git", "github", "gitlab"],
  "System Design": ["system design", "microservice", "scalab", "load balanc"],
  Redis: ["redis"],
  "CI/CD": ["ci/cd", "jenkins", "github actions", "continuous integration"],
};

// which skills matter most for each target role, used to compute gaps
const ROLE_SKILL_MAP = {
  "AI Engineer": ["Python", "Machine Learning", "SQL", "Docker", "AWS"],
  "Full Stack Developer": ["JavaScript", "React", "SQL", "Docker", "Git"],
  "Backend Developer": ["Python", "SQL", "Docker", "System Design", "AWS"],
  "Frontend Developer": ["JavaScript", "React", "Git", "CI/CD"],
  "Data Scientist": ["Python", "Machine Learning", "SQL", "Git"],
  "DevOps Engineer": ["Docker", "AWS", "CI/CD", "System Design", "Git"],
};

const TECH_QUESTION_BANK = {
  Python: "Explain Python's GIL and how it affects multi-threaded code.",
  FastAPI: "Why did you choose FastAPI over Flask or Django for this project?",
  React: "Walk me through how React's reconciliation and hooks lifecycle work.",
  SQL: "Write a query to find the second-highest salary in an Employees table.",
  JavaScript: "Explain the event loop and how async/await is handled under the hood.",
  Docker: "What's the difference between a Docker image and a container, and how would you slim one down?",
  AWS: "How would you design a highly available deployment on AWS for this app?",
  "Machine Learning": "Explain the bias-variance tradeoff and how you'd diagnose overfitting.",
  Git: "Walk me through resolving a merge conflict during a rebase.",
  "System Design": "How would you scale this system to handle 10,000 concurrent users?",
  Redis: "When would you reach for Redis over a relational database?",
  "CI/CD": "Describe a CI/CD pipeline you've built or maintained end to end.",
};

const HR_QUESTIONS = [
  "Tell me about yourself.",
  "Why should we hire you over another candidate?",
  "Tell me about a time you failed and what you learned from it.",
  "Describe a conflict with a teammate and how you resolved it.",
  "Where do you see yourself in five years?",
];

const CHECKLIST_ITEMS = [
  { key: "internet", label: "Stable internet connection" },
  { key: "camera", label: "Camera ready" },
  { key: "mic", label: "Microphone working" },
  { key: "quiet", label: "Quiet environment" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_RESUME_MB = 8;

// ---------------------------------------------------------------------------
// Resume parsing
// ---------------------------------------------------------------------------

async function extractTextFromFile(file) {
  const ext = file.name.split(".").pop().toLowerCase();

  if (ext === "pdf") {
    let pdfjsLib;
    try {
      pdfjsLib = await import("pdfjs-dist/build/pdf");
    } catch {
      throw new Error("PDF parsing needs the pdfjs-dist package — run: npm install pdfjs-dist");
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
    const buffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(" ") + "\n";
    }
    return text;
  }

  if (ext === "docx") {
    let mammoth;
    try {
      mammoth = await import("mammoth");
    } catch {
      throw new Error("DOCX parsing needs the mammoth package — run: npm install mammoth");
    }
    const buffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer: buffer });
    return result.value;
  }

  if (ext === "doc") {
    throw new Error("Legacy .doc files can't be parsed in the browser — please upload a PDF or DOCX instead.");
  }

  throw new Error("Unsupported file type — upload a PDF or DOCX.");
}

function analyzeResumeText(text, targetRole) {
  const lower = text.toLowerCase();

  const detected = Object.keys(SKILL_KEYWORDS).filter((skill) =>
    SKILL_KEYWORDS[skill].some((kw) => lower.includes(kw))
  );

  const roleSkills = ROLE_SKILL_MAP[targetRole] || ROLE_SKILL_MAP["Full Stack Developer"];
  const recommended = roleSkills.filter((skill) => !detected.includes(skill));

  const hasEmail = /[^\s@]+@[^\s@]+\.[^\s@]{2,}/.test(text);
  const hasProjects = /project/i.test(text);
  const hasExperience = /experience/i.test(text);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  let score = 40;
  score += Math.min(detected.length * 6, 30);
  if (hasEmail) score += 8;
  if (hasProjects) score += 7;
  if (hasExperience) score += 7;
  if (wordCount > 150) score += 8;
  score = Math.min(Math.round(score), 98);

  return { score, detected, recommended, wordCount };
}

function buildQuestions(analysis, candidate) {
  const role = candidate.role || "this role";
  const company = candidate.company;

  const projectQuestions = [
    "Walk me through the most complex project on your resume — what was your specific role?",
    analysis.detected.length >= 2
      ? `You listed ${analysis.detected.slice(0, 2).join(" and ")} — which project used them together, and why that combination?`
      : "Which project are you proudest of, and what would you do differently now?",
    "What was the hardest technical decision on that project, and how did you resolve it?",
    "If that project suddenly had to support 10,000 concurrent users, what breaks first?",
  ];

  const technicalQuestions = analysis.detected.length
    ? analysis.detected.slice(0, 5).map((skill) => TECH_QUESTION_BANK[skill] || `Explain a core concept in ${skill} and where you've used it.`)
    : [`Tell me about a technical stack you're comfortable with for a ${role} position.`];

  const hrQuestions = company
    ? [`Why ${company} specifically, and what do you know about their engineering culture?`, ...HR_QUESTIONS.slice(0, 4)]
    : HR_QUESTIONS;

  return { projectQuestions, technicalQuestions, hrQuestions };
}

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

function ReadinessDial({ percent }) {
  const size = 84;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#E4E1DA" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={percent >= 100 ? "#1F6F63" : "#E8963C"}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 400ms ease, stroke 300ms ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-lg font-semibold text-[#12181F]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          {percent}%
        </span>
        <span className="text-[10px] uppercase tracking-wide text-[#5B6472]">ready</span>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2 text-[#12181F]">{label}</label>
      {children}
      {error && <p className="text-xs text-rose-600 mt-1.5">{error}</p>}
    </div>
  );
}

function AIFeatureGrid() {
  return (
    <BioluminescentGrid>
      {AI_FEATURE_ITEMS.map(({ icon: Icon, title, description, accent, className }) => (
        <BioluminescentGridItem key={title} accent={accent} className={className}>
          <Icon className="icon" />
          <h3 className="item-title">{title}</h3>
          <p className="item-description">{description}</p>
        </BioluminescentGridItem>
      ))}
    </BioluminescentGrid>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function MockInterview() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [candidate, setCandidate] = useState({
    fullName: "",
    email: "",
    role: ROLE_OPTIONS[0],
    company: COMPANY_OPTIONS[0],
    experience: "Fresher",
  });
  const [touched, setTouched] = useState({ fullName: false, email: false });

  const [resume, setResume] = useState(null);
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState(
    () => Object.fromEntries(CATEGORIES.map((c) => [c, true]))
  );

  const [mode, setMode] = useState("Mixed (Recommended)");
  const [difficulty, setDifficulty] = useState("Adaptive AI ⭐");
  const [duration, setDuration] = useState(30);

  const [checklist, setChecklist] = useState({
    internet: false,
    camera: false,
    mic: false,
    quiet: false,
  });

  const [showMissing, setShowMissing] = useState(false);

  const updateCandidate = (field) => (e) => setCandidate((c) => ({ ...c, [field]: e.target.value }));

  const nameError = touched.fullName && !candidate.fullName.trim() ? "Enter your full name." : null;
  const emailError = touched.email && !EMAIL_RE.test(candidate.email) ? "Enter a valid email address." : null;

  function validateAndSetFile(file) {
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["pdf", "doc", "docx"].includes(ext)) {
      setAnalysisError("Unsupported file type — upload a PDF or DOCX.");
      return;
    }
    if (file.size > MAX_RESUME_MB * 1024 * 1024) {
      setAnalysisError(`That file is too large — please upload something under ${MAX_RESUME_MB}MB.`);
      return;
    }
    setResume(file);
    setResumeAnalysis(null);
    setAnalysisError(null);
  }

  function handleFileChosen(file) {
    validateAndSetFile(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragActive(false);
    validateAndSetFile(e.dataTransfer.files?.[0] || null);
  }

  async function handleAnalyze() {
    if (!resume) return;
    setAnalyzing(true);
    setAnalysisError(null);
    try {
      const text = await extractTextFromFile(resume);
      if (!text.trim()) {
        throw new Error("Couldn't find any readable text in this file — try a different export of your resume.");
      }
      setResumeAnalysis(analyzeResumeText(text, candidate.role));
    } catch (err) {
      setAnalysisError(err.message || "Something went wrong while reading this file.");
    } finally {
      setAnalyzing(false);
    }
  }

  function toggleCategory(category) {
    setSelectedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  }

  function toggleChecklist(key) {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  const activeCategoryCount = useMemo(
    () => Object.values(selectedCategories).filter(Boolean).length,
    [selectedCategories]
  );

  const questions = useMemo(
    () => (resumeAnalysis ? buildQuestions(resumeAnalysis, candidate) : null),
    [resumeAnalysis, candidate]
  );

  const steps = [
    { key: "name", done: !!candidate.fullName.trim(), label: "Add your full name" },
    { key: "email", done: EMAIL_RE.test(candidate.email), label: "Add a valid email" },
    { key: "resume", done: !!resume, label: "Upload your resume" },
    { key: "analysis", done: !!resumeAnalysis, label: "Analyze your resume" },
    { key: "categories", done: activeCategoryCount > 0, label: "Select at least one question category" },
    { key: "internet", done: checklist.internet, label: "Confirm your internet connection" },
    { key: "camera", done: checklist.camera, label: "Confirm your camera" },
    { key: "mic", done: checklist.mic, label: "Confirm your microphone" },
    { key: "quiet", done: checklist.quiet, label: "Confirm a quiet environment" },
  ];
  const completedCount = steps.filter((s) => s.done).length;
  const percent = Math.round((completedCount / steps.length) * 100);
  const isReady = completedCount === steps.length;
  const missingSteps = steps.filter((s) => !s.done);

  function handleStart() {
    if (!isReady) {
      setShowMissing(true);
      return;
    }
    navigate("/interview-room", {
      state: {
        candidate,
        mode,
        difficulty,
        duration,
        categories: Object.keys(selectedCategories).filter((c) => selectedCategories[c]),
        resumeAnalysis,
      },
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Candidate Profile */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-5">
        <h2
          className="text-xl font-bold text-[#12181F] mb-5"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Candidate Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Full Name" error={nameError}>
            <input
              type="text"
              placeholder="John Doe"
              value={candidate.fullName}
              onChange={updateCandidate("fullName")}
              onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
              className={`w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#E8963C]/40 ${
                nameError ? "border-rose-400" : "border-[#E4E1DA]"
              }`}
            />
          </Field>

          <Field label="Email" error={emailError}>
            <input
              type="email"
              placeholder="john@gmail.com"
              value={candidate.email}
              onChange={updateCandidate("email")}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              className={`w-full rounded-xl border px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#E8963C]/40 ${
                emailError ? "border-rose-400" : "border-[#E4E1DA]"
              }`}
            />
          </Field>

          <Field label="Target Role">
            <select
              value={candidate.role}
              onChange={updateCandidate("role")}
              className="w-full rounded-xl border border-[#E4E1DA] px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#E8963C]/40"
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>
          </Field>

          <Field label="Target Company">
            <select
              value={candidate.company}
              onChange={updateCandidate("company")}
              className="w-full rounded-xl border border-[#E4E1DA] px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#E8963C]/40"
            >
              {COMPANY_OPTIONS.map((company) => (
                <option key={company}>{company}</option>
              ))}
            </select>
          </Field>

          <Field label="Experience">
            <select
              value={candidate.experience}
              onChange={updateCandidate("experience")}
              className="w-full rounded-xl border border-[#E4E1DA] px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#E8963C]/40"
            >
              {EXPERIENCE_OPTIONS.map((exp) => (
                <option key={exp}>{exp}</option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* Resume upload + analysis, combined into one compact section */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-5">
        <h2 className="text-xl font-bold text-[#12181F] mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
          Resume
        </h2>

        {!resume ? (
          <label
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition ${
              dragActive ? "border-[#E8963C] bg-[#E8963C]/10" : "border-[#E8963C]/50 hover:bg-[#E8963C]/5"
            }`}
          >
            <div className="text-3xl">📄</div>
            <h3 className="font-bold text-sm mt-2 text-[#12181F]">Upload Resume</h3>
            <p className="text-[#5B6472] text-sm mt-1">Drag & drop, or</p>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="mt-3 bg-[#12181F] hover:bg-[#1F2731] text-white text-sm px-4 py-2 rounded-lg transition"
            >
              Choose File
            </button>
            <p className="text-[11px] text-[#5B6472]/70 mt-2">PDF or DOCX, up to {MAX_RESUME_MB}MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={(e) => handleFileChosen(e.target.files?.[0] || null)}
            />
          </label>
        ) : (
          <div className="rounded-xl bg-[#1F6F63]/10 border border-[#1F6F63]/30 p-3.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="font-semibold text-[#1F6F63] text-sm">Resume uploaded</div>
              <div className="text-xs mt-0.5 text-[#12181F] truncate">{resume.name}</div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className="px-3.5 py-1.5 rounded-lg bg-[#12181F] text-white text-sm hover:bg-[#1F2731] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {analyzing ? "Analyzing…" : resumeAnalysis ? "Re-analyze" : "Analyze Resume"}
              </button>
              <button
                onClick={() => { setResume(null); setResumeAnalysis(null); setAnalysisError(null); }}
                className="text-xs text-[#5B6472] hover:text-[#12181F] px-2 py-1.5"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {analysisError && (
          <div className="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-3 text-sm text-rose-700">
            {analysisError}
          </div>
        )}

        {/* Analysis results, inline within the same card */}
        {resume && (
          <div className="mt-4 pt-4 border-t border-[#E4E1DA]">
            {!resumeAnalysis ? (
              <p className="text-sm text-[#5B6472]">
                Click "Analyze Resume" above to scan your file and see your score and detected skills.
              </p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-[#E8963C]/10 p-4">
                  <p className="text-xs text-[#5B6472]">Resume Score</p>
                  <h2
                    className="text-3xl font-bold text-[#E8963C]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {resumeAnalysis.score}%
                  </h2>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-2 text-[#12181F]">Skills Detected</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeAnalysis.detected.length ? (
                      resumeAnalysis.detected.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 rounded-full bg-[#1F6F63]/10 text-[#1F6F63] text-xs">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#5B6472]">No known skills detected yet.</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-sm mb-2 text-[#12181F]">Recommended for {candidate.role}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeAnalysis.recommended.length ? (
                      resumeAnalysis.recommended.map((skill) => (
                        <span key={skill} className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 text-xs">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#5B6472]">Great coverage for this role.</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Interview Preferences */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-5">
        <h2 className="text-xl font-bold text-[#12181F] mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
          Interview Preferences
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="font-semibold text-sm text-[#12181F] block mb-2">Interview Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full rounded-xl border border-[#E4E1DA] px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#E8963C]/40"
            >
              <option>Resume Based</option>
              <option>Company Based</option>
              <option>Mixed (Recommended)</option>
            </select>
            <p className="text-xs text-[#5B6472] mt-2">
              Mixed mode asks questions from both your resume and your target company.
            </p>
          </div>

          <div>
            <label className="font-semibold text-sm text-[#12181F] block mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full rounded-xl border border-[#E4E1DA] px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#E8963C]/40"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
              <option>Adaptive AI ⭐</option>
            </select>
            <p className="text-xs text-[#5B6472] mt-2">
              Adaptive AI changes question difficulty based on your answers.
            </p>
          </div>
        </div>
      </section>

      {/* Question Categories */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#12181F]" style={{ fontFamily: "'Fraunces', serif" }}>
            Question Categories
          </h2>
          <span className="text-sm text-[#5B6472]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {activeCategoryCount}/{CATEGORIES.length} selected
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {CATEGORIES.map((category) => (
            <label
              key={category}
              className={`flex items-center gap-2 rounded-xl border p-2.5 cursor-pointer transition ${
                selectedCategories[category]
                  ? "border-[#E8963C] bg-[#E8963C]/5"
                  : "border-[#E4E1DA] hover:bg-[#E8963C]/5"
              }`}
            >
              <input
                type="checkbox"
                className="accent-[#E8963C]"
                checked={!!selectedCategories[category]}
                onChange={() => toggleCategory(category)}
              />
              <span className="text-sm text-[#12181F]">{category}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Interview Duration */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#12181F]" style={{ fontFamily: "'Fraunces', serif" }}>
            Interview Duration
          </h2>
          <span
            className="text-lg font-semibold text-[#E8963C]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {duration} min
          </span>
        </div>

        <input
          type="range"
          min="10"
          max="60"
          step="5"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full accent-[#E8963C]"
        />

        <div className="flex justify-between text-sm text-[#5B6472] mt-2">
          <span>10 min</span>
          <span>60 min</span>
        </div>
      </section>

      {/* Generated questions preview */}
      {questions && (
        <section className="bg-white rounded-2xl border border-[#E4E1DA] shadow-sm p-5">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-[#12181F]" style={{ fontFamily: "'Fraunces', serif" }}>
              Sample Questions For You
            </h2>
            <p className="text-sm text-[#5B6472]">Generated from your resume, role, and company.</p>
          </div>

          <div className="space-y-3">
            {selectedCategories["Projects"] && (
              <div className="rounded-xl border border-[#E4E1DA] p-3.5">
                <h3 className="font-semibold text-sm text-[#12181F] mb-2">📂 Project Questions</h3>
                <ul className="list-disc ml-5 text-sm text-[#5B6472] space-y-1.5">
                  {questions.projectQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCategories["Technical"] && (
              <div className="rounded-xl border border-[#E4E1DA] p-3.5">
                <h3 className="font-semibold text-sm text-[#12181F] mb-2">💻 Technical Questions</h3>
                <ul className="list-disc ml-5 text-sm text-[#5B6472] space-y-1.5">
                  {questions.technicalQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCategories["HR"] && (
              <div className="rounded-xl border border-[#E4E1DA] p-3.5">
                <h3 className="font-semibold text-sm text-[#12181F] mb-2">🧠 HR Questions</h3>
                <ul className="list-disc ml-5 text-sm text-[#5B6472] space-y-1.5">
                  {questions.hrQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Dashboard */}
      <section className="bg-white rounded-2xl border border-[#E4E1DA] shadow-sm p-5">
        <div className="flex items-center justify-between mb-5 gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#12181F]" style={{ fontFamily: "'Fraunces', serif" }}>
              AI Interview Dashboard
            </h2>
            <p className="text-[#5B6472] text-sm">Your interview settings and readiness.</p>
          </div>
          <ReadinessDial percent={percent} />
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="rounded-xl bg-[#E8963C]/10 p-4">
            <div className="text-2xl">🎯</div>
            <p className="text-xs text-[#5B6472] mt-1.5">Target Role</p>
            <h3 className="font-bold text-[#12181F]">{candidate.role}</h3>
          </div>

          <div className="rounded-xl bg-[#1F6F63]/10 p-4">
            <div className="text-2xl">🏢</div>
            <p className="text-xs text-[#5B6472] mt-1.5">Company</p>
            <h3 className="font-bold text-[#12181F]">{candidate.company}</h3>
          </div>

          <div className="rounded-xl bg-orange-50 p-4">
            <div className="text-2xl">📄</div>
            <p className="text-xs text-[#5B6472] mt-1.5">Resume</p>
            <h3 className="font-bold text-[#12181F]">
              {resumeAnalysis ? "Analyzed" : resume ? "Uploaded" : "Not Uploaded"}
            </h3>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-2xl">⏱️</div>
            <p className="text-xs text-[#5B6472] mt-1.5">Duration</p>
            <h3 className="font-bold text-[#12181F]">{duration} min</h3>
          </div>
        </div>
      </section>

      {/* AI Features — Bioluminescent glow grid */}
      <section className="bg-white rounded-2xl border border-[#E4E1DA] shadow-sm p-5">
        <h2 className="text-xl font-bold text-[#12181F] mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
          AI Features
        </h2>

        <AIFeatureGrid />
      </section>

      {/* Before You Start */}
      <section className="bg-white rounded-2xl border border-[#E4E1DA] shadow-sm p-5">
        <h2 className="text-xl font-bold text-[#12181F] mb-4" style={{ fontFamily: "'Fraunces', serif" }}>
          Before You Start
        </h2>

        <div className="space-y-3">
          {CHECKLIST_ITEMS.map((item) => (
            <label key={item.key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#E8963C]"
                checked={checklist[item.key]}
                onChange={() => toggleChecklist(item.key)}
              />
              <span className="text-sm text-[#12181F]">{item.label}</span>
            </label>
          ))}

          <div className="flex items-center gap-3">
            <span
              className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                resume ? "bg-[#1F6F63] text-white" : "bg-[#E4E1DA] text-[#5B6472]"
              }`}
            >
              {resume ? "✓" : ""}
            </span>
            <span className="text-sm text-[#12181F]">
              Resume uploaded {resume ? <span className="text-[#1F6F63] text-xs">(done automatically)</span> : null}
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#12181F] rounded-2xl text-white p-6">
        <div className="flex items-start gap-3">
          <span
            className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${
              isReady ? "bg-[#1F6F63]" : "bg-[#E8963C] animate-pulse"
            }`}
          />
          <div>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
              Ready for Your AI Interview?
            </h2>
            <p className="mt-2.5 text-slate-300 text-sm">
              The AI interviewer will ask resume-based, company-specific, technical, behavioral, and follow-up
              questions. At the end you'll receive a detailed performance report with strengths and improvement
              areas.
            </p>
          </div>
        </div>

        <button
          onClick={handleStart}
          className={`mt-6 font-bold px-7 py-3.5 rounded-xl transition ${
            isReady
              ? "bg-white text-[#12181F] hover:scale-105"
              : "bg-white/20 text-white cursor-pointer hover:bg-white/25"
          }`}
        >
          {isReady ? "Start AI Interview" : "Check What's Missing"}
        </button>

        {showMissing && !isReady && (
          <div className="mt-5 rounded-xl bg-white/10 border border-white/20 p-4">
            <p className="text-sm font-semibold mb-2">Finish these steps first:</p>
            <ul className="list-disc ml-5 text-sm text-slate-200 space-y-1">
              {missingSteps.map((s) => (
                <li key={s.key}>{s.label}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}