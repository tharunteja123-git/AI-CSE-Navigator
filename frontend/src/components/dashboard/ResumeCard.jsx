import { Link } from "react-router-dom";

export default function ResumeCard({ assessment }) {

  const atsScore = assessment?.ats_score || 82;

  const missing = assessment?.missing_skills || [
    "Docker",
    "Redis",
    "CI/CD",
    "AWS",
  ];

  const strengths = [
    "Python",
    "FastAPI",
    "React",
    "SQL",
  ];

  const circumference = 2 * Math.PI * 58;
  const offset =
    circumference - (atsScore / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-7">

      {/* Glow */}

      <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="relative z-10">

        <div className="flex items-center justify-between">

          <div>

            <p className="uppercase tracking-widest text-xs text-emerald-300">

              AI Resume

            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">

              ATS Resume Score

            </h2>

          </div>

          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-300">

            AI Powered

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
                fill="none"
                stroke="#1e293b"
                strokeWidth="10"
              />

              <circle
                cx="70"
                cy="70"
                r="58"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />

              <defs>

                <linearGradient
                  id="gradient"
                  x1="0%"
                  x2="100%"
                >

                  <stop
                    offset="0%"
                    stopColor="#06b6d4"
                  />

                  <stop
                    offset="100%"
                    stopColor="#22c55e"
                  />

                </linearGradient>

              </defs>

            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <div className="text-4xl font-bold text-white">

                {atsScore}

              </div>

              <div className="text-sm text-slate-400">

                ATS Score

              </div>

            </div>

          </div>

        </div>

        {/* Strengths */}

        <div className="mt-8">

          <h3 className="font-semibold text-white mb-3">

            ✅ Strong Skills

          </h3>

          <div className="flex flex-wrap gap-2">

            {strengths.map((skill) => (

              <span
                key={skill}
                className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs text-emerald-300"
              >

                {skill}

              </span>

            ))}

          </div>

        </div>

        {/* Missing */}

        <div className="mt-7">

          <h3 className="font-semibold text-white mb-3">

            🚨 Missing Keywords

          </h3>

          <div className="flex flex-wrap gap-2">

            {missing.map((skill) => (

              <span
                key={skill}
                className="rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-xs text-red-300"
              >

                {skill}

              </span>

            ))}

          </div>

        </div>

        {/* Suggestions */}

        <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">

          <div className="flex gap-4">

            <div className="text-3xl">

              🤖

            </div>

            <div>

              <h3 className="font-semibold text-white">

                AI Recommendation

              </h3>

              <p className="text-sm leading-6 text-slate-400 mt-2">

                Add measurable achievements, Docker,
                AWS, Redis, CI/CD and deployment
                experience to improve ATS score above 90%.

              </p>

            </div>

          </div>

        </div>

        {/* Button */}

        <Link
          to="/resume-analyzer"
          className="mt-8 block rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-4 text-center font-semibold text-white transition hover:scale-[1.02]"
        >

          Improve Resume →

        </Link>

      </div>

    </div>
  );
}