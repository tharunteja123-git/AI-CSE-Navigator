/*import { useState, useEffect } from 'react'
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
}*/
import { useState } from "react";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import {
  FiChevronRight, FiChevronDown, FiZap, FiArrowRight,
  FiSearch, FiBookOpen, FiTrendingUp, FiDollarSign,
  FiBriefcase, FiGlobe, FiAward, FiUsers, FiCpu,
  FiStar, FiTarget, FiCode, FiLayers, FiFeather,
  FiMessageCircle, FiMapPin,
} from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "about-cs",         label: "About Computer Science",      emoji: "🖥️",  group: "Foundations"  },
  { id: "about-it",         label: "About Information Technology",emoji: "🌐",  group: "Foundations"  },
  { id: "cse-vs-ai",        label: "CSE vs AI",                   emoji: "🤖",  group: "Foundations"  },
  { id: "is-cse-right",     label: "Is CSE Right for Me?",        emoji: "🧭",  group: "Foundations"  },
  { id: "domains",          label: "Career Domains",              emoji: "🗂️",  group: "Career Start" },
  { id: "growth",           label: "Career Growth (0–10+ Yrs)",   emoji: "📈",  group: "Career Start" },
  { id: "salary",           label: "Salary Explorer",             emoji: "💰",  group: "Career Start" },
  { id: "companies",        label: "Company Guide",               emoji: "🏢",  group: "Career Start" },
  { id: "skills",           label: "Skills Roadmap",              emoji: "🗺️",  group: "Skills & Prep"},
  { id: "interview",        label: "Interview Preparation",       emoji: "🎯",  group: "Skills & Prep"},
  { id: "resume",           label: "Resume & Portfolio",          emoji: "📄",  group: "Skills & Prep"},
  { id: "higher-studies",   label: "Higher Studies",              emoji: "🎓",  group: "Advanced"     },
  { id: "study-abroad",     label: "Study Abroad",                emoji: "✈️",  group: "Advanced"     },
  { id: "certifications",   label: "Certifications",              emoji: "📜",  group: "Advanced"     },
  { id: "freelancing",      label: "Freelancing",                 emoji: "💻",  group: "Alternative"  },
  { id: "entrepreneurship", label: "Entrepreneurship",            emoji: "🚀",  group: "Alternative"  },
  { id: "switching",        label: "Career Switching",            emoji: "🔄",  group: "Alternative"  },
  { id: "ai-advisor",       label: "AI Career Advisor",           emoji: "🤖",  group: "AI Tools"     },
  { id: "roadmap-ai",       label: "Personalized Roadmap",        emoji: "⚡",  group: "AI Tools"     },
  { id: "trends",           label: "Industry Trends",             emoji: "📊",  group: "Insights"     },
  { id: "stories",          label: "Success Stories",             emoji: "🌟",  group: "Insights"     },
  { id: "faqs",             label: "FAQs",                        emoji: "❓",  group: "Insights"     },
  { id: "life-after",       label: "Life After Graduation",       emoji: "🎯",  group: "Insights"     },
];

const GROUPS = ["Foundations", "Career Start", "Skills & Prep", "Advanced", "Alternative", "AI Tools", "Insights"];

const DOMAINS = [
  { icon: "💻", title: "Software Development", desc: "Build apps, websites, systems", roles: ["SDE", "Full Stack", "Backend"], avg: "₹8–40L" },
  { icon: "🤖", title: "AI / ML Engineering",  desc: "Models, LLMs, computer vision", roles: ["ML Eng", "AI Researcher", "NLP"], avg: "₹12–60L" },
  { icon: "☁️", title: "Cloud & DevOps",        desc: "Infrastructure, CI/CD, scaling", roles: ["DevOps", "SRE", "Cloud Eng"], avg: "₹8–35L" },
  { icon: "🛡️", title: "Cybersecurity",         desc: "Ethical hacking, security ops",  roles: ["Security Eng", "Pen Tester"], avg: "₹6–30L" },
  { icon: "📊", title: "Data Science",           desc: "Analytics, BI, statistics",      roles: ["Data Sci", "Analyst", "BI Eng"], avg: "₹6–35L" },
  { icon: "📱", title: "Mobile Development",    desc: "iOS, Android, cross-platform",    roles: ["iOS Dev", "Android Dev", "Flutter"], avg: "₹6–28L" },
  { icon: "🎮", title: "Game Development",      desc: "Unity, Unreal, game design",      roles: ["Game Dev", "Unity Dev"], avg: "₹4–20L" },
  { icon: "🔬", title: "Research & Academia",   desc: "PhD, publications, teaching",     roles: ["Researcher", "Professor"], avg: "₹6–25L" },
];

const SALARY_DATA = [
  { role: "Fresher SDE",         range: "₹3–8L",   yoe: "0–1 yr",  note: "TCS, Infosys, Wipro" },
  { role: "Junior Developer",    range: "₹5–15L",  yoe: "1–3 yr",  note: "Product startups" },
  { role: "Senior Developer",    range: "₹15–35L", yoe: "3–6 yr",  note: "Mid-size companies" },
  { role: "Tech Lead",           range: "₹25–55L", yoe: "5–8 yr",  note: "Growing startups" },
  { role: "Principal / Staff",   range: "₹40–80L", yoe: "8–12 yr", note: "FAANG, unicorns" },
  { role: "Engineering Manager", range: "₹35–80L", yoe: "7–12 yr", note: "Management track" },
  { role: "AI / ML Engineer",    range: "₹12–60L", yoe: "1–8 yr",  note: "Hot market, high demand" },
  { role: "Data Scientist",      range: "₹6–35L",  yoe: "1–6 yr",  note: "Analytics companies" },
];

