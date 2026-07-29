import { Link } from 'react-router-dom'
import { FiArrowRight, FiZap, FiStar } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 min-h-[92vh] flex items-center overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <FiZap className="text-indigo-400" />
            Powered by Google Gemini AI
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Build Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400"> CSE Career </span>
            with AI Guidance
          </h1>

          <p className="text-slate-300 mt-6 text-lg leading-8 max-w-lg">
            Get a personalized career roadmap, AI interview coaching, resume analysis, and job-ready guidance — all in one platform built for CSE students.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/register" className="flex items-center gap-2 bg-indigo-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/30">
              Start For Free <FiArrowRight />
            </Link>
            <Link to="/career-path" className="flex items-center gap-2 border border-slate-600 text-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:border-indigo-500 hover:text-indigo-300 transition-all">
              Explore Careers
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
            {['Free to use', 'AI-Powered Roadmap', 'Interview Practice', 'Resume Analyzer'].map(f => (
              <div key={f} className="flex items-center gap-2">
                <FiStar className="text-indigo-400 text-xs" /> {f}
              </div>
            ))}
          </div>
        </div>

        {/* Stats card */}
        <div className="hidden lg:flex justify-center">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 w-full max-w-md backdrop-blur-sm">
            <h3 className="text-white font-bold text-lg mb-6">Your AI Career Score</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-indigo-500 flex items-center justify-center bg-indigo-500/10">
                <span className="text-3xl font-extrabold text-indigo-400">72</span>
              </div>
              <div>
                <p className="text-slate-300 font-semibold">Full Stack Developer</p>
                <p className="text-slate-500 text-sm mt-1">Recommended Role</p>
              </div>
            </div>
            {[
              { label: 'DSA Skills', pct: 60, color: 'bg-indigo-500' },
              { label: 'Web Dev', pct: 75, color: 'bg-cyan-500' },
              { label: 'System Design', pct: 40, color: 'bg-violet-500' },
            ].map(s => (
              <div key={s.label} className="mb-3">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>{s.label}</span><span>{s.pct}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full">
                  <div className={`h-2 ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="mt-5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-sm text-indigo-300">
              🎯 Missing Skills: Docker, System Design, AWS
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
