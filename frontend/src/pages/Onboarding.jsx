import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import toast from 'react-hot-toast'

const steps = [
  { title: 'Academic Info', subtitle: 'Tell us where you are' },
  { title: 'Skills & Goals', subtitle: 'What you know and want' },
  { title: 'Learning Style', subtitle: 'How you prefer to learn' },
]

const Field = ({ label, children }) => (
  <div>
    <label className="label text-slate-700">{label}</label>
    {children}
  </div>
)

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [form, setForm] = useState({
    current_year: '', career_goal: '', skill_level: '',
    languages: '', dsa_level: '', study_hours: '',
    learning_style: '', interests: ''
  })
  const set = (k, v) => setForm(f => ({...f, [k]: v}))

  const handleFinish = async () => {
    setLoading(true)
    try {
      await api.saveOnboarding(form)
      toast.success('Profile saved! Generating your roadmap... 🚀')
      navigate('/dashboard')
    } catch {
      toast.error('Failed to save. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Setup Your Profile</h1>
          <p className="text-slate-500 mt-2">Help us personalize your AI career guidance</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < step ? 'bg-indigo-600 text-white' : i === step ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-400'
              }`}>{i < step ? '✓' : i + 1}</div>
              {i < steps.length - 1 && <div className={`flex-1 h-1 rounded ${i < step ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-slate-800 mb-1">{steps[step].title}</h2>
          <p className="text-slate-500 text-sm mb-6">{steps[step].subtitle}</p>

          {step === 0 && (
            <div className="space-y-4">
              <Field label="Current Year">
                <select value={form.current_year} onChange={e => set('current_year', e.target.value)} className="select">
                  <option value="">Select year</option>
                  {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Fresher / Graduate'].map(y => <option key={y}>{y}</option>)}
                </select>
              </Field>
              <Field label="Career Goal">
                <select value={form.career_goal} onChange={e => set('career_goal', e.target.value)} className="select">
                  <option value="">Select goal</option>
                  {['AI Engineer', 'Full Stack Developer', 'Backend Developer', 'Frontend Developer', 'DevOps Engineer', 'Data Scientist', 'Cybersecurity', 'Mobile Developer'].map(g => <option key={g}>{g}</option>)}
                </select>
              </Field>
              <Field label="Overall Skill Level">
                <select value={form.skill_level} onChange={e => set('skill_level', e.target.value)} className="select">
                  <option value="">Select level</option>
                  {['Beginner', 'Elementary', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
                </select>
              </Field>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <Field label="Programming Languages you know (comma separated)">
                <input value={form.languages} onChange={e => set('languages', e.target.value)}
                  className="input" placeholder="Python, JavaScript, Java" />
              </Field>
              <Field label="DSA Level">
                <select value={form.dsa_level} onChange={e => set('dsa_level', e.target.value)} className="select">
                  <option value="">Select DSA level</option>
                  {['None', 'Basic Arrays/Strings', 'Intermediate (DP, Trees)', 'Advanced (Graphs, Segment Trees)'].map(l => <option key={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Study Hours per Day">
                <select value={form.study_hours} onChange={e => set('study_hours', e.target.value)} className="select">
                  <option value="">Select hours</option>
                  {['1-2 hours', '2-4 hours', '4-6 hours', '6+ hours'].map(h => <option key={h}>{h}</option>)}
                </select>
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Field label="Learning Style">
                <select value={form.learning_style} onChange={e => set('learning_style', e.target.value)} className="select">
                  <option value="">Select style</option>
                  {['Video Tutorials', 'Reading Docs', 'Hands-on Projects', 'Mixed'].map(l => <option key={l}>{l}</option>)}
                </select>
              </Field>
              <Field label="Interests / Topics you enjoy (comma separated)">
                <input value={form.interests} onChange={e => set('interests', e.target.value)}
                  className="input" placeholder="AI, Web Dev, Open Source, Gaming" />
              </Field>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="btn-outline flex-1">← Back</button>
            )}
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(s => s + 1)} className="btn-primary flex-1">Next →</button>
            ) : (
              <button onClick={handleFinish} disabled={loading} className="btn-primary flex-1">
                {loading ? 'Saving...' : '🚀 Generate My Roadmap'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