const COMPANIES = [
  { tier: "FAANG+",      cos: ["Google","Meta","Amazon","Apple","Microsoft","Netflix","Stripe"], pkg: "₹50–200L+", diff: "Very Hard" },
  { tier: "Indian MNCs", cos: ["TCS","Infosys","Wipro","HCL","Cognizant","Tech Mahindra"],      pkg: "₹3–12L",    diff: "Medium" },
  { tier: "Unicorns",    cos: ["Flipkart","Swiggy","Zomato","Razorpay","CRED","Zepto"],          pkg: "₹15–60L",   diff: "Hard" },
  { tier: "Startups",    cos: ["Groww","PhonePe","Meesho","Nykaa","ShareChat","Ola"],            pkg: "₹8–35L",    diff: "Medium-Hard" },
];

const HIGHER_STUDIES = [
  { degree: "M.Tech",     emoji: "🎓", where: "IITs, NITs, IIITs",       pros: ["Research depth","₹20–40L after","Strong alumni"], when: "Want academia or research roles" },
  { degree: "MS Abroad",  emoji: "✈️", where: "USA, Germany, Canada, UK", pros: ["Global exposure","Work permit","₹40–100L+"],     when: "Dream of global career" },
  { degree: "MBA",        emoji: "💼", where: "IIMs, ISB, Top B-Schools", pros: ["Management roles","Salary jump","Network"],       when: "Want to move into product/management" },
  { degree: "PhD",        emoji: "🔬", where: "Any top university",        pros: ["Cutting-edge research","Professor path"],         when: "Passionate about advancing science" },
];

const STORIES = [
  { name: "Priya S.", from: "Tier-3 College", to: "Google SDE", time: "2 years", quote: "Consistent DSA practice + system design = Google offer", emoji: "🌟" },
  { name: "Rahul M.", from: "TCS Employee",   to: "Amazon SDE-2", time: "1.5 yrs", quote: "Switched from service to product with focused prep on LeetCode", emoji: "🚀" },
  { name: "Ananya K.", from: "CSE Fresher",   to: "ML Eng @ Meta", time: "3 years", quote: "Open source + Kaggle competitions + MSCS = dream job", emoji: "🤖" },
  { name: "Vikram P.", from: "Non-CS grad",   to: "Full Stack Dev", time: "18 months", quote: "Self-taught with online courses, built 5 projects, got hired", emoji: "💪" },
];

const FAQS = [
  { q: "Is B.Tech CSE better than B.Tech IT?",           a: "CSE is slightly more respected in core companies, but practically they're almost equivalent. Skills matter more than branch name in tech." },
  { q: "Can I get into FAANG from a Tier-3 college?",    a: "Absolutely yes. 30%+ of FAANG India hires come from non-IIT colleges. DSA skills + projects + communication = more important than college." },
  { q: "Should I do M.Tech or job after B.Tech?",        a: "Job if you want industry experience and salary early. M.Tech if you want research, academia, or specific specialization. Both valid paths." },
  { q: "How important is competitive programming?",      a: "Useful for top product companies. Not mandatory for most jobs. LeetCode medium problems cover 90% of interviews." },
  { q: "When should I start interview prep?",            a: "Start DSA in 2nd year, serious prep 6 months before campus placements. For off-campus, dedicated 3–6 months of focused prep." },
  { q: "Is AI/ML a good career choice in 2025?",         a: "Yes — one of the highest demand, highest salary tracks. Strong math + Python + ML fundamentals + LLM knowledge = very employable." },
];

const CERTS = [
  { name: "AWS Solutions Architect", org: "Amazon",   value: "High",  time: "2–3 months", emoji: "☁️" },
  { name: "Google Cloud Professional", org: "Google", value: "High",  time: "2–3 months", emoji: "🌐" },
  { name: "TensorFlow Developer",    org: "Google",   value: "High",  time: "1–2 months", emoji: "🤖" },
  { name: "Meta React Developer",    org: "Meta",     value: "Medium",time: "1 month",     emoji: "⚛️" },
  { name: "Kubernetes CKA",          org: "CNCF",     value: "High",  time: "3 months",    emoji: "🐳" },
  { name: "Ethical Hacking CEH",     org: "EC-Council",value:"High",  time: "3–4 months",  emoji: "🛡️" },
];

const GROWTH_STAGES = [
  { years: "0–1 yr",   role: "Fresher / Intern",     focus: "DSA, basics, first job",           salary: "₹3–8L",   color: "bg-slate-500" },
  { years: "1–3 yr",   role: "Junior Developer",     focus: "Deepen skills, side projects",     salary: "₹5–15L",  color: "bg-blue-500" },
  { years: "3–5 yr",   role: "Mid-Level Engineer",   focus: "System design, ownership",         salary: "₹15–30L", color: "bg-indigo-500" },
  { years: "5–8 yr",   role: "Senior Engineer",      focus: "Architecture, mentoring",          salary: "₹25–50L", color: "bg-violet-500" },
  { years: "8–12 yr",  role: "Staff / Tech Lead",    focus: "Cross-team impact, strategy",     salary: "₹40–80L", color: "bg-purple-500" },
  { years: "12+ yr",   role: "Principal / Director", focus: "Company-level decisions",          salary: "₹60L+",   color: "bg-pink-500" },
];

// ─────────────────────────────────────────────────────────────────
// SECTION COMPONENTS
// ─────────────────────────────────────────────────────────────────

