import { useState } from "react";

export default function QuizTab({ topic }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const score = Object.keys(submitted).filter(i => answers[i] === topic.quiz[i].answer).length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-slate-700">Test your {topic.name} knowledge</p>
        {Object.keys(submitted).length > 0 && (
          <span className="badge bg-indigo-100 text-indigo-700 font-bold">
            Score: {score}/{topic.quiz.length}
          </span>
        )}
      </div>

      {topic.quiz.map((q, qi) => (
        <div key={qi} className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800">Q{qi + 1}. {q.q}</p>
          </div>
          <div className="p-4 space-y-2">
            {q.options.map((opt, oi) => {
              const chosen = answers[qi] === oi;
              const isSubmitted = submitted[qi] !== undefined;
              const isCorrect = oi === q.answer;
              let style = "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50";
              if (isSubmitted) {
                if (isCorrect) style = "bg-green-50 border-green-400 text-green-800";
                else if (chosen) style = "bg-red-50 border-red-400 text-red-800";
                else style = "bg-white border-slate-200 text-slate-400";
              } else if (chosen) {
                style = "bg-indigo-50 border-indigo-400 text-indigo-800";
              }
              return (
                <button key={oi} disabled={isSubmitted}
                  onClick={() => setAnswers(a => ({ ...a, [qi]: oi }))}
                  className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${style}`}>
                  <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}.</span> {opt}
                  {isSubmitted && isCorrect && <span className="ml-2 text-green-600">✓</span>}
                  {isSubmitted && chosen && !isCorrect && <span className="ml-2 text-red-500">✗</span>}
                </button>
              );
            })}
          </div>
          {answers[qi] !== undefined && !submitted[qi] && (
            <div className="px-4 pb-4">
              <button onClick={() => setSubmitted(s => ({ ...s, [qi]: true }))}
                className="btn-primary text-sm py-2 px-4">
                Submit Answer
              </button>
            </div>
          )}
          {submitted[qi] && (
            <div className="mx-4 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xs font-bold text-blue-700 mb-1">💡 Explanation</p>
              <p className="text-xs text-blue-800 leading-5">{q.explanation}</p>
            </div>
          )}
        </div>
      ))}

      {Object.keys(submitted).length === topic.quiz.length && (
        <div className={`p-5 rounded-2xl text-center ${score === topic.quiz.length ? "bg-green-50 border border-green-300" : "bg-indigo-50 border border-indigo-200"}`}>
          <p className="text-2xl font-extrabold mb-1">
            {score === topic.quiz.length ? "🏆 Perfect Score!" : `${score}/${topic.quiz.length} Correct`}
          </p>
          <p className="text-sm text-slate-600">
            {score === topic.quiz.length ? "Excellent! You mastered this topic." :
             score >= topic.quiz.length / 2 ? "Good job! Review the explanations above." :
             "Keep practicing! Review the concept and try again."}
          </p>
          <button onClick={() => { setAnswers({}); setSubmitted({}); }}
            className="btn-outline mt-3 text-sm py-2">Retry Quiz</button>
        </div>
      )}
    </div>
  );
}