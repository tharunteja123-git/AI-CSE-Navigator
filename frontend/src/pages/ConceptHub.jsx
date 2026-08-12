import { useState, useRef, useEffect, useCallback } from "react";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import {
  FiSearch, FiZap, FiSend, FiRefreshCw, FiBookOpen,
  FiCode, FiCpu, FiDatabase, FiGlobe, FiLayers, FiBox,
  FiStar, FiClock, FiCheck, FiChevronRight, FiChevronDown,
  FiX, FiMic, FiVolume2, FiThumbsUp, FiThumbsDown,
  FiCopy, FiMaximize2, FiMinimize2, FiGrid, FiList,
  FiArrowRight, FiCornerDownLeft, FiHash, FiAward,
  FiTrendingUp, FiTarget, FiPlayCircle, FiPause,
} from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────
// CONCEPT DATABASE — rich, deep, real
// ─────────────────────────────────────────────────────────────────
const SUBJECTS = [
  {
    id: "python",        label: "Python",                emoji: "🐍",
    color: "indigo",    accent: "#6366f1",
    desc: "Most popular language for AI, ML, backend & automation",
    topics: [
      { id:"variables",       label:"Variables & Data Types",       difficulty:"Beginner" },
      { id:"control_flow",    label:"Control Flow (if/for/while)",  difficulty:"Beginner" },
      { id:"functions",       label:"Functions & Scope",            difficulty:"Beginner" },
      { id:"lists_dicts",     label:"Lists, Dicts, Sets, Tuples",   difficulty:"Beginner" },
      { id:"oop",             label:"OOP — Classes & Objects",      difficulty:"Intermediate" },
      { id:"inheritance",     label:"Inheritance & Polymorphism",   difficulty:"Intermediate" },
      { id:"decorators",      label:"Decorators",                   difficulty:"Intermediate" },
      { id:"generators",      label:"Generators & Iterators",       difficulty:"Intermediate" },
      { id:"file_io",         label:"File I/O & Exception Handling",difficulty:"Intermediate" },
      { id:"comprehensions",  label:"List & Dict Comprehensions",   difficulty:"Intermediate" },
      { id:"async_await",     label:"Async / Await & asyncio",      difficulty:"Advanced" },
      { id:"type_hints",      label:"Type Hints & Dataclasses",     difficulty:"Advanced" },
      { id:"metaclasses",     label:"Metaclasses & __dunder__",     difficulty:"Advanced" },
      { id:"memory_mgmt",     label:"Memory Management & GIL",      difficulty:"Advanced" },
    ],
  },
  {
    id: "dsa",           label: "Data Structures & Algorithms", emoji: "🧩",
    color: "violet",    accent: "#8b5cf6",
    desc: "Core of every technical interview. Master these to crack any company.",
    topics: [
      { id:"arrays",          label:"Arrays & Strings",             difficulty:"Beginner" },
      { id:"linked_lists",    label:"Linked Lists",                 difficulty:"Beginner" },
      { id:"stacks_queues",   label:"Stacks & Queues",              difficulty:"Beginner" },
      { id:"hash_maps",       label:"Hash Maps & Hash Sets",        difficulty:"Beginner" },
      { id:"binary_search",   label:"Binary Search",                difficulty:"Intermediate" },
      { id:"sorting",         label:"Sorting Algorithms",           difficulty:"Intermediate" },
      { id:"trees",           label:"Binary Trees & BST",           difficulty:"Intermediate" },
      { id:"heaps",           label:"Heaps & Priority Queues",      difficulty:"Intermediate" },
      { id:"graphs",          label:"Graphs — BFS & DFS",           difficulty:"Intermediate" },
      { id:"sliding_window",  label:"Sliding Window Pattern",       difficulty:"Intermediate" },
      { id:"two_pointers",    label:"Two Pointers Pattern",         difficulty:"Intermediate" },
      { id:"dynamic_prog",    label:"Dynamic Programming",          difficulty:"Advanced" },
      { id:"backtracking",    label:"Backtracking",                 difficulty:"Advanced" },
      { id:"trie",            label:"Trie",                         difficulty:"Advanced" },
      { id:"segment_tree",    label:"Segment Tree",                 difficulty:"Advanced" },
    ],
  },
  {
    id: "dbms",          label: "DBMS & SQL",                   emoji: "🗄️",
    color: "emerald",   accent: "#10b981",
    desc: "Database design, SQL mastery, indexing & transactions",
    topics: [
      { id:"sql_basics",      label:"SQL Basics — SELECT, WHERE",   difficulty:"Beginner" },
      { id:"joins",           label:"SQL Joins — INNER, LEFT, FULL",difficulty:"Beginner" },
      { id:"aggregation",     label:"GROUP BY, HAVING, Aggregates", difficulty:"Beginner" },
      { id:"subqueries",      label:"Subqueries & CTEs",            difficulty:"Intermediate" },
      { id:"window_fns",      label:"Window Functions",             difficulty:"Intermediate" },
      { id:"normalization",   label:"Normalization (1NF–3NF+BCNF)", difficulty:"Intermediate" },
      { id:"indexing",        label:"Indexing & Query Optimization", difficulty:"Intermediate" },
      { id:"transactions",    label:"Transactions & ACID",          difficulty:"Intermediate" },
      { id:"er_diagrams",     label:"ER Diagrams & Schema Design",  difficulty:"Intermediate" },
      { id:"nosql",           label:"NoSQL vs SQL — When to Use",   difficulty:"Advanced" },
      { id:"concurrency",     label:"Concurrency & Locking",        difficulty:"Advanced" },
    ],
  },
  {
    id: "os",            label: "Operating Systems",            emoji: "🖥️",
    color: "orange",    accent: "#f59e0b",
    desc: "Processes, memory, scheduling, deadlocks — asked at every FAANG interview",
    topics: [
      { id:"processes",       label:"Processes & Threads",          difficulty:"Beginner" },
      { id:"scheduling",      label:"CPU Scheduling Algorithms",    difficulty:"Intermediate" },
      { id:"deadlocks",       label:"Deadlocks — Conditions & Prevention", difficulty:"Intermediate" },
      { id:"memory_mgmt_os",  label:"Memory Management & Paging",  difficulty:"Intermediate" },
      { id:"virtual_mem",     label:"Virtual Memory & Page Faults", difficulty:"Intermediate" },
      { id:"ipc",             label:"IPC — Pipes, Signals, Sockets",difficulty:"Intermediate" },
      { id:"semaphores",      label:"Semaphores & Mutex",           difficulty:"Intermediate" },
      { id:"file_systems",    label:"File Systems & Disk Scheduling",difficulty:"Advanced" },
    ],
  },
  {
    id: "cn",            label: "Computer Networks",            emoji: "🌐",
    color: "sky",       accent: "#0ea5e9",
    desc: "OSI model, TCP/IP, HTTP, DNS — essential for backend & systems roles",
    topics: [
      { id:"osi_model",       label:"OSI Model — 7 Layers",         difficulty:"Beginner" },
      { id:"tcp_ip",          label:"TCP vs UDP",                   difficulty:"Beginner" },
      { id:"http_https",      label:"HTTP / HTTPS & REST",          difficulty:"Beginner" },
      { id:"dns",             label:"DNS — How it Works",           difficulty:"Intermediate" },
      { id:"ip_routing",      label:"IP Addressing & Routing",      difficulty:"Intermediate" },
      { id:"tcp_handshake",   label:"TCP 3-Way Handshake",          difficulty:"Intermediate" },
      { id:"http2_http3",     label:"HTTP/2 vs HTTP/3",             difficulty:"Advanced" },
      { id:"websockets",      label:"WebSockets & Long Polling",    difficulty:"Advanced" },
      { id:"cdn",             label:"CDN & Caching Strategies",     difficulty:"Advanced" },
    ],
  },
  {
    id: "system_design", label: "System Design",               emoji: "🏗️",
    color: "rose",      accent: "#f43f5e",
    desc: "Design Twitter, Netflix, Uber — the most important senior interview skill",
    topics: [
      { id:"sd_basics",       label:"System Design Fundamentals",   difficulty:"Intermediate" },
      { id:"scalability",     label:"Horizontal vs Vertical Scaling",difficulty:"Intermediate" },
      { id:"load_balancing",  label:"Load Balancing",               difficulty:"Intermediate" },
      { id:"caching",         label:"Caching — Redis, CDN, Strategies", difficulty:"Intermediate" },
      { id:"databases_sd",    label:"Database Selection & Sharding",difficulty:"Intermediate" },
      { id:"message_queues",  label:"Message Queues — Kafka, RabbitMQ", difficulty:"Advanced" },
      { id:"microservices",   label:"Microservices Architecture",   difficulty:"Advanced" },
      { id:"url_shortener",   label:"Design URL Shortener",         difficulty:"Intermediate" },
      { id:"twitter",         label:"Design Twitter/X",             difficulty:"Advanced" },
      { id:"netflix",         label:"Design Netflix",               difficulty:"Advanced" },
      { id:"uber",            label:"Design Uber",                  difficulty:"Advanced" },
      { id:"rate_limiting",   label:"Rate Limiting Algorithms",     difficulty:"Advanced" },
    ],
  },
  {
    id: "react",         label: "React.js",                    emoji: "⚛️",
    color: "cyan",      accent: "#06b6d4",
    desc: "The most popular frontend library — hooks, state, performance",
    topics: [
      { id:"jsx_components",  label:"JSX & Components",             difficulty:"Beginner" },
      { id:"props_state",     label:"Props & State",                difficulty:"Beginner" },
      { id:"use_effect",      label:"useEffect Hook",               difficulty:"Beginner" },
      { id:"use_state",       label:"useState & useReducer",        difficulty:"Beginner" },
      { id:"use_context",     label:"Context API & useContext",     difficulty:"Intermediate" },
      { id:"custom_hooks",    label:"Custom Hooks",                 difficulty:"Intermediate" },
      { id:"memo_callback",   label:"useMemo & useCallback",        difficulty:"Intermediate" },
      { id:"react_router",    label:"React Router v6",              difficulty:"Intermediate" },
      { id:"performance",     label:"React Performance Optimization",difficulty:"Advanced" },
      { id:"concurrent",      label:"Concurrent Mode & Suspense",   difficulty:"Advanced" },
    ],
  },
  {
    id: "ml",            label: "Machine Learning",            emoji: "🤖",
    color: "purple",    accent: "#a855f7",
    desc: "ML fundamentals, algorithms, deep learning, and LLMs",
    topics: [
      { id:"ml_basics",       label:"What is ML? — Types & Terms",  difficulty:"Beginner" },
      { id:"linear_reg",      label:"Linear Regression",            difficulty:"Beginner" },
      { id:"logistic_reg",    label:"Logistic Regression",          difficulty:"Beginner" },
      { id:"decision_trees",  label:"Decision Trees & Random Forest",difficulty:"Intermediate" },
      { id:"neural_networks", label:"Neural Networks Fundamentals", difficulty:"Intermediate" },
      { id:"backprop",        label:"Backpropagation & Gradients",  difficulty:"Intermediate" },
      { id:"cnn",             label:"CNNs for Computer Vision",     difficulty:"Advanced" },
      { id:"transformers",    label:"Transformers & Attention",     difficulty:"Advanced" },
      { id:"rag",             label:"RAG — Retrieval Augmented Gen",difficulty:"Advanced" },
      { id:"fine_tuning",     label:"Fine-Tuning LLMs",             difficulty:"Advanced" },
    ],
  },
];