function SectionShell({ id, emoji, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-20 mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-xl flex-shrink-0">
          {emoji}
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function InfoCard({ icon, title, body, accent = "indigo" }) {
  const colors = { indigo: "border-indigo-100 bg-indigo-50", violet: "border-violet-100 bg-violet-50", emerald: "border-emerald-100 bg-emerald-50", amber: "border-amber-100 bg-amber-50" };
  return (
    <div className={`rounded-2xl border p-5 ${colors[accent] || colors.indigo}`}>
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-6">{body}</p>
    </div>
  );
}

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors">
        <span className="font-semibold text-slate-800 text-sm pr-4">{q}</span>
        {open ? <FiChevronDown className="text-indigo-500 flex-shrink-0" /> : <FiChevronRight className="text-slate-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-slate-600 leading-6 border-t border-slate-100 pt-3 bg-white">
          {a}
        </div>
      )}
    </div>
  );
}

function AISection({ id, emoji, title, promptTemplate }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async (customPrompt) => {
    const prompt = customPrompt || (promptTemplate ? promptTemplate(input) : input);
    if (!prompt.trim()) return;
    setLoading(true); setResult("");
    try {
      const data = await api.chat(prompt);
      setResult(data.response || "");
    } catch { toast.error("AI request failed"); }
    finally { setLoading(false); }
  };

  return (
    <SectionShell id={id} emoji={emoji} title={title}>
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl p-6 text-white">
        <div className="flex gap-3 mb-4">
          <input value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && run()}
            placeholder={`Ask about ${title.toLowerCase()}...`}
            className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition-colors" />
          <button onClick={() => run()} disabled={loading || !input.trim()}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40">
            <FiZap className="text-xs" /> {loading ? "..." : "Ask AI"}
          </button>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-white/40 text-sm py-4">
            <div className="w-4 h-4 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
            Thinking...
          </div>
        )}
        {result && (
          <div className="prose prose-invert prose-sm max-w-none bg-white/5 rounded-xl p-4 mt-2">
            <ReactMarkdown>{result}</ReactMarkdown>
          </div>
        )}
      </div>
    </SectionShell>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function CareerPath() {
  const [activeSection, setActiveSection] = useState("about-cs");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openGroup, setOpenGroup] = useState("Foundations");
  const [aiRoadmapInput, setAiRoadmapInput] = useState({ goal: "SDE at FAANG", year: "2nd Year", skills: "Python, C++" });
  const [aiRoadmapResult, setAiRoadmapResult] = useState("");
  const [aiRoadmapLoading, setAiRoadmapLoading] = useState(false);

  const filtered = NAV_SECTIONS.filter(s =>
    s.label.toLowerCase().includes(search.toLowerCase())
  );

  const generateRoadmap = async () => {
    setAiRoadmapLoading(true); setAiRoadmapResult("");
    try {
      const data = await api.chat(
        `You are a senior career counselor for CSE students in India.
Create a detailed personalized career roadmap for:
Goal: ${aiRoadmapInput.goal}
Current Year: ${aiRoadmapInput.year}
Current Skills: ${aiRoadmapInput.skills}

Give a structured week-by-week or month-by-month plan covering:
1. Skills to learn (with resources)
2. Projects to build
3. Platforms to practice on
4. Timeline milestones
5. Interview prep strategy
6. Networking and application tips

Be specific, actionable, and encouraging.`
      );
      setAiRoadmapResult(data.response || "");
    } catch { toast.error("Failed to generate roadmap"); }
    finally { setAiRoadmapLoading(false); }
  };

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setSidebarOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex gap-0 -mx-4 sm:-mx-6 -mt-4" style={{ minHeight: "calc(100vh - 64px)" }}>

        {/* ── SIDEBAR ── */}
        <aside className={`
          fixed lg:sticky top-0 lg:top-0 z-30 h-screen bg-white border-r border-slate-200
          transition-all duration-300 flex-shrink-0
          ${sidebarOpen ? "left-0 w-72" : "-left-72 lg:left-0"}
          lg:w-64 overflow-y-auto
        `}>
          <div className="p-4 border-b border-slate-100 sticky top-0 bg-white z-10">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 text-slate-400 text-sm" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search topics..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-indigo-400 transition-colors" />
            </div>
          </div>

          <nav className="p-3 pb-20">
            {search ? (
              <div className="space-y-0.5">
                {filtered.map(s => (
                  <button key={s.id} onClick={() => scrollTo(s.id)}
                    className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
                      activeSection === s.id ? "bg-indigo-50 text-indigo-700 font-bold" : "text-slate-600 hover:bg-slate-50"
                    }`}>
                    <span>{s.emoji}</span>{s.label}
                  </button>
                ))}
              </div>
            ) : (
              GROUPS.map(group => {
                const items = NAV_SECTIONS.filter(s => s.group === group);
                const isOpen = openGroup === group;
                return (
                  <div key={group} className="mb-1">
                    <button onClick={() => setOpenGroup(isOpen ? "" : group)}
                      className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors">
                      {group}
                      <FiChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="space-y-0.5 ml-1">
                        {items.map(s => (
                          <button key={s.id} onClick={() => scrollTo(s.id)}
                            className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors ${
                              activeSection === s.id
                                ? "bg-indigo-50 text-indigo-700 font-bold border border-indigo-100"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}>
                            <span className="text-sm">{s.emoji}</span>
                            <span className="truncate">{s.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </nav>
        </aside>

        {/* Sidebar backdrop mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-4xl">

          {/* Mobile sidebar toggle */}
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 flex items-center gap-2 text-sm text-indigo-600 font-semibold border border-indigo-200 bg-indigo-50 px-3 py-2 rounded-xl">
            <FiBookOpen className="text-xs" /> Browse Topics
          </button>

          {/* Page Hero */}
          <div className="mb-8 p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-24 translate-x-24" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/10 rounded-full translate-y-12 -translate-x-12" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/50 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                <FiStar className="text-amber-400 text-xs" /> Complete Career Guide
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">CSE Career Explorer</h1>
              <p className="text-white/50 text-sm max-w-xl leading-6">
                Everything you need to navigate your Computer Science career — from first year to your dream job. AI-powered, industry-validated, constantly updated.
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {["About CS", "Salary", "Domains", "AI Advisor", "Roadmap"].map(t => (
                  <button key={t} onClick={() => {
                    const s = NAV_SECTIONS.find(n => n.label.toLowerCase().includes(t.toLowerCase()));
                    if (s) scrollTo(s.id);
                  }} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white px-3 py-1.5 rounded-full transition-all">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── ABOUT CS ── */}
          <SectionShell id="about-cs" emoji="🖥️" title="About Computer Science"
            subtitle="What CSE actually is and why it matters">
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard icon="🔬" accent="indigo" title="What is Computer Science?"
                body="CS is the study of computation, algorithms, data structures, programming languages, and computer systems. It covers both theoretical foundations and practical engineering." />
              <InfoCard icon="🌍" accent="violet" title="Why Choose CS?"
                body="Highest-paid career, global opportunities, remote work culture, constant innovation, and the ability to build products used by millions." />
              <InfoCard icon="📚" accent="emerald" title="Core Subjects"
                body="Data Structures & Algorithms, OS, DBMS, Computer Networks, OOP, Theory of Computation, Compiler Design, Machine Learning." />
              <InfoCard icon="💼" accent="amber" title="Job Market in 2025"
                body="2M+ tech jobs in India. AI/ML engineers, cloud engineers, full-stack devs in highest demand. Avg. freshers salary ₹5–12L, experienced ₹20–80L+." />
            </div>
          </SectionShell>

          {/* ── ABOUT IT ── */}
          <SectionShell id="about-it" emoji="🌐" title="About Information Technology"
            subtitle="How IT differs from CS and where it shines">
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard icon="⚙️" accent="indigo" title="What is Information Technology?"
                body="IT focuses on applying technology to solve business problems — infrastructure, networking, software deployment, ERP systems, and IT support." />
              <InfoCard icon="🔄" accent="violet" title="CS vs IT — Quick Difference"
                body="CS = building the technology. IT = deploying and managing the technology. CS grads tend to code more; IT grads handle systems, networks, and business applications." />
              <InfoCard icon="🏢" accent="emerald" title="IT Career Roles"
                body="System Administrator, Network Engineer, Database Admin, IT Project Manager, ERP Consultant, Business Analyst, IT Support." />
              <InfoCard icon="🌏" accent="amber" title="IT Industry in India"
                body="India is the world's IT services hub. TCS, Infosys, Wipro, HCL employ 1M+ IT professionals combined. Strong demand in digital transformation." />
            </div>
          </SectionShell>

          {/* ── CSE vs AI ── */}
          <SectionShell id="cse-vs-ai" emoji="🤖" title="CSE vs AI — Which to Choose?"
            subtitle="Comparing traditional CS with the AI/ML specialization track">
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="border-2 border-indigo-200 bg-indigo-50 rounded-2xl p-5">
                <div className="text-2xl mb-2">💻</div>
                <h3 className="font-bold text-indigo-800 mb-3">Traditional CSE</h3>
                <ul className="space-y-2 text-sm text-indigo-700">
                  {["Broad foundation in all CS topics","Easier to switch between domains","Strong DSA + System Design","Higher campus placement rate","More hiring companies","Clear well-defined learning path"].map(p => (
                    <li key={p} className="flex items-start gap-2"><span className="text-indigo-400 mt-0.5">✓</span>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="border-2 border-violet-200 bg-violet-50 rounded-2xl p-5">
                <div className="text-2xl mb-2">🤖</div>
                <h3 className="font-bold text-violet-800 mb-3">AI / ML Specialization</h3>
                <ul className="space-y-2 text-sm text-violet-700">
                  {["Hottest career in 2025","Highest salaries in tech","Research + engineering blend","Strong math requirement","Growing job market","Global opportunities with LLMs"].map(p => (
                    <li key={p} className="flex items-start gap-2"><span className="text-violet-400 mt-0.5">✓</span>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <p className="text-sm font-bold text-amber-800 mb-1">💡 Our Recommendation</p>
              <p className="text-sm text-amber-700">Master CSE fundamentals first (DSA, system design, programming) then specialize in AI/ML. The best AI engineers have strong CS foundations.</p>
            </div>
          </SectionShell>

          {/* ── IS CSE RIGHT ── */}
          <SectionShell id="is-cse-right" emoji="🧭" title="Is CSE Right for Me?"
            subtitle="A self-assessment checklist to validate your choice">
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {[
                { emoji: "✅", label: "Go for CSE if...", items: ["Love solving logical puzzles","Enjoy building things","Comfortable with math","Want high-paying career","Like continuous learning"], color: "border-emerald-200 bg-emerald-50 text-emerald-800" },
                { emoji: "⚠️", label: "Think twice if...", items: ["Hate all types of coding","Looking for stable 9-5 only","Dislike learning new tools","Want physical/manual work","Pure arts/creative path"], color: "border-amber-200 bg-amber-50 text-amber-800" },
                { emoji: "🔄", label: "Don't worry about...", items: ["Not knowing coding yet","Low 12th marks","Non-IIT college","Not having a laptop","Imposter syndrome"], color: "border-blue-200 bg-blue-50 text-blue-800" },
              ].map(({ emoji, label, items, color }) => (
                <div key={label} className={`rounded-2xl border p-4 ${color}`}>
                  <div className="text-xl mb-2">{emoji}</div>
                  <p className="font-bold text-sm mb-3">{label}</p>
                  <ul className="space-y-1.5">{items.map(i => (
                    <li key={i} className="text-xs flex items-start gap-1.5"><span className="mt-0.5 opacity-60">•</span>{i}</li>
                  ))}</ul>
                </div>
              ))}
            </div>
          </SectionShell>

          {/* ── CAREER DOMAINS ── */}
          <SectionShell id="domains" emoji="🗂️" title="Career Domains"
            subtitle="Every direction you can take with a CS degree">
            <div className="grid sm:grid-cols-2 gap-3">
              {DOMAINS.map(d => (
                <div key={d.title} className="border border-slate-200 rounded-2xl p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group cursor-default">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{d.icon}</span>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{d.title}</p>
                        <p className="text-xs text-slate-500">{d.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex-shrink-0 ml-2">{d.avg}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {d.roles.map(r => (
                      <span key={r} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg font-medium">{r}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>

          {/* ── CAREER GROWTH ── */}
          <SectionShell id="growth" emoji="📈" title="Career Growth (0–10+ Years)"
            subtitle="What your career trajectory looks like in tech">
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 to-violet-500 opacity-20" />
              <div className="space-y-3">
                {GROWTH_STAGES.map((g, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className={`w-10 h-10 ${g.color} rounded-xl flex items-center justify-center text-white font-bold text-xs flex-shrink-0 z-10 shadow-lg`}>
                      {i + 1}
                    </div>
                    <div className="flex-1 border border-slate-200 rounded-2xl p-4 hover:border-indigo-200 transition-colors">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{g.role}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{g.focus}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-xs font-bold text-indigo-600">{g.salary}</p>
                          <p className="text-[10px] text-slate-400">{g.years}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionShell>

          {/* ── SALARY ── */}
          <SectionShell id="salary" emoji="💰" title="Salary Explorer"
            subtitle="Real salary ranges across roles and experience levels in India 2025">
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    {["Role", "Salary Range", "Experience", "Companies"].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SALARY_DATA.map((s, i) => (
                    <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-slate-800">{s.role}</td>
                      <td className="px-4 py-3"><span className="font-bold text-emerald-600">{s.range}</span></td>
                      <td className="px-4 py-3 text-slate-500 text-xs">{s.yoe}</td>
                      <td className="px-4 py-3 text-slate-400 text-xs">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3">* Ranges are approximate for Indian market 2025. FAANG salaries include ESOPs. Actual CTC may vary.</p>
          </SectionShell>

          {/* ── COMPANIES ── */}
          <SectionShell id="companies" emoji="🏢" title="Company Guide"
            subtitle="Where to aim based on your goals and current level">
            <div className="space-y-3">
              {COMPANIES.map(c => (
                <div key={c.tier} className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 transition-colors">
                  <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-slate-800">{c.tier}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        c.diff === "Very Hard" ? "bg-red-50 text-red-600 border border-red-200" :
                        c.diff === "Hard" ? "bg-orange-50 text-orange-600 border border-orange-200" :
                        "bg-yellow-50 text-yellow-600 border border-yellow-200"
                      }`}>{c.diff}</span>
                    </div>
                    <span className="text-sm font-bold text-indigo-600">{c.pkg}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.cos.map(co => (
                      <span key={co} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-default">{co}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>

          {/* ── SKILLS ROADMAP ── */}
          <SectionShell id="skills" emoji="🗺️" title="Skills Roadmap"
            subtitle="What to learn and in what order for each role">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { role: "SDE / Full Stack", icon: "💻", color: "indigo", skills: ["DSA + Algorithms","JavaScript / Python","React + Node.js","SQL + NoSQL","Git + GitHub","System Design basics","REST APIs + Auth","Docker basics"] },
                { role: "AI / ML Engineer", icon: "🤖", color: "violet", skills: ["Python + NumPy/Pandas","Math (Lin Algebra, Stats)","ML fundamentals (sklearn)","Deep Learning (PyTorch)","LLMs + Prompt Engineering","Computer Vision / NLP","MLOps basics","Kaggle competitions"] },
                { role: "DevOps / Cloud",   icon: "☁️", color: "emerald", skills: ["Linux command line","Docker + Kubernetes","CI/CD (GitHub Actions)","AWS / GCP / Azure","Terraform (IaC)","Monitoring (Prometheus)","Networking basics","Security best practices"] },
                { role: "Data Scientist",   icon: "📊", color: "amber",  skills: ["Python + SQL","Statistics + Probability","Pandas + Matplotlib","ML algorithms","A/B Testing","Tableau / Power BI","Big Data (Spark)","Business communication"] },
              ].map(({ role, icon, color, skills }) => {
                const colors = { indigo: "border-indigo-200 bg-indigo-50", violet: "border-violet-200 bg-violet-50", emerald: "border-emerald-200 bg-emerald-50", amber: "border-amber-200 bg-amber-50" };
                const text = { indigo: "text-indigo-700", violet: "text-violet-700", emerald: "text-emerald-700", amber: "text-amber-700" };
                return (
                  <div key={role} className={`rounded-2xl border p-5 ${colors[color]}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{icon}</span>
                      <h3 className={`font-bold text-sm ${text[color]}`}>{role}</h3>
                    </div>
                    <div className="space-y-1.5">
                      {skills.map((s, i) => (
                        <div key={s} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0 ${
                            color === "indigo" ? "bg-indigo-500" : color === "violet" ? "bg-violet-500" : color === "emerald" ? "bg-emerald-500" : "bg-amber-500"
                          }`}>{i + 1}</span>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionShell>

          {/* ── INTERVIEW PREP ── */}
          <SectionShell id="interview" emoji="🎯" title="Interview Preparation"
            subtitle="Complete guide to cracking tech interviews">
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {[
                { phase: "Month 1–2", title: "DSA Foundation", items: ["Arrays, Strings, Math","LinkedList, Stacks, Queues","Recursion basics","50 Easy LeetCode problems"], color: "emerald" },
                { phase: "Month 3–4", title: "Core DSA",        items: ["Trees & Graphs","DP fundamentals","Sliding window, Two pointer","100 Medium LeetCode problems"], color: "indigo" },
                { phase: "Month 5–6", title: "Interview Ready", items: ["System Design basics","Mock interviews (daily)","Behavioral STAR answers","30 Company-specific problems"], color: "violet" },
              ].map(({ phase, title, items, color }) => {
                const bg = { emerald: "bg-emerald-50 border-emerald-200", indigo: "bg-indigo-50 border-indigo-200", violet: "bg-violet-50 border-violet-200" };
                const t  = { emerald: "text-emerald-700", indigo: "text-indigo-700", violet: "text-violet-700" };
                return (
                  <div key={phase} className={`rounded-2xl border p-4 ${bg[color]}`}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${t[color]}`}>{phase}</p>
                    <p className={`font-bold text-sm mb-3 ${t[color]}`}>{title}</p>
                    <ul className="space-y-1.5">{items.map(item => (
                      <li key={item} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="mt-0.5 text-slate-400">•</span>{item}
                      </li>
                    ))}</ul>
                  </div>
                );
              })}
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <InfoCard icon="🔗" accent="indigo" title="Best Platforms"
                body="LeetCode (DSA), Codeforces (CP), System Design Primer (GitHub), Pramp (mock interviews), InterviewBit (structured prep)." />
              <InfoCard icon="💡" accent="amber" title="Pro Tips"
                body="Solve 1 problem daily consistently. Focus on understanding patterns, not memorizing. Explain your thinking aloud. Do mock interviews from week 1." />
            </div>
          </SectionShell>

          {/* ── RESUME ── */}
          <SectionShell id="resume" emoji="📄" title="Resume & Portfolio"
            subtitle="How to build a resume that gets shortlisted">
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard icon="📝" accent="indigo" title="Resume Must-Haves"
                body="1-page max. Quantify impact (reduced API response by 40%). 3–4 strong projects with GitHub links. Skills section with technologies. No photo/DOB for most companies." />
              <InfoCard icon="🔗" accent="violet" title="Portfolio Essentials"
                body="Active GitHub (green squares!). 3–5 deployed projects. LinkedIn with 500+ connections. A personal website or portfolio page. Contributions to open source." />
              <InfoCard icon="📊" accent="emerald" title="ATS Optimization"
                body="Use keywords from the job description. Simple formatting (no tables/graphics). Use standard section headings. Submit as PDF. Match job title in resume headline." />
              <InfoCard icon="🚀" accent="amber" title="Projects That Stand Out"
                body="Build real products people can use. Add ML/AI features. Deploy on cloud (AWS/GCP). Write documentation. Get 50+ GitHub stars. Solve a real problem." />
            </div>
            <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between flex-wrap gap-3">
              <p className="text-sm font-bold text-indigo-800">Try our AI Resume Analyzer — get ATS score + feedback instantly</p>
              <a href="/resume-analyzer" className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-indigo-500 transition-colors">
                Analyze Resume <FiArrowRight className="text-xs" />
              </a>
            </div>
          </SectionShell>

          {/* ── HIGHER STUDIES ── */}
          <SectionShell id="higher-studies" emoji="🎓" title="Higher Studies"
            subtitle="Should you study further? A complete comparison">
            <div className="grid sm:grid-cols-2 gap-4">
              {HIGHER_STUDIES.map(h => (
                <div key={h.degree} className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{h.emoji}</span>
                    <div>
                      <h3 className="font-bold text-slate-800">{h.degree}</h3>
                      <p className="text-xs text-slate-500">{h.where}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    {h.pros.map(p => (
                      <div key={p} className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="text-emerald-500">✓</span>{p}
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                    <p className="text-xs text-amber-700"><span className="font-bold">Choose when:</span> {h.when}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionShell>

          {/* ── STUDY ABROAD ── */}
          <SectionShell id="study-abroad" emoji="✈️" title="Study Abroad"
            subtitle="Guide to pursuing MS/PhD abroad from India">
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard icon="🇺🇸" accent="indigo" title="USA (Most Popular)"
                body="Top CS schools: MIT, Stanford, CMU, UIUC, Georgia Tech. Need GRE+TOEFL. Tuition: $30–60K/yr. CPT/OPT work authorization. MS + job = ₹1.5–3 Cr first package." />
              <InfoCard icon="🇩🇪" accent="violet" title="Germany (Budget Option)"
                body="TU Munich, KIT, RWTH Aachen. Free/low tuition at public universities! English programs available. Part-time work allowed. Post-study work visa easy." />
              <InfoCard icon="🇨🇦" accent="emerald" title="Canada"
                body="UofT, UBC, Waterloo. Fast PR pathway. Lower fees than USA. Strong tech ecosystem in Toronto/Vancouver. Helpful immigration policies for tech workers." />
              <InfoCard icon="📋" accent="amber" title="Preparation Timeline"
                body="3rd year: GRE/IELTS prep + research internship. 4th year S1: Finalize universities + essays. 4th year S2: Apply Sep–Dec. Results: Jan–Apr. Joining: Aug." />
            </div>
          </SectionShell>

          {/* ── CERTIFICATIONS ── */}
          <SectionShell id="certifications" emoji="📜" title="Certifications"
            subtitle="Which certs actually boost your resume in 2025">
            <div className="grid sm:grid-cols-2 gap-3">
              {CERTS.map(c => (
                <div key={c.name} className="border border-slate-200 rounded-2xl p-4 flex items-start gap-4 hover:border-indigo-200 transition-colors">
                  <span className="text-2xl flex-shrink-0">{c.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm">{c.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{c.org} · {c.time}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    c.value === "High" ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-amber-50 text-amber-600 border border-amber-200"
                  }`}>{c.value}</span>
                </div>
              ))}
            </div>
          </SectionShell>

          {/* ── FREELANCING ── */}
          <SectionShell id="freelancing" emoji="💻" title="Freelancing"
            subtitle="How to earn while you learn as a CSE student">
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard icon="🌐" accent="indigo" title="Best Platforms"
                body="Upwork, Fiverr, Toptal for international clients. Internshala, Freelancer.in for India. LinkedIn DMs for warm leads. Build 5★ profile with small projects first." />
              <InfoCard icon="💰" accent="emerald" title="What to Freelance"
                body="Web development (₹10–50K/project), Mobile apps (₹20–80K), ML models (₹15–60K), Data scraping, Content writing for tech blogs, Bug bounty hunting." />
              <InfoCard icon="🎯" accent="violet" title="How to Start"
                body="Build 2–3 portfolio projects. Create profiles on 2 platforms. Start with small fixed-price projects. Deliver quality. Ask for reviews. Gradually increase rates." />
              <InfoCard icon="⚠️" accent="amber" title="Watch Out For"
                body="Scope creep — always get requirements in writing. Payment before delivery for new clients. Taxes on freelance income. Don't neglect college/main job." />
            </div>
          </SectionShell>

          {/* ── ENTREPRENEURSHIP ── */}
          <SectionShell id="entrepreneurship" emoji="🚀" title="Entrepreneurship"
            subtitle="Building a startup as a CSE grad — what you need to know">
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {[
                { stage: "Idea Stage",     desc: "Identify a problem. Talk to 50+ potential users. Don't code yet — validate first.", emoji: "💡" },
                { stage: "MVP Stage",      desc: "Build the smallest working version. Ship in 4–6 weeks. Get first 10 paying users.", emoji: "⚡" },
                { stage: "Growth Stage",   desc: "Product-market fit. Apply to YC/Sequoia. Scale marketing and engineering.", emoji: "📈" },
              ].map(s => (
                <div key={s.stage} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
                  <div className="text-3xl mb-2">{s.emoji}</div>
                  <p className="font-bold text-slate-800 text-sm mb-2">{s.stage}</p>
                  <p className="text-xs text-slate-600 leading-5">{s.desc}</p>
                </div>
              ))}
            </div>
            <InfoCard icon="🏆" accent="indigo" title="Indian Startup Ecosystem"
              body="India has 100+ unicorns. Funding from Sequoia, Accel, Nexus. Programs: IIT TechFest, T-Hub (Hyderabad), NASSCOM Startup Hub. Apply to YC, Antler, Surge for early-stage support." />
          </SectionShell>

          {/* ── CAREER SWITCHING ── */}
          <SectionShell id="switching" emoji="🔄" title="Career Switching"
            subtitle="Transitioning into tech or switching roles within tech">
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoCard icon="🎯" accent="indigo" title="Non-CS to Tech (3–6 months)"
                body="Learn Python or JavaScript basics (3 months). Build 2 projects. Do a bootcamp or structured course. Apply to junior roles or internships. DSA basics for interviews." />
              <InfoCard icon="🔄" accent="violet" title="Service to Product (6–12 months)"
                body="This is the most common switch in India. Focus heavily on DSA + LeetCode. Learn modern tech stack. Build 2–3 personal projects. Network on LinkedIn actively." />
              <InfoCard icon="🤖" accent="emerald" title="Dev to ML/AI (6–9 months)"
                body="Strong Python needed. Learn NumPy, Pandas, sklearn. Complete Andrew Ng's ML course. Build 3 ML projects. Kaggle competitions. Apply for ML roles at startups first." />
              <InfoCard icon="📊" accent="amber" title="Dev to Data Science"
                body="SQL is your first priority (must be expert level). Learn statistics and probability. Python for analysis. Business storytelling. Tableau/Power BI for visualization." />
            </div>
          </SectionShell>

          {/* ── AI ADVISOR ── */}
          <AISection id="ai-advisor" emoji="🤖" title="AI Career Advisor"
            promptTemplate={(q) => `You are an expert career counselor for CSE students in India. Answer this question with specific, actionable advice: ${q}`} />

          {/* ── PERSONALIZED ROADMAP ── */}
          <SectionShell id="roadmap-ai" emoji="⚡" title="Personalized Learning Roadmap"
            subtitle="AI generates your custom weekly study plan">
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl p-6 text-white">
              <div className="grid sm:grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Career Goal", key: "goal", placeholder: "e.g. SDE at FAANG, AI Engineer" },
                  { label: "Current Year", key: "year", placeholder: "e.g. 2nd Year, Fresher" },
                  { label: "Current Skills", key: "skills", placeholder: "e.g. Python, C basics" },
                ].map(f => (
                  <div key={f.key}>
                    <p className="text-[11px] text-white/40 font-semibold uppercase tracking-wider mb-1.5">{f.label}</p>
                    <input value={aiRoadmapInput[f.key]}
                      onChange={e => setAiRoadmapInput(p => ({ ...p, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-400 transition-colors" />
                  </div>
                ))}
              </div>
              <button onClick={generateRoadmap} disabled={aiRoadmapLoading}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors disabled:opacity-40">
                {aiRoadmapLoading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Generating...</>
                  : <><FiZap className="text-sm" />Generate My Roadmap</>}
              </button>
              {aiRoadmapResult && (
                <div className="mt-5 prose prose-invert prose-sm max-w-none bg-white/5 rounded-2xl p-5">
                  <ReactMarkdown>{aiRoadmapResult}</ReactMarkdown>
                </div>
              )}
            </div>
          </SectionShell>

          {/* ── INDUSTRY TRENDS ── */}
          <SectionShell id="trends" emoji="📊" title="Industry Trends 2025"
            subtitle="What's hot and what's declining in tech">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border-2 border-emerald-200 bg-emerald-50 rounded-2xl p-5">
                <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-3">🔥 High Demand</p>
                <ul className="space-y-2">{[
                  "AI/ML Engineer — 300% YoY growth in demand",
                  "Cloud Native & Kubernetes specialists",
                  "Full Stack (React + Node/Python) developers",
                  "LLM & Prompt Engineers",
                  "Cybersecurity & DevSecOps engineers",
                  "Data Engineers (Spark, Kafka, Airflow)",
                ].map(t => <li key={t} className="text-sm text-emerald-800 flex items-start gap-2"><span>▲</span>{t}</li>)}</ul>
              </div>
              <div className="border-2 border-slate-200 bg-slate-50 rounded-2xl p-5">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">⚠️ Declining Demand</p>
                <ul className="space-y-2">{[
                  "Manual QA testers (AI taking over)",
                  "Basic data entry / traditional BPO",
                  "Waterfall project managers",
                  "Java EE monolith developers",
                  "Physical infrastructure admins",
                  "Traditional SEO specialists",
                ].map(t => <li key={t} className="text-sm text-slate-600 flex items-start gap-2"><span>▼</span>{t}</li>)}</ul>
              </div>
            </div>
          </SectionShell>

          {/* ── SUCCESS STORIES ── */}
          <SectionShell id="stories" emoji="🌟" title="Success Stories"
            subtitle="Real people who made it — and how">
            <div className="grid sm:grid-cols-2 gap-4">
              {STORIES.map(s => (
                <div key={s.name} className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {s.name.split(" ")[0][0]}{s.name.split(" ")[1]?.[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{s.name}</p>
                      <p className="text-xs text-slate-500">{s.from} → <span className="text-indigo-600 font-semibold">{s.to}</span></p>
                    </div>
                    <span className="text-xs bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-0.5 rounded-full ml-auto font-semibold">{s.time}</span>
                  </div>
                  <p className="text-sm text-slate-700 italic border-l-2 border-indigo-200 pl-3">"{s.quote}"</p>
                </div>
              ))}
            </div>
          </SectionShell>

          {/* ── FAQs ── */}
          <SectionShell id="faqs" emoji="❓" title="Frequently Asked Questions"
            subtitle="Most common doubts from CSE students — answered honestly">
            <div className="space-y-2">
              {FAQS.map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
            </div>
          </SectionShell>

          {/* ── LIFE AFTER GRADUATION ── */}
          <SectionShell id="life-after" emoji="🎯" title="Life After Graduation"
            subtitle="Your first 12 months as a working professional — what to expect">
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {[
                { month: "Month 1–3",  title: "Onboarding",      emoji: "🏢", tips: ["Join team standups","Set up dev environment","Read codebase daily","Ask questions fearlessly","Don't pretend to understand"] },
                { month: "Month 3–6",  title: "First Delivery",  emoji: "🚀", tips: ["Own a small feature","Write clean code","Code reviews are learning","Build team relationships","Start tracking your wins"] },
                { month: "Month 6–12", title: "Find Your Niche", emoji: "⭐", tips: ["Pick 1 area to go deep","Contribute beyond your sprint","Start a side project","Connect with senior engineers","Plan your next move"] },
              ].map(({ month, title, emoji, tips }) => (
                <div key={month} className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="text-xl mb-1">{emoji}</div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{month}</p>
                  <p className="font-bold text-slate-800 text-sm mb-3">{title}</p>
                  <ul className="space-y-1.5">{tips.map(t => (
                    <li key={t} className="text-xs text-slate-600 flex items-start gap-1.5">
                      <span className="text-indigo-400 mt-0.5 flex-shrink-0">•</span>{t}
                    </li>
                  ))}</ul>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl p-6 text-white text-center">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-xl font-extrabold mb-2">Your journey starts now.</h3>
              <p className="text-white/50 text-sm mb-5 max-w-sm mx-auto">Every FAANG engineer, every startup founder, every AI researcher started exactly where you are now.</p>
              <a href="/interview-ai" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors">
                Talk to AI Mentor <FiArrowRight className="text-sm" />
              </a>
            </div>
          </SectionShell>

        </main>
      </div>
    </DashboardLayout>
  );
}


