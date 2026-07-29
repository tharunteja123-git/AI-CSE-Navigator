import { FiExternalLink, FiStar } from "react-icons/fi";

export default function PracticeTab({ topic }) {
  return (
    <div>
      <p className="text-sm text-slate-500 mb-5">
        Practice <strong>{topic.name}</strong> problems on these platforms.
        Start with <span className="text-indigo-600 font-semibold">LeetCode + Striver's Sheet</span> for placement preparation.
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {topic.practice_links.map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noreferrer"
            className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-sm transition-all group">
            <div className={`w-11 h-11 ${link.color} rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
              {link.platform[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors">{link.platform}</p>
                {link.recommended && <FiStar className="text-yellow-500 text-xs" />}
              </div>
              <p className="text-slate-400 text-xs mt-0.5">{link.problems}</p>
            </div>
            <FiExternalLink className="text-slate-300 group-hover:text-indigo-500 transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}