const DIFFICULTY_STYLES = {
  Beginner:     { bg:"bg-emerald-500/15", text:"text-emerald-300", border:"border-emerald-500/25", dot:"bg-emerald-400" },
  Intermediate: { bg:"bg-amber-500/15",   text:"text-amber-300",   border:"border-amber-500/25",   dot:"bg-amber-400" },
  Advanced:     { bg:"bg-red-500/15",     text:"text-red-300",     border:"border-red-500/25",     dot:"bg-red-400" },
};

const COLOR_MAP = {
  indigo:  { card:"border-indigo-500/20 bg-indigo-500/5",   icon:"bg-indigo-500/15 text-indigo-300", active:"bg-indigo-600/15 border-indigo-500/30", bar:"bg-indigo-500" },
  violet:  { card:"border-violet-500/20 bg-violet-500/5",   icon:"bg-violet-500/15 text-violet-300", active:"bg-violet-600/15 border-violet-500/30", bar:"bg-violet-500" },
  emerald: { card:"border-emerald-500/20 bg-emerald-500/5", icon:"bg-emerald-500/15 text-emerald-300",active:"bg-emerald-600/15 border-emerald-500/30",bar:"bg-emerald-500"},
  orange:  { card:"border-orange-500/20 bg-orange-500/5",   icon:"bg-orange-500/15 text-orange-300", active:"bg-orange-600/15 border-orange-500/30", bar:"bg-orange-500" },
  sky:     { card:"border-sky-500/20 bg-sky-500/5",         icon:"bg-sky-500/15 text-sky-300",       active:"bg-sky-600/15 border-sky-500/30",       bar:"bg-sky-500"    },
  rose:    { card:"border-rose-500/20 bg-rose-500/5",       icon:"bg-rose-500/15 text-rose-300",     active:"bg-rose-600/15 border-rose-500/30",     bar:"bg-rose-500"   },
  cyan:    { card:"border-cyan-500/20 bg-cyan-500/5",       icon:"bg-cyan-500/15 text-cyan-300",     active:"bg-cyan-600/15 border-cyan-500/30",     bar:"bg-cyan-500"   },
  purple:  { card:"border-purple-500/20 bg-purple-500/5",   icon:"bg-purple-500/15 text-purple-300", active:"bg-purple-600/15 border-purple-500/30", bar:"bg-purple-500" },
};

