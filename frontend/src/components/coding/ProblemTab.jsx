import ProblemCard from "./ProblemCard";

export default function ProblemTab({ topic }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-4">
        Click any problem to see all solutions from brute force → optimal.
        Companies that frequently ask each problem are listed.
      </p>
      <div className="space-y-3">
        {topic.problems.map((prob, i) => (
          <ProblemCard key={i} problem={prob} />
        ))}
      </div>
    </div>
  );
}