import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiGrid, FiTarget, FiMap, FiFileText, FiMessageSquare,
  FiCode, FiBriefcase, FiUser, FiLogOut, FiMenu, FiZap, FiSearch, FiBookOpen,
} from "react-icons/fi";

const navItems = [
  { path: "/dashboard",       icon: <FiGrid />,          label: "Dashboard" },
  { path: "/concept-hub",     icon: <FiBookOpen />,      label: "Concept Hub",    badge: "NEW" },
  { path: "/career-path",     icon: <FiTarget />,        label: "Career Path" },
  { path: "/roadmap",         icon: <FiMap />,           label: "Roadmap" },
  { path: "/mock-interview",  icon: <FiZap />,           label: "Mock Interview", badge: "NEW" },
  { path: "/skill-gap",       icon: <FiSearch />,        label: "Skill Gap" },
  { path: "/resume-analyzer", icon: <FiFileText />,      label: "Resume Analyzer" },
  { path: "/interview-ai",    icon: <FiMessageSquare />, label: "AI Mentor" },
  { path: "/coding-tracker",  icon: <FiCode />,          label: "DSA Hub" },
  { path: "/jobs",            icon: <FiBriefcase />,     label: "Jobs" },
  { path: "/profile",         icon: <FiUser />,          label: "Profile" },
];

export default function DashboardLayout({ children }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogout = () => { logout(); navigate("/"); };

  const Sidebar = () => (
    <div className="flex flex-col h-full min-h-0 bg-white border-r border-slate-100 w-60">

      {/* ── Brand logo ── */}
      <div className="flex-shrink-0 px-5 py-4 border-b border-slate-100">
        <Link to="/dashboard" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          {/* Icon mark */}
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm shadow-indigo-500/30">
            <span className="text-white font-black text-[11px] tracking-tight leading-none">PC</span>
          </div>
          {/* Wordmark */}
          <div className="leading-none">
            <span className="font-black text-slate-900 text-sm tracking-tight">PRO CODE</span>
            <span className="font-black text-indigo-600 text-sm tracking-tight">...</span>
            <span className="font-black text-slate-900 text-sm tracking-tight">AI</span>
          </div>
        </Link>
      </div>

      {/* ── Nav items ── */}
      {/* min-h-0 is required so this flex child actually shrinks to the
          sidebar's height instead of growing to fit its content and
          pushing/scrolling the whole page. overscroll-contain stops
          scroll from chaining into the page once you hit the top/bottom. */}
      <nav className="flex-1 min-h-0 px-2 py-3 space-y-0.5 overflow-y-auto overscroll-contain scroll-smooth nav-scroll">
        {navItems.map(item => (
          <Link key={item.path} to={item.path} onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              pathname === item.path
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}>
            <span className={`text-base ${pathname === item.path ? "text-indigo-600" : "text-slate-400"}`}>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-full leading-none">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      {/* ── User footer ── */}
      <div className="flex-shrink-0 px-2 py-3 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
            {user?.full_name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">{user?.full_name || "Student"}</p>
            <p className="text-xs text-slate-400 truncate">{user?.email || ""}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full transition-all">
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );

  return (
    // position: fixed + inset-0 pins the entire app shell to the
    // viewport itself. It no longer depends on h-screen/h-dvh math or
    // on html/body having no scroll — the sidebar, header, and shell
    // simply cannot move or scroll with the page. Only .main-scroll
    // below (which has its own overflow-y-auto) ever scrolls.
    <div className="fixed inset-0 flex bg-slate-50 overflow-hidden overscroll-none">
      {/* Desktop sidebar — fixed in place, never scrolls */}
      <div className="hidden lg:flex flex-shrink-0 h-full"><Sidebar /></div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 h-full"><Sidebar /></div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
        {/* Mobile top bar — part of the fixed shell, never scrolls away */}
        <header className="lg:hidden flex-shrink-0 flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100">
          <button onClick={() => setOpen(true)} className="text-slate-600 text-xl"><FiMenu /></button>
          {/* Mobile wordmark */}
          <div className="leading-none">
            <span className="font-black text-slate-900 text-sm tracking-tight">PRO CODE</span>
            <span className="font-black text-indigo-600 text-sm tracking-tight">...</span>
            <span className="font-black text-slate-900 text-sm tracking-tight">AI</span>
          </div>
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">
            {user?.full_name?.[0]?.toUpperCase() || "U"}
          </div>
        </header>

        {/* min-h-0 constrains this to the flex column's real height so
            it scrolls internally instead of overflowing the page.
            overscroll-contain stops rubber-band scroll from bleeding
            past the top/bottom into the body — this was the "scrolling
            beyond the box" bug. */}
       <main className="flex-1 min-h-0 h-full overflow-y-auto overscroll-contain scroll-smooth main-scroll bg-[#060913] w-full">
          {children}
        </main>
      </div>
      <style>{`
        .main-scroll::-webkit-scrollbar,
        .nav-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .main-scroll::-webkit-scrollbar-track,
        .nav-scroll::-webkit-scrollbar-track {
          background: #060913;
        }
        .main-scroll::-webkit-scrollbar-thumb,
        .nav-scroll::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 9999px;
        }
        .main-scroll::-webkit-scrollbar-thumb:hover,
        .nav-scroll::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
        .main-scroll, .nav-scroll {
          scrollbar-width: thin;
          scrollbar-color: #1e293b #060913;
        }
        /* Override min-h-screen on child pages so they fit the main-scroll viewport cleanly */
        .main-scroll .min-h-screen {
          min-height: 100% !important;
        }
      `}</style>
    </div>
  );
}