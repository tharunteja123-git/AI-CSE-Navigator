import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'
import toast from 'react-hot-toast'
import { FiUser, FiMail, FiLock, FiBookOpen, FiCalendar } from 'react-icons/fi'

const careerInterests = ['AI Engineer','Full Stack Developer','Backend Developer','Frontend Developer','DevOps Engineer','Data Scientist','Cybersecurity','Mobile Developer']

export default function Register() {
  const [form, setForm] = useState({ full_name:'', email:'', password:'', college:'', graduation_year:'', career_interest:'' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const set = (k, v) => setForm(f => ({...f, [k]: v}))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const regData = await api.register({...form, graduation_year: Number(form.graduation_year) || null})
      if (regData.id) {
        const loginData = await api.login({ email: form.email, password: form.password })
        if (loginData.access_token) {
          login(loginData.access_token)
          toast.success('Account created! Let\'s set up your profile 🎉')
          navigate('/onboarding')
        }
      } else {
        toast.error(regData.detail || 'Registration failed')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold">AI</div>
            <span className="text-white font-bold text-lg">CSE Navigator</span>
          </Link>
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="text-slate-400 mt-2">Start your AI-guided career journey</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input value={form.full_name} onChange={e => set('full_name', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
                    placeholder="Rahul Kumar" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                <div className="relative">
                  <FiMail className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
                    placeholder="rahul@email.com" required />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-3.5 text-slate-400" />
                <input type="password" value={form.password} onChange={e => set('password', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
                  placeholder="Min 8 characters" required minLength={6} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">College</label>
                <div className="relative">
                  <FiBookOpen className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input value={form.college} onChange={e => set('college', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
                    placeholder="JNTU Hyderabad" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Graduation Year</label>
                <div className="relative">
                  <FiCalendar className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input type="number" value={form.graduation_year} onChange={e => set('graduation_year', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
                    placeholder="2024" min="2020" max="2030" />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Career Interest</label>
              <select value={form.career_interest} onChange={e => set('career_interest', e.target.value)}
                className="w-full bg-slate-800 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Select your interest</option>
                {careerInterests.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition-all disabled:opacity-60 mt-2">
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>
          </form>
          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account? <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
