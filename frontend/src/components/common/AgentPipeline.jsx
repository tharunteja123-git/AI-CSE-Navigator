import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const CSE_MESSAGES = [
  'Received: "Analyze my career profile and suggest roadmap..."',
  "Chunking profile → 312 tokens → 4 embeddings generated",
  "Vector search complete: 5 chunks, avg cosine sim 0.91",
  "Injecting context into prompt template (1,104 tokens)",
  "LLM inference: 3 tool calls dispatched in parallel",
  "Tool: career_advisor → roadmap generated, 8 milestones",
  "Tool: skill_analyzer → 6 gaps identified, resources mapped",
  "Tool: job_matcher → 14 roles matched from database",
  "Workflow complete. 3 actions dispatched in 287ms.",
  "Idle. Listening for next query...",
]

const INTERVIEW_MESSAGES = [
  'Received: "Generate interview question for Full Stack role..."',
  "Analyzing role requirements → 5 skills identified",
  "Retrieving question bank → 847 DSA problems indexed",
  "LLM inference: crafting personalized question...",
  "Tool: difficulty_calibrator → Medium level selected",
  "Tool: hint_generator → 3 progressive hints ready",
  "Tool: answer_evaluator → rubric initialized",
  "Question generated: Two Pointer pattern, O(n) expected",
  "Workflow complete. Ready to evaluate your answer.",
  "Idle. Waiting for your response...",
]

const RESUME_MESSAGES = [
  'Received: "Analyze resume for Software Engineer position..."',
  "Parsing resume → 1,247 tokens extracted",
  "Vector search: matching against 500+ job descriptions",
  "ATS scan complete: 23 keywords checked",
  "Tool: ats_scorer → calculating compatibility score...",
  "Tool: keyword_extractor → 8 missing keywords found",
  "Tool: section_analyzer → feedback for 5 sections ready",
  "Tool: improvement_suggester → 6 actionable items queued",
  "Analysis complete. ATS Score: 74/100 generated.",
  "Idle. Awaiting next resume upload...",
]

function AnimatedDot({ path, duration, delay, size, opacity }) {
  return (
    <circle r={size} fill="#6366f1" opacity={opacity}>
      <animateMotion
        dur={`${duration}s`}
        repeatCount="indefinite"
        begin={`${delay}s`}
        path={path}
      />
    </circle>
  )
}

function PulsingDot({ cx, cy, color, duration, delay = 0 }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={2.8}
      fill={color}
      animate={{ opacity: [0.15, 1, 0.15] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  )
}

function StatusIndicator({ cx, cy, color, pulsing = false, duration = 1.9, delay = 0 }) {
  if (pulsing) {
    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={3}
        fill={color}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      />
    )
  }
  return <circle cx={cx} cy={cy} r={3} fill={color} opacity={0.95} />
}

