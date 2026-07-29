import { scoreColor, scoreLabel } from "../../utils/formatters";

export default function ScoreBadge({ score, size = "md" }) {
  const sizes = { sm: "text-lg", md: "text-3xl", lg: "text-5xl" };
  return (
    <div className="flex flex-col items-center">
      <span className={`font-extrabold ${sizes[size]} ${scoreColor(score)}`}>{score}</span>
      <span className={`text-xs font-semibold mt-0.5 ${scoreColor(score)}`}>{scoreLabel(score)}</span>
    </div>
  );
}
