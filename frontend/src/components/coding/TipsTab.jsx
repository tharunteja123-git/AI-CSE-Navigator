export default function TipsTab({ topic }) {
  return (
    <div className="space-y-5">
      {topic.interviewTips && (
        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">🎯 Interview Tips</p>
          <div className="space-y-2">
            {topic.interviewTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-green-50 border border-green-100 rounded-xl">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                <p className="text-sm text-slate-700 leading-5">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {topic.mistakes && (
        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">⚠️ Common Mistakes to Avoid</p>
          <div className="space-y-2">
            {topic.mistakes.map((m, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-xl">
                <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                <p className="text-sm text-slate-700 leading-5">{m}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {topic.whyLearn && (
        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">🌍 Real-world Use Cases</p>
          <div className="space-y-2">
            {topic.whyLearn.useCases.map((u, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <span className="text-blue-500 mt-0.5 flex-shrink-0">→</span>
                <p className="text-sm text-slate-700 leading-5">{u}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}