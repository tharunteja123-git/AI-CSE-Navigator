import { pct } from "../../utils/formatters";

const COLORS = [
  "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500",
  "bg-red-500", "bg-pink-500", "bg-cyan-500", "bg-violet-500",
  "bg-teal-500", "bg-indigo-500",
];

export default function ProgressChart({ progress = [] }) {
  const totalSolved = progress.reduce((a, b) => a + b.solved, 0);
  const totalProblems = progress.reduce((a, b) => a + b.total, 0);
  const overall = pct(totalSolved, totalProblems);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800">DSA Progress Overview</h3>
        <div className="text-right">
          <span className="text-2xl font-extrabold text-indigo-600">{totalSolved}</span>
          <span className="text-slate-400 text-sm">/{totalProblems} solved</span>
        </div>
      </div>

      {/* Circular overall score */}
      <div className="flex items-center gap-6 mb-6 p-4 bg-indigo-50 rounded-2xl">
        <div className="relative w-20 h-20 flex-shrink-0">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#E0E7FF" strokeWidth="8" />
            <circle cx="40" cy="40" r="32" fill="none" stroke="#4F46E5" strokeWidth="8"
              strokeDasharray={`${overall * 2.01} 201`}
              strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-extrabold text-indigo-600">{overall}%</span>
          </div>
        </div>
        <div>
          <p className="font-bold text-slate-800">Overall Completion</p>
          <p className="text-slate-500 text-sm mt-0.5">{totalSolved} of {totalProblems} problems solved</p>
          <p className="text-xs text-indigo-600 mt-1 font-medium">
            {overall < 30 ? "🔥 Just getting started!" : overall < 60 ? "📈 Good progress!" : "🏆 Excellent progress!"}
          </p>
        </div>
      </div>

      {/* Per topic bars */}
      <div className="space-y-3">
        {progress.map((item, i) => {
          const p = pct(item.solved, item.total);
          return (
            <div key={item.topic}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-700 font-medium">{item.topic}</span>
                <span className="text-xs text-slate-500">{item.solved}/{item.total} ({p}%)</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-2 ${COLORS[i % COLORS.length]} rounded-full transition-all duration-500`}
                  style={{ width: `${p}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