// ─────────────────────────────────────────────────────────────────
// BUILD CONCEPT PROMPT — deeply structured, like a textbook + tutor
// ─────────────────────────────────────────────────────────────────
function buildConceptPrompt(subject, topic) {
  return `You are an expert computer science professor AND a world-class explainer like 3Blue1Brown or Andrej Karpathy. You make complex concepts crystal clear.

Teach "${topic.label}" from ${subject.label} to a CSE student preparing for placements.

Use this EXACT structure — every section is mandatory:

---

## 🎯 What Is ${topic.label}?
[2-3 sentence intuitive explanation. Explain like the student has never heard of this before. Use a real-world analogy first.]

**In one sentence:** [The simplest possible definition]

**Why does this matter?** [Why a developer needs this. Mention which companies ask this in interviews.]

---

## 🧠 The Core Concept

[Explain the concept deeply in 200-300 words. Cover:
- How it actually works internally
- The intuition behind it (not just definitions)
- What makes it special or tricky
- Common misconceptions]

---

## 📊 Visual Mental Model

[Create a simple ASCII diagram or structured text representation showing how this concept works. For example:
- For arrays: show memory layout
- For TCP: show packet flow
- For OOP: show class hierarchy
- For SQL JOINs: show tables being joined]

---

## 💻 Code Example — Basic

\`\`\`python
# [Title: what this code demonstrates]
# Step-by-step with comments explaining WHY each line exists

[10-20 lines of real, working code with detailed inline comments]
\`\`\`

**What this does:** [1-2 sentences explaining the output/behavior]

---

## 💻 Code Example — Real World

\`\`\`python
# [Real-world scenario: e.g., "Building a caching system", "Interview problem solution"]

[20-30 lines of production-quality code showing this concept used in practice]
\`\`\`

---

## ⚡ Key Properties & Rules

| Property | Value | Why It Matters |
|----------|-------|----------------|
| [property] | [value] | [reason] |
[Add 4-6 rows]

---

## 🎯 Interview Questions (with Answers)

**Q1: [Common interview question]**
> **Answer:** [Clear, complete answer — 3-4 sentences]

**Q2: [Another frequent question]**
> **Answer:** [Answer]

**Q3: [Tricky question]**
> **Answer:** [Answer with code if needed]

---

## ⚠️ Common Mistakes

1. **[Mistake name]:** [What beginners do wrong and what to do instead]
2. **[Mistake name]:** [Explanation]
3. **[Mistake name]:** [Explanation]

---

## 🔗 Connections to Other Concepts

- **Prerequisite:** [What to know before this]
- **Builds into:** [What this enables you to learn next]
- **Used in:** [Real systems/code that use this — e.g., Django uses X, React uses Y]

---

## 📌 One-Line Summary to Remember

> [The single most important thing to remember about this topic — make it memorable]

---

Make everything specific, practical, and interview-focused. Use real code that actually works. No filler.`;
}

