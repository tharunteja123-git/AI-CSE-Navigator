import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

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

const AI_FEATURES = [
  "Resume Based Questions",
  "Project Deep Dive",
  "Company Specific Questions",
  "Behavioral Interview",
  "Technical Interview",
  "Follow-up Questions",
  "Real-time Feedback",
  "Confidence Analysis",
  "Communication Analysis",
  "Grammar Checking",
  "Answer Quality Score",
  "Final Interview Report",
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

  function handleFileChosen(file) {
    if (!file) return;
    setResume(file);
    setResumeAnalysis(null);
    setAnalysisError(null);
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
    <div className="max-w-4xl mx-auto space-y-6" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Candidate Profile */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-6">
        <h2
          className="text-2xl font-bold text-[#12181F] mb-6"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Candidate Profile
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          <Field label="Full Name" error={nameError}>
            <input
              type="text"
              placeholder="John Doe"
              value={candidate.fullName}
              onChange={updateCandidate("fullName")}
              onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
              className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#E8963C]/40 ${
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
              className={`w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-[#E8963C]/40 ${
                emailError ? "border-rose-400" : "border-[#E4E1DA]"
              }`}
            />
          </Field>

          <Field label="Target Role">
            <select
              value={candidate.role}
              onChange={updateCandidate("role")}
              className="w-full rounded-xl border border-[#E4E1DA] px-4 py-3 outline-none focus:ring-2 focus:ring-[#E8963C]/40"
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
              className="w-full rounded-xl border border-[#E4E1DA] px-4 py-3 outline-none focus:ring-2 focus:ring-[#E8963C]/40"
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
              className="w-full rounded-xl border border-[#E4E1DA] px-4 py-3 outline-none focus:ring-2 focus:ring-[#E8963C]/40"
            >
              {EXPERIENCE_OPTIONS.map((exp) => (
                <option key={exp}>{exp}</option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      {/* Resume upload */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-6">
        <h2 className="text-2xl font-bold text-[#12181F] mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
          Resume
        </h2>

        <label className="border-2 border-dashed border-[#E8963C]/50 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-[#E8963C]/5 transition">
          <div className="text-5xl">📄</div>
          <h3 className="font-bold text-lg mt-3 text-[#12181F]">Upload Resume</h3>
          <p className="text-[#5B6472] mt-2">Drag & Drop PDF / DOCX</p>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="mt-5 bg-[#12181F] hover:bg-[#1F2731] text-white px-5 py-2 rounded-xl transition"
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            hidden
            onChange={(e) => handleFileChosen(e.target.files?.[0] || null)}
          />
        </label>

        {resume && (
          <div className="mt-5 rounded-xl bg-[#1F6F63]/10 border border-[#1F6F63]/30 p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold text-[#1F6F63]">Resume uploaded</div>
              <div className="text-sm mt-1 text-[#12181F]">{resume.name}</div>
            </div>
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="px-4 py-2 rounded-lg bg-[#12181F] text-white hover:bg-[#1F2731] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {analyzing ? "Analyzing…" : resumeAnalysis ? "Re-analyze" : "Analyze Resume"}
            </button>
          </div>
        )}

        {analysisError && (
          <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-700">
            {analysisError}
          </div>
        )}
      </section>

      {/* AI Resume Analysis */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-6">
        <h2 className="text-xl font-bold text-[#12181F] mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
          AI Resume Analysis
        </h2>

        {!resumeAnalysis ? (
          <p className="text-sm text-[#5B6472]">
            {resume ? "Click \"Analyze Resume\" above to scan your file." : "Upload a resume to see your score and detected skills."}
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-xl bg-[#E8963C]/10 p-5">
              <p className="text-sm text-[#5B6472]">Resume Score</p>
              <h2
                className="text-4xl font-bold text-[#E8963C]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {resumeAnalysis.score}%
              </h2>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-[#12181F]">Skills Detected</h3>
              <div className="flex flex-wrap gap-2">
                {resumeAnalysis.detected.length ? (
                  resumeAnalysis.detected.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-[#1F6F63]/10 text-[#1F6F63] text-sm">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-[#5B6472]">No known skills detected yet.</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-[#12181F]">Recommended for {candidate.role}</h3>
              <div className="flex flex-wrap gap-2">
                {resumeAnalysis.recommended.length ? (
                  resumeAnalysis.recommended.map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm">
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-[#5B6472]">Great coverage for this role.</span>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Interview Preferences */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-6">
        <h2 className="text-xl font-bold text-[#12181F] mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
          Interview Preferences
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-[#12181F] block mb-2">Interview Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full rounded-xl border border-[#E4E1DA] px-4 py-3 outline-none focus:ring-2 focus:ring-[#E8963C]/40"
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
            <label className="font-semibold text-[#12181F] block mb-2">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full rounded-xl border border-[#E4E1DA] px-4 py-3 outline-none focus:ring-2 focus:ring-[#E8963C]/40"
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
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#12181F]" style={{ fontFamily: "'Fraunces', serif" }}>
            Question Categories
          </h2>
          <span className="text-sm text-[#5B6472]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
            {activeCategoryCount}/{CATEGORIES.length} selected
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((category) => (
            <label
              key={category}
              className={`flex items-center gap-2 rounded-xl border p-3 cursor-pointer transition ${
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
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E1DA] p-6">
        <div className="flex items-center justify-between mb-5">
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
        <section className="bg-white rounded-2xl border border-[#E4E1DA] shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#12181F]" style={{ fontFamily: "'Fraunces', serif" }}>
              Sample Questions For You
            </h2>
            <p className="text-sm text-[#5B6472]">Generated from your resume, role, and company.</p>
          </div>

          <div className="space-y-4">
            {selectedCategories["Projects"] && (
              <div className="rounded-xl border border-[#E4E1DA] p-4">
                <h3 className="font-semibold text-[#12181F] mb-2">📂 Project Questions</h3>
                <ul className="list-disc ml-6 text-sm text-[#5B6472] space-y-2">
                  {questions.projectQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCategories["Technical"] && (
              <div className="rounded-xl border border-[#E4E1DA] p-4">
                <h3 className="font-semibold text-[#12181F] mb-2">💻 Technical Questions</h3>
                <ul className="list-disc ml-6 text-sm text-[#5B6472] space-y-2">
                  {questions.technicalQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCategories["HR"] && (
              <div className="rounded-xl border border-[#E4E1DA] p-4">
                <h3 className="font-semibold text-[#12181F] mb-2">🧠 HR Questions</h3>
                <ul className="list-disc ml-6 text-sm text-[#5B6472] space-y-2">
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
      <section className="bg-white rounded-2xl border border-[#E4E1DA] shadow-sm p-6">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#12181F]" style={{ fontFamily: "'Fraunces', serif" }}>
              AI Interview Dashboard
            </h2>
            <p className="text-[#5B6472] text-sm">Your interview settings and readiness.</p>
          </div>
          <ReadinessDial percent={percent} />
        </div>

        <div className="grid md:grid-cols-4 gap-5">
          <div className="rounded-xl bg-[#E8963C]/10 p-5">
            <div className="text-3xl">🎯</div>
            <p className="text-sm text-[#5B6472] mt-2">Target Role</p>
            <h3 className="font-bold text-lg text-[#12181F]">{candidate.role}</h3>
          </div>

          <div className="rounded-xl bg-[#1F6F63]/10 p-5">
            <div className="text-3xl">🏢</div>
            <p className="text-sm text-[#5B6472] mt-2">Company</p>
            <h3 className="font-bold text-lg text-[#12181F]">{candidate.company}</h3>
          </div>

          <div className="rounded-xl bg-orange-50 p-5">
            <div className="text-3xl">📄</div>
            <p className="text-sm text-[#5B6472] mt-2">Resume</p>
            <h3 className="font-bold text-lg text-[#12181F]">
              {resumeAnalysis ? "Analyzed" : resume ? "Uploaded" : "Not Uploaded"}
            </h3>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <div className="text-3xl">⏱️</div>
            <p className="text-sm text-[#5B6472] mt-2">Duration</p>
            <h3 className="font-bold text-lg text-[#12181F]">{duration} min</h3>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section className="bg-white rounded-2xl border border-[#E4E1DA] shadow-sm p-6">
        <h2 className="text-xl font-bold text-[#12181F] mb-6" style={{ fontFamily: "'Fraunces', serif" }}>
          AI Features
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {AI_FEATURES.map((feature) => (
            <div
              key={feature}
              className="rounded-xl border border-[#E4E1DA] p-4 hover:border-[#E8963C] hover:bg-[#E8963C]/5 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8963C]/15 text-[#E8963C] flex items-center justify-center">
                  ✓
                </div>
                <h3 className="font-semibold text-[#12181F]">{feature}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Before You Start */}
      <section className="bg-white rounded-2xl border border-[#E4E1DA] shadow-sm p-6">
        <h2 className="text-xl font-bold text-[#12181F] mb-5" style={{ fontFamily: "'Fraunces', serif" }}>
          Before You Start
        </h2>

        <div className="space-y-4">
          {CHECKLIST_ITEMS.map((item) => (
            <label key={item.key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="accent-[#E8963C]"
                checked={checklist[item.key]}
                onChange={() => toggleChecklist(item.key)}
              />
              <span className="text-[#12181F]">{item.label}</span>
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
            <span className="text-[#12181F]">
              Resume uploaded {resume ? <span className="text-[#1F6F63] text-sm">(done automatically)</span> : null}
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#12181F] rounded-2xl text-white p-8">
        <div className="flex items-start gap-3">
          <span
            className={`mt-1 w-3 h-3 rounded-full flex-shrink-0 ${
              isReady ? "bg-[#1F6F63]" : "bg-[#E8963C] animate-pulse"
            }`}
          />
          <div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
              Ready for Your AI Interview?
            </h2>
            <p className="mt-3 text-slate-300">
              The AI interviewer will ask resume-based, company-specific, technical, behavioral, and follow-up
              questions. At the end you'll receive a detailed performance report with strengths and improvement
              areas.
            </p>
          </div>
        </div>

        <button
          onClick={handleStart}
          className={`mt-8 font-bold px-8 py-4 rounded-xl transition ${
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