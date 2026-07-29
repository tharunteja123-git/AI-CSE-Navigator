import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiExternalLink } from "react-icons/fi";
import ApproachCard from "./ApproachCard";

const diffColor = {
  Easy:   "bg-green-100 text-green-700 border border-green-200",
  Medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Hard:   "bg-red-100 text-red-700 border border-red-200",
};

export default function ProblemCard({ problem }) {
  const [open, setOpen] = useState(false);
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-all">
      {/* Header */}
      <div className="flex items-start gap-3 px-5 py-4 cursor-pointer hover:bg-slate-50"
        onClick={() => setOpen(o => !o)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`badge text-xs ${diffColor[problem.difficulty]}`}>{problem.difficulty}</span>
            <span className="font-bold text-slate-800 text-sm">{problem.name}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {problem.companies.map(c => (
              <span key={c} className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{c}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {problem.platforms.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-xs border border-indigo-200 text-indigo-600 px-2 py-1 rounded-lg hover:bg-indigo-50 flex items-center gap-1 whitespace-nowrap">
              <FiExternalLink className="text-xs" /> {p.name} {p.id}
            </a>
          ))}
          {open ? <FiChevronUp className="text-slate-400 ml-1" /> : <FiChevronDown className="text-slate-400 ml-1" />}
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 px-5 pb-5 bg-white">
          {/* Problem statement */}
          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm font-semibold text-slate-700 mb-1">Problem Statement</p>
            <p className="text-sm text-slate-600 leading-6">{problem.statement}</p>
            <div className="mt-2 p-2.5 bg-white rounded-lg border border-slate-200">
              <p className="text-xs font-mono text-slate-600"><span className="font-bold text-slate-800">Example: </span>{problem.example}</p>
            </div>
            {problem.constraints && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {problem.constraints.map((c, i) => (
                  <span key={i} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">{c}</span>
                ))}
              </div>
            )}
          </div>

          {/* Approaches */}
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              {problem.approaches.length} Solutions — Brute Force → Optimal
            </p>
            <div className="space-y-2">
              {problem.approaches.map((a, i) => <ApproachCard key={i} approach={a} index={i} />)}
            </div>
          </div>

          {/* AI Hints section */}
          {problem.ai && (
            <div className="mt-4">
              <button onClick={() => setShowAI(o => !o)}
                className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                🤖 {showAI ? "Hide" : "Show"} AI Hints & Follow-ups
                {showAI ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {showAI && (
                <div className="mt-3 grid md:grid-cols-3 gap-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <p className="text-xs font-bold text-yellow-700 mb-2">💡 Hints (if stuck)</p>
                    {problem.ai.hints.map((h, i) => (
                      <p key={i} className="text-xs text-yellow-800 mb-1">→ {h}</p>
                    ))}
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-xs font-bold text-green-700 mb-2">🔗 Follow-up Problems</p>
                    {problem.ai.followUps?.map((f, i) => (
                      <p key={i} className="text-xs text-green-800 mb-1">• {f}</p>
                    ))}
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-xs font-bold text-blue-700 mb-2">🎤 Interview Questions</p>
                    {problem.ai.interviewQuestions?.map((q, i) => (
                      <p key={i} className="text-xs text-blue-800 mb-1">Q: {q}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}