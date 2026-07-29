import { Link } from "react-router-dom";

export default function DashboardHero({
  user,
  totalSolved,
  totalProblems,
}) {
  const percent =
    totalProblems > 0
      ? Math.round((totalSolved / totalProblems) * 100)
      : 0;

  const firstName =
    user?.full_name?.split(" ")[0] || "Student";

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">

      {/* Glow */}
      <div className="absolute -top-28 -right-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-[110px]" />

      <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

        {/* Left */}

        <div>

          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-xs text-cyan-300 mb-6">

            🚀 AI Career Dashboard

          </div>

          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">

            Welcome back,

            <br />

            <span className="bg-gradient-to-r from-cyan-300 via-white to-violet-300 bg-clip-text text-transparent">

              {firstName}

            </span>

            👋

          </h1>

          <p className="mt-5 text-slate-400 text-lg leading-8 max-w-xl">

            Continue building your AI career.

            Complete DSA,

            improve your resume,

            practice interviews,

            and become placement ready.

          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/coding-tracker"
              className="rounded-xl bg-cyan-500 hover:bg-cyan-400 transition px-6 py-3 font-semibold text-slate-950"
            >
              Continue Coding →
            </Link>

            <Link
              to="/interview-ai"
              className="rounded-xl border border-slate-700 hover:border-cyan-400 hover:bg-slate-900 transition px-6 py-3 font-semibold"
            >
              Open AI Mentor
            </Link>

          </div>

        </div>

        {/* Right */}

        <div className="grid gap-5">

          {/* Progress */}

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6">

            <div className="flex justify-between mb-2">

              <span className="text-slate-400">

                Coding Progress

              </span>

              <span className="font-bold text-cyan-300">

                {percent}%

              </span>

            </div>

            <div className="h-3 rounded-full bg-slate-800 overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-violet-500 transition-all duration-700"
                style={{
                  width: `${percent}%`,
                }}
              />

            </div>

            <div className="mt-4 text-sm text-slate-400">

              {totalSolved} of {totalProblems} problems solved

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

              <div className="text-slate-500 text-sm">

                Career Readiness

              </div>

              <div className="mt-2 text-3xl font-bold text-emerald-400">

                82%

              </div>

              <div className="text-xs text-slate-500 mt-2">

                Based on profile

              </div>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

              <div className="text-slate-500 text-sm">

                Resume Score

              </div>

              <div className="mt-2 text-3xl font-bold text-violet-400">

                91%

              </div>

              <div className="text-xs text-slate-500 mt-2">

                ATS Optimized

              </div>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

              <div className="text-slate-500 text-sm">

                Problems Solved

              </div>

              <div className="mt-2 text-3xl font-bold text-cyan-400">

                {totalSolved}

              </div>

              <div className="text-xs text-slate-500 mt-2">

                Keep going 🚀

              </div>

            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

              <div className="text-slate-500 text-sm">

                AI Mentor

              </div>

              <div className="mt-2 text-3xl">

                🤖

              </div>

              <div className="text-xs text-cyan-400 mt-2">

                Ready to help

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}