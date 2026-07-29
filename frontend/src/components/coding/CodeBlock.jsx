import { useState } from "react";
import { FiCode, FiCheck } from "react-icons/fi";
export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative mt-3 group">
      <button onClick={copy}
        className="absolute top-2 right-2 z-10 text-xs px-2.5 py-1 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {copied ? <><FiCheck className="text-green-400" /> Copied!</> : <><FiCode /> Copy</>}
      </button>
      <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 text-xs overflow-x-auto leading-5 font-mono border border-slate-700">
        <code>{code}</code>
      </pre>
    </div>
  );
}












