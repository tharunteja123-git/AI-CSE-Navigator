import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { 
  FiArrowLeft, 
  FiChevronRight, 
  FiBookOpen, 
  FiZap, 
  FiRefreshCw, 
  FiSend 
} from "react-icons/fi";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";

// ─────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "languages",
    label: "Programming Languages",
    emoji: "💻",
    color: "from-indigo-500 to-blue-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    text: "text-indigo-700",
    topics: [
      { id: "python", label: "Python", emoji: "🐍", desc: "Most popular for AI/ML & backend" },
      { id: "javascript", label: "JavaScript", emoji: "🟨", desc: "Web frontend & Node.js backend" },
      { id: "java", label: "Java", emoji: "☕", desc: "Enterprise & Android development" },
      { id: "cpp", label: "C++", emoji: "⚙️", desc: "Competitive programming & systems" },
      { id: "sql", label: "SQL", emoji: "🗄️", desc: "Database querying & management" },
      { id: "typescript", label: "TypeScript", emoji: "🔷", desc: "Typed JavaScript for large apps" },
      { id: "go", label: "Go (Golang)", emoji: "🐹", desc: "Fast backend & microservices" },
      { id: "rust", label: "Rust", emoji: "🦀", desc: "Systems programming & performance" },
    ],
  },
  {
    id: "cs_subjects",
    label: "CS Core Subjects",
    emoji: "📚",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
    topics: [
      { id: "dsa", label: "Data Structures & Algorithms", emoji: "🧩", desc: "Arrays, Trees, Graphs, DP" },
      { id: "dbms", label: "DBMS", emoji: "🗃️", desc: "Normalization, Transactions, SQL" },
      { id: "os", label: "Operating Systems", emoji: "🖥️", desc: "Processes, Memory, Scheduling" },
      { id: "cn", label: "Computer Networks", emoji: "🌐", desc: "TCP/IP, HTTP, DNS, OSI Model" },
      { id: "oop", label: "OOP Concepts", emoji: "🏗️", desc: "Classes, Inheritance, Polymorphism" },
      { id: "system_design", label: "System Design", emoji: "🏛️", desc: "Scalability, Load Balancing, Caching" },
      { id: "compiler", label: "Compiler Design", emoji: "🔧", desc: "Lexing, Parsing, Code Generation" },
      { id: "coa", label: "Computer Organization", emoji: "🔌", desc: "CPU, Memory, I/O Architecture" },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & Tools",
    emoji: "🛠️",
    color: "from-cyan-500 to-teal-600",
    bg: "bg-cyan-50",
    border: "border-cyan-200",
    text: "text-cyan-700",
    topics: [
      { id: "react", label: "React.js", emoji: "⚛️", desc: "UI library for web apps" },
      { id: "fastapi", label: "FastAPI", emoji: "🚀", desc: "Modern Python web framework" },
      { id: "nodejs", label: "Node.js", emoji: "🟢", desc: "JavaScript runtime for backend" },
      { id: "django", label: "Django", emoji: "🎸", desc: "Full-featured Python web framework" },
      { id: "docker", label: "Docker", emoji: "🐳", desc: "Containerization & deployment" },
      { id: "git", label: "Git & GitHub", emoji: "🐙", desc: "Version control & collaboration" },
      { id: "mongodb", label: "MongoDB", emoji: "🍃", desc: "NoSQL document database" },
      { id: "redis", label: "Redis", emoji: "🔴", desc: "In-memory cache & data store" },
    ],
  },
  {
    id: "ai_ml",
    label: "AI / ML & Data",
    emoji: "🤖",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    topics: [
      { id: "ml_basics", label: "Machine Learning", emoji: "🧠", desc: "Supervised, Unsupervised, Algorithms" },
      { id: "deep_learning", label: "Deep Learning", emoji: "🔬", desc: "Neural Networks, CNN, RNN" },
      { id: "nlp", label: "NLP & LLMs", emoji: "💬", desc: "Transformers, BERT, GPT, RAG" },
      { id: "langchain", label: "LangChain", emoji: "⛓️", desc: "Building AI apps with LLMs" },
      { id: "pandas", label: "Pandas & NumPy", emoji: "🐼", desc: "Data manipulation & analysis" },
      { id: "sklearn", label: "Scikit-learn", emoji: "📊", desc: "Classical ML algorithms in Python" },
      { id: "data_viz", label: "Data Visualization", emoji: "📈", desc: "Matplotlib, Seaborn, Plotly" },
      { id: "mlops", label: "MLOps", emoji: "⚙️", desc: "ML deployment, monitoring, CI/CD" },
    ],
  },
];

