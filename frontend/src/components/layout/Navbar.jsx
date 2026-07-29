import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Navbar() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">AI</div>
          <span className="font-bold text-slate-900 text-lg">CSE Navigator</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <Link to="/career-path" className="hover:text-indigo-600 transition-colors">Career Paths</Link>
          <Link to="/roadmap" className="hover:text-indigo-600 transition-colors">Roadmaps</Link>
          <Link to="/jobs" className="hover:text-indigo-600 transition-colors">Jobs</Link>
        </nav>

        <div className="hidden md:flex gap-3">
          {token ? (
            <Link to="/dashboard" className="btn-primary text-sm">Dashboard →</Link>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-sm">Login</Link>
              <Link to="/register" className="btn-primary text-sm">Get Started</Link>
            </>
          )}
        </div>

        <button className="md:hidden text-slate-600 text-xl" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3 text-sm font-medium">
          {['/', '/career-path', '/roadmap', '/jobs'].map((path, i) => (
            <Link key={i} to={path} className="block py-2 text-slate-600 hover:text-indigo-600" onClick={() => setOpen(false)}>
              {['Home', 'Career Paths', 'Roadmaps', 'Jobs'][i]}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            {token ? (
              <Link to="/dashboard" className="btn-primary text-center text-sm" onClick={() => setOpen(false)}>Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-center text-sm" onClick={() => setOpen(false)}>Login</Link>
                <Link to="/register" className="btn-primary text-center text-sm" onClick={() => setOpen(false)}>Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
