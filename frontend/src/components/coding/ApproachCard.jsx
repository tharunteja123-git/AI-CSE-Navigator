import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CodeBlock from "./CodeBlock";

export default function ApproachCard({ approach, index }) {
  const [open, setOpen] = useState(index === 0);

  const tagStyle =
    approach.tag === "OPTIMAL"   ? "bg-green-500 text-white" :
    approach.tag === "Forbidden" ? "bg-red-500 text-white" :
    approach.tag === "Pythonic"  ? "bg-blue-500 text-white" :
                                   "bg-slate-200 text-slate-600";

  return (
    <div className={`rounded-xl border overflow-hidden transition-all ${
      approach.tag === "OPTIMAL" ? "border-green-300" : "border-slate-200"
    }`}>
      <button onClick={() => setOpen(o => !o)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
          open
            ? approach.tag === "OPTIMAL" ? "bg-green-50" : "bg-indigo-50"
            : "bg-white hover:bg-slate-50"
        }`}>
        <span className="text-xl flex-shrink-0">{approach.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-800 text-sm">{approach.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${tagStyle}`}>
              {approach.tag}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{approach.complexity}</p>
        </div>
        {open ? <FiChevronUp className="text-slate-400 flex-shrink-0" /> : <FiChevronDown className="text-slate-400 flex-shrink-0" />}
      </button>

      {open && (
        <div className="px-4 pb-4 bg-white border-t border-slate-100">
          <div className="mt-3 grid md:grid-cols-2 gap-3">
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
              <p className="text-xs font-bold text-amber-700 mb-1">💡 Core Idea</p>
              <p className="text-sm text-amber-800 leading-5">{approach.idea}</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
              <p className="text-xs font-bold text-slate-500 mb-1">📌 When to use</p>
              <p className="text-sm text-slate-600 leading-5">{approach.when}</p>
            </div>
          </div>
          <CodeBlock code={approach.code} />

          {approach.tag === "OPTIMAL" && (
            <div className="mt-2 flex items-center gap-2 text-xs text-green-600 font-semibold">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              This is the expected interview answer
            </div>
          )}
        </div>
      )}
    </div>
  );
}