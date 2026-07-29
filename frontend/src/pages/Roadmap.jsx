import { useState, useEffect } from 'react'
import { api } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import { Link } from 'react-router-dom'

const staticRoadmaps = {
  'AI Engineer': [
    { month: 'Month 1', title: 'Python & Math Foundations', tasks: ['Python basics & OOP', 'NumPy & Pandas', 'Linear Algebra basics', 'Statistics & Probability'], done: false },
    { month: 'Month 2', title: 'Machine Learning', tasks: ['Scikit-learn fundamentals', 'Supervised & Unsupervised Learning', 'Model evaluation & tuning', 'Build ML project on Kaggle'], done: false },
    { month: 'Month 3', title: 'Deep Learning', tasks: ['Neural Networks basics', 'TensorFlow / PyTorch', 'CNNs for image tasks', 'Build image classifier'], done: false },
    { month: 'Month 4', title: 'LLMs & GenAI', tasks: ['Transformers & Attention', 'LangChain & RAG', 'Build AI chatbot with Gemini API', 'Deploy on HuggingFace'], done: false },
    { month: 'Month 5', title: 'Portfolio & Jobs', tasks: ['3 AI projects on GitHub', 'LinkedIn optimization', 'Apply to AI roles', 'Mock interviews'], done: false },
  ],
  'Full Stack Developer': [
    { month: 'Month 1', title: 'HTML, CSS & JavaScript', tasks: ['HTML5 semantics', 'CSS Flexbox & Grid', 'JavaScript ES6+', 'Build landing page'], done: false },
    { month: 'Month 2', title: 'React Frontend', tasks: ['React hooks & state', 'React Router', 'Tailwind CSS', 'Build Todo/Blog app'], done: false },
    { month: 'Month 3', title: 'Backend - FastAPI', tasks: ['Python FastAPI basics', 'REST API design', 'JWT Authentication', 'PostgreSQL + SQLAlchemy'], done: false },
    { month: 'Month 4', title: 'Full Stack Project', tasks: ['Build full stack app', 'Docker basics', 'Deploy on Render/Vercel', 'GitHub portfolio'], done: false },
    { month: 'Month 5', title: 'DSA & Placements', tasks: ['Arrays, Strings, DP', 'LeetCode 100 problems', 'System Design basics', 'Mock interviews'], done: false },
  ],
}

const fallback = staticRoadmaps['AI Engineer']

export default function Roadmap() {
  const [assessment, setAssessment] = useState(null)
  const [weekPlan, setWeekPlan] = useState(null)
  const [checked, setChecked] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getAssessment().then(d => {
      if (!d.detail) { setAssessment(d); setWeekPlan(d.weekly_plan) }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const role = assessment?.recommended_role || 'AI Engineer'
  const roadmap = staticRoadmaps[role] || fallback

  const toggle = (idx) => setChecked(c => ({...c, [idx]: !c[idx]}))

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">🗺️ Your Learning Roadmap</h1>
          <p className="text-slate-500 mt-1">Personalized month-by-month plan for: <span className="text-indigo-600 font-semibold">{role}</span></p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" /></div>
        ) : !assessment ? (
          <div className="card text-center py-16">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-bold text-slate-800 mb-2">Setup Profile First</h3>
            <Link to="/onboarding" className="btn-primary inline-flex mt-4">Setup Profile →</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Weekly plan */}
            {weekPlan && (
              <div className="card mb-2">
                <h3 className="font-bold text-slate-800 mb-4">📅 This Week's Focus</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {Object.entries(weekPlan).map(([day, topic]) => (
                    <div key={day} className="bg-indigo-50 rounded-xl p-2.5 text-center border border-indigo-100">
                      <div className="text-xs font-bold text-indigo-600">{day.slice(0,3)}</div>
                      <div className="text-xs text-slate-700 mt-1 leading-4">{topic}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Month roadmap */}
            {roadmap.map((month, mi) => (
              <div key={mi} className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-sm">{mi+1}</div>
                  <div>
                    <div className="text-xs text-indigo-600 font-semibold">{month.month}</div>
                    <div className="font-bold text-slate-800">{month.title}</div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-2">
                  {month.tasks.map((task, ti) => {
                    const key = `${mi}-${ti}`
                    return (
                      <div key={ti} onClick={() => toggle(key)}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          checked[key] ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100 hover:border-indigo-200'
                        }`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          checked[key] ? 'bg-green-500 border-green-500 text-white' : 'border-slate-300'
                        }`}>
                          {checked[key] && <span className="text-xs">✓</span>}
                        </div>
                        <span className={`text-sm ${checked[key] ? 'line-through text-slate-400' : 'text-slate-700'}`}>{task}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
