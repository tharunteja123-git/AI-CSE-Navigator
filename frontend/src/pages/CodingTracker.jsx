import DashboardLayout from "../layouts/DashboardLayout";
import { useCodingProgress } from "../hooks/useCodingProgress";
import { pct } from "../utils/formatters";
import TopicCard from "../components/coding/TopicCard";
import TOPICS from "../data/coding";

export default function CodingTracker() {
  const { progress, loading, update, totalSolved, totalProblems } = useCodingProgress();
  const overall = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const getSolved = (name) => {
    const found = progress.find(p => p.topic === name);
    return found ? found.solved : 0;
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">💻 DSA Mastery Hub</h1>
          <p className="text-slate-500 text-sm mt-1">
            Definition → All languages → Patterns → Problems with every solution → Quiz → Practice links
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          <div className="card text-center py-3">
            <div className="text-2xl font-extrabold text-indigo-600">{totalSolved}</div>
            <div className="text-slate-400 text-xs mt-0.5">Solved</div>
          </div>
          <div className="card text-center py-3">
            <div className="text-2xl font-extrabold text-slate-700">{totalProblems}</div>
            <div className="text-slate-400 text-xs mt-0.5">Total</div>
          </div>
          <div className="card text-center py-3">
            <div className="text-2xl font-extrabold text-green-600">{overall}%</div>
            <div className="text-slate-400 text-xs mt-0.5">Done</div>
          </div>
          <div className="card text-center py-3">
            <div className="text-2xl font-extrabold text-orange-500">{TOPICS.length}</div>
            <div className="text-slate-400 text-xs mt-0.5">Topics</div>
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="card mb-6 py-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-semibold text-slate-700">Overall DSA Progress</span>
            <span className="text-slate-500">{totalSolved}/{totalProblems} problems</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-3 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-700"
              style={{ width: `${overall}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {overall < 20 ? "🔥 Just starting — pick a topic and dive in!" :
             overall < 50 ? "📈 Good momentum — stay consistent every day!" :
             overall < 80 ? "🚀 More than halfway — you're crushing it!" :
                            "🏆 Near complete — interview ready!"}
          </p>
        </div>

        {/* Topic Cards */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {TOPICS.map(topic => (
              <TopicCard
                key={topic.name}
                topic={topic}
                solved={getSolved(topic.name)}
                onUpdate={update}
              />
            ))}

            {/* Coming Soon Card */}
            <div className="card border-dashed border-2 border-slate-200 text-center py-10">
              <div className="text-4xl mb-3">🚧</div>
              <p className="font-bold text-slate-700 text-lg">More Topics Coming Soon</p>
              <p className="text-slate-400 text-sm mt-1 mb-4">
                Each topic built with the same depth — definition, all languages, patterns, problems with multiple solutions, quiz, and practice links
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Trees & BST", "Graphs", "Dynamic Programming",
                  "Stacks", "Queues", "Heaps", "Binary Search",
                  "Recursion", "Backtracking", "Hashing",
                  "Greedy", "Tries", "Bit Manipulation",
                  "System Design", "SQL", "OS Concepts",
                ].map(t => (
                  <span key={t} className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
