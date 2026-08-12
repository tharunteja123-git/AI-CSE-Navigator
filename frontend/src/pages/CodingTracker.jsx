import React, { useState, useMemo } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useCodingProgress } from "../hooks/useCodingProgress";
import { pct } from "../utils/formatters";
import TopicCard from "../components/coding/TopicCard";
import TOPICS from "../data/coding";
import {
  FiSearch, FiZap, FiCheckCircle, FiAward,
  FiGrid, FiList, FiTrendingUp, FiLayers, FiFilter,
  FiLock, FiThumbsUp, FiCheck, FiArrowUpRight, FiTarget,
  FiBookOpen, FiCode, FiActivity
} from "react-icons/fi";

const UPCOMING_TOPICS = [
  { name: "Trees & Binary Search Trees", category: "Data Structures", icon: "🌳", diff: "Medium", votes: 342 },
  { name: "Graphs & Graph Algorithms", category: "Data Structures", icon: "🕸️", diff: "Hard", votes: 419 },
  { name: "Dynamic Programming (DP)", category: "Algorithms", icon: "⚡", diff: "Hard", votes: 580 },
  { name: "Stacks & Queues", category: "Data Structures", icon: "📚", diff: "Easy", votes: 210 },
  { name: "Heaps & Priority Queues", category: "Data Structures", icon: "🔺", diff: "Medium", votes: 195 },
  { name: "Binary Search Patterns", category: "Algorithms", icon: "🔍", diff: "Medium", votes: 310 },
  { name: "Recursion & Backtracking", category: "Algorithms", icon: "🔄", diff: "Hard", votes: 275 },
  { name: "Hashing & Hash Tables", category: "Data Structures", icon: "🔑", diff: "Easy", votes: 180 },
  { name: "Greedy Algorithms", category: "Algorithms", icon: "💡", diff: "Medium", votes: 225 },
  { name: "Tries & Prefix Trees", category: "Data Structures", icon: "🌲", diff: "Hard", votes: 165 },
  { name: "Bit Manipulation", category: "Core CS", icon: "🔢", diff: "Medium", votes: 140 },
  { name: "System Design Fundamentals", category: "System Design", icon: "🏗️", diff: "Advanced", votes: 620 },
  { name: "SQL & Database Indexing", category: "Core CS", icon: "🗄️", diff: "Medium", votes: 290 },
  { name: "OS & Concurrency Concepts", category: "Core CS", icon: "⚙️", diff: "Advanced", votes: 215 },
];

