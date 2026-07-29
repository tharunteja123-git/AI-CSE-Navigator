import { useState, useRef, useEffect } from "react";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ReactMarkdown from "react-markdown";
import {
  FiArrowLeft, FiArrowRight, FiCheck, FiSend,
  FiRefreshCw, FiAward, FiTarget, FiZap,
  FiClock, FiBookOpen, FiCode, FiCpu, FiLayers,
  FiTrendingUp, FiUsers, FiStar, FiChevronRight,
} from "react-icons/fi";

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const ROLES = [
  { id: "sde", label: "Software Engineer", icon: ">", desc: "Algorithms, System Design, CS Fundamentals" },
  { id: "frontend", label: "Frontend Developer", icon: ">", desc: "React, JavaScript, CSS, Web APIs" },
  { id: "backend", label: "Backend Developer", icon: ">", desc: "APIs, Databases, Caching, Architecture" },
  { id: "fullstack", label: "Full Stack Developer", icon: ">", desc: "Frontend + Backend + DevOps basics" },
  { id: "ai_ml", label: "AI / ML Engineer", icon: ">", desc: "ML concepts, Python, Mathematics, LLMs" },
  { id: "data", label: "Data Scientist", icon: ">", desc: "Statistics, SQL, Python, ML models" },
  { id: "devops", label: "DevOps Engineer", icon: ">", desc: "CI/CD, Docker, Kubernetes, Cloud" },
  { id: "mobile", label: "Mobile Developer", icon: ">", desc: "React Native / Flutter, APIs, UX" },
];

