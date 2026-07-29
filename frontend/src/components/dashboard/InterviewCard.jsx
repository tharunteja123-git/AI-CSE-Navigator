import { Link } from "react-router-dom";

export default function InterviewCard({ assessment }) {

  const score = assessment?.interview_score || 84;

  const confidence = assessment?.confidence || 78;

  const weakTopics = assessment?.missing_skills?.slice(0, 4) || [
    "System Design",
    "Docker",
    "Redis",
    "Behavioral",
  ];

  const history = [
    {
      company: "Accenture",
      score: 88,
      status: "Passed",
      color: "text-emerald-400",
    },
    {
      company: "Infosys",
      score: 82,
      status: "Passed",
      color: "text-emerald-400",
    },
    {
      company: "Amazon",
      score: 63,
      status: "Needs Practice",
      color: "text-orange-400",
    },
  ];

  const circumference = 2 * Math.PI * 58;

  const offset =
    circumference - (score / 100) * circumference;

  return (

    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-7">

      {/* Glow */}

      <div className="absolute -top-20 -right-16 h-60 w-60 rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative z-10">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <p className="uppercase tracking-widest text-xs text-violet-300">

              AI Interview

            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">

              Interview Readiness

            </h2>

          </div>

          <div className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">

            AI Coach

          </div>

        </div>

        {/* Score */}

        <div className="mt-8 flex justify-center">

          <div className="relative h-40 w-40">

            <svg
              className="h-40 w-40 rotate-[-90deg]"
              viewBox="0 0 140 140"
            >

              <circle
                cx="70"
                cy="70"
                r="58"
                stroke="#1e293b"
                strokeWidth="10"
                fill="none"
              />

              <circle
                cx="70"
                cy="70"
                r="58"
                stroke="url(#interviewGradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />

              <defs>

                <linearGradient
                  id="interviewGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >

                  <stop
                    offset="0%"
                    stopColor="#8b5cf6"
                  />

                  <stop
                    offset="100%"
                    stopColor="#06b6d4"
                  />

                </linearGradient>

              </defs>

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <div className="text-4xl font-bold text-white">

                {score}

              </div>

              <div className="text-sm text-slate-400">

                /100

              </div>

            </div>

          </div>

        </div>

        {/* Confidence */}

        <div className="mt-8">

          <div className="flex justify-between text-sm mb-2">

            <span className="text-slate-400">

              Confidence Level

            </span>

            <span className="text-violet-300 font-semibold">

              {confidence}%

            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">

            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500"
              style={{
                width: `${confidence}%`,
              }}
            />

          </div>

        </div>

        {/* Weak Areas */}

        <div className="mt-8">

          <h3 className="font-semibold text-white mb-3">

            🚨 Practice Topics

          </h3>

          <div className="flex flex-wrap gap-2">

            {weakTopics.map((topic) => (

              <span
                key={topic}
                className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs text-orange-300"
              >

                {topic}

              </span>

            ))}

          </div>

        </div>

        {/* Recent Interviews */}

        <div className="mt-8">

          <h3 className="font-semibold text-white mb-4">

            Recent AI Interviews

          </h3>

          <div className="space-y-3">

            {history.map((item) => (

              <div
                key={item.company}
                className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              >

                <div>

                  <h4 className="font-semibold text-white">

                    {item.company}

                  </h4>

                  <p className={`text-sm ${item.color}`}>

                    {item.status}

                  </p>

                </div>

                <div className="text-2xl font-bold text-white">

                  {item.score}%

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Tip */}

        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

          <div className="flex gap-4">

            <div className="text-3xl">

              🤖

            </div>

            <div>

              <h3 className="font-semibold text-white">

                AI Recommendation

              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">

                Focus on System Design, Docker and
                Behavioral Questions. Completing two
                mock interviews this week can improve
                your readiness above 90%.

              </p>

            </div>

          </div>

        </div>

        {/* CTA */}

        <Link
          to="/mock-interview"
          className="mt-8 block rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 py-4 text-center font-semibold text-white transition hover:scale-[1.02]"
        >

          Start AI Mock Interview →

        </Link>

      </div>

    </div>

  );

}