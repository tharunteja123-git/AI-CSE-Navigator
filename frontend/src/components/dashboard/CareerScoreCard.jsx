import { scoreColor, scoreBg, scoreLabel } from "../../utils/formatters";

export default function CareerScoreCard({ assessment }) {
  if (!assessment) return null;
  const score = assessment.career_score || 0;

  return (
    <div className="card bg-gradient-to-br from-indigo-600 to-violet-700 text-white overflow-hidden relative">
      <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full" />
      <div className="relative">
        <p className="text-indigo-200 text-sm font-medium mb-3">AI Career Score</p>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-6xl font-extrabold">{score}</span>
          <span className="text-indigo-200 text-lg mb-2">/100</span>
        </div>
        <div className="h-2 bg-white/20 rounded-full mb-4">
          <div className="h-2 bg-white rounded-full transition-all" style={{ width: `${score}%` }} />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-lg">{assessment.recommended_role}</p>
            <p className="text-indigo-200 text-xs mt-0.5">Recommended Role</p>
          </div>
          <div className="bg-white/10 rounded-xl px-3 py-2 text-center">
            <p className="font-bold text-green-300 text-sm">{assessment.salary_range}</p>
            <p className="text-indigo-200 text-xs">Expected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
