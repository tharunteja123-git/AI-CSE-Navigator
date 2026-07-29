import { Link } from 'react-router-dom'

const careers = [
  { title: 'AI / ML Engineer', icon: '🤖', color: 'from-violet-500 to-indigo-600', skills: ['Python', 'TensorFlow', 'LangChain'], salary: '8–25 LPA' },
  { title: 'Full Stack Developer', icon: '💻', color: 'from-blue-500 to-cyan-600', skills: ['React', 'Node.js', 'PostgreSQL'], salary: '5–18 LPA' },
  { title: 'Backend Developer', icon: '⚙️', color: 'from-green-500 to-teal-600', skills: ['FastAPI', 'Redis', 'Docker'], salary: '6–20 LPA' },
  { title: 'DevOps Engineer', icon: '🚀', color: 'from-orange-500 to-red-600', skills: ['AWS', 'Kubernetes', 'CI/CD'], salary: '7–22 LPA' },
  { title: 'Data Scientist', icon: '📊', color: 'from-pink-500 to-rose-600', skills: ['Python', 'Pandas', 'ML'], salary: '6–20 LPA' },
  { title: 'Cybersecurity', icon: '🔒', color: 'from-slate-600 to-slate-800', skills: ['Networking', 'Ethical Hacking', 'SIEM'], salary: '6–18 LPA' },
]

export default function CareerSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="badge bg-indigo-50 text-indigo-700 mb-3">Career Paths</span>
          <h2 className="text-4xl font-bold text-slate-900">Choose Your CSE Career Path</h2>
          <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">Explore top in-demand career paths with salary ranges and required skills</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map(c => (
            <Link to="/register" key={c.title}
              className="group card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 bg-gradient-to-br ${c.color} rounded-xl flex items-center justify-center text-2xl mb-4`}>{c.icon}</div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">{c.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {c.skills.map(s => <span key={s} className="badge bg-slate-100 text-slate-600">{s}</span>)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Avg Salary</span>
                <span className="font-bold text-indigo-600">{c.salary}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
