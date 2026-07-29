import { useState } from "react";
import { useChat } from "../hooks/useChat";
import DashboardLayout from "../layouts/DashboardLayout";
import AgentPipeline from "../components/common/AgentPipeline";
import ReactMarkdown from "react-markdown";
import { FiSend, FiTrash2, FiZap, FiCpu } from "react-icons/fi";

const starters = [
  "How do I become an AI Engineer as a fresher?",
  "What DSA topics should I focus on for product companies?",
  "How to prepare for system design interviews?",
  "Which certifications are best for cloud in 2025?",
  "How to build a good GitHub profile to impress recruiters?",
  "What are the best projects for a Python developer?",
];

const STATS = [
  { label: "Questions Answered", value: "12,847" },
  { label: "Topics Covered", value: "200+" },
  { label: "Avg Response", value: "1.2s" },
  { label: "Satisfaction", value: "98.4%" },
];

export default function InterviewAI() {
  const { messages, loading, send, clearChat, bottomRef, historyLoaded } = useChat();
  const [input, setInput] = useState("");
  const [showPipeline, setShowPipeline] = useState(true);

  const handleSend = () => { send(input); setInput(""); setShowPipeline(false); };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
                <FiCpu className="text-white text-sm" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">AI Career Mentor</h1>
            </div>
            <p className="text-slate-500 text-sm">Powered by Gemini · Multi-agent pipeline · Chat history saved</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPipeline(v => !v)}
              className={`flex items-center gap-2 text-xs px-3 py-2 rounded-xl border transition-all ${
                showPipeline
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-white border-slate-200 text-slate-500 hover:border-indigo-200"
              }`}
            >
              <FiZap className="text-xs" />
              {showPipeline ? "Hide" : "Show"} Pipeline
            </button>
            <button onClick={() => { clearChat(); setShowPipeline(true); }}
              className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors text-sm border border-slate-200 px-3 py-2 rounded-xl">
              <FiTrash2 /> Clear
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-5">

          {/* LEFT: Pipeline + Stats */}
          <div className="lg:col-span-2 space-y-4">

            {/* Agent Pipeline Visualization */}
            {showPipeline && (
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                  Live Agent Pipeline
                </p>
                <AgentPipeline variant="career" />
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map(({ label, value }) => (
                <div key={label} className="bg-white border border-slate-200 rounded-2xl p-4">
                  <p className="text-xl font-extrabold text-indigo-600">{value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>

            {/* Quick topics */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Topics I can help with</p>
              <div className="space-y-2">
                {[
                  { emoji: ">", topic: "Career Roadmaps" },
                  { emoji: ">", topic: "DSA & Problem Solving" },
                  { emoji: ">", topic: "System Design" },
                  { emoji: ">", topic: "Resume & Projects" },
                  { emoji: ">", topic: "Interview Preparation" },
                  { emoji: ">", topic: "AI/ML Career Path" },
                ].map(({ emoji, topic }) => (
                  <div key={topic} className="flex items-center gap-2 text-sm text-slate-600">
                    <span>{emoji}</span>
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Chat */}
          <div className="lg:col-span-3 flex flex-col" style={{ minHeight: "600px" }}>

            {/* Starter suggestions */}
            {messages.length <= 1 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {starters.map(s => (
                  <button key={s} onClick={() => { send(s); setShowPipeline(false); }}
                    className="text-left text-xs bg-white border border-slate-200 rounded-xl p-3 text-slate-600 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all leading-4">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 space-y-4 mb-4 overflow-y-auto"
              style={{ maxHeight: "440px" }}>
              {!historyLoaded ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "ai" && (
                      <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                        <FiCpu className="text-indigo-600 text-xs" />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                      m.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-50 border border-slate-200 text-slate-800"
                    }`}>
                      {m.role === "ai"
                        ? <div className="prose prose-sm max-w-none"><ReactMarkdown>{m.text}</ReactMarkdown></div>
                        : m.text}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <FiCpu className="text-indigo-600 text-xs" />
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
                className="flex-1 input text-sm"
                placeholder="Ask about DSA, projects, placements, career advice..." />
              <button onClick={handleSend} disabled={loading || !input.trim()}
                className="btn-primary px-4 disabled:opacity-50 flex items-center gap-2">
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}