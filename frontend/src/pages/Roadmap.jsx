import { useState, useEffect, useMemo } from 'react'
import { api } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import { Link } from 'react-router-dom'

/**
 * Real, practical roadmaps.
 * Every phase is a concrete "how to actually start" step — not a generic
 * calendar grid. Each task can carry a `why` (why it matters) and a
 * `resource` (where to actually go do it), because a checklist without
 * context is just busywork.
 */
const staticRoadmaps = {
  'AI Engineer': [
    {
      phase: 'Phase 1',
      title: 'Get your hands dirty with Python',
      duration: '2–3 weeks',
      goal: 'Stop reading tutorials, start writing code that does something.',
      tasks: [
        { text: 'Install Python + VS Code, learn the terminal basics', why: 'You will live in these tools for years — 30 min now saves hours later.' },
        { text: 'Python syntax, functions, loops, OOP', why: 'Every ML library you will use is built on these fundamentals.' },
        { text: 'NumPy & Pandas on a real dataset', resource: 'Kaggle "Titanic" dataset', why: 'This is the actual day-to-day toolkit of an AI engineer.' },
        { text: 'Ship one tiny script that solves a real annoyance in your life', why: 'Proof you can build, not just follow along.' },
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Learn how machines actually learn',
      duration: '3–4 weeks',
      goal: 'Understand the math and intuition well enough to explain it to someone else.',
      tasks: [
        { text: 'Linear algebra & probability — just the parts ML uses', why: 'You need intuition, not a full math degree.' },
        { text: 'Scikit-learn: regression, classification, clustering', why: 'This is 80% of real-world ML work, still.' },
        { text: 'Train/test splits, overfitting, cross-validation', why: 'The difference between a model that works and one that lies to you.' },
        { text: 'Enter a beginner Kaggle competition end-to-end', resource: 'kaggle.com/competitions', why: 'Competitions force you to finish, not just tinker.' },
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Go deep: neural networks',
      duration: '4 weeks',
      goal: 'Build and train a real neural net from scratch, then with a framework.',
      tasks: [
        { text: 'Neural nets from scratch (no framework) — just once', why: 'Removes the "magic" and makes debugging models later much easier.' },
        { text: 'PyTorch fundamentals', why: 'The framework used by almost every modern AI team and paper.' },
        { text: 'Build and train an image classifier (CNN)', resource: 'CIFAR-10 or your own photos', why: 'A tangible result you can show, not just a metric.' },
        { text: 'Read 2–3 papers on the model type you built (with a paper explainer video alongside)', why: 'Learn to read research early — it never stops being part of the job.' },
      ],
    },
    {
      phase: 'Phase 4',
      title: 'LLMs, RAG & shipping real AI products',
      duration: '4 weeks',
      goal: 'Build the kind of AI feature companies are actually hiring for right now.',
      tasks: [
        { text: 'Transformers & attention — the "why" behind LLMs', why: 'Interviewers ask this constantly; also just genuinely useful.' },
        { text: 'Prompting, embeddings & vector search', why: 'The building blocks of every RAG system in production.' },
        { text: 'Build a RAG chatbot over your own documents', resource: 'LangChain / LlamaIndex + an open API', why: 'This exact project pattern shows up in real job descriptions.' },
        { text: 'Deploy it publicly (HuggingFace Spaces or a cheap VM)', why: 'A live link beats a GitHub repo nobody runs.' },
      ],
    },
    {
      phase: 'Phase 5',
      title: 'Get hired',
      duration: 'Ongoing',
      goal: 'Turn 5 months of work into interviews.',
      tasks: [
        { text: 'Pick your 3 strongest projects and rewrite the READMEs to sell them', why: 'Recruiters skim for 20 seconds — make those seconds count.' },
        { text: 'Rebuild your LinkedIn + GitHub around "AI Engineer"', why: 'You get found before you ever apply.' },
        { text: 'Apply to 5 roles a day, not 50 in one weekend', why: 'Consistency beats bursts — and you can tailor each one.' },
        { text: 'Do 2 mock interviews (ML + behavioral) before your first real one', why: 'The first real interview should not be your first practice run.' },
      ],
    },
  ],
  'Full Stack Developer': [
    {
      phase: 'Phase 1',
      title: 'The web, for real this time',
      duration: '2–3 weeks',
      goal: 'Build one real page from a blank file, no templates.',
      tasks: [
        { text: 'HTML5 semantics done properly', why: 'Clean structure now means far less pain in every framework later.' },
        { text: 'CSS Flexbox & Grid — build 3 different layouts', why: 'Layout is the one skill you will use in literally every project.' },
        { text: 'JavaScript ES6+: arrays, promises, async/await', why: 'The actual language behind React, Node, and almost everything else.' },
        { text: 'Build and deploy a static landing page', resource: 'Vercel or GitHub Pages', why: 'Deploying early kills the fear of deploying later.' },
      ],
    },
    {
      phase: 'Phase 2',
      title: 'React: build things people click on',
      duration: '3–4 weeks',
      goal: 'Go from static pages to an app with real state and navigation.',
      tasks: [
        { text: 'Components, props, hooks (useState/useEffect)', why: 'The core mental model of modern frontend work.' },
        { text: 'React Router — multi-page app navigation', why: 'Almost no real app is a single page.' },
        { text: 'Tailwind CSS for fast, consistent styling', why: 'The industry-standard way to style quickly without a CSS file explosion.' },
        { text: 'Build a full Todo or Blog app with local persistence', why: 'Small enough to finish, real enough to put on your resume.' },
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Backend: make your app actually do something',
      duration: '3–4 weeks',
      goal: 'Stand up a real API with a real database behind your frontend.',
      tasks: [
        { text: 'FastAPI basics — routes, request/response models', why: 'Fast to learn, genuinely used in production at real companies.' },
        { text: 'REST API design: resources, status codes, pagination', why: 'This is the contract your frontend and backend agree on.' },
        { text: 'JWT authentication — login, sessions, protected routes', why: 'Almost every app needs "who is this user" solved correctly.' },
        { text: 'PostgreSQL + SQLAlchemy — model real relationships', why: 'SQL is the one skill that ages the slowest in this industry.' },
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Ship a full-stack project end to end',
      duration: '3–4 weeks',
      goal: 'One project, frontend to database to live URL.',
      tasks: [
        { text: 'Connect your React app to your FastAPI backend', why: 'This connection is where most real bugs — and real learning — happen.' },
        { text: 'Docker basics — containerize your app', why: 'Almost every job posting lists this; it is not optional anymore.' },
        { text: 'Deploy frontend + backend + DB (Render, Railway, or Vercel)', why: 'A dead GitHub repo convinces nobody — a live app does.' },
        { text: 'Write a portfolio-quality README with screenshots', why: 'This is often the only thing a recruiter actually reads.' },
      ],
    },
    {
      phase: 'Phase 5',
      title: 'DSA + get hired',
      duration: 'Ongoing',
      goal: 'Be ready for both the take-home and the whiteboard.',
      tasks: [
        { text: 'Arrays, strings, hashmaps, and basic DP patterns', why: 'These patterns cover the large majority of entry-level interview questions.' },
        { text: 'Solve 100 problems on LeetCode, tracked by pattern not count', why: 'Recognizing the pattern matters more than the raw number solved.' },
        { text: 'System design basics: how a web app actually scales', why: 'Increasingly asked even at junior level.' },
        { text: 'Apply daily + do 2 mock interviews before your first real one', why: 'Momentum and practice beat waiting to feel "ready."' },
      ],
    },
  ],
}

const fallback = staticRoadmaps['AI Engineer']

function loadChecked(role) {
  try {
    const raw = localStorage.getItem(`roadmap-progress:${role}`)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export default function Roadmap() {
  const [assessment, setAssessment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [checked, setChecked] = useState({})
  const [openPhase, setOpenPhase] = useState(0)

  useEffect(() => {
    api.getAssessment().then(d => {
      if (!d.detail) setAssessment(d)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const role = assessment?.recommended_role || 'AI Engineer'
  const roadmap = staticRoadmaps[role] || fallback

  useEffect(() => {
    setChecked(loadChecked(role))
  }, [role])

  const toggle = (key) => {
    setChecked(c => {
      const next = { ...c, [key]: !c[key] }
      try { localStorage.setItem(`roadmap-progress:${role}`, JSON.stringify(next)) } catch {}
      return next
    })
  }

  const phaseStats = useMemo(() => {
    return roadmap.map((phase, pi) => {
      const total = phase.tasks.length
      const done = phase.tasks.filter((_, ti) => checked[`${pi}-${ti}`]).length
      return { total, done, pct: total ? Math.round((done / total) * 100) : 0 }
    })
  }, [roadmap, checked])

  const overall = useMemo(() => {
    const total = phaseStats.reduce((a, s) => a + s.total, 0)
    const done = phaseStats.reduce((a, s) => a + s.done, 0)
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 }
  }, [phaseStats])

  // First phase that isn't 100% complete — this is "where to start."
  const currentPhaseIdx = phaseStats.findIndex(s => s.pct < 100)
  const activePhase = currentPhaseIdx === -1 ? roadmap.length - 1 : currentPhaseIdx

  useEffect(() => { setOpenPhase(activePhase) }, [role]) // eslint-disable-line

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto pb-16">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-bold tracking-widest text-indigo-500 uppercase mb-1">Your path</p>
          <h1 className="text-3xl font-extrabold text-slate-900">Roadmap to {role}</h1>
          <p className="text-slate-500 mt-2 max-w-xl">
            A real sequence of steps, not a study calendar. Finish a phase, then move to the next — everything here is something you actually do, not just read.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : !assessment ? (
          <div className="card text-center py-16">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-bold text-slate-800 mb-2">Set up your profile first</h3>
            <p className="text-slate-500 text-sm mb-4">We personalize this roadmap to your recommended role once your profile is ready.</p>
            <Link to="/onboarding" className="btn-primary inline-flex mt-2">Set up profile →</Link>
          </div>
        ) : (
          <>
            {/* Overall progress */}
            <div className="card mb-8 flex items-center gap-6">
              <div className="relative w-20 h-20 flex-shrink-0">
                <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#e2e8f0" strokeWidth="8" />
                  <circle
                    cx="40" cy="40" r="34" fill="none" stroke="#4f46e5" strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 34}
                    strokeDashoffset={2 * Math.PI * 34 * (1 - overall.pct / 100)}
                    style={{ transition: 'stroke-dashoffset 0.6s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-indigo-600">
                  {overall.pct}%
                </div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-slate-800">
                  {overall.pct === 100 ? "You've completed the roadmap 🎉" : `Step ${activePhase + 1} of ${roadmap.length}: ${roadmap[activePhase].title}`}
                </div>
                <p className="text-sm text-slate-500 mt-0.5">
                  {overall.done} of {overall.total} steps done
                  {overall.pct < 100 && <> — start with <button onClick={() => setOpenPhase(activePhase)} className="text-indigo-600 font-semibold hover:underline">{roadmap[activePhase].title}</button> below.</>}
                </p>
              </div>
            </div>

            {/* Phase timeline */}
            <div className="relative">
              <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200" aria-hidden="true" />

              {roadmap.map((phase, pi) => {
                const stat = phaseStats[pi]
                const isDone = stat.pct === 100
                const isCurrent = pi === activePhase && !isDone
                const isLocked = pi > activePhase && !isDone
                const isOpen = openPhase === pi

                return (
                  <div key={pi} className="relative pl-14 mb-4">
                    {/* Node */}
                    <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white shadow-sm z-10 ${
                      isDone ? 'bg-green-500 text-white' :
                      isCurrent ? 'bg-indigo-600 text-white' :
                      'bg-slate-200 text-slate-500'
                    }`}>
                      {isDone ? '✓' : pi + 1}
                    </div>

                    <div className={`card transition-all ${isCurrent ? 'ring-2 ring-indigo-200' : ''} ${isLocked ? 'opacity-70' : ''}`}>
                      <button
                        onClick={() => setOpenPhase(isOpen ? -1 : pi)}
                        className="w-full flex items-start justify-between gap-4 text-left"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-indigo-500 uppercase tracking-wide">{phase.phase}</span>
                            <span className="text-xs text-slate-400">· {phase.duration}</span>
                            {isDone && <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Complete</span>}
                          </div>
                          <h3 className="font-bold text-slate-800 text-lg">{phase.title}</h3>
                          <p className="text-sm text-slate-500 mt-1">{phase.goal}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <span className="text-xs font-semibold text-slate-400">{stat.done}/{stat.total}</span>
                          <span className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}>⌄</span>
                        </div>
                      </button>

                      {/* Mini progress bar */}
                      <div className="h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${isDone ? 'bg-green-500' : 'bg-indigo-500'}`}
                          style={{ width: `${stat.pct}%` }}
                        />
                      </div>

                      {isOpen && (
                        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                          {phase.tasks.map((task, ti) => {
                            const key = `${pi}-${ti}`
                            const isChecked = !!checked[key]
                            return (
                              <div
                                key={ti}
                                onClick={() => toggle(key)}
                                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                                  isChecked ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100 hover:border-indigo-200'
                                }`}
                              >
                                <div className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                                  isChecked ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300'
                                }`}>
                                  {isChecked && <span className="text-xs">✓</span>}
                                </div>
                                <div className="flex-1">
                                  <div className={`text-sm font-medium ${isChecked ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                                    {task.text}
                                  </div>
                                  {task.why && !isChecked && (
                                    <div className="text-xs text-slate-400 mt-1 italic">{task.why}</div>
                                  )}
                                  {task.resource && !isChecked && (
                                    <div className="text-xs text-indigo-500 font-medium mt-1">→ {task.resource}</div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}