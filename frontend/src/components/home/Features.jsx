import { FaUserGraduate, FaBrain, FaMapMarkedAlt, FaBriefcase } from 'react-icons/fa'

const steps = [
  { id: '01', icon: <FaUserGraduate />, color: 'bg-indigo-100 text-indigo-600', title: 'Create Your Profile', description: 'Tell us your academic year, interests, coding level, and career goals.' },
  { id: '02', icon: <FaBrain />, color: 'bg-violet-100 text-violet-600', title: 'AI Skill Assessment', description: 'Our AI analyzes your strengths, weaknesses, and recommends the best CSE career path.' },
  { id: '03', icon: <FaMapMarkedAlt />, color: 'bg-green-100 text-green-600', title: 'Personalized Roadmap', description: 'Receive a month-wise learning roadmap with skills, projects, certifications, and coding goals.' },
  { id: '04', icon: <FaBriefcase />, color: 'bg-orange-100 text-orange-600', title: 'Become Job Ready', description: 'Track progress, practice interviews, optimize your resume, and apply for the right opportunities.' },
]

export default function Features() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="badge bg-indigo-50 text-indigo-700 mb-3">How It Works</span>
          <h2 className="text-4xl font-bold text-slate-900">Your Journey from Student to Job-Ready</h2>
          <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">4 simple steps powered by AI to help you land your dream CSE job</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(s => (
            <div key={s.id} className="card hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="text-xs font-bold text-indigo-500 mb-4">STEP {s.id}</div>
              <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center text-2xl mb-4`}>{s.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-6">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