export default function CodingTracker() {
  const { progress, loading, update, totalSolved, totalProblems } = useCodingProgress();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all' | 'in_progress' | 'completed' | 'not_started'
  const [upvoted, setUpvoted] = useState({});

  const overall = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

  const getSolved = (name) => {
    const found = progress.find(p => p.topic === name);
    return found ? found.solved : 0;
  };

  // Derived Statistics
  const masteredCount = useMemo(() => {
    return TOPICS.filter(t => {
      const s = getSolved(t.name);
      const total = t.problems?.length || t.totalProblems || 10;
      return s > 0 && s >= total;
    }).length;
  }, [TOPICS, progress]);

  const inProgressCount = useMemo(() => {
    return TOPICS.filter(t => {
      const s = getSolved(t.name);
      const total = t.problems?.length || t.totalProblems || 10;
      return s > 0 && s < total;
    }).length;
  }, [TOPICS, progress]);

  const notStartedCount = TOPICS.length - (masteredCount + inProgressCount);

  // Filtered Topics
  const filteredTopics = useMemo(() => {
    return TOPICS.filter(t => {
      const solved = getSolved(t.name);
      const total = t.problems?.length || t.totalProblems || 10;
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      if (filterStatus === "completed") return solved >= total && total > 0;
      if (filterStatus === "in_progress") return solved > 0 && solved < total;
      if (filterStatus === "not_started") return solved === 0;
      return true;
    });
  }, [TOPICS, progress, searchTerm, filterStatus]);

  const handleUpvote = (topicName) => {
    setUpvoted(prev => ({
      ...prev,
      [topicName]: !prev[topicName]
    }));
  };

  // Rank Badge logic
  const getRankBadge = (pctVal) => {
    if (pctVal >= 90) return { label: "Diamond DSA Master", color: "from-cyan-400 to-blue-500", text: "text-cyan-400", border: "border-cyan-500/30" };
    if (pctVal >= 60) return { label: "Gold Problem Solver", color: "from-amber-400 to-yellow-500", text: "text-amber-400", border: "border-amber-500/30" };
    if (pctVal >= 30) return { label: "Silver Algorithmist", color: "from-slate-300 to-slate-400", text: "text-slate-300", border: "border-slate-400/30" };
    return { label: "Bronze Explorer", color: "from-orange-400 to-amber-600", text: "text-orange-400", border: "border-orange-500/30" };
  };

  const rank = getRankBadge(overall);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-2 pb-16 font-sans text-slate-100">

        {/* ══ 1. HERO HEADER ═══════════════════════════════════════════════ */}
        <div className="relative mb-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-[#0d1117]/95 to-indigo-950/40 p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Ambient Glowing Background Accents */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <FiCode className="text-sm" /> DSA Mastery Engine
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <FiZap className="text-amber-400 animate-pulse" /> 🔥 7-Day Streak Active
                </span>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-800/80 border ${rank.border} ${rank.text} text-xs font-bold`}>
                  <FiAward className="text-sm" /> {rank.label}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                DSA Mastery Hub <span className="text-2xl">✨</span>
              </h1>
              <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
                Structured patterns, multi-language solutions, interactive quizzes, and hand-picked practice problems to crack top tech interviews.
              </p>
            </div>

            {/* Target Card Widget */}
            <div className="flex-shrink-0 bg-white/[0.03] border border-white/10 rounded-2xl p-4 md:w-64 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <FiTarget className="text-indigo-400" /> Daily Target
                </span>
                <span className="text-emerald-400 font-bold font-mono">2 / 3 Solved</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: "66%" }} />
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Solve 1 more problem today to maintain your daily streak!
              </p>
            </div>
          </div>
        </div>

        {/* ══ 2. SAAS KPI STAT CARDS ═══════════════════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Solved Card */}
          <div className="relative group rounded-2xl border border-white/10 bg-[#0d1117]/80 hover:bg-[#161b22] p-5 transition-all duration-300 shadow-lg hover:border-indigo-500/40">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Problems Solved</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                <FiCheckCircle className="text-base" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white tabular-nums">{totalSolved}</span>
              <span className="text-xs text-slate-500 font-medium">/ {totalProblems} total</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <FiTrendingUp className="text-xs" /> +4 solved this week
            </div>
          </div>

          {/* Completion Rate Card */}
          <div className="relative group rounded-2xl border border-white/10 bg-[#0d1117]/80 hover:bg-[#161b22] p-5 transition-all duration-300 shadow-lg hover:border-emerald-500/40">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Completion</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <FiActivity className="text-base" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400 tabular-nums">{overall}%</span>
              <span className="text-xs text-slate-500 font-medium">overall</span>
            </div>
            <div className="mt-3 text-xs text-slate-400 truncate">
              {overall >= 80 ? "🏆 Interview Ready!" : overall >= 50 ? "🚀 High Momentum" : "🔥 Keep Pushing"}
            </div>
          </div>

          {/* Mastered Topics Card */}
          <div className="relative group rounded-2xl border border-white/10 bg-[#0d1117]/80 hover:bg-[#161b22] p-5 transition-all duration-300 shadow-lg hover:border-purple-500/40">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Mastered Topics</span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <FiAward className="text-base" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-purple-300 tabular-nums">{masteredCount}</span>
              <span className="text-xs text-slate-500 font-medium">/ {TOPICS.length} topics</span>
            </div>
            <div className="mt-3 text-xs text-purple-400/80 font-medium">
              {inProgressCount} topics in progress
            </div>
          </div>

          {/* Available Modules Card */}
          <div className="relative group rounded-2xl border border-white/10 bg-[#0d1117]/80 hover:bg-[#161b22] p-5 transition-all duration-300 shadow-lg hover:border-amber-500/40">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Available Modules</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <FiLayers className="text-base" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-400 tabular-nums">{TOPICS.length}</span>
              <span className="text-xs text-slate-500 font-medium">+14 roadmap</span>
            </div>
            <div className="mt-3 text-xs text-amber-400/80 font-medium">
              Complete DSA Coverage
            </div>
          </div>
        </div>

        {/* ══ 3. OVERALL PROGRESS CARD ═════════════════════════════════════ */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0d1117] via-[#161b22] to-[#0d1117] p-6 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FiBookOpen className="text-indigo-400" /> Overall DSA Progress Curve
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Track your overall problem-solving coverage across all modules</p>
            </div>
            <span className="text-sm font-extrabold font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/20 self-start sm:self-auto">
              {totalSolved} / {totalProblems} Solved ({overall}%)
            </span>
          </div>

          {/* Progress Bar Container */}
          <div className="relative h-4 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/5 mb-3">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-1000 shadow-md shadow-indigo-500/30"
              style={{ width: `${Math.max(overall, 2)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              {overall < 20 ? "🌱 Beginners Phase: Focus on basic data structures first." :
               overall < 50 ? "🚀 Intermediary Phase: Mastering patterns and time complexity." :
               overall < 80 ? "⚡ Advanced Phase: Solving hard problems and edge cases." :
                              "👑 Expert Phase: Interview ready for Tier 1 tech firms!"}
            </span>
            <span className="text-indigo-400 font-semibold flex items-center gap-1">
              Next Milestone: {overall < 30 ? "Silver (30%)" : overall < 60 ? "Gold (60%)" : "Diamond (90%)"}
            </span>
          </div>
        </div>

        {/* ══ 4. SEARCH & FILTER CONTROLS ══════════════════════════════════ */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search topics by pattern, array, string..."
              className="w-full bg-[#0d1117] border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs bg-slate-800 px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-[#0d1117] border border-white/10 rounded-xl overflow-x-auto">
            {[
              { id: "all", label: `All (${TOPICS.length})` },
              { id: "in_progress", label: `In Progress (${inProgressCount})` },
              { id: "completed", label: `Mastered (${masteredCount})` },
              { id: "not_started", label: `Unstarted (${notStartedCount})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  filterStatus === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══ 5. TOPIC CARDS SECTION ═══════════════════════════════════════ */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#0d1117]/50 rounded-2xl border border-white/5">
            <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
            <p className="text-slate-400 text-sm font-medium">Syncing your DSA progress...</p>
          </div>
        ) : filteredTopics.length > 0 ? (
          <div className="space-y-4 mb-12">
            {filteredTopics.map(topic => (
              <TopicCard
                key={topic.name}
                topic={topic}
                solved={getSolved(topic.name)}
                onUpdate={update}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0d1117]/50 rounded-2xl border border-white/5 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto mb-3 text-xl">
              <FiFilter />
            </div>
            <h4 className="text-slate-200 font-bold text-base">No matching topics found</h4>
            <p className="text-slate-500 text-xs mt-1">Try adjusting your search terms or filter tabs</p>
            <button
              onClick={() => { setSearchTerm(""); setFilterStatus("all"); }}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ══ 6. ROADMAP & UPCOMING TOPICS GRID ════════════════════════════ */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0d1117] to-[#161b22] p-6 md:p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold mb-2">
                <FiLock className="text-xs" /> Upcoming Modules
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">DSA & System Design Roadmap</h2>
              <p className="text-slate-400 text-xs mt-1">
                Vote on upcoming topics to prioritize their release in your mastery workspace.
              </p>
            </div>
            <div className="text-xs text-slate-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-white/5 self-start md:self-auto">
              🚧 <span className="text-slate-200 font-semibold">14 Modules</span> in active development
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {UPCOMING_TOPICS.map(item => {
              const hasVoted = upvoted[item.name];
              return (
                <div
                  key={item.name}
                  className="group relative rounded-2xl border border-white/5 bg-slate-900/60 hover:bg-slate-900 hover:border-white/15 p-4 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5">
                          {item.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          item.diff === "Hard" ? "bg-red-500/15 text-red-400 border border-red-500/20" :
                          item.diff === "Advanced" ? "bg-purple-500/15 text-purple-400 border border-purple-500/20" :
                          item.diff === "Medium" ? "bg-amber-500/15 text-amber-400 border border-amber-500/20" :
                          "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                        }`}>
                          {item.diff}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{item.name}</h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-mono">
                      {(item.votes + (hasVoted ? 1 : 0)).toLocaleString()} votes
                    </span>
                    <button
                      onClick={() => handleUpvote(item.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        hasVoted
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/30"
                          : "bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5"
                      }`}
                    >
                      <FiThumbsUp className={`text-xs ${hasVoted ? "fill-white" : ""}`} />
                      {hasVoted ? "Voted" : "Upvote"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}