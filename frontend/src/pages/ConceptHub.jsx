import { useState, useRef, useEffect, useCallback } from "react";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast";
import {
  FiSearch, FiZap, FiSend, FiBookOpen, FiCode, FiCpu,
  FiDatabase, FiGlobe, FiLayers, FiCheck, FiChevronDown,
  FiX, FiGrid, FiList, FiArrowRight, FiHash, FiAward,
  FiTarget, FiPlayCircle, FiCopy, FiMenu, FiHome,
} from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────
// SUBJECTS DATA
// ─────────────────────────────────────────────────────────────────
const SUBJECTS = [
  {
    id:"python", label:"Python", emoji:"🐍", color:"indigo",
    accent:"#6366f1",
    desc:"Most popular language for AI, ML, backend & automation",
    topics:[
      { id:"variables",      label:"Variables & Data Types",       difficulty:"Beginner"     },
      { id:"control_flow",   label:"Control Flow (if/for/while)",  difficulty:"Beginner"     },
      { id:"functions",      label:"Functions & Scope",            difficulty:"Beginner"     },
      { id:"lists_dicts",    label:"Lists, Dicts, Sets, Tuples",   difficulty:"Beginner"     },
      { id:"oop",            label:"OOP — Classes & Objects",      difficulty:"Intermediate" },
      { id:"inheritance",    label:"Inheritance & Polymorphism",   difficulty:"Intermediate" },
      { id:"decorators",     label:"Decorators",                   difficulty:"Intermediate" },
      { id:"generators",     label:"Generators & Iterators",       difficulty:"Intermediate" },
      { id:"file_io",        label:"File I/O & Exception Handling",difficulty:"Intermediate" },
      { id:"comprehensions", label:"List & Dict Comprehensions",   difficulty:"Intermediate" },
      { id:"async_await",    label:"Async / Await & asyncio",      difficulty:"Advanced"     },
      { id:"type_hints",     label:"Type Hints & Dataclasses",     difficulty:"Advanced"     },
      { id:"metaclasses",    label:"Metaclasses & __dunder__",     difficulty:"Advanced"     },
      { id:"memory_mgmt",    label:"Memory Management & GIL",      difficulty:"Advanced"     },
    ],
  },
  {
    id:"dsa", label:"Data Structures & Algorithms", emoji:"🧩", color:"violet",
    accent:"#8b5cf6",
    desc:"Core of every technical interview. Master these to crack any company.",
    topics:[
      { id:"arrays",         label:"Arrays & Strings",             difficulty:"Beginner"     },
      { id:"linked_lists",   label:"Linked Lists",                 difficulty:"Beginner"     },
      { id:"stacks_queues",  label:"Stacks & Queues",              difficulty:"Beginner"     },
      { id:"hash_maps",      label:"Hash Maps & Hash Sets",        difficulty:"Beginner"     },
      { id:"binary_search",  label:"Binary Search",                difficulty:"Intermediate" },
      { id:"sorting",        label:"Sorting Algorithms",           difficulty:"Intermediate" },
      { id:"trees",          label:"Binary Trees & BST",           difficulty:"Intermediate" },
      { id:"heaps",          label:"Heaps & Priority Queues",      difficulty:"Intermediate" },
      { id:"graphs",         label:"Graphs — BFS & DFS",           difficulty:"Intermediate" },
      { id:"sliding_window", label:"Sliding Window Pattern",       difficulty:"Intermediate" },
      { id:"two_pointers",   label:"Two Pointers Pattern",         difficulty:"Intermediate" },
      { id:"dynamic_prog",   label:"Dynamic Programming",          difficulty:"Advanced"     },
      { id:"backtracking",   label:"Backtracking",                 difficulty:"Advanced"     },
      { id:"trie",           label:"Trie",                         difficulty:"Advanced"     },
      { id:"segment_tree",   label:"Segment Tree",                 difficulty:"Advanced"     },
    ],
  },
  {
    id:"dbms", label:"DBMS & SQL", emoji:"🗄️", color:"emerald",
    accent:"#10b981",
    desc:"Database design, SQL mastery, indexing & transactions",
    topics:[
      { id:"sql_basics",     label:"SQL Basics — SELECT, WHERE",   difficulty:"Beginner"     },
      { id:"joins",          label:"SQL Joins — INNER, LEFT, FULL",difficulty:"Beginner"     },
      { id:"aggregation",    label:"GROUP BY, HAVING, Aggregates", difficulty:"Beginner"     },
      { id:"subqueries",     label:"Subqueries & CTEs",            difficulty:"Intermediate" },
      { id:"window_fns",     label:"Window Functions",             difficulty:"Intermediate" },
      { id:"normalization",  label:"Normalization (1NF–3NF+BCNF)", difficulty:"Intermediate" },
      { id:"indexing",       label:"Indexing & Query Optimization", difficulty:"Intermediate" },
      { id:"transactions",   label:"Transactions & ACID",          difficulty:"Intermediate" },
      { id:"er_diagrams",    label:"ER Diagrams & Schema Design",  difficulty:"Intermediate" },
      { id:"nosql",          label:"NoSQL vs SQL — When to Use",   difficulty:"Advanced"     },
      { id:"concurrency",    label:"Concurrency & Locking",        difficulty:"Advanced"     },
    ],
  },
  {
    id:"os", label:"Operating Systems", emoji:"🖥️", color:"orange",
    accent:"#f59e0b",
    desc:"Processes, memory, scheduling, deadlocks — asked at every FAANG interview",
    topics:[
      { id:"processes",      label:"Processes & Threads",          difficulty:"Beginner"     },
      { id:"scheduling",     label:"CPU Scheduling Algorithms",    difficulty:"Intermediate" },
      { id:"deadlocks",      label:"Deadlocks — Conditions & Prevention", difficulty:"Intermediate" },
      { id:"memory_mgmt_os", label:"Memory Management & Paging",  difficulty:"Intermediate" },
      { id:"virtual_mem",    label:"Virtual Memory & Page Faults", difficulty:"Intermediate" },
      { id:"ipc",            label:"IPC — Pipes, Signals, Sockets",difficulty:"Intermediate" },
      { id:"semaphores",     label:"Semaphores & Mutex",           difficulty:"Intermediate" },
      { id:"file_systems",   label:"File Systems & Disk Scheduling",difficulty:"Advanced"    },
    ],
  },
  {
    id:"cn", label:"Computer Networks", emoji:"🌐", color:"sky",
    accent:"#0ea5e9",
    desc:"OSI model, TCP/IP, HTTP, DNS — essential for backend & systems roles",
    topics:[
      { id:"osi_model",      label:"OSI Model — 7 Layers",         difficulty:"Beginner"     },
      { id:"tcp_ip",         label:"TCP vs UDP",                   difficulty:"Beginner"     },
      { id:"http_https",     label:"HTTP / HTTPS & REST",          difficulty:"Beginner"     },
      { id:"dns",            label:"DNS — How it Works",           difficulty:"Intermediate" },
      { id:"ip_routing",     label:"IP Addressing & Routing",      difficulty:"Intermediate" },
      { id:"tcp_handshake",  label:"TCP 3-Way Handshake",          difficulty:"Intermediate" },
      { id:"http2_http3",    label:"HTTP/2 vs HTTP/3",             difficulty:"Advanced"     },
      { id:"websockets",     label:"WebSockets & Long Polling",    difficulty:"Advanced"     },
      { id:"cdn",            label:"CDN & Caching Strategies",     difficulty:"Advanced"     },
    ],
  },
  {
    id:"system_design", label:"System Design", emoji:"🏗️", color:"rose",
    accent:"#f43f5e",
    desc:"Design Twitter, Netflix, Uber — the most important senior interview skill",
    topics:[
      { id:"sd_basics",      label:"System Design Fundamentals",   difficulty:"Intermediate" },
      { id:"scalability",    label:"Horizontal vs Vertical Scaling",difficulty:"Intermediate" },
      { id:"load_balancing", label:"Load Balancing",               difficulty:"Intermediate" },
      { id:"caching",        label:"Caching — Redis, CDN, Strategies", difficulty:"Intermediate" },
      { id:"databases_sd",   label:"Database Selection & Sharding",difficulty:"Intermediate" },
      { id:"message_queues", label:"Message Queues — Kafka, RabbitMQ", difficulty:"Advanced" },
      { id:"microservices",  label:"Microservices Architecture",   difficulty:"Advanced"     },
      { id:"url_shortener",  label:"Design URL Shortener",         difficulty:"Intermediate" },
      { id:"twitter",        label:"Design Twitter/X",             difficulty:"Advanced"     },
      { id:"netflix",        label:"Design Netflix",               difficulty:"Advanced"     },
      { id:"uber",           label:"Design Uber",                  difficulty:"Advanced"     },
      { id:"rate_limiting",  label:"Rate Limiting Algorithms",     difficulty:"Advanced"     },
    ],
  },
  {
    id:"react", label:"React.js", emoji:"⚛️", color:"cyan",
    accent:"#06b6d4",
    desc:"The most popular frontend library — hooks, state, performance",
    topics:[
      { id:"jsx_components", label:"JSX & Components",             difficulty:"Beginner"     },
      { id:"props_state",    label:"Props & State",                difficulty:"Beginner"     },
      { id:"use_effect",     label:"useEffect Hook",               difficulty:"Beginner"     },
      { id:"use_state",      label:"useState & useReducer",        difficulty:"Beginner"     },
      { id:"use_context",    label:"Context API & useContext",     difficulty:"Intermediate" },
      { id:"custom_hooks",   label:"Custom Hooks",                 difficulty:"Intermediate" },
      { id:"memo_callback",  label:"useMemo & useCallback",        difficulty:"Intermediate" },
      { id:"react_router",   label:"React Router v6",              difficulty:"Intermediate" },
      { id:"performance",    label:"React Performance Optimization",difficulty:"Advanced"    },
      { id:"concurrent",     label:"Concurrent Mode & Suspense",   difficulty:"Advanced"     },
    ],
  },
  {
    id:"ml", label:"Machine Learning", emoji:"🤖", color:"purple",
    accent:"#a855f7",
    desc:"ML fundamentals, algorithms, deep learning, and LLMs",
    topics:[
      { id:"ml_basics",      label:"What is ML? — Types & Terms",  difficulty:"Beginner"     },
      { id:"linear_reg",     label:"Linear Regression",            difficulty:"Beginner"     },
      { id:"logistic_reg",   label:"Logistic Regression",          difficulty:"Beginner"     },
      { id:"decision_trees", label:"Decision Trees & Random Forest",difficulty:"Intermediate" },
      { id:"neural_networks",label:"Neural Networks Fundamentals", difficulty:"Intermediate" },
      { id:"backprop",       label:"Backpropagation & Gradients",  difficulty:"Intermediate" },
      { id:"cnn",            label:"CNNs for Computer Vision",     difficulty:"Advanced"     },
      { id:"transformers",   label:"Transformers & Attention",     difficulty:"Advanced"     },
      { id:"rag",            label:"RAG — Retrieval Augmented Gen",difficulty:"Advanced"     },
      { id:"fine_tuning",    label:"Fine-Tuning LLMs",             difficulty:"Advanced"     },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────
const DIFF = {
  Beginner:     { bg:"bg-emerald-500/15", text:"text-emerald-300", dot:"bg-emerald-400" },
  Intermediate: { bg:"bg-amber-500/15",   text:"text-amber-300",   dot:"bg-amber-400"   },
  Advanced:     { bg:"bg-red-500/15",     text:"text-red-300",     dot:"bg-red-400"     },
};

const COLOR = {
  indigo:  { icon:"bg-indigo-500/15 text-indigo-300",  active:"bg-indigo-600/15 border-indigo-500/25",  bar:"bg-indigo-500",  card:"hover:border-indigo-500/30"  },
  violet:  { icon:"bg-violet-500/15 text-violet-300",  active:"bg-violet-600/15 border-violet-500/25",  bar:"bg-violet-500",  card:"hover:border-violet-500/30"  },
  emerald: { icon:"bg-emerald-500/15 text-emerald-300",active:"bg-emerald-600/15 border-emerald-500/25",bar:"bg-emerald-500", card:"hover:border-emerald-500/30" },
  orange:  { icon:"bg-orange-500/15 text-orange-300",  active:"bg-orange-600/15 border-orange-500/25",  bar:"bg-orange-500",  card:"hover:border-orange-500/30"  },
  sky:     { icon:"bg-sky-500/15 text-sky-300",        active:"bg-sky-600/15 border-sky-500/25",        bar:"bg-sky-500",     card:"hover:border-sky-500/30"     },
  rose:    { icon:"bg-rose-500/15 text-rose-300",      active:"bg-rose-600/15 border-rose-500/25",      bar:"bg-rose-500",    card:"hover:border-rose-500/30"    },
  cyan:    { icon:"bg-cyan-500/15 text-cyan-300",      active:"bg-cyan-600/15 border-cyan-500/25",      bar:"bg-cyan-500",    card:"hover:border-cyan-500/30"    },
  purple:  { icon:"bg-purple-500/15 text-purple-300",  active:"bg-purple-600/15 border-purple-500/25",  bar:"bg-purple-500",  card:"hover:border-purple-500/30"  },
};

function completedKey(sId, tId) { return `${sId}::${tId}`; }

function loadCompleted() {
  try { return JSON.parse(localStorage.getItem("ch-completed") || "{}"); }
  catch { return {}; }
}
function saveCompleted(map) {
  try { localStorage.setItem("ch-completed", JSON.stringify(map)); } catch {}
}

// ─────────────────────────────────────────────────────────────────
// AI PROMPTS
// ─────────────────────────────────────────────────────────────────
function buildConceptPrompt(subject, topic) {
  return `You are an expert CS professor and world-class explainer. Teach "${topic.label}" from ${subject.label} to a CSE student preparing for placements.

Use this EXACT structure:

## 🎯 What Is ${topic.label}?
[2-3 sentence intuitive explanation. Use a real-world analogy first.]
**In one sentence:** [simplest possible definition]
**Why does this matter?** [which companies ask this, why developers need it]

## 🧠 The Core Concept
[200-300 words. How it works internally, the intuition, what makes it tricky, common misconceptions]

## 📊 Visual Mental Model
[ASCII diagram or structured text showing how this concept works]

## 💻 Code Example — Basic
\`\`\`python
# Step-by-step with inline comments explaining WHY each line exists
[10-20 lines of real working code]
\`\`\`
**What this does:** [1-2 sentences]

## 💻 Code Example — Real World
\`\`\`python
# Real-world scenario
[20-30 lines of production-quality code]
\`\`\`

## ⚡ Key Properties & Rules
| Property | Value | Why It Matters |
|----------|-------|----------------|
[4-6 rows]

## 🎯 Interview Questions
**Q1: [Common interview question]**
> **Answer:** [Clear complete answer]

**Q2: [Another frequent question]**
> **Answer:** [Answer]

**Q3: [Tricky question]**
> **Answer:** [Answer with code if needed]

## ⚠️ Common Mistakes
1. **[Mistake]:** [What beginners do wrong and what to do instead]
2. **[Mistake]:** [Explanation]
3. **[Mistake]:** [Explanation]

## 📌 One-Line Summary
> [The single most important thing to remember — make it memorable]

Be specific, practical, and interview-focused. Use real working code. No filler.`;
}

function buildChatPrompt(subject, topic, history, question) {
  const hist = history.slice(-6).map(m => `${m.role === "user" ? "Student" : "Teacher"}: ${m.text}`).join("\n");
  return `You are an expert ${subject.label} teacher. The student is learning "${topic.label}".

Previous conversation:
${hist}

Student's question: ${question}

Rules:
- Be SPECIFIC to ${topic.label} in ${subject.label}
- Use code examples when relevant (in \`\`\`python blocks)
- If they ask for a quiz, give one multiple-choice question and wait for answer
- Maximum 300 words unless showing code`;
}

function getQuickQuestions(subject, topic) {
  return [
    `Explain ${topic.label} with a simple real-world analogy`,
    `Show me working code I can run right now`,
    `What are the most common interview questions on this?`,
    `Quiz me on ${topic.label}`,
    `What mistakes do beginners make?`,
    `How is this used in real production systems?`,
  ];
}

// ─────────────────────────────────────────────────────────────────
// CODE RENDERER — syntax highlighted, proper indentation
// ─────────────────────────────────────────────────────────────────
const PY_KW = new Set(["def","class","return","import","from","if","elif","else","for","while","in","not","and","or","True","False","None","try","except","finally","with","as","pass","break","continue","yield","lambda","del","global","nonlocal","raise","assert","is","async","await"]);
const PY_BI = new Set(["print","range","len","type","int","str","float","bool","list","dict","set","tuple","input","open","enumerate","zip","map","filter","sorted","sum","min","max","abs","round","isinstance","super","property","staticmethod","classmethod"]);

function hlLine(raw) {
  let body = raw, comment = "";
  let inStr = false, strCh = "";
  for (let i = 0; i < raw.length; i++) {
    const ch = raw[i];
    if (!inStr && (ch === '"' || ch === "'")) { inStr = true; strCh = ch; }
    else if (inStr && ch === strCh && raw[i-1] !== "\\") inStr = false;
    else if (!inStr && ch === "#") { comment = raw.slice(i); body = raw.slice(0, i); break; }
  }
  const RE = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\d+\.?\d*|[a-zA-Z_]\w*|[ \t]+|[^\w\s"'])/g;
  const tokens = [];
  let m;
  while ((m = RE.exec(body)) !== null) {
    const t = m[0];
    let color = "";
    if (/^["']/.test(t))                         color = "#fbbf24";
    else if (/^\d/.test(t))                      color = "#fb923c";
    else if (PY_KW.has(t))                       color = "#a78bfa";
    else if (PY_BI.has(t))                       color = "#67e8f9";
    else if (/^[A-Z_][A-Z0-9_]{2,}$/.test(t))   color = "#fed7aa";
    else if (/^[A-Z][a-z]/.test(t))             color = "#6ee7b7";
    else if (/^[=<>!+\-*/%&|^~()\[\]{},.:;@]/.test(t)) color = "#94a3b8";
    tokens.push({ text: t, color });
  }
  if (comment) tokens.push({ text: comment, color: "#475569", italic: true });
  return tokens;
}

function CodePre({ code }) {
  const [copied, setCopied] = useState(false);
  const cleaned = code.replace(/\t/g, "    ").replace(/^[\n\r]+/, "").replace(/[\n\r\s]+$/, "");
  const lines   = cleaned.split("\n");
  const gutW    = `${String(lines.length).length * 8 + 24}px`;

  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.07] my-3"
      style={{ fontFamily:'"Fira Code","Cascadia Code","Consolas",monospace', fontSize:"12px" }}>
      {/* title bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#1c2028] border-b border-white/[0.06]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/>
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/>
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
        </div>
        <span className="text-[10px] text-slate-600 flex-1">{lines.length} lines · Python</span>
        <button onClick={()=>{navigator.clipboard?.writeText(cleaned);setCopied(true);setTimeout(()=>setCopied(false),2000);}}
          className="text-[10px] text-slate-600 hover:text-white px-2 py-0.5 rounded border border-white/[0.07] hover:bg-white/[0.07] transition-all">
          {copied?"✓ Copied":"Copy"}
        </button>
      </div>
      {/* code area — SINGLE overflow container */}
      <div className="bg-[#0d1117] overflow-auto" style={{ maxHeight:"380px" }}>
        <div className="flex" style={{ minWidth:"max-content" }}>
          {/* gutter */}
          <div className="select-none flex-shrink-0 bg-[#0d1117] sticky left-0 z-10 py-3 text-right border-r border-white/[0.05]"
            style={{ minWidth:gutW, paddingLeft:"8px", paddingRight:"10px" }}>
            {lines.map((_,i)=>(
              <div key={i} className="text-[10px] text-slate-700 tabular-nums" style={{ lineHeight:"1.6rem", height:"1.6rem" }}>
                {i+1}
              </div>
            ))}
          </div>
          {/* code — whitespace:pre preserves ALL indentation */}
          <pre className="flex-1 py-3 pl-3 pr-8 m-0 bg-[#0d1117]"
            style={{ whiteSpace:"pre", lineHeight:"1.6rem", color:"#86efac", tabSize:4 }}>
            {lines.map((line,i)=>(
              <div key={i} style={{ minHeight:"1.6rem" }}>
                {line===""?"\u200B": hlLine(line).map((tok,j)=>
                  tok.color
                    ? <span key={j} style={{ color:tok.color, fontStyle:tok.italic?"italic":"normal" }}>{tok.text}</span>
                    : <span key={j}>{tok.text}</span>
                )}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MARKDOWN RENDERER — for concept content
// ─────────────────────────────────────────────────────────────────
function ConceptRenderer({ content }) {
  const lines = content.split("\n");
  const out   = [];
  let i = 0;

  const renderInline = (text) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((p, pi) => {
      if (p.startsWith("**") && p.endsWith("**")) return <strong key={pi} className="font-bold text-white">{p.slice(2,-2)}</strong>;
      if (p.startsWith("*")  && p.endsWith("*"))  return <em key={pi} className="italic text-white/70">{p.slice(1,-1)}</em>;
      if (p.startsWith("`")  && p.endsWith("`"))  return <code key={pi} className="font-mono text-xs bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 px-1.5 py-0.5 rounded">{p.slice(1,-1)}</code>;
      return <span key={pi}>{p}</span>;
    });
  };

  while (i < lines.length) {
    const line = lines[i];
    const tr   = line.trim();

    // code fence
    if (tr.startsWith("```")) {
      const lang = tr.slice(3).trim() || "python";
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      out.push(<CodePre key={`code-${i}`} code={codeLines.join("\n")}/>);
      i++; continue;
    }

    // H2
    if (tr.startsWith("## ")) {
      out.push(
        <div key={`h2-${i}`} className="flex items-center gap-3 mt-7 mb-3">
          <div className="h-px flex-1 bg-white/[0.06]"/>
          <h2 className="text-xs font-extrabold text-white/60 uppercase tracking-widest whitespace-nowrap">{tr.slice(3)}</h2>
          <div className="h-px flex-1 bg-white/[0.06]"/>
        </div>
      );
      i++; continue;
    }

    // H3
    if (tr.startsWith("### ")) {
      out.push(<h3 key={`h3-${i}`} className="text-sm font-bold text-white/70 mt-4 mb-1.5">{renderInline(tr.slice(4))}</h3>);
      i++; continue;
    }

    // HR
    if (tr === "---") {
      out.push(<div key={`hr-${i}`} className="my-4 h-px bg-white/[0.06]"/>);
      i++; continue;
    }

    // Blockquote
    if (tr.startsWith("> ")) {
      out.push(
        <div key={`bq-${i}`} className="my-2 flex gap-3 bg-indigo-500/8 border-l-2 border-indigo-500/50 px-4 py-3 rounded-r-xl">
          <p className="text-sm text-indigo-200/80 italic">{renderInline(tr.slice(2))}</p>
        </div>
      );
      i++; continue;
    }

    // Table
    if (tr.startsWith("|") && i+1 < lines.length && lines[i+1].trim().startsWith("|---")) {
      const headers = tr.split("|").filter(c=>c.trim()).map(c=>c.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim().split("|").filter(c=>c.trim()).map(c=>c.trim()));
        i++;
      }
      out.push(
        <div key={`tbl-${i}`} className="my-3 overflow-x-auto rounded-xl border border-white/[0.07]">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                {headers.map((h,hi)=><th key={hi} className="px-4 py-2.5 text-left font-bold text-white/40 uppercase tracking-wider text-[10px]">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {rows.map((row,ri)=>(
                <tr key={ri} className="hover:bg-white/[0.02]">
                  {row.map((cell,ci)=><td key={ci} className="px-4 py-2.5 text-white/60">{renderInline(cell)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(tr)) {
      const num = tr.match(/^(\d+)/)[1];
      const text = tr.replace(/^\d+\.\s*/, "");
      const bold = text.match(/^\*\*([^*]+)\*\*:?\s*(.*)/);
      out.push(
        <div key={`nl-${i}`} className="flex items-start gap-3 py-1.5">
          <span className="w-6 h-6 rounded-full bg-indigo-600/20 text-indigo-300 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{num}</span>
          <p className="text-sm text-white/65 leading-6 flex-1">
            {bold ? <><strong className="font-bold text-white">{bold[1]}</strong>{bold[2]?": "+bold[2]:""}</> : renderInline(text)}
          </p>
        </div>
      );
      i++; continue;
    }

    // Bullet
    if (tr.startsWith("- ") || tr.startsWith("* ")) {
      const text = tr.slice(2);
      out.push(
        <div key={`bl-${i}`} className="flex items-start gap-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0 mt-2"/>
          <p className="text-sm text-white/65 leading-6 flex-1">{renderInline(text)}</p>
        </div>
      );
      i++; continue;
    }

    // Q&A bold Q
    if (tr.startsWith("**Q")) {
      out.push(
        <div key={`qa-${i}`} className="mt-4 p-4 rounded-xl bg-white/[0.025] border border-white/[0.07]">
          <p className="text-sm font-bold text-white/85 mb-1">{renderInline(tr)}</p>
        </div>
      );
      i++; continue;
    }

    // Answer
    if (tr.startsWith("> **Answer:**")) {
      out.push(
        <div key={`ans-${i}`} className="mb-4 px-4 py-3 bg-emerald-500/5 border-l-2 border-emerald-500/30 rounded-r-xl">
          <p className="text-sm text-white/60 leading-6">{renderInline(tr.slice(2))}</p>
        </div>
      );
      i++; continue;
    }

    if (!tr) { i++; continue; }

    out.push(
      <p key={`p-${i}`} className="text-sm text-white/65 leading-6 py-0.5">{renderInline(tr)}</p>
    );
    i++;
  }

  return <div className="space-y-0.5">{out}</div>;
}

// ─────────────────────────────────────────────────────────────────
// CHAT MESSAGE
// ─────────────────────────────────────────────────────────────────
function ChatMsg({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-start gap-2.5 ${isUser?"flex-row-reverse":""}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold ${
        isUser?"bg-indigo-600 text-white":"bg-[#161b22] border border-white/10 text-white/40"}`}>
        {isUser?"U":"AI"}
      </div>
      <div className={`flex-1 max-w-[88%] ${isUser?"items-end":"items-start"} flex flex-col`}>
        {isUser ? (
          <div className="bg-indigo-600 text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm leading-6">{msg.text}</div>
        ) : (
          <div className="bg-[#161b22] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3 w-full">
            <ConceptRenderer content={msg.text}/>
          </div>
        )}
        {msg.time && <p className="text-[9px] text-white/15 px-1 mt-1">{msg.time}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// DIFF BADGE
// ─────────────────────────────────────────────────────────────────
function DiffDot({ diff }) {
  const s = DIFF[diff] || DIFF.Beginner;
  return <div className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} title={diff}/>;
}
function DiffBadge({ diff }) {
  const s = DIFF[diff] || DIFF.Beginner;
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{diff}</span>;
}

// ─────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────
export default function ConceptHub() {
  const [activeSubject,  setActiveSubject]  = useState(null);
  const [activeTopic,    setActiveTopic]    = useState(null);
  const [concept,        setConcept]        = useState("");
  const [conceptLoading, setConceptLoading] = useState(false);
  const [chatMessages,   setChatMessages]   = useState([]);
  const [chatInput,      setChatInput]      = useState("");
  const [chatLoading,    setChatLoading]    = useState(false);
  const [panel,          setPanel]          = useState("concept");
  const [diffFilter,     setDiffFilter]     = useState("All");
  const [search,         setSearch]         = useState("");
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [completed,      setCompleted]      = useState(loadCompleted);
  const chatEndRef  = useRef(null);
  const chatInputRef= useRef(null);

  const totalTopics    = SUBJECTS.reduce((a,s)=>a+s.topics.length,0);
  const totalCompleted = Object.values(completed).filter(Boolean).length;

  const searchResults = search.trim().length > 1
    ? SUBJECTS.flatMap(s=>s.topics.filter(t=>t.label.toLowerCase().includes(search.toLowerCase())).map(t=>({subject:s,topic:t}))).slice(0,10)
    : [];

  const subjectProgress = (s) => {
    const done = s.topics.filter(t=>!!completed[completedKey(s.id,t.id)]).length;
    return { done, total:s.topics.length, pct:Math.round((done/s.topics.length)*100) };
  };

  const markComplete = (s, t) => {
    const key  = completedKey(s.id, t.id);
    const next = { ...completed, [key]: !completed[key] };
    setCompleted(next);
    saveCompleted(next);
  };

  const loadConcept = async (subject, topic) => {
    setActiveSubject(subject);
    setActiveTopic(topic);
    setConcept("");
    setSidebarOpen(false);
    setChatMessages([{
      role:"ai",
      text:`Hi! I'm your AI tutor for **${topic.label}**.\n\nThe full concept explanation is in the **Concept** tab. Feel free to:\n- Ask me anything about this topic\n- Request more code examples\n- Say **"Quiz me"** for a practice question\n- Ask about edge cases or tricky parts\n\nWhat would you like to explore?`,
      time: new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
    }]);
    setConceptLoading(true);
    setPanel("concept");
    try {
      const d = await api.chat(buildConceptPrompt(subject, topic));
      setConcept(d.response || "");
    } catch { setConcept("❌ Failed to load. Please check your API key and try again."); }
    setConceptLoading(false);
  };

  const sendChat = async (text) => {
    const msg = (text || chatInput).trim();
    if (!msg || chatLoading || !activeTopic) return;
    setChatInput("");
    const userMsg = { role:"user", text:msg, time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}) };
    setChatMessages(m=>[...m,userMsg]);
    setChatLoading(true);
    setPanel("chat");
    setTimeout(()=>chatEndRef.current?.scrollIntoView({behavior:"smooth"}),100);
    try {
      const d = await api.chat(buildChatPrompt(activeSubject, activeTopic, chatMessages, msg));
      setChatMessages(m=>[...m,{role:"ai",text:d.response||"",time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}]);
    } catch {
      setChatMessages(m=>[...m,{role:"ai",text:"❌ Failed to respond. Please try again.",time:""}]);
    }
    setChatLoading(false);
    setTimeout(()=>chatEndRef.current?.scrollIntoView({behavior:"smooth"}),100);
  };

  const filteredTopics = activeSubject
    ? activeSubject.topics.filter(t=>diffFilter==="All"||t.difficulty===diffFilter)
    : [];

  // ── RENDER ────────────────────────────────────────────────────
  return (
    <DashboardLayout>
      {/*
        Key fix: we must NOT use negative margins or -mx hacks.
        Instead, fill the parent's content area completely.
        DashboardLayout's <main> is overflow-y-auto, full width.
        We use absolute positioning relative to the main area
        by making THIS root div fill 100% width and height of parent.
      */}
      <div className="flex w-full bg-[#060810]" style={{ height:"100%", minHeight:"100%" }}>

        {/* ══ INNER LEFT SIDEBAR ═══════════════════════════════════
            This is ConceptHub's own topic navigator.
            It sits INSIDE DashboardLayout's main content area.
        */}

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden" onClick={()=>setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>
          </div>
        )}

        <aside className={`
          flex-shrink-0 bg-[#0d1117] border-r border-white/[0.07] flex flex-col
          transition-all duration-200
          ${sidebarOpen
            ? "fixed top-0 left-0 z-50 h-full w-72 lg:relative lg:h-auto"
            : "hidden lg:flex lg:w-64"
          }
        `}>
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-3 border-b border-white/[0.07] flex-shrink-0">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-2.5 top-2 text-white/20 text-xs"/>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search topics..."
                className="w-full pl-7 pr-3 py-1.5 bg-white/[0.04] border border-white/[0.07] rounded-lg text-xs text-white/60 outline-none focus:border-indigo-500/40 placeholder:text-white/20"/>
            </div>
            {sidebarOpen && (
              <button onClick={()=>setSidebarOpen(false)} className="text-white/30 hover:text-white/60 lg:hidden">
                <FiX className="text-sm"/>
              </button>
            )}
          </div>

          {/* Progress strip */}
          <div className="px-4 py-2.5 border-b border-white/[0.07] flex-shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-wider">Overall Progress</span>
              <span className="text-[10px] font-bold text-indigo-400">{totalCompleted}/{totalTopics}</span>
            </div>
            <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width:`${Math.round((totalCompleted/totalTopics)*100)}%` }}/>
            </div>
          </div>

          {/* Search results */}
          {search.trim().length > 1 ? (
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-wider px-2 py-1">{searchResults.length} results</p>
              {searchResults.map(({subject,topic})=>(
                <button key={`${subject.id}-${topic.id}`}
                  onClick={()=>{setSearch("");loadConcept(subject,topic);}}
                  className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-all">
                  <span className="text-base flex-shrink-0">{subject.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white/70 truncate">{topic.label}</p>
                    <p className="text-[10px] text-white/25">{subject.label}</p>
                  </div>
                  <DiffDot diff={topic.difficulty}/>
                </button>
              ))}
            </div>
          ) : (
            /* Subject + topic list */
            <div className="flex-1 overflow-y-auto">
              {SUBJECTS.map(subject=>{
                const isActiveSub = activeSubject?.id === subject.id;
                const sc          = COLOR[subject.color] || COLOR.indigo;
                const prog        = subjectProgress(subject);
                return (
                  <div key={subject.id}>
                    {/* Subject header */}
                    <button onClick={()=>setActiveSubject(isActiveSub?null:subject)}
                      className={`w-full flex items-center gap-2.5 px-3 py-3 border-b border-white/[0.04] transition-all text-left ${isActiveSub?sc.active+" border-b-transparent":"hover:bg-white/[0.02]"}`}>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${isActiveSub?sc.icon:"bg-white/[0.04] text-white/40"}`}>
                        {subject.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold truncate ${isActiveSub?"text-white":"text-white/55"}`}>{subject.label}</p>
                        {prog.done>0 && <p className="text-[9px] text-white/25 mt-0.5">{prog.done}/{prog.total} done</p>}
                      </div>
                      <FiChevronDown className={`text-white/20 text-xs flex-shrink-0 transition-transform ${isActiveSub?"rotate-180":""}`}/>
                    </button>

                    {/* Topic list */}
                    {isActiveSub && (
                      <div className="bg-[#0a0e18] border-b border-white/[0.05]">
                        {/* Diff filter */}
                        <div className="flex gap-1 px-3 py-2">
                          {["All","Beginner","Intermediate","Advanced"].map(d=>(
                            <button key={d} onClick={()=>setDiffFilter(d)}
                              className={`text-[9px] font-bold px-2 py-0.5 rounded-full transition-all ${
                                diffFilter===d
                                  ? d==="Beginner"?"bg-emerald-500/20 text-emerald-300"
                                    :d==="Intermediate"?"bg-amber-500/20 text-amber-300"
                                    :d==="Advanced"?"bg-red-500/20 text-red-300"
                                    :"bg-indigo-600/20 text-indigo-300"
                                  :"text-white/20 hover:text-white/40"
                              }`}>{d[0]==="A"&&d!=="All"?"Adv":d[0]==="I"?"Int":d}</button>
                          ))}
                        </div>
                        {filteredTopics.map(topic=>{
                          const isActive = activeTopic?.id===topic.id;
                          const isDone   = !!completed[completedKey(subject.id,topic.id)];
                          return (
                            <button key={topic.id} onClick={()=>loadConcept(subject,topic)}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 border-b border-white/[0.03] text-left transition-all relative ${isActive?"bg-indigo-600/10":"hover:bg-white/[0.02]"}`}>
                              {isActive && <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-indigo-500 rounded-full"/>}
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${isDone?"bg-emerald-500 border-emerald-500":isActive?"border-indigo-400":"border-white/15"}`}>
                                {isDone && <FiCheck className="text-white text-[8px]"/>}
                              </div>
                              <p className={`text-[11px] flex-1 leading-tight ${isDone?"line-through text-white/25":isActive?"text-white font-semibold":"text-white/50"}`}>
                                {topic.label}
                              </p>
                              <DiffDot diff={topic.difficulty}/>
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

        {/* ══ MAIN AREA ════════════════════════════════════════════ */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {!activeTopic ? (
            /* ── HOME SCREEN ── */
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-5 py-8">
                {/* Mobile sidebar toggle */}
                <button onClick={()=>setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-2 text-xs text-white/40 hover:text-white/70 mb-6 border border-white/[0.07] px-3 py-2 rounded-xl transition-all">
                  <FiMenu className="text-sm"/> Browse Topics
                </button>

                {/* Hero */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-indigo-600/12 border border-indigo-500/20 text-indigo-300 text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-5">
                    <FiZap className="text-xs"/> AI-Powered Concept Learning
                  </div>
                  <h1 className="text-3xl font-extrabold text-white tracking-tight mb-3">
                    Learn Any CS Concept,<br/>
                    <span className="text-indigo-400">With Your Own AI Tutor</span>
                  </h1>
                  <p className="text-white/40 text-sm max-w-lg leading-relaxed">
                    Pick any topic. Get a comprehensive explanation with real code, visual models, and interview prep.
                    Then chat with your AI tutor — ask anything, get quizzed, explore edge cases.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 mb-8">
                  {[
                    { icon:"📚", label:"Subjects",  value:SUBJECTS.length },
                    { icon:"🎯", label:"Topics",    value:totalTopics     },
                    { icon:"✅", label:"Completed", value:totalCompleted  },
                    { icon:"📈", label:"Progress",  value:`${Math.round((totalCompleted/totalTopics)*100)}%` },
                  ].map((s,i)=>(
                    <div key={i} className="rounded-2xl border border-white/[0.07] bg-[#0d1117] p-4 text-center">
                      <div className="text-xl mb-1.5">{s.icon}</div>
                      <p className="text-xl font-extrabold text-indigo-400 tabular-nums">{s.value}</p>
                      <p className="text-[10px] text-white/25 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Subject grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SUBJECTS.map(subject=>{
                    const sc   = COLOR[subject.color]||COLOR.indigo;
                    const prog = subjectProgress(subject);
                    return (
                      <button key={subject.id} onClick={()=>setActiveSubject(subject)}
                        className={`text-left p-5 rounded-2xl border border-white/[0.07] bg-[#0d1117] transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20 ${sc.card}`}>
                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl mb-4 ${sc.icon}`}>
                          {subject.emoji}
                        </div>
                        <h3 className="font-extrabold text-white text-sm leading-tight mb-1.5">{subject.label}</h3>
                        <p className="text-[11px] text-white/35 leading-4 mb-4">{subject.desc}</p>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] text-white/20">{prog.done}/{prog.total}</span>
                          <span className="text-[9px] text-white/20">{prog.pct}%</span>
                        </div>
                        <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${sc.bar}`} style={{width:`${prog.pct}%`}}/>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* How it works */}
                <div className="mt-8 p-6 rounded-2xl border border-white/[0.07] bg-[#0d1117]">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">How It Works</p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { icon:"1️⃣", title:"Pick a Topic", desc:"Choose any subject and topic from the left sidebar." },
                      { icon:"2️⃣", title:"Read & Learn", desc:"Get explanation with code examples, visual models, and interview Q&A." },
                      { icon:"3️⃣", title:"Chat with AI", desc:"Ask follow-up questions, request a quiz, go deeper — 24/7 tutor." },
                    ].map((s,i)=>(
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
            /* ── TOPIC LEARNING SCREEN ── */
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] bg-[#0d1117] flex-shrink-0">
                {/* Mobile: toggle sidebar */}
                <button onClick={()=>setSidebarOpen(true)}
                  className="lg:hidden text-white/30 hover:text-white/60 transition-colors">
                  <FiMenu className="text-sm"/>
                </button>
                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 text-xs text-white/30 flex-1 min-w-0">
                  <span className="text-base flex-shrink-0">{activeSubject.emoji}</span>
                  <span className="truncate hidden sm:block">{activeSubject.label}</span>
                  <FiArrowRight className="text-white/15 flex-shrink-0 text-xs"/>
                  <span className="font-bold text-white/70 truncate">{activeTopic.label}</span>
                </div>
                {/* Panel tabs */}
                <div className="flex items-center gap-1 bg-white/[0.04] rounded-lg p-0.5 flex-shrink-0">
                  <button onClick={()=>setPanel("concept")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ${panel==="concept"?"bg-indigo-600 text-white":"text-white/30 hover:text-white/60"}`}>
                    <FiBookOpen className="text-[10px]"/> Concept
                  </button>
                  <button onClick={()=>setPanel("chat")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold transition-all ${panel==="chat"?"bg-indigo-600 text-white":"text-white/30 hover:text-white/60"}`}>
                    <FiZap className="text-[10px]"/> Chat
                    {chatMessages.length>1 && <span className="bg-indigo-500/30 text-indigo-300 text-[8px] font-bold px-1.5 py-0.5 rounded-full">{chatMessages.length}</span>}
                  </button>
                </div>
                {/* Mark done */}
                <button onClick={()=>markComplete(activeSubject,activeTopic)}
                  className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all flex-shrink-0 ${
                    completed[completedKey(activeSubject.id,activeTopic.id)]
                      ?"bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                      :"bg-white/[0.03] border-white/[0.07] text-white/30 hover:border-white/20"}`}>
                  <FiCheck className="text-xs"/>
                  <span className="hidden sm:inline">{completed[completedKey(activeSubject.id,activeTopic.id)]?"Done ✓":"Mark Done"}</span>
                </button>
              </div>

              {/* CONCEPT PANEL */}
              {panel === "concept" && (
                <div className="flex-1 overflow-y-auto">
                  {conceptLoading ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4">
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"/>
                        <div className="absolute inset-3 border-2 border-violet-500/20 border-b-violet-500 rounded-full animate-spin" style={{animationDirection:"reverse"}}/>
                      </div>
                      <p className="text-white/40 text-sm font-medium">Generating concept explanation...</p>
                    </div>
                  ) : concept ? (
                    <div className="px-5 py-6 max-w-3xl">
                      <div className="flex items-center gap-2 mb-5 flex-wrap">
                        <DiffBadge diff={activeTopic.difficulty}/>
                        <span className="text-[10px] text-white/20">{activeSubject.label}</span>
                      </div>
                      <h1 className="text-2xl font-extrabold text-white tracking-tight mb-5">{activeTopic.label}</h1>
                      <ConceptRenderer content={concept}/>
                      {/* Chat CTA */}
                      <div className="mt-8 p-4 rounded-xl bg-indigo-600/8 border border-indigo-500/15 flex items-center gap-4">
                        <div className="w-9 h-9 bg-indigo-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                          <FiZap className="text-indigo-400 text-sm"/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-indigo-300 mb-0.5">Have questions?</p>
                          <p className="text-[11px] text-white/30">Chat with your AI tutor — quiz, examples, deeper explanation</p>
                        </div>
                        <button onClick={()=>setPanel("chat")}
                          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors flex-shrink-0">
                          Open Chat →
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64">
                      <p className="text-white/20 text-sm">Select a topic to start learning</p>
                    </div>
                  )}
                </div>
              )}

              {/* CHAT PANEL */}
              {panel === "chat" && (
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {chatMessages.map((msg,i)=><ChatMsg key={i} msg={msg}/>)}
                    {chatLoading && (
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#161b22] border border-white/10 flex items-center justify-center text-[10px] text-white/40 flex-shrink-0">AI</div>
                        <div className="bg-[#161b22] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3">
                          <div className="flex gap-1.5">
                            {[0,1,2].map(i=><div key={i} className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay:`${i*150}ms`}}/>)}
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef}/>
                  </div>

                  {/* Quick question chips */}
                  {chatMessages.length<=2 && activeTopic && (
                    <div className="px-4 pb-2 flex gap-2 overflow-x-auto flex-shrink-0">
                      {getQuickQuestions(activeSubject,activeTopic).map((q,i)=>(
                        <button key={i} onClick={()=>sendChat(q)}
                          className="flex-shrink-0 text-[11px] bg-white/[0.04] border border-white/[0.08] text-white/45 hover:text-white/70 hover:border-indigo-500/30 px-3 py-2 rounded-xl transition-all max-w-[220px] truncate">
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Chat input */}
                  <div className="border-t border-white/[0.07] px-4 py-3 flex-shrink-0 bg-[#0d1117]">
                    <div className="flex items-end gap-2 bg-[#161b22] border border-white/[0.07] rounded-2xl px-4 py-2.5 focus-within:border-indigo-500/40 transition-colors">
                      <textarea ref={chatInputRef} value={chatInput}
                        onChange={e=>setChatInput(e.target.value)}
                        onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat();}}}
                        placeholder={`Ask anything about ${activeTopic?.label}...`}
                        rows={1}
                        className="flex-1 bg-transparent text-white/80 text-sm outline-none resize-none placeholder:text-white/15 leading-6 max-h-28 overflow-y-auto"
                        style={{ minHeight:"24px" }}
                      />
                      <button onClick={()=>sendChat()} disabled={!chatInput.trim()||chatLoading}
                        className="w-8 h-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-all disabled:opacity-30 flex-shrink-0">
                        <FiSend className="text-white text-xs"/>
                      </button>
                    </div>
                    <p className="text-[9px] text-white/15 text-center mt-1.5">Enter to send · Shift+Enter for new line</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

