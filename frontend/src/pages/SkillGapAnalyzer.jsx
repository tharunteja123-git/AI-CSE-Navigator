import { useState } from "react";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function SkillGapAnalyzer() {
  const { user } = useAuth();
  const [jd, setJd] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!jd.trim()) { toast.error("Paste a job description first"); return; }
    setLoading(true); setResult(null);
    try {
      const profile = await api.getProfile();
      const p = profile.profile;
      const profileText = p
        ? `Languages: ${p.languages}, DSA Level: ${p.dsa_level}, Skill Level: ${p.skill_level}, Career Goal: ${p.career_goal}, Interests: ${p.interests}`
        : `Career Interest: ${user?.career_interest || "Full Stack Developer"}`;

      const data = await api.chat(
        `You are an expert career coach and ATS analyst for CSE students in India.

STUDENT PROFILE:
${profileText}

JOB DESCRIPTION:
${jd}

Analyze the skill gap and respond ONLY with valid JSON (no markdown, no backticks):
{
  "match_score": number (0-100),
  "role": "job role name",
  "company_type": "service/product/startup",
  "matched_skills": ["skill1", "skill2"],
  "missing_skills": [
    {"skill": "name", "priority": "high/medium/low", "learn_in": "X weeks", "resource": "free resource to learn"}
  ],
  "strengths": ["strength1", "strength2"],
  "action_plan": [
    {"week": 1, "task": "what to do this week"},
    {"week": 2, "task": "what to do"},
    {"week": 3, "task": "what to do"},
    {"week": 4, "task": "what to do"}
  ],
  "interview_topics": ["topic1", "topic2", "topic3", "topic4"],
  "verdict": "short 2-line honest assessment"
}`
      );

      const text = data.response.trim().replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      setResult(parsed);
    } catch (e) {
      toast.error("Analysis failed. Make sure to paste a valid job description.");
    } finally { setLoading(false); }
  };

  const priorityColor = (p) => ({
    high: "bg-red-100 text-red-700 border border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    low: "bg-green-100 text-green-700 border border-green-200",
  }[p] || "bg-slate-100 text-slate-600");

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">🔍 Skill Gap Analyzer</h1>
          <p className="text-slate-500 mt-1">Paste any job description to see exactly what skills you're missing</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {/* Input */}
          <div className="md:col-span-2">
            <div className="card h-full flex flex-col">
              <h3 className="font-bold text-slate-800 mb-3">Paste Job Description</h3>
              <p className="text-slate-500 text-xs mb-3">Copy any job posting from LinkedIn, Naukri, or company career page</p>
              <textarea value={jd} onChange={e => setJd(e.target.value)} rows={14}
                className="input resize-none text-xs flex-1 font-mono leading-5"
                placeholder="We are looking for a Full Stack Developer...&#10;&#10;Requirements:&#10;- 0-2 years experience&#10;- React.js, Node.js&#10;- REST APIs&#10;- Git&#10;..." />
              <button onClick={analyze} disabled={loading} className="btn-primary w-full mt-4">
                {loading ? "Analyzing..." : "🔍 Analyze Skill Gap"}
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="md:col-span-3 space-y-4">
            {loading && <div className="card"><LoadingSpinner text="AI is comparing your profile with the job..." /></div>}

            {result && (
              <>
                {/* Match Score */}
                <div className="card">
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                        <circle cx="48" cy="48" r="40" fill="none" stroke="#E0E7FF" strokeWidth="10" />
                        <circle cx="48" cy="48" r="40" fill="none"
                          stroke={result.match_score >= 70 ? "#22C55E" : result.match_score >= 50 ? "#F59E0B" : "#EF4444"}
                          strokeWidth="10"
                          strokeDasharray={`${result.match_score * 2.51} 251`}
                          strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-extrabold text-slate-800">{result.match_score}%</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{result.role}</h3>
                      <span className="badge bg-indigo-50 text-indigo-700 text-xs mt-1">{result.company_type}</span>
                      <p className="text-slate-600 text-sm mt-2 leading-5">{result.verdict}</p>
                    </div>
                  </div>
                </div>

                {/* Matched vs Missing */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="card">
                    <h4 className="font-bold text-green-700 mb-3 text-sm">✅ You Have</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.matched_skills?.map(s => (
                        <span key={s} className="badge bg-green-50 text-green-700 border border-green-100">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="card">
                    <h4 className="font-bold text-red-600 mb-3 text-sm">❌ You Need</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.missing_skills?.map(s => (
                        <span key={s.skill} className={`badge text-xs ${priorityColor(s.priority)}`}>{s.skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Missing skills detail */}
                <div className="card">
                  <h4 className="font-bold text-slate-800 mb-4">📚 Learning Plan for Missing Skills</h4>
                  <div className="space-y-3">
                    {result.missing_skills?.map((s, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                        <span className={`badge text-xs mt-0.5 ${priorityColor(s.priority)}`}>{s.priority}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800 text-sm">{s.skill}</p>
                          <p className="text-slate-500 text-xs mt-0.5">⏱ {s.learn_in} · 📖 {s.resource}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4-week action plan */}
                <div className="card">
                  <h4 className="font-bold text-slate-800 mb-4">🗓 4-Week Action Plan</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {result.action_plan?.map((w, i) => (
                      <div key={i} className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                        <p className="text-xs font-bold text-indigo-600 mb-1">WEEK {w.week}</p>
                        <p className="text-sm text-slate-700">{w.task}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interview topics */}
                <div className="card">
                  <h4 className="font-bold text-slate-800 mb-3">🎯 Interview Topics to Prepare</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.interview_topics?.map(t => (
                      <span key={t} className="badge bg-violet-50 text-violet-700 border border-violet-100">{t}</span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!loading && !result && (
              <div className="card flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="font-bold text-slate-800 mb-2">Ready to Analyze</h3>
                <p className="text-slate-500 text-sm max-w-xs">Paste any job description on the left to get a detailed skill gap analysis and personalized action plan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