const SUB_TOPICS = {
  python: ["Variables & Data Types", "Control Flow", "Functions & Lambdas", "OOP in Python", "List Comprehensions", "Decorators", "Generators & Iterators", "File Handling", "Exception Handling", "Modules & Packages", "Async/Await", "Type Hints", "Regular Expressions", "Memory Management", "Interview Q&A"],
  javascript: ["Variables & Scope", "Functions & Arrow Functions", "DOM Manipulation", "Promises & Async/Await", "ES6+ Features", "Prototypes & Classes", "Event Loop", "Closures", "Destructuring", "Modules (ESM)", "Error Handling", "Web APIs", "TypeScript Basics", "Interview Q&A"],
  java: ["Java Basics & Syntax", "OOP in Java", "Collections Framework", "Multithreading", "Exception Handling", "Java 8 Features (Streams)", "Generics", "JDBC & Databases", "Design Patterns", "Spring Boot Basics", "Interview Q&A"],
  cpp: ["Syntax & Basics", "Pointers & References", "OOP in C++", "STL (Standard Template Library)", "Memory Management", "Templates", "File I/O", "Competitive Programming Tips", "Interview Q&A"],
  sql: ["SELECT & Filtering", "JOINs (INNER, LEFT, RIGHT, FULL)", "GROUP BY & Aggregations", "Subqueries", "Window Functions", "Indexes & Performance", "Stored Procedures", "Transactions & ACID", "Normalization", "SQL Interview Q&A"],
  typescript: ["Types & Interfaces", "Generics", "Union & Intersection Types", "Classes & Decorators", "Utility Types", "TypeScript with React", "Interview Q&A"],
  go: ["Go Basics & Syntax", "Goroutines & Concurrency", "Channels", "Interfaces", "Error Handling", "Go Modules", "REST API with Go", "Interview Q&A"],
  rust: ["Ownership & Borrowing", "Lifetimes", "Structs & Enums", "Pattern Matching", "Concurrency in Rust", "Error Handling", "Interview Q&A"],
  dsa: ["Arrays & Strings", "Linked Lists", "Stacks & Queues", "Trees & BST", "Graphs", "Dynamic Programming", "Recursion & Backtracking", "Sorting Algorithms", "Binary Search", "Hashing", "Heaps & Priority Queue", "Tries", "Union Find", "Time & Space Complexity"],
  dbms: ["Relational Model", "ER Diagrams", "Normalization (1NF-BCNF)", "SQL Joins & Subqueries", "Transactions & ACID", "Indexing & B-Trees", "Concurrency Control", "Deadlocks", "NoSQL vs SQL", "Interview Q&A"],
  os: ["Process vs Thread", "CPU Scheduling Algorithms", "Memory Management", "Virtual Memory & Paging", "Deadlocks", "File Systems", "IPC Mechanisms", "Semaphores & Mutex", "Interview Q&A"],
  cn: ["OSI Model (7 Layers)", "TCP vs UDP", "IP Addressing & Subnetting", "HTTP/HTTPS & REST", "DNS & DHCP", "Routing Algorithms", "Firewalls & Security", "What happens when you type google.com", "Interview Q&A"],
  oop: ["Classes & Objects", "Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "SOLID Principles", "Design Patterns (Creational)", "Design Patterns (Structural)", "Design Patterns (Behavioral)", "Interview Q&A"],
  system_design: ["Scalability Basics", "Load Balancing", "Caching Strategies", "Database Sharding", "CAP Theorem", "Message Queues", "Microservices vs Monolith", "Design: URL Shortener", "Design: Twitter Feed", "Design: Chat System"],
  compiler: ["Lexical Analysis", "Syntax Analysis & Parsing", "Semantic Analysis", "Intermediate Code Generation", "Code Optimization", "Code Generation", "Symbol Table"],
  coa: ["Number Systems", "Boolean Algebra", "CPU Architecture", "Instruction Set Architecture", "Memory Hierarchy", "Cache Memory", "Pipelining", "I/O Organization"],
  react: ["JSX & Components", "Props & State", "Hooks (useState, useEffect)", "Custom Hooks", "Context API", "React Router", "Performance Optimization", "Redux Basics", "Testing React Apps", "Interview Q&A"],
  fastapi: ["FastAPI Basics", "Path & Query Parameters", "Request Body & Pydantic", "Authentication & JWT", "Database with SQLAlchemy", "Background Tasks", "WebSockets", "Testing FastAPI", "Deployment", "Interview Q&A"],
  nodejs: ["Node.js Basics", "Event Loop & Async", "Express.js Framework", "Middleware", "REST API Design", "Authentication", "File System", "Streams", "Interview Q&A"],
  django: ["Django Basics & MVT", "Models & ORM", "Views & URLs", "Templates", "Django REST Framework", "Authentication", "Admin Panel", "Deployment", "Interview Q&A"],
  docker: ["Containers vs VMs", "Docker Images & Containers", "Dockerfile", "Docker Compose", "Networking in Docker", "Volumes & Data Persistence", "Docker Hub", "Docker in CI/CD", "Interview Q&A"],
  git: ["Git Basics (init, add, commit)", "Branching & Merging", "Remote Repositories", "Pull Requests & Code Review", "Git Rebase vs Merge", "Resolving Conflicts", "Git Hooks", "GitHub Actions CI/CD", "Interview Q&A"],
  mongodb: ["MongoDB Basics", "CRUD Operations", "Schema Design", "Aggregation Pipeline", "Indexes", "Transactions", "MongoDB with Python (PyMongo)", "Interview Q&A"],
  redis: ["Redis Data Structures", "Caching Strategies", "Pub/Sub Messaging", "Redis Persistence", "Redis with Python", "Use Cases in Production", "Interview Q&A"],
  ml_basics: ["Types of ML (Supervised/Unsupervised)", "Linear Regression", "Logistic Regression", "Decision Trees & Random Forests", "SVM", "K-Means Clustering", "Model Evaluation Metrics", "Overfitting & Regularization", "Feature Engineering", "Interview Q&A"],
  deep_learning: ["Neural Network Basics", "Activation Functions", "Backpropagation", "CNNs (Image Recognition)", "RNNs & LSTMs", "Transfer Learning", "GANs", "Attention Mechanism", "Interview Q&A"],
  nlp: ["Text Preprocessing", "TF-IDF & Word Embeddings", "Transformers Architecture", "BERT & GPT", "RAG (Retrieval Augmented Generation)", "Fine-tuning LLMs", "Prompt Engineering", "LangChain Basics", "Interview Q&A"],
  langchain: ["LangChain Overview", "LLMs & Chat Models", "Prompt Templates", "Chains", "Agents & Tools", "Memory", "RAG with ChromaDB", "LangChain + FastAPI", "Interview Q&A"],
  pandas: ["Series & DataFrame Basics", "Data Loading (CSV, Excel, JSON)", "Data Cleaning & Missing Values", "GroupBy & Aggregations", "Merging & Joining DataFrames", "NumPy Arrays", "Broadcasting", "Performance Tips", "Interview Q&A"],
  sklearn: ["Data Preprocessing", "Train/Test Split", "Linear Models", "Tree-based Models", "Model Evaluation", "Pipelines", "Hyperparameter Tuning", "Interview Q&A"],
  data_viz: ["Matplotlib Basics", "Seaborn for Statistical Plots", "Plotly Interactive Charts", "Dashboard Design", "Best Practices", "Interview Q&A"],
  mlops: ["ML Lifecycle", "MLflow Experiment Tracking", "Model Deployment with FastAPI", "Docker for ML", "CI/CD for ML", "Monitoring in Production", "Interview Q&A"],
};

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function ConceptHub() {
  const [step, setStep] = useState("category"); // category | topic | subtopic | learn
  const [selCategory, setSelCategory] = useState(null);
  const [selTopic, setSelTopic] = useState(null);
  const [selSubtopic, setSelSubtopic] = useState(null);
  const [concept, setConcept] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const getCategoryData = (id) => CATEGORIES.find((c) => c.id === id);
  const getTopicData = (catId, topicId) =>
    getCategoryData(catId)?.topics.find((t) => t.id === topicId);

  const pickCategory = (cat) => {
    setSelCategory(cat.id);
    setStep("topic");
  };

  const pickTopic = (topic) => {
    setSelTopic(topic.id);
    setStep("subtopic");
  };

  const pickSubtopic = async (sub) => {
    setSelSubtopic(sub);
    setStep("learn");
    setConcept("");
    setChatMessages([]);
    await loadConcept(sub);
  };

  const loadConcept = async (sub) => {
    setLoading(true);
    const cat = getCategoryData(selCategory);
    const topic = getTopicData(selCategory, selTopic);
    try {
      const data = await api.chat(
        `You are an expert CS teacher and senior software engineer. 
Teach me about: "${sub}" in the context of ${topic?.label} (${cat?.label})

Structure your response EXACTLY like this with proper markdown:

## 🎯 What is ${sub}?
[Clear, simple 2-3 line explanation. No jargon. Imagine explaining to a smart beginner.]

## 🧠 Why does it matter?
[Real-world use case. Why do developers actually need this? 2-3 sentences.]

## 📖 Core Concepts
[Explain the key ideas step by step. Use numbered lists. Cover fundamentals first.]

## 💻 Code Examples
[Provide 2-3 progressive code examples from simple to complex. Use proper code blocks with language tags. Add inline comments explaining each line.]

## ⚡ Beginner → Advanced Progression
**Beginner:** [what a beginner should know]
**Intermediate:** [what an intermediate should know]
**Advanced:** [what an advanced developer knows]

## 🎯 Common Interview Questions
[List 5 real interview questions with brief answers on this topic]

## ⚠️ Common Mistakes
[3-4 common mistakes beginners make and how to avoid them]

## 🔗 What to Learn Next
[2-3 related topics to study after this one]

Make it comprehensive, practical, and excellent quality. Use real code examples that actually work.`
      );
      setConcept(data.response || "");
    } catch {
      setConcept("❌ Failed to load concept. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim();
    setChatInput("");
    const cat = getCategoryData(selCategory);
    const topic = getTopicData(selCategory, selTopic);
    setChatMessages((m) => [...m, { role: "user", text: msg }]);
    setChatLoading(true);
    try {
      const data = await api.chat(
        `You are an expert teacher on ${topic?.label} (${cat?.label}).
Context: We are discussing the topic "${selSubtopic}".
Student question: ${msg}
Give a clear, helpful, practical answer with code examples if relevant.`
      );
      setChatMessages((m) => [...m, { role: "ai", text: data.response }]);
    } catch {
      setChatMessages((m) => [...m, { role: "ai", text: "❌ Failed to get answer. Try again." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const goBack = () => {
    if (step === "topic") {
      setStep("category");
      setSelCategory(null);
    } else if (step === "subtopic") {
      setStep("topic");
      setSelTopic(null);
    } else if (step === "learn") {
      setStep("subtopic");
      setSelSubtopic(null);
      setConcept("");
      setChatMessages([]);
    }
  };

  const cat = getCategoryData(selCategory);
  const topic = getTopicData(selCategory, selTopic);

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          {step !== "category" && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium border border-slate-200 px-3 py-2 rounded-xl hover:border-indigo-300"
            >
              <FiArrowLeft /> Back
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">📚 Concept Hub</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {step === "category" && "Pick a category to start learning"}
              {step === "topic" && `Category: ${cat?.label}`}
              {step === "subtopic" && `${cat?.label} → ${topic?.label}`}
              {step === "learn" && `${topic?.label} → ${selSubtopic}`}
            </p>
          </div>
        </div>

        {/* Breadcrumb */}
        {step !== "category" && (
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
            <button
              onClick={() => {
                setStep("category");
                setSelCategory(null);
                setSelTopic(null);
              }}
              className="hover:text-indigo-600"
            >
              All Categories
            </button>
            {selCategory && (
              <>
                <FiChevronRight />
                <button
                  onClick={() => {
                    setStep("topic");
                    setSelTopic(null);
                  }}
                  className="hover:text-indigo-600"
                >
                  {cat?.label}
                </button>
              </>
            )}
            {selTopic && (
              <>
                <FiChevronRight />
                <button onClick={() => setStep("subtopic")} className="hover:text-indigo-600">
                  {topic?.label}
                </button>
              </>
            )}
            {selSubtopic && (
              <>
                <FiChevronRight />
                <span className="text-indigo-600 font-medium">{selSubtopic}</span>
              </>
            )}
          </div>
        )}

        {/* ── STEP 1: Category Selection ── */}
        {step === "category" && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => pickCategory(cat)}
                  className="group text-left p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm`}
                  >
                    {cat.emoji}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{cat.label}</h3>
                  <p className="text-slate-500 text-sm mb-3">
                    {cat.topics.length} topics available
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.topics.slice(0, 4).map((t) => (
                      <span
                        key={t.id}
                        className={`text-xs px-2 py-0.5 rounded-full ${cat.bg} ${cat.text} font-medium`}
                      >
                        {t.emoji} {t.label}
                      </span>
                    ))}
                    {cat.topics.length > 4 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                        +{cat.topics.length - 4} more
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: Topic Selection ── */}
        {step === "topic" && cat && (
          <div>
            <div className={`p-4 rounded-2xl bg-gradient-to-r ${cat.color} text-white mb-6`}>
              <p className="font-bold text-lg">
                {cat.emoji} {cat.label}
              </p>
              <p className="text-white/80 text-sm mt-1">Select a topic to explore its concepts</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {cat.topics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => pickTopic(topic)}
                  className="group text-left p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{topic.emoji}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{topic.label}</h3>
                      <p className="text-slate-500 text-sm">{topic.desc}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-indigo-600">
                        <FiBookOpen className="text-xs" />
                        <span>{(SUB_TOPICS[topic.id] || []).length} sub-topics</span>
                      </div>
                    </div>
                    <FiChevronRight className="text-slate-300 group-hover:text-indigo-500 transition-colors mt-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 3: Sub-topic Selection ── */}
        {step === "subtopic" && topic && (
          <div>
            <div className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl mb-6">
              <span className="text-4xl">{topic.emoji}</span>
              <div>
                <h2 className="font-bold text-slate-900 text-xl">{topic.label}</h2>
                <p className="text-slate-500 text-sm mt-0.5">{topic.desc}</p>
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-600 mb-4">
              Choose a concept to learn — AI will generate a complete explanation with code examples:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(SUB_TOPICS[selTopic] || []).map((sub, i) => (
                <button
                  key={sub}
                  onClick={() => pickSubtopic(sub)}
                  className="group flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm transition-all text-left"
                >
                  <span className="w-7 h-7 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700">
                    {sub}
                  </span>
                  <FiZap className="ml-auto text-slate-200 group-hover:text-indigo-400 transition-colors flex-shrink-0 text-xs" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 4: Concept Learning View ── */}
        {step === "learn" && (
          <div className="space-y-5">
            {/* Topic badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{topic?.emoji}</span>
                <div>
                  <span
                    className={`badge text-xs ${cat?.bg} ${cat?.text} font-semibold px-3 py-1`}
                  >
                    {topic?.label}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1">{selSubtopic}</h2>
                </div>
              </div>
              <button
                onClick={() => loadConcept(selSubtopic)}
                disabled={loading}
                className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 px-3 py-2 rounded-xl hover:border-indigo-300 hover:text-indigo-600 transition-all disabled:opacity-40"
              >
                <FiRefreshCw className={loading ? "animate-spin" : ""} /> Regenerate
              </button>
            </div>

            {/* Concept content */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                  <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-5" />
                  <p className="text-slate-600 font-semibold">AI is generating your concept...</p>
                  <p className="text-slate-400 text-sm mt-1">
                    Building a complete explanation with code examples
                  </p>
                  <div className="flex gap-2 mt-5">
                    {["Concepts", "Code Examples", "Interview Q&A", "Common Mistakes"].map((l) => (
                      <span
                        key={l}
                        className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full animate-pulse"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 lg:p-8">
                  <div
                    className="prose prose-slate max-w-none
                    prose-headings:text-slate-900 prose-headings:font-bold
                    prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100
                    prose-h3:text-base prose-h3:mt-5 prose-h3:mb-2
                    prose-p:text-slate-600 prose-p:leading-7
                    prose-li:text-slate-600 prose-li:leading-6
                    prose-strong:text-slate-800
                    prose-code:bg-indigo-50 prose-code:text-indigo-700 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:shadow-lg
                    prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50 prose-blockquote:rounded-r-xl prose-blockquote:not-italic"
                  >
                    <ReactMarkdown>{concept}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* Subtopic navigation */}
            {!loading && (
              <div className="bg-white border border-slate-100 rounded-2xl p-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  More topics in {topic?.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(SUB_TOPICS[selTopic] || []).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => pickSubtopic(sub)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                        sub === selSubtopic
                          ? `${cat?.bg} ${cat?.text} font-bold`
                          : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Ask AI section */}
            {!loading && (
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-violet-50">
                  <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-lg">
                    🤖
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Ask AI About This Topic</p>
                    <p className="text-slate-500 text-xs">
                      Have doubts? Ask follow-up questions about {selSubtopic}
                    </p>
                  </div>
                </div>

                {/* Chat messages */}
                {chatMessages.length > 0 && (
                  <div className="px-5 py-4 space-y-4 max-h-80 overflow-y-auto border-b border-slate-100">
                    {chatMessages.map((m, i) => (
                      <div
                        key={i}
                        className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                            m.role === "user"
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-50 border border-slate-200 text-slate-800"
                          }`}
                        >
                          {m.role === "ai" ? (
                            <div className="prose prose-sm max-w-none">
                              <ReactMarkdown>{m.text}</ReactMarkdown>
                            </div>
                          ) : (
                            m.text
                          )}
                        </div>
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="flex justify-start">
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex gap-1">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                              style={{ animationDelay: `${i * 0.15}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={chatBottomRef} />
                  </div>
                )}

                {/* Suggested questions */}
                {chatMessages.length === 0 && (
                  <div className="px-5 py-4 border-b border-slate-100">
                    <p className="text-xs text-slate-400 mb-3">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        `What are common mistakes with ${selSubtopic}?`,
                        `Give me a real-world example of ${selSubtopic}`,
                        `How is ${selSubtopic} used in interviews?`,
                        `Explain ${selSubtopic} with a simple analogy`,
                      ].map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            setChatInput(q);
                          }}
                          className="text-xs bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all text-left"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="flex gap-3 p-4">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendChat()}
                    className="flex-1 input text-sm"
                    placeholder={`Ask anything about ${selSubtopic}...`}
                  />
                  <button
                    onClick={sendChat}
                    disabled={chatLoading || !chatInput.trim()}
                    className="btn-primary px-4 disabled:opacity-50 flex items-center gap-2"
                  >
                    <FiSend />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}




