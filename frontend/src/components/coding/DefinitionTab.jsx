/*export default function DefinitionTab({ topic }) {
  const { definition, text, light, border } = topic;
  return (
    <div className="space-y-5">
      <div className={`p-4 ${light} border ${border} rounded-2xl`}>
        <p className={`text-xs font-bold mb-2 ${text}`}>DEFINITION</p>
        <p className="text-slate-800 font-medium leading-7">{definition.short}</p>
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
        <p className="text-xs font-bold text-amber-700 mb-2">🎯 SIMPLE ANALOGY</p>
        <p className="text-amber-800 leading-6">{definition.analogy}</p>
      </div>

      <div>
        <p className="text-sm font-bold text-slate-700 mb-3">⭐ Key Properties</p>
        <div className="space-y-2">
          {definition.properties.map((pt, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-xl">
              <span className={`w-6 h-6 rounded-full ${light} ${text} border ${border} flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}>{i + 1}</span>
              <p className="text-sm text-slate-700 leading-5">{pt}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-slate-700 mb-3">⏱ Time & Space Complexity</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left p-3 border-b border-slate-200 text-slate-600 font-semibold">Operation</th>
                <th className="text-left p-3 border-b border-slate-200 text-slate-600 font-semibold">Time</th>
                <th className="text-left p-3 border-b border-slate-200 text-slate-600 font-semibold">Space</th>
              </tr>
            </thead>
            <tbody>
              {definition.complexity.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="p-3 border-b border-slate-100 text-slate-700 font-medium">{row.op}</td>
                  <td className="p-3 border-b border-slate-100">
                    <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      row.time.includes("(1)") ? "bg-green-100 text-green-700" :
                      row.time.includes("log") ? "bg-blue-100 text-blue-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>{row.time}</span>
                  </td>
                  <td className="p-3 border-b border-slate-100">
                    <span className="font-mono text-xs font-bold text-slate-500">{row.space}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}*/


export default function DefinitionTab({ topic }) {
  const { text, light, border } = topic;

  // Support both old and new topic structures
  const definition = topic.definition || {};

  const short =
    definition.short ||
    definition ||
    topic.concept?.intro ||
    "Definition not available.";

  const analogy =
    definition.analogy ||
    topic.intuition ||
    topic.concept?.whyItWorks ||
    "No analogy available.";

  const properties =
    definition.properties ||
    topic.properties ||
    [];

  const complexity =
    Array.isArray(definition.complexity)
      ? definition.complexity
      : topic.complexity
      ? Object.entries(topic.complexity).map(([op, value]) => ({
          op: op.charAt(0).toUpperCase() + op.slice(1),
          time: value,
          space:
            op.toLowerCase() === "space"
              ? value
              : topic.complexity.space || "-"
        }))
      : [];

  return (
    <div className="space-y-5">

      {/* Definition */}
      <div className={`p-4 ${light} border ${border} rounded-2xl`}>
        <p className={`text-xs font-bold mb-2 ${text}`}>DEFINITION</p>
        <p className="text-slate-800 font-medium leading-7">
          {short}
        </p>
      </div>

      {/* Analogy */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl">
        <p className="text-xs font-bold text-amber-700 mb-2">
          🎯 SIMPLE ANALOGY
        </p>
        <p className="text-amber-800 leading-6">
          {analogy}
        </p>
      </div>

      {/* Properties */}
      {properties.length > 0 && (
        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">
            ⭐ Key Properties
          </p>

          <div className="space-y-2">
            {properties.map((pt, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-white border border-slate-100 rounded-xl"
              >
                <span
                  className={`w-6 h-6 rounded-full ${light} ${text} border ${border} flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5`}
                >
                  {i + 1}
                </span>

                <p className="text-sm text-slate-700 leading-5">
                  {pt}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Complexity */}
      {complexity.length > 0 && (
        <div>
          <p className="text-sm font-bold text-slate-700 mb-3">
            ⏱ Time & Space Complexity
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3">Operation</th>
                  <th className="text-left p-3">Time</th>
                  <th className="text-left p-3">Space</th>
                </tr>
              </thead>

              <tbody>
                {complexity.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
                  >
                    <td className="p-3">{row.op}</td>

                    <td className="p-3">
                      <span className="font-mono font-bold">
                        {row.time}
                      </span>
                    </td>

                    <td className="p-3">
                      <span className="font-mono">
                        {row.space}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}

    </div>
  );
}