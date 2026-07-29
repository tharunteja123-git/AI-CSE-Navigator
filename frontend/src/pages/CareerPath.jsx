import { useState, useEffect } from 'react'
import { api } from '../services/api'
import DashboardLayout from '../layouts/DashboardLayout'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'

const goals = ['AI Engineer','Full Stack Developer','Backend Developer','Frontend Developer','DevOps Engineer','Data Scientist','Cybersecurity','Mobile Developer']

export default function CareerPath() {
  const [form, setForm] = useState({ career_goal:'AI Engineer', languages:'Python', dsa:'Intermediate', skill:'Beginner', hours:'2-4 hours', interests:'AI, Web Dev' })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult('')
    try {
      const data = await api.getCareerAdvice(form)
      setResult(data.response || 'No response received.')
    } catch {
      toast.error('Failed to get advice. Check your API key.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">🎯 AI Career Path Advisor</h1>
          <p className="text-slate-500 mt-1">Get a personalized career analysis powered by Gemini AI</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <form onSubmit={handleSubmit} className="md:col-span-2 card space-y-4 h-fit">
            <h3 className="font-bold text-slate-800">Your Profile</h3>
            {[
              { label: 'Career Goal', key: 'career_goal', type: 'select', opts: goals },
              { label: 'Languages Known', key: 'languages', type: 'text', placeholder: 'Python, JS' },
              { label: 'DSA Level', key: 'dsa', type: 'select', opts: ['None','Basic','Intermediate','Advanced'] },
              { label: 'Skill Level', key: 'skill', type: 'select', opts: ['Beginner','Elementary','Intermediate','Advanced'] },
              { label: 'Study Hours/Day', key: 'hours', type: 'select', opts: ['1-2 hours','2-4 hours','4-6 hours','6+ hours'] },
              { label: 'Interests', key: 'interests', type: 'text', placeholder: 'AI, Web Dev, Gaming' },
            ].map(f => (
              <div key={f.key}>
                <label className="label">{f.label}</label>
                {f.type === 'select' ? (
                  <select value={form[f.key]} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))} className="select">
                    {f.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input value={form[f.key]} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))}
                    className="input" placeholder={f.placeholder} />
                )}
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? '🤔 Analyzing...' : '✨ Get AI Advice'}
            </button>
          </form>

          <div className="md:col-span-3">
            {loading ? (
              <div className="card flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-slate-500">Gemini AI is analyzing your profile...</p>
              </div>
            ) : result ? (
              <div className="card prose prose-slate max-w-none">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="font-bold text-slate-800 mb-2">Ready to Analyze</h3>
                <p className="text-slate-500 text-sm">Fill in your details and click "Get AI Advice" to get your personalized career roadmap.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
