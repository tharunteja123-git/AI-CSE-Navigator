import { useState } from "react";
import CodeBlock from "./CodeBlock";

export default function LanguageTab({ topic }) {
  const [idx, setIdx] = useState(0);
  const lang = topic.languages[idx];

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {topic.languages.map((l, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              idx === i ? "bg-indigo-600 text-white shadow-sm" : `${l.color} hover:opacity-80`
            }`}>
            {l.emoji} {l.lang}
          </button>
        ))}
      </div>
      {lang && (
        <div>
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${lang.color} mb-3`}>
            <span className="text-lg">{lang.emoji}</span>
            <span className="font-bold text-sm">{lang.lang} — Complete Reference</span>
          </div>
          <CodeBlock code={lang.syntax} />
        </div>
      )}
    </div>
  );
}