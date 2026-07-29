import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiBookOpen, FiGlobe, FiCpu, FiLayers, FiStar, FiExternalLink, FiHelpCircle } from "react-icons/fi";
import { pct } from "../../utils/formatters";
import DefinitionTab from "./DefinitionTab";
import LanguageTab from "./LanguageTab";
import PatternTab from "./PatternTab";
import ProblemTab from "./ProblemTab";
import TipsTab from "./TipsTab";
import QuizTab from "./QuizTab";
import PracticeTab from "./PracticeTab";

const TABS = [
  { id: "definition", label: "📖 Definition",  icon: <FiBookOpen /> },
  { id: "languages",  label: "💻 Languages",   icon: <FiGlobe /> },
  { id: "patterns",   label: "⚡ Patterns",    icon: <FiCpu /> },
  { id: "problems",   label: "🧩 Problems",    icon: <FiLayers /> },
  { id: "tips",       label: "🎯 Tips",        icon: <FiStar /> },
  { id: "quiz",       label: "🧠 Quiz",        icon: <FiHelpCircle /> },
  { id: "practice",   label: "🌐 Practice",    icon: <FiExternalLink /> },
];

export default function TopicCard({ topic, solved, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("definition");
  const p = pct(solved, topic.total);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* ── Header ── */}
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <div className={`w-12 h-12 rounded-2xl ${topic.light} flex items-center justify-center text-2xl border ${topic.border} flex-shrink-0`}>
          {topic.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-900 text-base">{topic.name}</span>
            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => onUpdate(topic.name, Math.max(0, solved - 1), topic.total)}
                className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded-full font-bold text-slate-600 flex items-center justify-center text-base transition-colors">
                −
              </button>
              <span className="text-sm font-bold text-slate-700 w-14 text-center">
                {solved}/{topic.total}
              </span>
              <button
                onClick={() => onUpdate(topic.name, Math.min(topic.total, solved + 1), topic.total)}
                className="w-7 h-7 bg-indigo-100 hover:bg-indigo-200 rounded-full font-bold text-indigo-600 flex items-center justify-center text-base transition-colors">
                +
              </button>
              <span className={`text-sm font-bold ml-1 w-10 text-right ${topic.text}`}>{p}%</span>
            </div>
          </div>

          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-2 ${topic.color} rounded-full transition-all duration-500`}
              style={{ width: `${p}%` }}
            />
          </div>

          <p className="text-xs text-slate-400 mt-1.5 truncate">
            {topic.definition?.short?.slice(0, 95)}...
          </p>
        </div>

        <div className="ml-2 flex-shrink-0">
          {open
            ? <FiChevronUp className="text-slate-400 text-lg" />
            : <FiChevronDown className="text-slate-400 text-lg" />}
        </div>
      </div>

      {/* ── Expanded Content ── */}
      {open && (
        <div className="border-t border-slate-100">
          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-slate-100 bg-slate-50 scrollbar-hide">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                  tab === t.id
                    ? `${topic.text} border-b-2 border-current bg-white`
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}>
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
                <span className="sm:hidden">{t.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-5">
            {tab === "definition" && <DefinitionTab topic={topic} />}
            {tab === "languages"  && <LanguageTab  topic={topic} />}
            {tab === "patterns"   && <PatternTab   topic={topic} />}
            {tab === "problems"   && <ProblemTab   topic={topic} />}
            {tab === "tips"       && <TipsTab      topic={topic} />}
            {tab === "quiz"       && topic.quiz && <QuizTab topic={topic} />}
            {tab === "practice"   && <PracticeTab  topic={topic} />}
          </div>
        </div>
      )}
    </div>
  );
}

