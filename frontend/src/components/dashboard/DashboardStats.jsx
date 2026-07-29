import { Link } from "react-router-dom";

export default function DashboardStats({
  assessment,
  totalSolved,
  totalProblems,
}) {

  const careerScore = assessment?.career_score || 82;
  const resumeScore = assessment?.resume_score || 91;
  const interviewScore = assessment?.interview_score || 84;
  const companies =
    assessment?.target_companies?.length || 0;

  const cards = [
    {
      title: "Career Score",
      value: `${careerScore}%`,
      subtitle: "Overall Readiness",
      icon: "🚀",
      color:
        "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20 text-cyan-300",
    },
    {
      title: "Resume",
      value: `${resumeScore}%`,
      subtitle: "ATS Score",
      icon: "📄",
      color:
        "from-violet-500/20 to-violet-600/5 border-violet-500/20 text-violet-300",
    },
    {
      title: "Coding",
      value: `${totalSolved}/${totalProblems}`,
      subtitle: "Problems Solved",
      icon: "💻",
      color:
        "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-300",
    },
    {
      title: "Companies",
      value: companies,
      subtitle: "Matched",
      icon: "🏢",
      color:
        "from-orange-500/20 to-orange-600/5 border-orange-500/20 text-orange-300",
    },
  ];

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`group relative overflow-hidden rounded-3xl border bg-gradient-to-br ${card.color} p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_rgba(34,211,238,.12)]`}
        >

          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-white">
                  {card.value}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {card.subtitle}
                </p>

              </div>

              <div className="text-5xl opacity-90 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>

            </div>

            <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400"
                style={{
                  width:
                    card.title === "Career Score"
                      ? `${careerScore}%`
                      : card.title === "Resume"
                      ? `${resumeScore}%`
                      : card.title === "Coding"
                      ? `${
                          totalProblems
                            ? (totalSolved / totalProblems) * 100
                            : 0
                        }%`
                      : `${Math.min(companies * 10, 100)}%`,
                }}
              />

            </div>

          </div>

        </div>

      ))}

      {/* AI Assistant Card */}

      <div className="md:col-span-2 xl:col-span-4 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 p-8 overflow-hidden relative">

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">

          <div>

            <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">

              🤖 AI Career Assistant

            </span>

            <h2 className="mt-4 text-3xl font-bold text-white">

              Ready for today's learning?

            </h2>

            <p className="mt-3 max-w-2xl text-slate-400 leading-7">

              Practice coding, improve your resume,
              prepare for interviews,
              and follow your personalized AI roadmap
              from one dashboard.

            </p>

          </div>

          <div className="flex gap-4">

            <Link
              to="/interview-ai"
              className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              AI Mentor
            </Link>

            <Link
              to="/roadmap"
              className="rounded-xl border border-slate-700 px-6 py-3 font-semibold text-white transition hover:border-cyan-400 hover:bg-slate-900"
            >
              My Roadmap
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}