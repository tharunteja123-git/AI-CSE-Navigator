import { Link } from "react-router-dom";

const actions = [
  {
    title: "AI Mock Interview",
    subtitle: "Practice with AI interviewer",
    emoji: "🎯",
    to: "/mock-interview",
    gradient:
      "from-cyan-500/20 via-cyan-500/5 to-transparent",
    border: "border-cyan-500/30",
    size: "lg:col-span-2 lg:row-span-2",
  },

  {
    title: "Resume Analyzer",
    subtitle: "Improve ATS Score",
    emoji: "📄",
    to: "/resume-analyzer",
    gradient:
      "from-violet-500/20 via-violet-500/5 to-transparent",
    border: "border-violet-500/30",
  },

  {
    title: "AI Mentor",
    subtitle: "Ask anything",
    emoji: "🤖",
    to: "/interview-ai",
    gradient:
      "from-emerald-500/20 via-emerald-500/5 to-transparent",
    border: "border-emerald-500/30",
  },

  {
    title: "Roadmap",
    subtitle: "Weekly learning plan",
    emoji: "🗺️",
    to: "/roadmap",
    gradient:
      "from-orange-500/20 via-orange-500/5 to-transparent",
    border: "border-orange-500/30",
  },

  {
    title: "Jobs",
    subtitle: "Latest opportunities",
    emoji: "💼",
    to: "/jobs",
    gradient:
      "from-pink-500/20 via-pink-500/5 to-transparent",
    border: "border-pink-500/30",
  },

  {
    title: "Skill Gap",
    subtitle: "Analyze Job Description",
    emoji: "🔍",
    to: "/skill-gap",
    gradient:
      "from-indigo-500/20 via-indigo-500/5 to-transparent",
    border: "border-indigo-500/30",
  },
];

export default function QuickActionsBento() {
  return (
    <section>

      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Quick Actions
          </h2>

          <p className="text-slate-400 mt-1">
            Continue your AI career journey
          </p>

        </div>

      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px]">

        {actions.map((item) => (

          <Link
            key={item.title}
            to={item.to}
            className={`group relative overflow-hidden rounded-3xl border ${item.border} bg-slate-900 ${item.size || ""}`}
          >

            {/* Glow */}

            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-80`}
            />

            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/5 blur-3xl group-hover:scale-125 transition duration-700" />

            <div className="relative z-10 flex h-full flex-col justify-between p-6">

              <div className="flex justify-between items-start">

                <div className="text-5xl group-hover:scale-110 transition-transform">

                  {item.emoji}

                </div>

                <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">

                  Open →

                </div>

              </div>

              <div>

                <h3 className="text-xl font-bold text-white mb-2">

                  {item.title}

                </h3>

                <p className="text-sm leading-6 text-slate-400">

                  {item.subtitle}

                </p>

              </div>

            </div>

            {/* Hover Border */}

            <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-cyan-400/40 transition-all duration-300" />

          </Link>

        ))}

      </div>

    </section>
  );
}