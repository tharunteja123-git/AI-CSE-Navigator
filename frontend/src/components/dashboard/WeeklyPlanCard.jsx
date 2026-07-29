import { Link } from "react-router-dom";

const defaultPlan = {
  Monday: "Arrays",
  Tuesday: "Strings",
  Wednesday: "Binary Search",
  Thursday: "Linked List",
  Friday: "Trees",
  Saturday: "Dynamic Programming",
  Sunday: "Mock Interview",
};

export default function WeeklyPlanCard({ weeklyPlan }) {

  const plan = weeklyPlan || defaultPlan;

  const completed = 3;

  const total = Object.keys(plan).length;

  const progress = Math.round((completed / total) * 100);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-7">

      {/* Glow */}

      <div className="absolute -top-16 -right-20 h-56 w-56 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="relative z-10">

        <div className="flex justify-between items-center">

          <div>

            <p className="uppercase tracking-widest text-xs text-indigo-300">

              AI Planner

            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">

              Weekly Learning Plan

            </h2>

          </div>

          <div className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-indigo-300 text-xs">

            {completed}/{total} Complete

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="flex justify-between text-sm mb-2">

            <span className="text-slate-400">

              Overall Progress

            </span>

            <span className="text-indigo-300 font-semibold">

              {progress}%

            </span>

          </div>

          <div className="h-3 rounded-full overflow-hidden bg-slate-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-violet-500"
              style={{
                width: `${progress}%`
              }}
            />

          </div>

        </div>

        {/* Calendar */}

        <div className="mt-8 space-y-4">

          {Object.entries(plan).map(([day, topic], index) => {

            const done = index < completed;

            return (

              <div
                key={day}
                className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
                  done
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-slate-800 bg-slate-900/60"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-lg ${
                      done
                        ? "bg-emerald-500"
                        : "bg-slate-800"
                    }`}
                  >

                    {done ? "✓" : "📚"}

                  </div>

                  <div>

                    <h3 className="font-semibold text-white">

                      {day}

                    </h3>

                    <p className="text-sm text-slate-400">

                      {topic}

                    </p>

                  </div>

                </div>

                <span
                  className={`text-xs rounded-full px-3 py-1 ${
                    done
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >

                  {done ? "Done" : "Pending"}

                </span>

              </div>

            );

          })}

        </div>

        {/* AI Suggestion */}

        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

          <div className="flex gap-4">

            <div className="text-3xl">

              🤖

            </div>

            <div>

              <h3 className="font-semibold text-white">

                AI Suggestion

              </h3>

              <p className="text-sm leading-6 text-slate-400 mt-2">

                You're ahead of schedule.
                Finish Binary Search today and start
                Linked List tomorrow to keep your streak alive.

              </p>

            </div>

          </div>

        </div>

        <Link
          to="/roadmap"
          className="mt-8 block rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-4 text-center font-semibold text-white hover:scale-[1.02] transition"
        >

          Open Full Roadmap →

        </Link>

      </div>

    </div>
  );
}