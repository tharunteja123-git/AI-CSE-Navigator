import { Link } from "react-router-dom";

const colors = [
  "from-cyan-500 to-blue-500",
  "from-violet-500 to-purple-500",
  "from-emerald-500 to-green-500",
  "from-orange-500 to-red-500",
];

export default function ProjectsCard({ projects = [] }) {
  if (!projects.length) {
    projects = [
      "AI Resume Analyzer",
      "Job Portal",
      "Expense Tracker",
      "Chat Application",
    ];
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-7">

      {/* Glow */}
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="relative z-10">

        <div className="flex items-center justify-between mb-6">

          <div>

            <p className="uppercase tracking-widest text-xs text-violet-300">

              Portfolio

            </p>

            <h2 className="text-2xl font-bold text-white mt-2">

              Recommended Projects

            </h2>

          </div>

          <div className="rounded-full bg-violet-500/10 border border-violet-500/20 px-3 py-1 text-xs text-violet-300">

            {projects.length} Projects

          </div>

        </div>

        <div className="space-y-5">

          {projects.map((project, index) => {

            const progress = 25 + index * 20;

            return (

              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 hover:border-violet-500/30 transition-all duration-300"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-lg font-semibold text-white">

                      {project}

                    </h3>

                    <p className="text-sm text-slate-400 mt-1">

                      AI Suggested Portfolio Project

                    </p>

                  </div>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">

                    Level {index + 1}

                  </span>

                </div>

                <div className="mt-5">

                  <div className="flex justify-between text-xs mb-2">

                    <span className="text-slate-400">

                      Completion

                    </span>

                    <span className="text-violet-300">

                      {progress}%

                    </span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${colors[index % colors.length]}`}
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="mt-5 flex gap-2 flex-wrap">

                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs">

                    React

                  </span>

                  <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-300 text-xs">

                    FastAPI

                  </span>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs">

                    PostgreSQL

                  </span>

                  <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-300 text-xs">

                    AI

                  </span>

                </div>

              </div>

            );

          })}

        </div>

        <Link
          to="/projects"
          className="mt-8 block rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 py-4 text-center font-semibold text-white hover:scale-[1.02] transition"
        >

          View All Project Ideas →

        </Link>

      </div>

    </div>
  );
}