export default function AgentPipeline({ variant = "career", className = "" }) {
  const messages =
    variant === "interview"
      ? INTERVIEW_MESSAGES
      : variant === "resume"
      ? RESUME_MESSAGES
      : CSE_MESSAGES

  const [messageIndex, setMessageIndex] = useState(0)
  const [queries, setQueries] = useState(
    variant === "interview" ? 3841 : variant === "resume" ? 2156 : 1247
  )

  const label =
    variant === "interview"
      ? "INTERVIEW AI · LIVE"
      : variant === "resume"
      ? "RESUME ANALYZER · LIVE"
      : "CAREER AGENT · LIVE"

  const toolLabel =
    variant === "interview"
      ? "3 agents · 0 errors"
      : variant === "resume"
      ? "4 agents · 0 errors"
      : "3 agents · 0 errors"

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length)
    }, 2700)
    const queryInterval = setInterval(() => {
      setQueries((prev) => prev + 1)
    }, 7200)
    return () => {
      clearInterval(messageInterval)
      clearInterval(queryInterval)
    }
  }, [messages.length])

  const paths = {
    p1: "M116,88 L158,88",
    p2: "M268,88 L306,88",
    p3: "M411,88 C425,88 435,50 448,50",
    p4: "M411,88 L448,88",
    p5: "M411,88 C425,88 435,126 448,126",
  }

  const accentColor = "#6366f1"
  const greenColor = "#22c55e"
  const yellowColor = "#eab308"

  return (
    <div className={`bg-[#090909] border border-white/[0.08] rounded-2xl overflow-hidden font-mono w-full ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] text-white/30 tracking-widest">{label}</span>
        </div>
        <span className="text-[10px] text-white/20">{toolLabel}</span>
      </div>

      {/* SVG Pipeline Visualization */}
      <svg width="100%" viewBox="0 0 580 172" className="block">
        <defs>
          <marker id={`ma-${variant}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,2 L8,5 L0,8 Z" fill={`${accentColor}55`} />
          </marker>
          <filter id={`glow-${variant}`}>
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines */}
        {[paths.p1, paths.p2, paths.p3, paths.p4, paths.p5].map((d, i) => (
          <path key={i} d={d} stroke={`${accentColor}22`} strokeWidth="1.2" fill="none" markerEnd={`url(#ma-${variant})`} />
        ))}

        {/* Animated dots on paths */}
        <AnimatedDot path={paths.p1} duration={1.2} delay={0} size={2.2} opacity={0.9} />
        <AnimatedDot path={paths.p2} duration={1.4} delay={0.3} size={2.2} opacity={0.9} />
        <AnimatedDot path={paths.p3} duration={1.3} delay={0.1} size={2} opacity={0.8} />
        <AnimatedDot path={paths.p4} duration={1.5} delay={0.5} size={2} opacity={0.8} />
        <AnimatedDot path={paths.p5} duration={1.4} delay={0.2} size={2} opacity={0.8} />

        {/* ── NODE 1: Input ── */}
        <rect x="28" y="62" width="88" height="52" rx="9" fill="#111" stroke={`${accentColor}30`} strokeWidth="1" />
        <text x="72" y="82" textAnchor="middle" fill="white" fontSize="9" opacity="0.5" fontFamily="monospace">INPUT</text>
        <rect x="38" y="88" width="68" height="16" rx="4" fill={`${accentColor}15`} />
        <text x="72" y="100" textAnchor="middle" fill={accentColor} fontSize="8" fontFamily="monospace">USER QUERY</text>
        <StatusIndicator cx="103" cy="66" color={greenColor} pulsing={true} duration={1.8} />

        {/* ── NODE 2: Orchestrator ── */}
        <rect x="158" y="55" width="110" height="66" rx="9" fill="#111" stroke={`${accentColor}40`} strokeWidth="1.2" />
        <text x="213" y="74" textAnchor="middle" fill="white" fontSize="9" opacity="0.5" fontFamily="monospace">ORCHESTRATOR</text>
        <rect x="168" y="80" width="90" height="13" rx="3" fill={`${accentColor}20`} />
        <text x="213" y="90" textAnchor="middle" fill={accentColor} fontSize="7.5" fontFamily="monospace">GEMINI 2.0 FLASH</text>
        <rect x="168" y="97" width="90" height="13" rx="3" fill="#1a1a1a" />
        <text x="213" y="107" textAnchor="middle" fill="white" opacity="0.35" fontSize="7" fontFamily="monospace">context: 1,204 tokens</text>
        <PulsingDot cx="257" cy="59" color={accentColor} duration={1.6} delay={0.4} />

        {/* ── NODE 3: RAG ── */}
        <rect x="306" y="62" width="105" height="52" rx="9" fill="#111" stroke={`${accentColor}30`} strokeWidth="1" />
        <text x="358" y="81" textAnchor="middle" fill="white" fontSize="9" opacity="0.5" fontFamily="monospace">RAG ENGINE</text>
        <rect x="316" y="87" width="85" height="13" rx="3" fill={`${accentColor}15`} />
        <text x="358" y="97" textAnchor="middle" fill={accentColor} fontSize="7.5" fontFamily="monospace">ChromaDB · cosim 0.89</text>
        <StatusIndicator cx="399" cy="66" color={greenColor} pulsing={true} duration={2.1} delay={0.3} />

        {/* ── NODE 4a: Career Advisor ── */}
        <rect x="448" y="28" width="108" height="44" rx="8" fill="#111" stroke={`${accentColor}25`} strokeWidth="1" />
        <text x="502" y="46" textAnchor="middle" fill="white" fontSize="8.5" opacity="0.5" fontFamily="monospace">
          {variant === "interview" ? "QUESTION GEN" : variant === "resume" ? "ATS SCORER" : "CAREER ADVISOR"}
        </text>
        <rect x="456" y="53" width="92" height="12" rx="3" fill={`${accentColor}15`} />
        <text x="502" y="62" textAnchor="middle" fill={accentColor} fontSize="7" fontFamily="monospace">
          {variant === "interview" ? "LeetCode · DSA Patterns" : variant === "resume" ? "Keyword Analyzer" : "Roadmap Generator"}
        </text>
        <StatusIndicator cx="543" cy="32" color={greenColor} pulsing={true} duration={1.7} delay={0.1} />

        {/* ── NODE 4b: Skill Analyzer ── */}
        <rect x="448" y="66" width="108" height="44" rx="8" fill="#111" stroke={`${accentColor}25`} strokeWidth="1" />
        <text x="502" y="84" textAnchor="middle" fill="white" fontSize="8.5" opacity="0.5" fontFamily="monospace">
          {variant === "interview" ? "HINT ENGINE" : variant === "resume" ? "SECTION GRADER" : "SKILL ANALYZER"}
        </text>
        <rect x="456" y="91" width="92" height="12" rx="3" fill={`${accentColor}15`} />
        <text x="502" y="100" textAnchor="middle" fill={accentColor} fontSize="7" fontFamily="monospace">
          {variant === "interview" ? "Progressive Hints" : variant === "resume" ? "5 Sections Checked" : "6 gaps · resources"}
        </text>
        <PulsingDot cx="543" cy="70" color={yellowColor} duration={2.3} delay={0.7} />

        {/* ── NODE 4c: Job Matcher ── */}
        <rect x="448" y="104" width="108" height="44" rx="8" fill="#111" stroke={`${accentColor}25`} strokeWidth="1" />
        <text x="502" y="122" textAnchor="middle" fill="white" fontSize="8.5" opacity="0.5" fontFamily="monospace">
          {variant === "interview" ? "EVALUATOR" : variant === "resume" ? "JOB MATCHER" : "JOB MATCHER"}
        </text>
        <rect x="456" y="129" width="92" height="12" rx="3" fill={`${accentColor}15`} />
        <text x="502" y="138" textAnchor="middle" fill={accentColor} fontSize="7" fontFamily="monospace">
          {variant === "interview" ? "Answer Rubric" : variant === "resume" ? "14 roles matched" : "14 roles matched"}
        </text>
        <StatusIndicator cx="543" cy="108" color={greenColor} pulsing={true} duration={1.5} delay={0.9} />
      </svg>

      {/* Live log terminal */}
      <div className="mx-4 mb-4 bg-black/60 rounded-xl border border-white/[0.05] px-4 py-3 min-h-[44px] flex items-center gap-3">
        <span className="text-[10px] text-white/20 shrink-0 select-none">›</span>
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-[10px] text-white/45 truncate leading-5 font-mono"
          >
            {messages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Footer stats */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-5">
          {[
            { label: "queries", value: queries.toLocaleString() },
            { label: "avg latency", value: "287ms" },
            { label: "success rate", value: "99.8%" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-[9px] text-white/20 tracking-widest uppercase">{label}</span>
              <span className="text-[11px] text-white/60 font-mono">{value}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <motion.span
            className="w-1 h-1 rounded-full bg-indigo-400 inline-block"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-[9px] text-white/20 tracking-widest">POWERED BY GEMINI</span>
        </div>
      </div>
    </div>
  )
}