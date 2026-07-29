import CodeBlock from "./CodeBlock";

export default function PatternTab({ topic }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Master these patterns — they solve 80% of <strong>{topic.name}</strong> interview problems.
      </p>
      {topic.patterns.map((pat, i) => (
        <div key={i} className={`border rounded-2xl overflow-hidden ${pat.border || "border-slate-200"}`}>
          <div className={`flex items-start gap-3 px-4 py-3 ${pat.color || "bg-slate-50"}`}>
            <span className="text-2xl flex-shrink-0">{pat.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <p className={`font-bold ${pat.titleColor || "text-slate-800"}`}>{pat.name}</p>
                <span className="text-xs bg-white/60 px-2 py-0.5 rounded-full font-mono font-semibold text-slate-600">
                  {pat.timeComplexity}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-1">
                <span className="font-semibold">✅ Use when: </span>{pat.when}
              </p>
              {pat.avoid && (
                <p className="text-xs text-slate-500">
                  <span className="font-semibold">❌ Avoid when: </span>{pat.avoid}
                </p>
              )}
            </div>
          </div>
          {pat.steps && (
            <div className="px-4 pt-3 pb-1">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Steps</p>
              <ol className="space-y-1">
                {pat.steps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i+1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="px-4 pb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-3 mb-1">Template Code</p>
            <CodeBlock code={pat.template} />
          </div>
        </div>
      ))}
    </div>
  );
}