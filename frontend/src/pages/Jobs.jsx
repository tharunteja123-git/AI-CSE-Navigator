import { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import { FiExternalLink, FiSearch } from 'react-icons/fi'

const jobData = [
  { company: 'Google', role: 'Software Engineer', location: 'Hyderabad', type: 'Full-time', exp: 'Fresher', tags: ['Python', 'Algorithms', 'System Design'], logo: 'G', color: 'bg-blue-500', url: 'https://careers.google.com' },
  { company: 'Microsoft', role: 'Software Development Engineer', location: 'Bengaluru', type: 'Full-time', exp: 'Fresher', tags: ['C++', 'DSA', 'Azure'], logo: 'M', color: 'bg-blue-700', url: 'https://careers.microsoft.com' },
  { company: 'TCS', role: 'System Engineer', location: 'Multiple', type: 'Full-time', exp: '0-2 Years', tags: ['Java', 'SQL', 'Core CS'], logo: 'T', color: 'bg-purple-600', url: 'https://www.tcs.com/careers' },
  { company: 'Infosys', role: 'Associate Engineer', location: 'Multiple', type: 'Full-time', exp: 'Fresher', tags: ['Python', 'SQL', 'Communication'], logo: 'I', color: 'bg-indigo-600', url: 'https://www.infosys.com/careers' },
  { company: 'Amazon', role: 'SDE Intern', location: 'Hyderabad', type: 'Internship', exp: 'Intern', tags: ['DSA', 'Python', 'AWS'], logo: 'A', color: 'bg-orange-500', url: 'https://amazon.jobs' },
  { company: 'Razorpay', role: 'Backend Engineer', location: 'Bengaluru', type: 'Full-time', exp: 'Fresher', tags: ['Node.js', 'Go', 'Redis'], logo: 'R', color: 'bg-blue-800', url: 'https://razorpay.com/jobs' },
  { company: 'Flipkart', role: 'SDE-1', location: 'Bengaluru', type: 'Full-time', exp: 'Fresher', tags: ['Java', 'Microservices', 'DSA'], logo: 'F', color: 'bg-yellow-500', url: 'https://www.flipkartcareers.com' },
  { company: 'Zoho', role: 'Software Developer', location: 'Chennai', type: 'Full-time', exp: 'Fresher', tags: ['Java', 'Python', 'DBMS'], logo: 'Z', color: 'bg-red-500', url: 'https://www.zoho.com/careers' },
  { company: 'Swiggy', role: 'SDE Intern', location: 'Bengaluru', type: 'Internship', exp: 'Intern', tags: ['React', 'Node.js', 'MongoDB'], logo: 'S', color: 'bg-orange-600', url: 'https://careers.swiggy.com' },
]

const portals = [
  { name: 'LinkedIn Jobs', url: 'https://linkedin.com/jobs', desc: 'Best for networking + jobs', color: 'bg-blue-600' },
  { name: 'Naukri.com', url: 'https://naukri.com', desc: '#1 job portal in India', color: 'bg-purple-600' },
  { name: 'Internshala', url: 'https://internshala.com', desc: 'Top internship platform', color: 'bg-green-600' },
  { name: 'AngelList', url: 'https://angel.co', desc: 'Startup jobs & equity', color: 'bg-slate-700' },
  { name: 'HackerEarth', url: 'https://hackerearth.com', desc: 'Hackathons + hiring', color: 'bg-indigo-600' },
  { name: 'Unstop', url: 'https://unstop.com', desc: 'Competitions & campus hiring', color: 'bg-rose-600' },
]

export default function Jobs() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = jobData.filter(j =>
    (filter === 'All' || j.type === filter) &&
    (j.role.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
  )

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">💼 Job Opportunities</h1>
          <p className="text-slate-500 mt-1">Curated fresher-friendly jobs and internships</p>
        </div>

        {/* Search & filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3.5 top-3.5 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              className="input pl-10" placeholder="Search by role, company, or skill..." />
          </div>
          <div className="flex gap-2">
            {['All', 'Full-time', 'Internship'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${filter === f ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {filtered.map((j, i) => (
            <a key={i} href={j.url} target="_blank" rel="noreferrer"
              className="card hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 ${j.color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>{j.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-800 text-sm">{j.role}</h3>
                    <FiExternalLink className="text-slate-300 group-hover:text-indigo-500 flex-shrink-0 transition-colors" />
                  </div>
                  <p className="text-slate-500 text-xs mt-0.5">{j.company} • {j.location}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`badge text-xs ${j.type === 'Internship' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>{j.type}</span>
                    <span className="badge bg-slate-100 text-slate-600 text-xs">{j.exp}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {j.tags.map(t => <span key={t} className="badge bg-indigo-50 text-indigo-600 text-xs">{t}</span>)}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Job Portals */}
        <div className="card">
          <h3 className="font-bold text-slate-800 mb-5">🌐 Job Portals for Freshers</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {portals.map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:border-indigo-200 hover:shadow-sm transition-all">
                <div className={`w-9 h-9 ${p.color} rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>{p.name[0]}</div>
                <div>
                  <div className="font-semibold text-slate-800 text-sm">{p.name}</div>
                  <div className="text-slate-400 text-xs">{p.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
