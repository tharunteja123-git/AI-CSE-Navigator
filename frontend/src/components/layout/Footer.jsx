import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">AI</div>
              <span className="font-bold text-white text-sm">CSE Navigator</span>
            </div>
            <p className="text-sm leading-6">AI-powered career guidance for CSE students to become job-ready.</p>
          </div>
          {[
            { title: 'Platform', links: [['Dashboard', '/dashboard'], ['Career Path', '/career-path'], ['Roadmap', '/roadmap']] },
            { title: 'Tools', links: [['Resume Analyzer', '/resume-analyzer'], ['AI Mentor', '/interview-ai'], ['Coding Tracker', '/coding-tracker']] },
            { title: 'Account', links: [['Login', '/login'], ['Register', '/register'], ['Profile', '/profile']] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-white font-semibold mb-3 text-sm">{col.title}</h4>
              <ul className="space-y-2 text-sm">
                {col.links.map(([label, path]) => (
                  <li key={path}><Link to={path} className="hover:text-indigo-400 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-800 pt-6 text-center text-xs">
          © 2024 AI CSE Navigator. Built with ❤️ for CSE Students.
        </div>
      </div>
    </footer>
  )
}
