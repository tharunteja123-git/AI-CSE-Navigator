import { Link } from "react-router-dom";

const activities = [
  {
    title: "Solve 2 Array Problems",
    status: "Completed",
    color: "bg-emerald-500",
    time: "Today",
    icon: "✅",
  },
  {
    title: "Resume ATS Scan",
    status: "Completed",
    color: "bg-cyan-500",
    time: "Today",
    icon: "📄",
  },
  {
    title: "AI Mock Interview",
    status: "Pending",
    color: "bg-orange-500",
    time: "Tomorrow",
    icon: "🎯",
  },
  {
    title: "Dynamic Programming",
    status: "Upcoming",
    color: "bg-violet-500",
    time: "Wednesday",
    icon: "🧠",
  },
  {
    title: "Apply to Companies",
    status: "Upcoming",
    color: "bg-pink-500",
    time: "Friday",
    icon: "💼",
  },
];

export default function ActivityTimeline() {

  const completed = activities.filter(
    (a) => a.status === "Completed"
  ).length;

  const progress = Math.round(
    (completed / activities.length) * 100
  );

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-7">

      {/* Glow */}

      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-[110px]" />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-widest text-cyan-300">

              Activity

            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">

              Weekly Timeline

            </h2>

          </div>

          <div className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">

            🔥 12 Day Streak

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="flex justify-between text-sm mb-2">

            <span className="text-slate-400">

              Weekly Progress

            </span>

            <span className="text-cyan-300 font-semibold">

              {progress}%

            </span>

          </div>

          <div className="h-3 rounded-full overflow-hidden bg-slate-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-emerald-400"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Timeline */}

        <div className="mt-8 space-y-6">

          {activities.map((item, index) => (

            <div
              key={index}
              className="relative flex gap-4"
            >

              {/* Line */}

              {index !== activities.length - 1 && (

                <div className="absolute left-5 top-10 h-12 w-0.5 bg-slate-700" />

              )}

              {/* Circle */}

              <div
                className={`h-10 w-10 rounded-full ${item.color} flex items-center justify-center text-lg shadow-lg flex-shrink-0`}
              >

                {item.icon}

              </div>

              {/* Content */}

              <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">

                <div className="flex justify-between items-center">

                  <h3 className="font-semibold text-white">

                    {item.title}

                  </h3>

                  <span className="text-xs text-slate-500">

                    {item.time}

                  </span>

                </div>

                <p className="mt-2 text-sm text-slate-400">

                  {item.status}

                </p>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom Card */}

        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

          <div className="flex justify-between items-center">

            <div>

              <h3 className="font-semibold text-white">

                Today's Goal

              </h3>

              <p className="text-sm text-slate-400 mt-1">

                Complete 5 coding problems and one AI interview.

              </p>

            </div>

            <Link
              to="/coding-tracker"
              className="rounded-xl bg-cyan-500 hover:bg-cyan-400 transition px-5 py-3 font-semibold text-slate-950"
            >

              Start →

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}