const LEVELS = [
  { id: "fresher", label: "Fresher", sub: "0 – 1 yr", color: "bg-green-500", light: "bg-green-50", border: "border-green-200", text: "text-green-700" },
  { id: "junior", label: "Junior", sub: "1 – 2 yr", color: "bg-blue-500", light: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  { id: "mid", label: "Mid-Level", sub: "2 – 4 yr", color: "bg-violet-500", light: "bg-violet-50", border: "border-violet-200", text: "text-violet-700" },
  { id: "senior", label: "Senior", sub: "4+ yr", color: "bg-orange-500", light: "bg-orange-50", border: "border-orange-200", text: "text-orange-700" },
];

const CATEGORIES = [
  { id: "dsa", label: "Data Structures & Algorithms", icon: <FiCode />, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-200", desc: "Arrays, Trees, Graphs, DP, Sorting" },
  { id: "system", label: "System Design", icon: <FiLayers />, color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200", desc: "Scalability, Caching, Load Balancing" },
  { id: "cs_core", label: "CS Fundamentals", icon: <FiCpu />, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", desc: "OS, DBMS, CN, OOP, Compilers" },
  { id: "behavioral", label: "HR & Behavioral", icon: <FiUsers />, color: "text-pink-600", bg: "bg-pink-50", border: "border-pink-200", desc: "Tell me about yourself, conflict, goals" },
  { id: "project", label: "Project Based", icon: <FiBookOpen />, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200", desc: "Deep dive on resume projects" },
  { id: "aptitude", label: "Aptitude & Puzzles", icon: <FiZap />, color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200", desc: "Logic, reasoning, brain teasers" },
];

const TOTAL_ROUNDS = 5;

const diffColor = { Easy: "text-green-600 bg-green-50 border-green-200", Medium: "text-yellow-600 bg-yellow-50 border-yellow-200", Hard: "text-red-600 bg-red-50 border-red-200" };
const scoreColor = (s) => s >= 8 ? "text-green-600" : s >= 6 ? "text-yellow-600" : "text-red-500";
const scoreBg = (s) => s >= 8 ? "bg-green-50 border-green-200" : s >= 6 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-100";
const scoreLabel = (s) => s >= 9 ? "Outstanding 🌟" : s >= 8 ? "Excellent 🎉" : s >= 7 ? "Good 👍" : s >= 5 ? "Average 📚" : "Needs Work 💪";

// ─────────────────────────────────────────
// STEP INDICATOR
// ─────────────────────────────────────────
function StepBar({ steps, current }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className={`flex items-center gap-2 ${i < current ? "opacity-100" : i === current ? "opacity-100" : "opacity-40"}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
              i < current
                ? "bg-indigo-600 border-indigo-600 text-white"
                : i === current
                ? "bg-white border-indigo-600 text-indigo-600"
                : "bg-white border-slate-300 text-slate-400"
            }`}>
              {i < current ? <FiCheck /> : i + 1}
            </div>
            <span className={`text-xs font-semibold hidden sm:block ${i === current ? "text-indigo-700" : "text-slate-400"}`}>{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-px mx-3 ${i < current ? "bg-indigo-400" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// ROUND PROGRESS BAR
// ─────────────────────────────────────────
function RoundProgress({ round, scores }) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
        const s = scores[i];
        const isCurrent = i === round - 1;
        const isDone = i < round - 1;
        return (
          <div key={i} className="flex-1">
            <div className={`h-2 rounded-full transition-all duration-500 ${
              isDone
                ? s >= 8 ? "bg-green-500" : s >= 6 ? "bg-yellow-500" : "bg-red-400"
                : isCurrent
                ? "bg-indigo-500 animate-pulse"
                : "bg-slate-200"
            }`} />
            <div className="text-center mt-1">
              <span className={`text-xs font-semibold ${isCurrent ? "text-indigo-600" : "text-slate-300"}`}>
                {isDone ? (s ?? "–") : isCurrent ? `Q${i + 1}` : ""}
              </span>
            </div>
          </div>
        );
      })}
      <span className="text-xs text-slate-500 whitespace-nowrap ml-1">{round}/{TOTAL_ROUNDS}</span>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
export default function MockInterview() {
  const [phase, setPhase] = useState("setup"); // setup | interview | done
  const [setupStep, setSetupStep] = useState(0); // 0=role, 1=level, 2=category
  const [role, setRole] = useState(null);
  const [level, setLevel] = useState(null);
  const [category, setCategory] = useState(null);

  const [round, setRound] = useState(1);
  const [question, setQuestion] = useState("");
  const [questionMeta, setQuestionMeta] = useState({ difficulty: "Medium", topic: "" });
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(null);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [interviewPhase, setInterviewPhase] = useState("question"); // question | answer | feedback

  const answerRef = useRef(null);

  useEffect(() => {
    if (interviewPhase === "answer" && answerRef.current) {
      answerRef.current.focus();
    }
  }, [interviewPhase]);

  // ── SETUP STEP CONFIG ──
  const setupSteps = ["Choose Role", "Select Level", "Pick Category"];

  // ── GENERATE QUESTION ──
  const generateQuestion = async () => {
    setLoading(true);
    setQuestion("");
    setAnswer("");
    setFeedback("");
    setScore(null);
    setInterviewPhase("question");
    const roleObj = ROLES.find(r => r.id === role);
    const levelObj = LEVELS.find(l => l.id === level);
    const catObj = CATEGORIES.find(c => c.id === category);
    try {
      const data = await api.chat(
        `You are a senior technical interviewer at a top tech company in India conducting a mock interview.

Role: ${roleObj?.label}
Level: ${levelObj?.label} (${levelObj?.sub})
Category: ${catObj?.label}
Round: ${round} of ${TOTAL_ROUNDS}

Generate ONE interview question. Rules:
- Ask only ONE clear, specific question
- No introduction or preamble — just the question directly
- For DSA: include a concrete problem statement with example
- For System Design: include specific scale requirements (e.g., "design for 10M users")
- For CS Core: ask something precise and testable
- For Behavioral: make it situational and open-ended
- For Project: ask to explain architecture decisions and tradeoffs
- Vary difficulty across rounds: round 1-2 easier, round 3-4 medium, round 5 hard

Also on the VERY LAST LINE write exactly: DIFFICULTY: Easy|Medium|Hard`
      );
      const raw = data.response || "";
      const lines = raw.trim().split("\n");
      const lastLine = lines[lines.length - 1];
      let diff = "Medium";
      let qText = raw.trim();
      if (lastLine.startsWith("DIFFICULTY:")) {
        diff = lastLine.replace("DIFFICULTY:", "").trim();
        qText = lines.slice(0, -1).join("\n").trim();
      }
      setQuestion(qText);
      setQuestionMeta({ difficulty: diff, topic: catObj?.label || "" });
      setInterviewPhase("answer");
    } catch {
      setQuestion("❌ Failed to generate question. Please check your API key.");
      setInterviewPhase("answer");
    }
    setLoading(false);
  };

  // ── START INTERVIEW ──
  const startInterview = () => {
    setPhase("interview");
    setRound(1);
    setScores([]);
    generateQuestion();
  };

  // ── SUBMIT ANSWER ──
  const submitAnswer = async () => {
    if (!answer.trim()) return;
    setLoading(true);
    setInterviewPhase("feedback");
    const roleObj = ROLES.find(r => r.id === role);
    try {
      const data = await api.chat(
        `You are an expert technical interviewer evaluating a ${roleObj?.label} candidate.

Question: ${question}

Candidate's Answer: ${answer}

Evaluate strictly but fairly and give actionable feedback. Format your response EXACTLY like this:

**Score: X/10**

**Verdict:** [One line honest assessment]

**✅ What Was Good:**
- [specific strength 1]
- [specific strength 2]

**❌ What Was Missing / Wrong:**
- [specific gap 1]
- [specific gap 2]

**💡 Ideal Answer:**
[3-5 lines of the best answer approach]

**⚡ Key Takeaway:**
[One actionable tip to improve]`
      );
      const raw = data.response || "";
      setFeedback(raw);
      const match = raw.match(/Score:\s*(\d+)/i);
      const s = match ? parseInt(match[1]) : 6;
      setScore(s);
      setScores(prev => [...prev, s]);
    } catch {
      setFeedback("❌ Failed to evaluate. Please try again.");
    }
    setLoading(false);
  };

  // ── NEXT ROUND ──
  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setPhase("done");
    } else {
      setRound(r => r + 1);
      generateQuestion();
    }
  };

  // ── RESTART ──
  const restart = () => {
    setPhase("setup");
    setSetupStep(0);
    setRole(null);
    setLevel(null);
    setCategory(null);
    setRound(1);
    setScores([]);
    setQuestion("");
    setAnswer("");
    setFeedback("");
    setScore(null);
  };

  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  // ─────────────────────────────────────────
  // RENDER: SETUP
  // ─────────────────────────────────────────
  if (phase === "setup") {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <FiZap className="text-xs" /> AI-Powered Mock Interview
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Practice Like It's Real</h1>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              5 rounds of real interview questions with instant AI feedback, scoring, and improvement tips.
            </p>
          </div>

          {/* Steps */}
          <StepBar steps={setupSteps} current={setupStep} />

          {/* ── STEP 0: Role ── */}
          {setupStep === 0 && (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-4">What role are you interviewing for?</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {ROLES.map(r => (
                  <button key={r.id} onClick={() => setRole(r.id)}
                    className={`text-left flex items-start gap-4 p-4 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      role === r.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 bg-white hover:border-indigo-300"
                    }`}>
                    <span className="text-2xl">{r.icon}</span>
                    <div>
                      <p className={`font-bold text-sm ${role === r.id ? "text-indigo-700" : "text-slate-800"}`}>{r.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-4">{r.desc}</p>
                    </div>
                    {role === r.id && <FiCheck className="ml-auto text-indigo-500 flex-shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
              <button onClick={() => setSetupStep(1)} disabled={!role}
                className="btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-40">
                Continue <FiArrowRight />
              </button>
            </div>
          )}

          {/* ── STEP 1: Level ── */}
          {setupStep === 1 && (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-4">What is your experience level?</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {LEVELS.map(l => (
                  <button key={l.id} onClick={() => setLevel(l.id)}
                    className={`text-left flex items-center gap-4 p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      level === l.id
                        ? `${l.border} ${l.light}`
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}>
                    <div className={`w-10 h-10 ${l.color} rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {l.sub.split("–")[0].trim()}yr
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold ${level === l.id ? l.text : "text-slate-800"}`}>{l.label}</p>
                      <p className="text-xs text-slate-400">{l.sub} experience</p>
                    </div>
                    {level === l.id && <FiCheck className={`${l.text} flex-shrink-0`} />}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setSetupStep(0)} className="btn-outline flex items-center gap-2">
                  <FiArrowLeft /> Back
                </button>
                <button onClick={() => setSetupStep(2)} disabled={!level}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-40">
                  Continue <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Category ── */}
          {setupStep === 2 && (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-4">What type of questions do you want to practice?</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => setCategory(c.id)}
                    className={`text-left flex items-start gap-4 p-4 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-md ${
                      category === c.id
                        ? `${c.border} ${c.bg}`
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}>
                    <span className={`text-lg mt-0.5 ${category === c.id ? c.color : "text-slate-400"}`}>{c.icon}</span>
                    <div className="flex-1">
                      <p className={`font-bold text-sm ${category === c.id ? c.color : "text-slate-800"}`}>{c.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5 leading-4">{c.desc}</p>
                    </div>
                    {category === c.id && <FiCheck className={`${c.color} flex-shrink-0`} />}
                  </button>
                ))}
              </div>

              {/* Summary */}
              {role && level && category && (
                <div className="mt-5 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
                  <p className="text-xs font-bold text-indigo-700 mb-2 uppercase tracking-wider">Interview Setup</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: ROLES.find(r => r.id === role)?.label, icon: ROLES.find(r => r.id === role)?.icon },
                      { label: LEVELS.find(l => l.id === level)?.label },
                      { label: CATEGORIES.find(c => c.id === category)?.label },
                      { label: `${TOTAL_ROUNDS} Rounds` },
                    ].map(({ label, icon }) => (
                      <span key={label} className="text-xs bg-white border border-indigo-200 text-indigo-700 px-2.5 py-1 rounded-full font-medium">
                        {icon && `${icon} `}{label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-5">
                <button onClick={() => setSetupStep(1)} className="btn-outline flex items-center gap-2">
                  <FiArrowLeft /> Back
                </button>
                <button onClick={startInterview} disabled={!category}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 text-base disabled:opacity-40 py-3">
                  <FiZap /> Start Interview
                </button>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // ─────────────────────────────────────────
  // RENDER: DONE
  // ─────────────────────────────────────────
  if (phase === "done") {
    const grade = avgScore >= 8 ? "A" : avgScore >= 6 ? "B" : avgScore >= 4 ? "C" : "D";
    const gradeColor = avgScore >= 8 ? "text-green-600" : avgScore >= 6 ? "text-yellow-600" : "text-red-500";
    const gradeBg = avgScore >= 8 ? "bg-green-50 border-green-200" : avgScore >= 6 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-100";
    const verdict = avgScore >= 8 ? "Interview Ready! 🏆" : avgScore >= 6 ? "Strong Candidate 🌟" : avgScore >= 4 ? "Keep Practicing 📚" : "More Prep Needed 💪";
    const roleObj = ROLES.find(r => r.id === role);
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          {/* Hero result */}
          <div className={`card text-center py-10 border-2 ${gradeBg} mb-6`}>
            <div className={`text-7xl font-extrabold ${gradeColor} mb-1`}>{grade}</div>
            <div className={`text-3xl font-extrabold ${gradeColor} mb-1`}>{avgScore}/10</div>
            <p className="text-slate-600 font-semibold text-lg mb-1">{verdict}</p>
            <p className="text-slate-400 text-sm">{TOTAL_ROUNDS} rounds of {roleObj?.label} interview completed</p>
          </div>

          {/* Round breakdown */}
          <div className="card mb-5">
            <p className="font-bold text-slate-800 mb-4">Round-by-Round Performance</p>
            <div className="space-y-3">
              {scores.map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-500 w-16">Round {i + 1}</span>
                  <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-700 ${s >= 8 ? "bg-green-500" : s >= 6 ? "bg-yellow-500" : "bg-red-400"}`}
                      style={{ width: `${s * 10}%` }}
                    />
                  </div>
                  <span className={`text-sm font-extrabold w-8 text-right ${scoreColor(s)}`}>{s}/10</span>
                  <span className="text-xs text-slate-400 w-28">{scoreLabel(s)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="card mb-5">
            <p className="font-bold text-slate-800 mb-3">What to Do Next</p>
            <div className="space-y-2">
              {avgScore < 6 && (
                <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-xl">
                  <FiBookOpen className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">Focus on fundamentals first — revisit core concepts in the Concept Hub</p>
                </div>
              )}
              {avgScore >= 6 && avgScore < 8 && (
                <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
                  <FiTarget className="text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-yellow-700">Good foundation! Practice more problems and work on articulation</p>
                </div>
              )}
              {avgScore >= 8 && (
                <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                  <FiAward className="text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-700">Excellent performance! You're ready for real interviews. Start applying!</p>
                </div>
              )}
              {[
                "Try the Skill Gap Analyzer with a real job description",
                "Practice more in the Coding Tracker — solve 3 problems today",
                "Polish your resume with the Resume Analyzer",
              ].map((tip, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                  <p className="text-sm text-slate-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={restart} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <FiRefreshCw /> Practice Again
            </button>
            <button onClick={() => { setPhase("interview"); setRound(1); setScores([]); generateQuestion(); }}
              className="btn-outline flex items-center gap-2">
              Same Setup
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ─────────────────────────────────────────
  // RENDER: INTERVIEW
  // ─────────────────────────────────────────
  const roleObj = ROLES.find(r => r.id === role);
  const levelObj = LEVELS.find(l => l.id === level);
  const catObj = CATEGORIES.find(c => c.id === category);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <button onClick={restart} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
              <FiArrowLeft />
            </button>
            <div>
              <h1 className="font-bold text-slate-900 text-lg">Mock Interview</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-slate-500">{roleObj?.icon} {roleObj?.label}</span>
                <span className="text-slate-300">·</span>
                <span className={`text-xs font-semibold ${levelObj?.text}`}>{levelObj?.label}</span>
                <span className="text-slate-300">·</span>
                <span className={`text-xs font-semibold ${catObj?.color}`}>{catObj?.label}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="text-slate-400 text-sm" />
            <span className="text-sm text-slate-500">Round {round} of {TOTAL_ROUNDS}</span>
          </div>
        </div>

        {/* Round progress */}
        <RoundProgress round={round} scores={scores} />

        {/* Loading state */}
        {loading && interviewPhase === "question" && (
          <div className="card text-center py-16">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="font-semibold text-slate-700">Generating your question...</p>
            <p className="text-slate-400 text-sm mt-1">AI is crafting a personalized {catObj?.label} question</p>
          </div>
        )}

        {/* Question Phase */}
        {interviewPhase === "answer" && question && (
          <div className="space-y-4">
            {/* Question card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -translate-y-8 translate-x-8" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${diffColor[questionMeta.difficulty]}`}>
                    {questionMeta.difficulty}
                  </span>
                  <span className="text-xs text-white/40 font-medium">{catObj?.label}</span>
                  <span className="ml-auto text-xs text-white/30">Round {round}</span>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{question}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Answer area */}
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-slate-700">Your Answer</label>
                <span className="text-xs text-slate-400">{answer.length} characters</span>
              </div>
              <textarea
                ref={answerRef}
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                rows={9}
                className="input resize-none font-mono text-sm leading-6 w-full"
                placeholder={
                  catObj?.id === "dsa"
                    ? "Explain your approach, time & space complexity, then write the code..."
                    : catObj?.id === "system"
                    ? "Describe the high-level design, components, data flow, and tradeoffs..."
                    : catObj?.id === "behavioral"
                    ? "Use the STAR method: Situation, Task, Action, Result..."
                    : "Write your detailed answer here..."
                }
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <FiTarget className="text-xs" />
                  <span>Tip: {catObj?.id === "dsa" ? "State brute force first, then optimize" : catObj?.id === "system" ? "Start with requirements, then architecture" : "Be specific and use examples"}</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => nextRound()} className="btn-outline text-sm">
                    Skip
                  </button>
                  <button onClick={submitAnswer} disabled={!answer.trim() || loading}
                    className="btn-primary flex items-center gap-2 disabled:opacity-40">
                    <FiSend className="text-sm" /> Submit Answer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Phase */}
        {interviewPhase === "feedback" && (
          <div className="space-y-4">
            {loading ? (
              <div className="card text-center py-12">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3" />
                <p className="font-semibold text-slate-700">Evaluating your answer...</p>
                <p className="text-slate-400 text-sm mt-1">AI interviewer is reviewing your response</p>
              </div>
            ) : (
              <>
                {/* Score banner */}
                <div className={`card border-2 ${scoreBg(score ?? 0)} text-center py-6`}>
                  <div className={`text-5xl font-extrabold mb-1 ${scoreColor(score ?? 0)}`}>{score}/10</div>
                  <p className={`font-bold text-lg ${scoreColor(score ?? 0)}`}>{scoreLabel(score ?? 0)}</p>
                  <p className="text-slate-400 text-sm mt-1">Round {round} Score</p>
                </div>

                {/* AI Feedback */}
                <div className="card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <FiStar className="text-indigo-600 text-sm" />
                    </div>
                    <p className="font-bold text-slate-800">Interviewer Feedback</p>
                  </div>
                  <div className="prose prose-slate prose-sm max-w-none
                    prose-headings:text-slate-800 prose-headings:font-bold
                    prose-strong:text-slate-800
                    prose-li:text-slate-600">
                    <ReactMarkdown>{feedback}</ReactMarkdown>
                  </div>
                </div>

                {/* Your answer recap */}
                <div className="card bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Your Answer</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap leading-6">{answer}</p>
                </div>

                {/* Next action */}
                <div className="flex gap-3">
                  {round < TOTAL_ROUNDS ? (
                    <button onClick={nextRound} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-base">
                      Next Question <FiChevronRight />
                    </button>
                  ) : (
                    <button onClick={() => setPhase("done")} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-base">
                      <FiAward /> See Final Results
                    </button>
                  )}
                  <button onClick={restart} className="btn-outline flex items-center gap-2">
                    <FiRefreshCw /> Restart
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}