// ─────────────────────────────────────────────────────────────────
// CHAT PROMPT — context-aware tutor
// ─────────────────────────────────────────────────────────────────
function buildChatPrompt(subject, topic, history, question) {
  const historyStr = history.slice(-6).map(m => `${m.role === "user" ? "Student" : "Teacher"}: ${m.text}`).join("\n");
  return `You are an expert ${subject.label} teacher. The student is learning "${topic.label}".

Previous conversation:
${historyStr}

Student's question: ${question}

Answer rules:
- Be SPECIFIC to this exact topic (${topic.label} in ${subject.label})
- Use code examples when relevant (in \`\`\`python blocks)
- Keep it focused — answer the question, don't lecture
- If they're confused, use a simpler analogy
- If they ask for a quiz, give one question with multiple choice and wait for their answer
- If they say "next topic" or "I got it", encourage them and suggest what to learn next
- Maximum 300 words unless showing code`;
}
// ─────────────────────────────────────────────────────────────────
// MARKDOWN RENDERER — rich, structured, fully readable
// ─────────────────────────────────────────────────────────────────
function ConceptRenderer({ content }) {
  const [copied, setCopied] = useState(null);

  const copyCode = (code, idx) => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(idx); setTimeout(() => setCopied(null), 2000);
    });
  };

  // Parse markdown into structured blocks
  const renderInline = (text) => {
    // Bold, code, italic
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i} className="font-bold text-white">{part.slice(2,-2)}</strong>;
      if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**"))
        return <em key={i} className="italic text-white/70">{part.slice(1,-1)}</em>;
      if (part.startsWith("`") && part.endsWith("`") && !part.startsWith("```"))
        return <code key={i} className="font-mono text-xs bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 px-1.5 py-0.5 rounded">{part.slice(1,-1)}</code>;
      return <span key={i}>{part}</span>;
    });
  };

  const lines = content.split("\n");
  const elements = [];
  let i = 0;
  let codeIdx = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Code block
    if (trimmed.startsWith("```")) {
      const lang = trimmed.slice(3).trim() || "python";
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      const code = codeLines.join("\n");
      const idx = codeIdx++;
      elements.push(
        <div key={`code-${i}`} className="my-4 rounded-xl overflow-hidden border border-white/[0.07] shadow-lg">
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60"/>
                <div className="w-3 h-3 rounded-full bg-yellow-500/60"/>
                <div className="w-3 h-3 rounded-full bg-emerald-500/60"/>
              </div>
              <span className="text-[11px] text-white/30 font-mono ml-1">{lang === "python" ? "🐍 " : ""}{lang}.py</span>
            </div>
            <button onClick={() => copyCode(code, idx)}
              className="flex items-center gap-1.5 text-[10px] font-semibold text-white/25 hover:text-white/70 transition-colors px-2 py-1 rounded bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06]">
              <FiCopy className="text-[10px]"/>
              {copied === idx ? "Copied!" : "Copy"}
            </button>
          </div>
          {/* Line numbers + code */}
          <div className="flex bg-[#0d1117] overflow-auto" style={{maxHeight:"360px"}}>
            <div className="select-none flex-shrink-0 py-3 px-2.5 border-r border-white/[0.05] text-right min-w-[36px]">
              {codeLines.map((_, li) => (
                <div key={li} className="text-[10px] text-white/15 font-mono leading-5 h-5">{li+1}</div>
              ))}
            </div>
            <pre className="flex-1 py-3 px-4 text-[12.5px] font-mono leading-5 overflow-x-auto whitespace-pre text-emerald-300"
              style={{fontFamily:'"Fira Code","Cascadia Code","Consolas",monospace'}}>
              {code}
            </pre>
          </div>
        </div>
      );
      i++;
      continue;
    }

    // H2 section — becomes a prominent card header
    if (trimmed.startsWith("## ")) {
      const text = trimmed.slice(3);
      elements.push(
        <div key={`h2-${i}`} className="mt-7 mb-3 flex items-center gap-2.5">
          <div className="h-px flex-1 bg-white/[0.06]"/>
          <h2 className="text-sm font-extrabold text-white/80 uppercase tracking-wider whitespace-nowrap px-2">
            {text}
          </h2>
          <div className="h-px flex-1 bg-white/[0.06]"/>
        </div>
      );
      i++; continue;
    }

    // H3 subheading
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3 key={`h3-${i}`} className="text-sm font-bold text-white/70 mt-4 mb-2">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      i++; continue;
    }

    // HR separator
    if (trimmed === "---") {
      elements.push(<div key={`hr-${i}`} className="my-5 h-px bg-white/[0.06]"/>);
      i++; continue;
    }

    // Blockquote — used for "In one sentence" and important callouts
    if (trimmed.startsWith("> ")) {
      const text = trimmed.slice(2);
      elements.push(
        <div key={`bq-${i}`} className="my-3 flex items-start gap-3 bg-indigo-500/8 border-l-2 border-indigo-500/50 px-4 py-3 rounded-r-xl">
          <p className="text-sm text-indigo-200/80 italic leading-6">{renderInline(text)}</p>
        </div>
      );
      i++; continue;
    }

    // Table — detect by | pattern
    if (trimmed.startsWith("|") && i + 1 < lines.length && lines[i+1].trim().startsWith("|---")) {
      const headers = trimmed.split("|").filter(c => c.trim()).map(c => c.trim());
      i += 2; // skip separator row
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim().split("|").filter(c => c.trim()).map(c => c.trim()));
        i++;
      }
      elements.push(
        <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/[0.07] bg-white/[0.03]">
                {headers.map((h, hi) => <th key={hi} className="px-4 py-2.5 text-left font-bold text-white/50 uppercase tracking-wider text-[10px]">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-white/[0.02] transition-colors">
                  {row.map((cell, ci) => <td key={ci} className="px-4 py-2.5 text-white/60 leading-5">{renderInline(cell)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      const num = trimmed.match(/^(\d+)\./)[1];
      const text = trimmed.replace(/^\d+\.\s*/, "").replace(/^\*\*([^*]+)\*\*:/, (_, b) => `<bold>${b}</bold>:`);
      // Extract bold start
      const boldMatch = trimmed.replace(/^\d+\.\s*/, "").match(/^\*\*([^*]+)\*\*:?\s*(.*)/);
      elements.push(
        <div key={`num-${i}`} className="flex items-start gap-3 py-1.5">
          <span className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{num}</span>
          <p className="text-sm text-white/65 leading-6 flex-1">
            {boldMatch
              ? <><strong className="font-bold text-white">{boldMatch[1]}</strong>{boldMatch[2] ? ": " + boldMatch[2] : ""}</>
              : renderInline(trimmed.replace(/^\d+\.\s*/, ""))
            }
          </p>
        </div>
      );
      i++; continue;
    }

    // Bullet
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const text = trimmed.slice(2);
      const isGood  = text.includes("✅") || text.toLowerCase().includes("correct") || text.toLowerCase().includes("good");
      const isBad   = text.includes("❌") || text.toLowerCase().includes("wrong") || text.toLowerCase().includes("avoid");
      elements.push(
        <div key={`bullet-${i}`} className="flex items-start gap-2.5 py-1">
          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 ${isGood?"bg-emerald-500":isBad?"bg-red-500":"bg-indigo-500"}`}/>
          <p className="text-sm text-white/65 leading-6 flex-1">{renderInline(text)}</p>
        </div>
      );
      i++; continue;
    }

    // Q&A block (bold Q pattern)
    if (trimmed.startsWith("**Q") && trimmed.endsWith("**")) {
      elements.push(
        <div key={`qa-${i}`} className="mt-4 p-4 rounded-xl bg-white/[0.025] border border-white/[0.07]">
          <p className="text-sm font-bold text-white/85 mb-2">{renderInline(trimmed)}</p>
        </div>
      );
      i++; continue;
    }

    // Answer block (starts with > **Answer:**)
    if (trimmed.startsWith("> **Answer:**")) {
      elements.push(
        <div key={`ans-${i}`} className="mb-4 px-4 py-3 bg-emerald-500/5 border-l-2 border-emerald-500/30 rounded-r-xl">
          <p className="text-sm text-white/60 leading-6">{renderInline(trimmed.slice(2))}</p>
        </div>
      );
      i++; continue;
    }

    // Empty line
    if (!trimmed) { i++; continue; }

    // Normal paragraph
    elements.push(
      <p key={`p-${i}`} className="text-sm text-white/65 leading-6 py-0.5">
        {renderInline(trimmed)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0.5">{elements}</div>;
}

// ─────────────────────────────────────────────────────────────────
// CHAT MESSAGE
// ─────────────────────────────────────────────────────────────────
function ChatMessage({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
        isUser ? "bg-indigo-600 text-white" : "bg-[#161b22] border border-white/10 text-white/50"
      }`}>
        {isUser ? "U" : "AI"}
      </div>
      <div className={`flex-1 max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        {isUser ? (
          <div className="bg-indigo-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm leading-6">
            {msg.text}
          </div>
        ) : (
          <div className="bg-[#161b22] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-white/70 leading-6 w-full">
            <ConceptRenderer content={msg.text}/>
          </div>
        )}
        {msg.time && <p className="text-[9px] text-white/15 px-1">{msg.time}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// QUICK QUESTIONS — contextual chips that appear in chat
// ─────────────────────────────────────────────────────────────────
function getQuickQuestions(subject, topic) {
  return [
    `Explain ${topic.label} with a simple real-world analogy`,
    `Show me a coding example I can run right now`,
    `What are the most common interview questions on this?`,
    `Quiz me on ${topic.label}`,
    `What mistakes do beginners make?`,
    `How is this used in real production systems?`,
    `What should I learn next after this?`,
    `Explain the time/space complexity`,
  ].slice(0, 6);
}

// ─────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────
export default function ConceptHub() {
  const [search, setSearch]           = useState("");
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [concept, setConcept]         = useState("");
  const [conceptLoading, setConceptLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput]     = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [panel, setPanel]             = useState("concept"); // concept | chat
  const [diffFilter, setDiffFilter]   = useState("All");
  const [completed, setCompleted]     = useState(() => {
    try { return JSON.parse(localStorage.getItem("ch-completed") || "{}"); } catch { return {}; }
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const chatEndRef  = useRef(null);
  const chatInputRef= useRef(null);

  // Search across all subjects
  const searchResults = search.trim().length > 1
    ? SUBJECTS.flatMap(s => s.topics
        .filter(t => t.label.toLowerCase().includes(search.toLowerCase()))
        .map(t => ({ subject: s, topic: t }))
      ).slice(0, 8)
    : [];

  const filteredTopics = activeSubject
    ? activeSubject.topics.filter(t => diffFilter === "All" || t.difficulty === diffFilter)
    : [];

  const subjectColor = activeSubject ? COLOR_MAP[activeSubject.color] || COLOR_MAP.indigo : COLOR_MAP.indigo;
  const completedKey = (s, t) => `${s.id}::${t.id}`;
  const isCompleted  = (s, t) => !!completed[completedKey(s, t)];

  const markComplete = (s, t) => {
    const key = completedKey(s, t);
    const next = { ...completed, [key]: !completed[key] };
    setCompleted(next);
    try { localStorage.setItem("ch-completed", JSON.stringify(next)); } catch {}
  };

  const totalCompleted = Object.values(completed).filter(Boolean).length;
  const totalTopics    = SUBJECTS.reduce((a, s) => a + s.topics.length, 0);

  // Load concept
  const loadConcept = async (subject, topic) => {
    setActiveSubject(subject);
    setActiveTopic(topic);
    setConcept("");
    setChatMessages([{
      role: "ai",
      text: `Hi! I'm your AI tutor for **${topic.label}**. I've loaded the full concept explanation on the right. Feel free to:\n- Ask me anything about this topic\n- Request more code examples\n- Ask for a quiz: "Quiz me"\n- Ask about edge cases or tricky parts\n\nWhat would you like to explore?`,
      time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}),
    }]);
    setConceptLoading(true);
    setPanel("concept");
    try {
      const data = await api.chat(buildConceptPrompt(subject, topic));
      setConcept(data.response || "");
    } catch {
      setConcept("❌ Failed to load concept. Please check your API key and try again.");
    }
    setConceptLoading(false);
  };

  // Send chat
  const sendChat = async (text) => {
    const msg = (text || chatInput).trim();
    if (!msg || chatLoading || !activeTopic) return;
    setChatInput("");
    const userMsg = { role:"user", text:msg, time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}) };
    setChatMessages(m => [...m, userMsg]);
    setChatLoading(true);
    setPanel("chat");
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior:"smooth" }), 100);
    try {
      const data = await api.chat(buildChatPrompt(activeSubject, activeTopic, chatMessages, msg));
      const aiMsg = { role:"ai", text: data.response || "", time: new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}) };
      setChatMessages(m => [...m, aiMsg]);
    } catch {
      setChatMessages(m => [...m, { role:"ai", text:"❌ Failed to respond. Please try again.", time:"" }]);
    }
    setChatLoading(false);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior:"smooth" }), 100);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); }
  };

  // Overall progress per subject
  const subjectProgress = (subject) => {
    const done = subject.topics.filter(t => isCompleted(subject, t)).length;
    return { done, total: subject.topics.length, pct: Math.round((done/subject.topics.length)*100) };
  };

  return (
    <DashboardLayout>
      <div className="flex -mx-4 sm:-mx-6 -mt-4 bg-[#060810]" style={{minHeight:"calc(100vh - 64px)"}}>

        {/* ══ LEFT SIDEBAR — Subject + Topic navigator ══════════════ */}
        <aside className={`flex-shrink-0 bg-[#0d1117] border-r border-white/[0.07] flex flex-col transition-all duration-200 ${
          sidebarOpen ? "w-72" : "w-14"
        }`}>

          {/* Sidebar top */}
          <div className="flex items-center gap-2 px-3 py-3 border-b border-white/[0.07] flex-shrink-0">
            {sidebarOpen && (
              <div className="flex-1 relative">
                <FiSearch className="absolute left-2.5 top-2 text-white/20 text-xs"/>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search topics..."
                  className="w-full pl-7 pr-3 py-1.5 bg-white/[0.04] border border-white/[0.07] rounded-lg text-xs text-white/60 outline-none focus:border-indigo-500/40 placeholder:text-white/20"
                />
              </div>
            )}
            <button onClick={() => setSidebarOpen(v => !v)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-white/60 hover:bg-white/[0.04] transition-all flex-shrink-0">
              <FiList className="text-sm"/>
            </button>
          </div>

          {/* Overall progress strip */}
          {sidebarOpen && (
            <div className="px-4 py-3 border-b border-white/[0.07] flex-shrink-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider">Overall Progress</span>
                <span className="text-[10px] font-bold text-indigo-400">{totalCompleted}/{totalTopics}</span>
              </div>
              <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                  style={{width:`${Math.round((totalCompleted/totalTopics)*100)}%`}}/>
              </div>
            </div>
          )}

          {/* Search results */}
          {sidebarOpen && search.trim().length > 1 && (
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-wider px-2 py-1">
                {searchResults.length} results
              </p>
              {searchResults.map(({ subject, topic }) => (
                <button key={`${subject.id}-${topic.id}`}
                  onClick={() => { setSearch(""); loadConcept(subject, topic); }}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-all group">
                  <span className="text-base flex-shrink-0">{subject.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/70 truncate">{topic.label}</p>
                    <p className="text-[10px] text-white/25 truncate">{subject.label}</p>
                  </div>
                  <DiffBadge diff={topic.difficulty} tiny/>
                </button>
              ))}
            </div>
          )}

          {/* Subject list */}
          {(!search.trim() || search.trim().length <= 1) && (
            <div className="flex-1 overflow-y-auto">
              {SUBJECTS.map(subject => {
                const isActive  = activeSubject?.id === subject.id;
                const progress  = subjectProgress(subject);
                const sc        = COLOR_MAP[subject.color] || COLOR_MAP.indigo;

                return (
                  <div key={subject.id}>
                    {/* Subject header */}
                    <button
                      onClick={() => setActiveSubject(isActive ? null : subject)}
                      className={`w-full flex items-center gap-2.5 px-3 py-3 border-b border-white/[0.04] transition-all text-left ${
                        isActive ? sc.active + " border-b border-transparent" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${
                        isActive ? sc.icon : "bg-white/[0.04] text-white/40"
                      }`}>{subject.emoji}</div>
                      {sidebarOpen && (
                        <>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-bold truncate ${isActive?"text-white":"text-white/55"}`}>{subject.label}</p>
                            {progress.done > 0 && (
                              <p className="text-[9px] text-white/25 mt-0.5">{progress.done}/{progress.total} done</p>
                            )}
                          </div>
                          <FiChevronDown className={`text-white/20 text-xs flex-shrink-0 transition-transform ${isActive?"rotate-180":""}`}/>
                        </>
                      )}
                    </button>

                    {/* Topic list — only shown when subject is active */}
                    {isActive && sidebarOpen && (
                      <div className="bg-[#0a0e18] border-b border-white/[0.05]">
                        {/* Difficulty filter */}
                        <div className="flex gap-1 px-3 py-2">
                          {["All","Beginner","Intermediate","Advanced"].map(d => (
                            <button key={d} onClick={() => setDiffFilter(d)}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-all ${
                                diffFilter===d
                                  ? d==="Beginner"?"bg-emerald-500/20 text-emerald-300":d==="Intermediate"?"bg-amber-500/20 text-amber-300":d==="Advanced"?"bg-red-500/20 text-red-300":"bg-indigo-600/20 text-indigo-300"
                                  : "text-white/20 hover:text-white/40"
                              }`}>{d==="All"?"All":d[0]}</button>
                          ))}
                        </div>
                        {filteredTopics.map(topic => {
                          const isTopicActive = activeTopic?.id === topic.id;
                          const done = isCompleted(subject, topic);
                          return (
                            <button key={topic.id}
                              onClick={() => loadConcept(subject, topic)}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 border-b border-white/[0.03] text-left transition-all relative ${
                                isTopicActive ? "bg-indigo-600/10" : "hover:bg-white/[0.02]"
                              }`}
                            >
                              {isTopicActive && <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-indigo-500 rounded-full"/>}
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                                done ? "bg-emerald-500 border-emerald-500" : isTopicActive ? "border-indigo-400" : "border-white/15"
                              }`}>
                                {done && <FiCheck className="text-white text-[8px]"/>}
                              </div>
                              <p className={`text-[11px] flex-1 leading-tight transition-colors ${
                                done ? "line-through text-white/25" : isTopicActive ? "text-white font-semibold" : "text-white/50"
                              }`}>{topic.label}</p>
                              <DiffBadge diff={topic.difficulty} tiny/>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        {/* ══ MAIN AREA ═══════════════════════════════════════════ */}
        {!activeTopic ? (
          /* ── HOME SCREEN ── */
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-6 py-8">

              {/* Hero */}
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 bg-indigo-600/12 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-5">
                  <FiZap className="text-xs"/> AI-Powered Concept Learning
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
                  Learn Any CS Concept,<br/>
                  <span className="text-indigo-400">With Your Own AI Tutor</span>
                </h1>
                <p className="text-white/40 text-sm max-w-lg leading-relaxed">
                  Pick any topic. Get a comprehensive explanation with real code, visual models, and interview prep.
                  Then chat with your AI tutor to go deeper — ask anything, get quizzed, explore edge cases.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {[
                  { icon:"📚", label:"Subjects",   value:SUBJECTS.length },
                  { icon:"🎯", label:"Topics",     value:totalTopics },
                  { icon:"✅", label:"Completed",  value:totalCompleted },
                  { icon:"📈", label:"Progress",   value:`${Math.round((totalCompleted/totalTopics)*100)}%` },
                ].map((s,i) => (
                  <div key={i} className="rounded-2xl border border-white/[0.07] bg-[#0d1117] p-4 text-center">
                    <div className="text-xl mb-1.5">{s.icon}</div>
                    <p className="text-xl font-extrabold text-indigo-400 tabular-nums">{s.value}</p>
                    <p className="text-[10px] text-white/25 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Subject grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SUBJECTS.map(subject => {
                  const sc       = COLOR_MAP[subject.color] || COLOR_MAP.indigo;
                  const progress = subjectProgress(subject);
                  return (
                    <button key={subject.id}
                      onClick={() => setActiveSubject(subject)}
                      className={`text-left p-5 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 ${sc.card} hover:border-white/20`}
                    >
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl mb-4 ${sc.icon}`}>
                        {subject.emoji}
                      </div>
                      <h3 className="font-extrabold text-white text-sm leading-tight mb-1.5">{subject.label}</h3>
                      <p className="text-[11px] text-white/35 leading-4 mb-3">{subject.desc}</p>
                      {/* Progress bar */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] text-white/20 font-semibold">{progress.done}/{progress.total}</span>
                          <span className="text-[9px] text-white/20">{progress.pct}%</span>
                        </div>
                        <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all ${sc.bar}`} style={{width:`${progress.pct}%`}}/>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* How it works */}
              <div className="mt-10 p-6 rounded-2xl border border-white/[0.07] bg-[#0d1117]">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">How It Works</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon:"1️⃣", title:"Pick a Topic", desc:"Choose any subject and topic from the sidebar. 8 subjects, 100+ topics." },
                    { icon:"2️⃣", title:"Read & Learn", desc:"Get a comprehensive explanation: intuition, code examples, interview Q&A, common mistakes." },
                    { icon:"3️⃣", title:"Chat with AI", desc:"Ask follow-up questions, get more examples, request a quiz — your personal tutor, available 24/7." },
                  ].map((s,i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{s.icon}</span>
                      <div>
                        <p className="font-bold text-white text-sm mb-1">{s.title}</p>
                        <p className="text-xs text-white/40 leading-5">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ── TOPIC LEARNING SCREEN — split layout ── */
          <div className="flex-1 flex overflow-hidden min-w-0">

            {/* LEFT: Concept / Chat toggle */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

              {/* Top bar */}
              <div className="flex items-center gap-3 px-5 py-3 border-b border-white/[0.07] bg-[#0d1117] flex-shrink-0">
                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 text-xs text-white/30 flex-1 min-w-0">
                  <span className="text-base flex-shrink-0">{activeSubject.emoji}</span>
                  <span className="truncate hidden sm:block">{activeSubject.label}</span>
                  <FiChevronRight className="text-white/15 flex-shrink-0"/>
                  <span className="font-bold text-white/70 truncate">{activeTopic.label}</span>
                </div>
                {/* Panel tabs */}
                <div className="flex items-center gap-1 bg-white/[0.04] rounded-lg p-0.5 flex-shrink-0">
                  <button onClick={() => setPanel("concept")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ${
                      panel==="concept" ? "bg-indigo-600 text-white" : "text-white/30 hover:text-white/60"
                    }`}>
                    <FiBookOpen className="text-[10px]"/> Concept
                  </button>
                  <button onClick={() => setPanel("chat")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ${
                      panel==="chat" ? "bg-indigo-600 text-white" : "text-white/30 hover:text-white/60"
                    }`}>
                    <FiZap className="text-[10px]"/> Chat
                    {chatMessages.length > 1 && (
                      <span className="bg-indigo-500/30 text-indigo-300 text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                        {chatMessages.length}
                      </span>
                    )}
                  </button>
                </div>
                {/* Mark complete */}
                <button
                  onClick={() => markComplete(activeSubject, activeTopic)}
                  className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all flex-shrink-0 ${
                    isCompleted(activeSubject, activeTopic)
                      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                      : "bg-white/[0.03] border-white/[0.07] text-white/30 hover:border-white/20 hover:text-white/60"
                  }`}>
                  <FiCheck className="text-xs"/>
                  {isCompleted(activeSubject, activeTopic) ? "Done ✓" : "Mark Done"}
                </button>
              </div>

              {/* CONCEPT PANEL */}
              {panel === "concept" && (
                <div className="flex-1 overflow-y-auto">
                  {conceptLoading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                      <div className="relative w-14 h-14">
                        <div className="absolute inset-0 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"/>
                        <div className="absolute inset-3 border-2 border-violet-500/20 border-b-violet-500 rounded-full animate-spin" style={{animationDirection:"reverse"}}/>
                      </div>
                      <div className="text-center">
                        <p className="text-white/60 font-semibold text-sm">Generating concept explanation...</p>
                        <div className="space-y-1 mt-3">
                          {["Building intuitive explanation","Writing code examples","Preparing interview questions","Adding common mistakes"].map((s,i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-white/25">
                              <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" style={{animationDelay:`${i*200}ms`}}/>
                              {s}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : concept ? (
                    <div className="px-6 py-6 max-w-3xl">
                      {/* Topic header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <DiffBadge diff={activeTopic.difficulty}/>
                          <span className="text-[10px] text-white/20">{activeSubject.label}</span>
                        </div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">{activeTopic.label}</h1>
                      </div>
                      <ConceptRenderer content={concept}/>
                      {/* Chat CTA */}
                      <div className="mt-8 p-4 rounded-xl bg-indigo-600/8 border border-indigo-500/15 flex items-center gap-4">
                        <div className="w-9 h-9 bg-indigo-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FiZap className="text-indigo-400 text-sm"/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-indigo-300 mb-0.5">Have questions about this topic?</p>
                          <p className="text-[11px] text-white/30">Click Chat to ask your AI tutor anything — quiz, examples, deeper explanation</p>
                        </div>
                        <button onClick={() => setPanel("chat")}
                          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors flex-shrink-0">
                          Open Chat →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-white/20 text-sm">Select a topic to start learning</p>
                    </div>
                  )}
                </div>
              )}

              {/* CHAT PANEL */}
              {panel === "chat" && (
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
                    {chatMessages.map((msg, i) => <ChatMessage key={i} msg={msg}/>)}
                    {chatLoading && (
                      <div className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#161b22] border border-white/10 flex items-center justify-center text-xs text-white/50 flex-shrink-0">AI</div>
                        <div className="bg-[#161b22] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            {[0,1,2].map(i => (
                              <div key={i} className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"
                                style={{animationDelay:`${i*150}ms`}}/>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef}/>
                  </div>

                  {/* Quick question chips */}
                  {chatMessages.length <= 2 && activeTopic && (
                    <div className="px-5 pb-3 flex gap-2 overflow-x-auto flex-shrink-0">
                      {getQuickQuestions(activeSubject, activeTopic).map((q, i) => (
                        <button key={i} onClick={() => sendChat(q)}
                          className="flex-shrink-0 text-[11px] bg-white/[0.04] border border-white/[0.08] text-white/45 hover:text-white/70 hover:border-indigo-500/30 px-3 py-2 rounded-xl transition-all max-w-[200px] truncate">
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Chat input */}
                  <div className="border-t border-white/[0.07] px-4 py-3 flex-shrink-0 bg-[#0d1117]">
                    <div className="flex items-end gap-2 bg-[#161b22] border border-white/[0.07] rounded-2xl px-4 py-2.5 focus-within:border-indigo-500/40 transition-colors">
                      <textarea
                        ref={chatInputRef}
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder={`Ask anything about ${activeTopic?.label}...`}
                        rows={1}
                        className="flex-1 bg-transparent text-white/80 text-sm outline-none resize-none placeholder:text-white/15 leading-6 max-h-28 overflow-y-auto"
                        style={{minHeight:"24px"}}
                      />
                      <button onClick={() => sendChat()}
                        disabled={!chatInput.trim() || chatLoading}
                        className="w-8 h-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-all disabled:opacity-30 flex-shrink-0">
                        <FiSend className="text-white text-xs"/>
                      </button>
                    </div>
                    <p className="text-[9px] text-white/15 text-center mt-1.5">Press Enter to send · Shift+Enter for new line</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

// ─────────────────────────────────────────────────────────────────
// TINY DIFFICULTY BADGE
// ─────────────────────────────────────────────────────────────────
function DiffBadge({ diff, tiny }) {
  const s = DIFFICULTY_STYLES[diff] || DIFFICULTY_STYLES.Beginner;
  if (tiny) return (
    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} title={diff}/>
  );
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
      {diff}
    </span>
  );
}