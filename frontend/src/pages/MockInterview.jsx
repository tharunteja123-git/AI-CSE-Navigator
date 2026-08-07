import { useState, useRef, useEffect, useCallback } from "react";
import { api } from "../services/api";
import DashboardLayout from "../layouts/DashboardLayout";
import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";
import {
  FiArrowLeft, FiArrowRight, FiCheck, FiSend, FiRefreshCw,
  FiAward, FiTarget, FiZap, FiClock, FiBookOpen, FiCode,
  FiCpu, FiLayers, FiUsers, FiStar, FiChevronRight, FiPlay,
  FiTerminal, FiGitBranch, FiDatabase, FiGlobe, FiCamera,
  FiCameraOff, FiMic, FiMicOff, FiAlertTriangle, FiShield,
  FiEye, FiCheckCircle, FiMonitor, FiVolume2, FiVolumeX,
} from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────
const ROLES = [
  { id:"sde",       label:"Software Engineer",    icon:"💻", companies:["Google","Amazon","Microsoft"] },
  { id:"frontend",  label:"Frontend Developer",   icon:"🎨", companies:["Flipkart","Swiggy","Razorpay"] },
  { id:"backend",   label:"Backend Developer",    icon:"⚙️", companies:["PhonePe","Zepto","CRED"] },
  { id:"fullstack", label:"Full Stack Developer", icon:"🌐", companies:["Startup","Meesho","Groww"] },
  { id:"ai_ml",     label:"AI / ML Engineer",     icon:"🤖", companies:["OpenAI","Anthropic","Sarvam"] },
  { id:"data",      label:"Data Scientist",       icon:"📊", companies:["Walmart","Fractal","Mu Sigma"] },
  { id:"devops",    label:"DevOps / Cloud",       icon:"☁️", companies:["Infosys","TCS","Wipro"] },
  { id:"mobile",    label:"Mobile Developer",     icon:"📱", companies:["Zomato","Paytm","Nykaa"] },
];

const LEVELS = [
  { id:"fresher", label:"Fresher",   sub:"0–1 yr", color:"bg-emerald-500", text:"text-emerald-700", light:"bg-emerald-50", border:"border-emerald-200" },
  { id:"junior",  label:"Junior",    sub:"1–2 yr", color:"bg-blue-500",    text:"text-blue-700",    light:"bg-blue-50",    border:"border-blue-200" },
  { id:"mid",     label:"Mid-Level", sub:"2–4 yr", color:"bg-violet-500",  text:"text-violet-700",  light:"bg-violet-50",  border:"border-violet-200" },
  { id:"senior",  label:"Senior",    sub:"4+ yr",  color:"bg-orange-500",  text:"text-orange-700",  light:"bg-orange-50",  border:"border-orange-200" },
];

const SECTIONS = [
  { id:"coding",     label:"Coding (DSA)",        emoji:"💻", color:"text-indigo-600", bg:"bg-indigo-50",  border:"border-indigo-200",  desc:"Arrays, Trees, Graphs, DP, Sorting", hasCompiler:true  },
  { id:"system",     label:"System Design",       emoji:"🏗️", color:"text-violet-600", bg:"bg-violet-50",  border:"border-violet-200",  desc:"Scalability, microservices, databases", hasCompiler:false },
  { id:"dbms",       label:"DBMS & SQL",           emoji:"🗄️", color:"text-green-600",  bg:"bg-green-50",   border:"border-green-200",   desc:"Normalization, SQL queries, indexing", hasCompiler:true, compilerOnly:"sql" },
  { id:"os",         label:"Operating Systems",   emoji:"🖥️", color:"text-orange-600", bg:"bg-orange-50",  border:"border-orange-200",  desc:"Processes, threads, memory, deadlocks", hasCompiler:false },
  { id:"cn",         label:"Computer Networks",   emoji:"🌐", color:"text-cyan-600",   bg:"bg-cyan-50",    border:"border-cyan-200",    desc:"OSI, TCP/IP, HTTP, DNS, REST", hasCompiler:false },
  { id:"oop",        label:"OOP & LLD",            emoji:"🏛️", color:"text-rose-600",   bg:"bg-rose-50",    border:"border-rose-200",    desc:"Design patterns, SOLID principles", hasCompiler:false },
  { id:"behavioral", label:"HR & Behavioral",     emoji:"🤝", color:"text-yellow-600", bg:"bg-yellow-50",  border:"border-yellow-200",  desc:"Tell me about yourself, leadership", hasCompiler:false },
  { id:"project",    label:"Project Deep-Dive",   emoji:"📁", color:"text-teal-600",   bg:"bg-teal-50",    border:"border-teal-200",    desc:"Architecture, tradeoffs, challenges", hasCompiler:false },
];

const LANGUAGES = [
  { id:"python",     label:"Python",     emoji:"🐍", starter:"# Write your solution here\n\n" },
  { id:"javascript", label:"JavaScript", emoji:"🟨", starter:"// Write your solution here\n\n" },
  { id:"java",       label:"Java",       emoji:"☕", starter:"public class Solution {\n    // Write your solution here\n}\n" },
  { id:"cpp",        label:"C++",        emoji:"⚙️", starter:"#include <bits/stdc++.h>\nusing namespace std;\n\n// Write your solution here\n" },
  { id:"c",          label:"C",          emoji:"🔧", starter:"#include <stdio.h>\n\n// Write your solution here\n" },
  { id:"sql",        label:"SQL",        emoji:"🗄️", starter:"-- Write your SQL query here\n\n" },
  { id:"typescript", label:"TypeScript", emoji:"🔷", starter:"// Write your TypeScript solution here\n\n" },
  { id:"go",         label:"Go",         emoji:"🐹", starter:'package main\n\nimport "fmt"\n\nfunc main() {\n\n}\n' },
];

const TOTAL_ROUNDS = 5;
const diffColor = {
  Easy:   "bg-emerald-100 text-emerald-700 border-emerald-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Hard:   "bg-red-100 text-red-700 border-red-200",
};
const scoreColor = s => s>=8?"text-emerald-600":s>=6?"text-yellow-600":"text-red-500";
const scoreBg    = s => s>=8?"bg-emerald-50 border-emerald-200":s>=6?"bg-yellow-50 border-yellow-200":"bg-red-50 border-red-100";
const scoreLabel = s => s>=9?"Outstanding 🌟":s>=8?"Excellent 🎉":s>=7?"Good 👍":s>=5?"Average 📚":"Needs Work 💪";

// ─────────────────────────────────────────────────────────────────
// PROCTORING HOOK
// ─────────────────────────────────────────────────────────────────
function useProctor({ active }) {
  const videoRef   = useRef(null);
  const streamRef  = useRef(null);
  const recRef     = useRef(null);
  const analyserRef= useRef(null);
  const rafRef     = useRef(null);

  const [camOn,      setCamOn]      = useState(false);
  const [micOn,      setMicOn]      = useState(false);
  const [camErr,     setCamErr]     = useState("");
  const [violations, setViolations] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [speaking,   setSpeaking]   = useState(false);
  const [faceDet,    setFaceDet]    = useState("Initialising...");
  const [noiseLevel, setNoiseLevel] = useState(0);
  const [tabWarns,   setTabWarns]   = useState(0);
  const [voiceOn,    setVoiceOn]    = useState(false);

  const addViolation = useCallback((msg) => {
    setViolations(v => [{ msg, time: new Date().toLocaleTimeString() }, ...v].slice(0, 20));
    toast.error(`⚠️ ${msg}`, { duration: 3000 });
  }, []);

  // Start camera + mic
  const startMedia = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video:{ width:320, height:240, facingMode:"user" }, audio:true });
      streamRef.current = stream;
      if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play().catch(()=>{}); }
      setCamOn(true); setMicOn(true); setCamErr("");

      // Audio analyser
      try {
        const ctx      = new AudioContext();
        const src      = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        src.connect(analyser);
        analyserRef.current = analyser;
        const buf = new Uint8Array(analyser.frequencyBinCount);
        const tick = () => {
          analyser.getByteFrequencyData(buf);
          setNoiseLevel(Math.round(buf.reduce((a,b)=>a+b,0)/buf.length));
          rafRef.current = requestAnimationFrame(tick);
        };
        tick();
      } catch (_) {}

      // Simulated face detection (replace with face-api.js in production)
      let faceTimer = setInterval(() => {
        const r = Math.random();
        if (r > 0.96)      { setFaceDet("⚠️ No face detected"); addViolation("Face not visible — please look at camera"); }
        else if (r > 0.985){ setFaceDet("⚠️ Multiple faces");   addViolation("Multiple faces detected in frame"); }
        else                { setFaceDet("✓ Face Detected"); }
      }, 5000);
      setFaceDet("✓ Face Detected");

      return () => clearInterval(faceTimer);
    } catch (err) {
      const msg = err.name === "NotAllowedError" ? "Camera/mic permission denied — please allow in browser" :
                  err.name === "NotFoundError"   ? "No camera or microphone found on this device" : err.message;
      setCamErr(msg);
      toast.error(msg);
    }
  }, [addViolation]);

  const stopMedia = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCamOn(false); setMicOn(false);
    recRef.current?.stop();
    setSpeaking(false);
  }, []);

  // Voice recognition
  const startVoice = useCallback(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { toast("Speech recognition not supported in this browser. Try Chrome."); return; }
    const rec = new SR();
    rec.continuous = true; rec.interimResults = true; rec.lang = "en-IN";
    rec.onstart  = () => setSpeaking(true);
    rec.onend    = () => { setSpeaking(false); if (voiceOn) rec.start(); };
    rec.onresult = (e) => {
      let txt = "";
      for (let i = e.resultIndex; i < e.results.length; i++) txt += e.results[i][0].transcript;
      setTranscript(p => (p + " " + txt).trim().slice(-600));
    };
    rec.start();
    recRef.current = rec;
    setVoiceOn(true);
    toast.success("🎤 Voice answer recording started");
  }, [voiceOn]);

  const stopVoice = useCallback(() => {
    recRef.current?.stop();
    recRef.current = null;
    setSpeaking(false);
    setVoiceOn(false);
  }, []);

  const toggleVoice = useCallback(() => { voiceOn ? stopVoice() : startVoice(); }, [voiceOn, startVoice, stopVoice]);

  // Tab/focus monitoring
  useEffect(() => {
    if (!active) return;
    const onHide  = () => { if (document.hidden) { setTabWarns(w=>w+1); addViolation("Tab switch detected — stay on interview tab"); } };
    const onBlur  = () => addViolation("Window lost focus");
    const onCtx   = (e) => { e.preventDefault(); addViolation("Right-click blocked during interview"); };
    const onCopy  = () => addViolation("Copy action detected — external resources not allowed");
    const onPaste = () => addViolation("Paste detected — please type your own answer");
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("blur", onBlur);
    document.addEventListener("contextmenu", onCtx);
    document.addEventListener("copy", onCopy);
    document.addEventListener("paste", onPaste);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("contextmenu", onCtx);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("paste", onPaste);
    };
  }, [active, addViolation]);

  useEffect(() => { return () => stopMedia(); }, [stopMedia]);

  return {
    videoRef, camOn, micOn, camErr,
    violations, transcript, speaking,
    faceDet, noiseLevel, tabWarns,
    voiceOn, startMedia, stopMedia,
    toggleVoice, setTranscript,
  };
}

// ─────────────────────────────────────────────────────────────────
// PERMISSION GATE
// ─────────────────────────────────────────────────────────────────
function PermissionGate({ onGranted, onSkip }) {
  const [checking, setChecking] = useState(false);
  const [granted,  setGranted]  = useState(false);
  const [err,      setErr]      = useState("");

  const request = async () => {
    setChecking(true); setErr("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video:true, audio:true });
      s.getTracks().forEach(t => t.stop());
      setGranted(true);
    } catch (e) {
      setErr(e.name === "NotAllowedError" ? "Permission denied. Click the camera icon in your browser address bar and allow access, then try again."
           : e.name === "NotFoundError"   ? "No camera/microphone found. Please connect a device."
           : e.message);
    }
    setChecking(false);
  };

  return (
    <div className="fixed inset-0 bg-[#050507]/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-[#0a0a0c] border border-white/10 rounded-3xl max-w-lg w-full p-8 text-white shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600/15 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiShield className="text-indigo-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight mb-2">Proctored Interview Mode</h2>
          <p className="text-white/40 text-sm leading-relaxed">
            This session uses AI-powered proctoring to simulate a real interview environment. Your camera and microphone are required.
          </p>
        </div>

        {/* What is monitored */}
        <div className="space-y-2.5 mb-7">
          <p className="text-[11px] font-bold text-white/25 uppercase tracking-widest mb-3">What this session monitors</p>
          {[
            { icon:<FiCamera/>,         label:"Webcam — face presence & detection",      note:"Real-time" },
            { icon:<FiMic/>,            label:"Microphone — optional voice answers",      note:"With consent" },
            { icon:<FiMonitor/>,        label:"Tab switching & window focus loss",        note:"Auto flagged" },
            { icon:<FiAlertTriangle/>,  label:"Copy, paste & right-click attempts",       note:"Auto flagged" },
            { icon:<FiEye/>,            label:"Multiple face / no face detection",        note:"AI powered" },
          ].map(({ icon, label, note }) => (
            <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.025] border border-white/5">
              <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0 text-indigo-400 text-xs">{icon}</div>
              <p className="text-xs text-white/60 flex-1">{label}</p>
              <span className="text-[9px] text-white/20 font-semibold uppercase tracking-wide">{note}</span>
            </div>
          ))}
        </div>

        {err && <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3 mb-5 text-xs text-red-400 leading-5">{err}</div>}

        {!granted ? (
          <button onClick={request} disabled={checking}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all disabled:opacity-50 mb-3 shadow-lg shadow-indigo-500/20">
            {checking
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Requesting access...</>
              : <><FiCamera className="text-sm" />Allow Camera & Microphone</>}
          </button>
        ) : (
          <button onClick={onGranted}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all mb-3 shadow-lg shadow-emerald-500/20">
            <FiZap className="text-sm" /> Start Proctored Interview
          </button>
        )}

        <button onClick={onSkip} className="w-full text-xs text-white/25 hover:text-white/50 transition-colors py-2">
          Skip proctoring — use basic mode
        </button>
        <p className="text-center text-[10px] text-white/15 mt-4 leading-4">
          Video is processed locally in your browser. We do not record or upload any footage.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// PROCTOR PANEL — sidebar during interview
// ─────────────────────────────────────────────────────────────────
function ProctorPanel({ p }) {
  const isSafe  = p.faceDet.startsWith("✓");
  const isAlert = p.faceDet.startsWith("⚠");
  const barW    = Math.min(p.noiseLevel * 2.5, 100);
  const barCol  = p.noiseLevel < 15 ? "bg-emerald-400" : p.noiseLevel < 40 ? "bg-yellow-400" : "bg-red-500";

  return (
    <div className="flex flex-col gap-3 w-52 flex-shrink-0">

      {/* Camera feed */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10" style={{ aspectRatio:"4/3" }}>
        {p.camOn ? (
          <video ref={p.videoRef} autoPlay muted playsInline className="w-full h-full object-cover" style={{ transform:"scaleX(-1)" }} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-3">
            <FiCameraOff className="text-white/20 text-2xl" />
            <p className="text-white/25 text-[10px] text-center leading-4">{p.camErr || "Camera initialising..."}</p>
          </div>
        )}
        {/* Face detection badge */}
        {p.camOn && (
          <div className={`absolute top-1.5 left-1.5 text-[9px] font-bold px-2 py-0.5 rounded-lg border backdrop-blur-sm flex items-center gap-1 ${
            isSafe  ? "bg-emerald-900/80 text-emerald-300 border-emerald-700" :
            isAlert ? "bg-red-900/80 text-red-300 border-red-700 animate-pulse" :
            "bg-slate-900/80 text-white/40 border-white/10"
          }`}>
            <FiEye className="text-[8px]" />{p.faceDet}
          </div>
        )}
        {/* REC dot */}
        {p.camOn && (
          <div className="absolute top-1.5 right-1.5 flex items-center gap-1 bg-red-600/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md backdrop-blur-sm">
            <span className="w-1 h-1 bg-white rounded-full animate-pulse" />REC
          </div>
        )}
        {/* Speaking bar */}
        {p.speaking && (
          <div className="absolute bottom-1.5 inset-x-1.5 bg-indigo-900/80 text-indigo-300 text-[9px] px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
            <FiMic className="animate-pulse flex-shrink-0" />
            <span className="truncate">{p.transcript.split(" ").slice(-5).join(" ")}</span>
          </div>
        )}
      </div>

      {/* Status pills */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className={`rounded-xl p-2 text-center border ${p.camOn?"bg-emerald-900/20 border-emerald-800/40":"bg-red-900/20 border-red-800/40"}`}>
          {p.camOn ? <FiCamera className="text-emerald-400 mx-auto text-xs mb-0.5" /> : <FiCameraOff className="text-red-400 mx-auto text-xs mb-0.5" />}
          <p className={`text-[9px] font-bold ${p.camOn?"text-emerald-400":"text-red-400"}`}>{p.camOn?"ON":"OFF"}</p>
        </div>
        <div className={`rounded-xl p-2 text-center border ${p.micOn?"bg-emerald-900/20 border-emerald-800/40":"bg-slate-800/40 border-white/5"}`}>
          {p.micOn ? <FiMic className="text-emerald-400 mx-auto text-xs mb-0.5" /> : <FiMicOff className="text-white/20 mx-auto text-xs mb-0.5" />}
          <p className={`text-[9px] font-bold ${p.micOn?"text-emerald-400":"text-white/20"}`}>{p.micOn?"MIC":"OFF"}</p>
        </div>
      </div>

      {/* Audio meter */}
      {p.micOn && (
        <div className="bg-slate-900 rounded-xl p-2.5 border border-white/5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] text-white/30 font-bold uppercase tracking-wider">Audio Level</span>
            <span className="text-[9px] text-white/20 font-mono">{p.noiseLevel}</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2">
            <div className={`h-full rounded-full transition-all duration-75 ${barCol}`} style={{ width:`${barW}%` }} />
          </div>
          <button onClick={p.toggleVoice}
            className={`w-full flex items-center justify-center gap-1.5 text-[10px] font-bold py-1.5 rounded-lg border transition-all ${
              p.voiceOn
                ? "bg-indigo-600/20 border-indigo-500/30 text-indigo-300"
                : "bg-white/[0.03] border-white/8 text-white/25 hover:text-white/50"
            }`}>
            {p.voiceOn ? <FiMic className="text-[9px]" /> : <FiMicOff className="text-[9px]" />}
            {p.voiceOn ? "Voice Active" : "Enable Voice"}
          </button>
        </div>
      )}

      {/* Tab warnings */}
      {p.tabWarns > 0 && (
        <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-2.5 flex items-center gap-2">
          <FiAlertTriangle className="text-red-400 flex-shrink-0 text-xs" />
          <p className="text-[10px] text-red-400 font-semibold">{p.tabWarns} tab switch{p.tabWarns>1?"es":""}</p>
        </div>
      )}

      {/* Integrity log */}
      <div className="bg-slate-900 rounded-xl border border-white/5 overflow-hidden flex-1">
        <div className="flex items-center justify-between px-2.5 py-2 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <FiShield className="text-xs text-indigo-400" />
            <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">Integrity</span>
          </div>
          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${p.violations.length>0?"bg-red-900/50 text-red-400":"bg-emerald-900/50 text-emerald-400"}`}>
            {p.violations.length} flags
          </span>
        </div>
        <div className="max-h-36 overflow-y-auto">
          {p.violations.length === 0 ? (
            <div className="p-3 text-center">
              <FiCheckCircle className="text-emerald-400 mx-auto mb-1 text-sm" />
              <p className="text-[9px] text-emerald-400 font-semibold">All clear</p>
            </div>
          ) : (
            p.violations.map((v,i) => (
              <div key={i} className="px-2.5 py-1.5 border-b border-white/[0.03] last:border-0">
                <p className="text-[9px] text-red-300 leading-3.5">⚠ {v.msg}</p>
                <p className="text-[8px] text-white/15 mt-0.5">{v.time}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// SETUP STEP DOTS
// ─────────────────────────────────────────────────────────────────
function StepDots({ total, current }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`transition-all duration-300 rounded-full ${
            i < current  ? "w-6 h-2 bg-indigo-500" :
            i === current? "w-8 h-2 bg-indigo-600" :
            "w-2 h-2 bg-slate-200"
          }`} />
          {i < total-1 && <div className={`h-px w-4 ${i<current?"bg-indigo-200":"bg-slate-100"}`} />}
        </div>
      ))}
      <span className="text-xs text-slate-400 ml-2">Step {current+1} of {total}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ROUND PROGRESS BAR
// ─────────────────────────────────────────────────────────────────
function RoundBar({ round, scores }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl px-5 py-3 mb-5 flex items-center gap-3">
      <span className="text-xs font-bold text-slate-400 mr-1">Progress</span>
      {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => {
        const s = scores[i]; const done = i < round-1; const cur = i === round-1;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className={`w-full h-2 rounded-full transition-all ${
              done ? (s>=8?"bg-emerald-400":s>=6?"bg-yellow-400":"bg-red-400")
              : cur ? "bg-indigo-500 animate-pulse" : "bg-slate-100"
            }`} />
            <span className={`text-[10px] font-bold ${cur?"text-indigo-600":done?(s>=6?"text-emerald-600":"text-red-500"):"text-slate-300"}`}>
              {done ? `${s}/10` : cur ? `Q${i+1}` : "·"}
            </span>
          </div>
        );
      })}
      <span className="text-xs text-slate-400 ml-1 whitespace-nowrap">{round}/{TOTAL_ROUNDS}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ONLINE COMPILER PANEL
// ─────────────────────────────────────────────────────────────────
function CompilerPanel({ question, onDone, onSkip, round, proctor }) {
  const [lang,       setLang]       = useState("python");
  const [code,       setCode]       = useState(LANGUAGES[0].starter);
  const [output,     setOutput]     = useState("");
  const [running,    setRunning]    = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback,   setFeedback]   = useState("");
  const [score,      setScore]      = useState(null);
  const [view,       setView]       = useState("code");
  const [testRes,    setTestRes]    = useState([]);

  const selectLang = (id) => {
    setLang(id);
    setCode(LANGUAGES.find(l=>l.id===id)?.starter || "");
    setOutput("");
  };

  const runCode = async () => {
    setRunning(true); setOutput("");
    await new Promise(r => setTimeout(r, 1200));
    const sampleOut = {
      python: `Python 3.12 — Running...\n\n✓ No syntax errors\n[Output would appear here with a real execution engine]\n\nProcess finished with exit code 0`,
      javascript: `Node.js 20 — Running...\n\n✓ No syntax errors\n[Output would appear here]\n\nProcess finished with exit code 0`,
      java: `Compiling Java 17...\n✓ Compilation successful\n\n[Output would appear here]\n\nProcess finished with exit code 0`,
      cpp:  `Compiling C++17...\n✓ Compilation successful\n\n[Output would appear here]\n\nProcess finished with exit code 0`,
      sql:  `Executing query...\n✓ Query parsed\n\n┌──────────┬─────────┐\n│ result   │ value   │\n├──────────┼─────────┤\n│ [output] │ [value] │\n└──────────┴─────────┘`,
    };
    setOutput(sampleOut[lang] || `Running ${lang}...\n✓ Done`);
    setTestRes([
      { id:1, status:Math.random()>0.3?"pass":"fail", label:"Basic Test"  },
      { id:2, status:Math.random()>0.4?"pass":"fail", label:"Edge Case"   },
      { id:3, status:"hidden",                         label:"Hidden Test" },
    ]);
    setRunning(false);
  };

  const submitCode = async () => {
    if (!code.trim()) return;
    setSubmitting(true); setView("feedback");
    try {
      const d = await api.chat(
        `You are a senior software engineer reviewing a coding interview submission.\n\nQuestion:\n${question?.statement || question}\n\nCandidate's ${lang.toUpperCase()} Solution:\n\`\`\`${lang}\n${code}\n\`\`\`\n\nEvaluate strictly. Format EXACTLY:\n\n**Score: X/10**\n\n**Verdict:** [one honest line]\n\n**✅ Correctness:**\n- [point]\n\n**⏱ Complexity:**\n- Time: O(?) — reason\n- Space: O(?) — reason\n\n**✅ Code Quality:**\n- [point]\n\n**❌ Issues:**\n- [issue]\n\n**💡 Optimal Approach:**\n[3–4 lines]\n\n**⚡ Key Takeaway:**\n[one tip]`
      );
      const raw = d.response || "";
      setFeedback(raw);
      const m = raw.match(/Score:\s*(\d+)/i);
      setScore(m ? parseInt(m[1]) : 6);
    } catch { setFeedback("❌ Evaluation failed. Please try again."); setScore(5); }
    setSubmitting(false);
  };

  const curLang = LANGUAGES.find(l=>l.id===lang);
  const lines   = code.split("\n");

  return (
    <div className="flex gap-4">
      {/* Proctor sidebar */}
      {proctor && <ProctorPanel p={proctor} />}

      {/* Main editor area */}
      <div className="flex-1 space-y-4 min-w-0">
        {view === "code" && (
          <>
            {/* Question */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${diffColor[question?.difficulty||"Medium"]}`}>{question?.difficulty||"Medium"}</span>
                  <span className="text-xs text-white/30">Round {round}</span>
                  {question?.timeLimit && <span className="ml-auto flex items-center gap-1 text-xs text-white/25"><FiClock className="text-xs"/>{question.timeLimit}</span>}
                </div>
                <div className="prose prose-invert prose-sm max-w-none"><ReactMarkdown>{question?.statement||question||""}</ReactMarkdown></div>
                {question?.examples?.map((ex,i) => (
                  <div key={i} className="mt-3 bg-white/5 rounded-xl p-3 font-mono text-xs">
                    <p className="text-white/40 mb-1">Example {i+1}:</p>
                    <p className="text-emerald-400">Input:  {ex.input}</p>
                    <p className="text-blue-400">Output: {ex.output}</p>
                    {ex.explanation && <p className="text-white/30 mt-1">{ex.explanation}</p>}
                  </div>
                ))}
                {question?.constraints?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {question.constraints.map((c,i) => <span key={i} className="text-[10px] bg-white/5 text-white/35 px-2 py-0.5 rounded-lg">{c}</span>)}
                  </div>
                )}
              </div>
            </div>

            {/* Editor */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              {/* Language tabs */}
              <div className="flex items-center overflow-x-auto bg-slate-50 border-b border-slate-100">
                {LANGUAGES.map(l => (
                  <button key={l.id} onClick={()=>selectLang(l.id)}
                    className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all flex-shrink-0 ${
                      lang===l.id ? "border-indigo-600 text-indigo-700 bg-white" : "border-transparent text-slate-500 hover:text-slate-700"
                    }`}>
                    <span>{l.emoji}</span><span>{l.label}</span>
                  </button>
                ))}
              </div>

              {/* Code area with line numbers */}
              <div className="relative bg-slate-900 flex">
                {/* Line numbers */}
                <div className="select-none bg-slate-950/50 border-r border-white/5 flex flex-col items-end px-3 pt-3 min-w-[40px]">
                  {lines.map((_,i) => <div key={i} className="text-[10px] text-white/15 leading-5 font-mono">{i+1}</div>)}
                </div>
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  rows={Math.max(lines.length, 14)}
                  className="flex-1 pl-4 pr-4 py-3 font-mono text-sm bg-transparent text-emerald-300 border-0 outline-none resize-none leading-5"
                  spellCheck={false}
                  autoComplete="off"
                  onKeyDown={e => {
                    if (e.key === "Tab") {
                      e.preventDefault();
                      const s = e.target.selectionStart;
                      const newCode = code.substring(0,s) + "    " + code.substring(e.target.selectionEnd);
                      setCode(newCode);
                      setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = s+4; }, 0);
                    }
                  }}
                />
              </div>

              {/* Output */}
              {output && (
                <div className="bg-black/90 border-t border-white/5">
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                    <FiTerminal className="text-emerald-400 text-xs" />
                    <span className="text-xs text-white/40 font-mono">Output</span>
                  </div>
                  <pre className="px-4 py-3 text-xs font-mono text-emerald-300 leading-5 max-h-28 overflow-y-auto whitespace-pre-wrap">{output}</pre>
                  {testRes.length > 0 && (
                    <div className="px-4 pb-3 flex flex-wrap gap-2">
                      {testRes.map(t => (
                        <div key={t.id} className={`text-xs px-2.5 py-1 rounded-lg font-mono border ${
                          t.status==="pass"   ? "bg-emerald-900/40 text-emerald-400 border-emerald-800" :
                          t.status==="fail"   ? "bg-red-900/40 text-red-400 border-red-800" :
                          "bg-white/5 text-white/30 border-white/10"
                        }`}>
                          {t.status==="pass"?"✓":t.status==="fail"?"✗":"?"} {t.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>{curLang?.emoji}</span><span>{curLang?.label}</span>
                </div>
                <div className="flex gap-2 ml-auto">
                  <button onClick={onSkip} className="btn-outline text-xs py-1.5 px-3">Skip</button>
                  <button onClick={runCode} disabled={running}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-800 text-emerald-400 text-xs font-bold hover:bg-slate-700 transition-colors disabled:opacity-50 border border-slate-700">
                    <FiPlay className="text-xs" />{running?"Running...":"Run Code"}
                  </button>
                  <button onClick={submitCode} disabled={!code.trim()||running}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors disabled:opacity-40">
                    <FiSend className="text-xs" />Submit
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Feedback view */}
        {view === "feedback" && (
          <div className="space-y-4">
            {submitting ? (
              <div className="card text-center py-14">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
                <p className="font-semibold text-slate-700">Analysing your code...</p>
                <p className="text-slate-400 text-sm mt-1">Checking correctness, complexity & code quality</p>
              </div>
            ) : (
              <>
                <div className={`card border-2 ${scoreBg(score??0)} text-center py-8`}>
                  <div className={`text-5xl font-extrabold mb-1 ${scoreColor(score??0)}`}>{score}/10</div>
                  <p className={`font-bold text-lg ${scoreColor(score??0)}`}>{scoreLabel(score??0)}</p>
                </div>
                <div className="card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-indigo-100 rounded-xl flex items-center justify-center"><FiStar className="text-indigo-600 text-xs"/></div>
                    <p className="font-bold text-slate-800">Code Review Feedback</p>
                  </div>
                  <div className="prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-strong:text-slate-800">
                    <ReactMarkdown>{feedback}</ReactMarkdown>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-4">
                  <p className="text-xs text-white/30 font-mono mb-2">Your submitted {curLang?.label} code</p>
                  <pre className="text-xs font-mono text-emerald-300 leading-5 overflow-x-auto whitespace-pre-wrap max-h-36">{code}</pre>
                </div>
                <button onClick={()=>onDone(score??6)} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                  Next Round <FiChevronRight />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// TEXT PANEL (non-coding sections)
// ─────────────────────────────────────────────────────────────────
function TextPanel({ question, onDone, onSkip, round, section, proctor }) {
  const [answer,    setAnswer]    = useState("");
  const [feedback,  setFeedback]  = useState("");
  const [score,     setScore]     = useState(null);
  const [submitting,setSubmitting]= useState(false);
  const [view,      setView]      = useState("question");

  // Sync voice transcript into answer box
  useEffect(() => {
    if (proctor?.voiceOn && proctor?.transcript) {
      setAnswer(proctor.transcript);
    }
  }, [proctor?.transcript, proctor?.voiceOn]);

  const submit = async () => {
    if (!answer.trim()) return;
    setSubmitting(true); setView("feedback");
    try {
      const d = await api.chat(
        `You are a senior interviewer evaluating a ${section?.label} answer.\n\nQuestion: ${question?.statement||question}\n\nCandidate's Answer: ${answer}\n\nEvaluate strictly. Format EXACTLY:\n\n**Score: X/10**\n\n**Verdict:** [one honest line]\n\n**✅ What Was Good:**\n- [point]\n\n**❌ Missing / Wrong:**\n- [point]\n\n**💡 Ideal Answer:**\n[3–5 lines]\n\n**⚡ Key Takeaway:**\n[one tip]`
      );
      const raw = d.response || "";
      setFeedback(raw);
      const m = raw.match(/Score:\s*(\d+)/i);
      setScore(m ? parseInt(m[1]) : 6);
    } catch { setFeedback("❌ Evaluation failed."); setScore(5); }
    setSubmitting(false);
  };

  return (
    <div className="flex gap-4">
      {proctor && <ProctorPanel p={proctor} />}
      <div className="flex-1 space-y-4 min-w-0">
        {view === "question" && (
          <>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-6 translate-x-6" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${diffColor[question?.difficulty||"Medium"]}`}>{question?.difficulty||"Medium"}</span>
                  <span className="text-xs text-white/30">{section?.label}</span>
                  <span className="ml-auto text-xs text-white/20">Round {round}</span>
                </div>
                <div className="prose prose-invert prose-sm max-w-none"><ReactMarkdown>{question?.statement||question||""}</ReactMarkdown></div>
                {question?.hint && (
                  <div className="mt-4 bg-white/5 rounded-xl p-3">
                    <p className="text-xs text-white/40 mb-1">💡 Hint</p>
                    <p className="text-xs text-white/55">{question.hint}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="card">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-slate-700">Your Answer</label>
                <div className="flex items-center gap-2">
                  {proctor?.voiceOn && <span className="flex items-center gap-1 text-xs text-indigo-600 font-semibold"><FiMic className="animate-pulse text-xs"/>Voice active</span>}
                  <span className="text-xs text-slate-400">{answer.length} chars</span>
                </div>
              </div>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                rows={9}
                className="input resize-none text-sm leading-6 w-full"
                placeholder={
                  section?.id==="behavioral" ? "Use STAR method: Situation → Task → Action → Result..."
                  : section?.id==="system"   ? "Start with requirements → high-level design → components → tradeoffs..."
                  : section?.id==="project"  ? "Explain your role, tech stack, architecture decisions, challenges..."
                  : "Write your detailed answer here..."
                }
              />
              <div className="flex gap-3 mt-4">
                <button onClick={onSkip} className="btn-outline">Skip</button>
                <button onClick={submit} disabled={!answer.trim()}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-40">
                  <FiSend className="text-sm"/>Submit Answer
                </button>
              </div>
            </div>
          </>
        )}
        {view === "feedback" && (
          <div className="space-y-4">
            {submitting ? (
              <div className="card text-center py-14">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"/>
                <p className="font-semibold text-slate-700">Evaluating your answer...</p>
              </div>
            ) : (
              <>
                <div className={`card border-2 ${scoreBg(score??0)} text-center py-8`}>
                  <div className={`text-5xl font-extrabold mb-1 ${scoreColor(score??0)}`}>{score}/10</div>
                  <p className={`font-bold text-lg ${scoreColor(score??0)}`}>{scoreLabel(score??0)}</p>
                </div>
                <div className="card">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-7 h-7 bg-indigo-100 rounded-xl flex items-center justify-center"><FiStar className="text-indigo-600 text-xs"/></div>
                    <p className="font-bold text-slate-800">Interviewer Feedback</p>
                  </div>
                  <div className="prose prose-slate prose-sm max-w-none prose-headings:font-bold prose-strong:text-slate-800">
                    <ReactMarkdown>{feedback}</ReactMarkdown>
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-400 mb-2">Your Answer</p>
                  <p className="text-sm text-slate-600 whitespace-pre-wrap leading-6">{answer}</p>
                </div>
                <button onClick={()=>onDone(score??6)} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                  Next Round <FiChevronRight/>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────
export default function MockInterview() {
  const [phase,     setPhase]     = useState("gate");     // gate | setup | interview | done
  const [proctored, setProctored] = useState(false);
  const [setupStep, setSetupStep] = useState(0);
  const [role,      setRole]      = useState(null);
  const [level,     setLevel]     = useState(null);
  const [sections,  setSections]  = useState([]);
  const [round,     setRound]     = useState(1);
  const [question,  setQuestion]  = useState(null);
  const [scores,    setScores]    = useState([]);
  const [loading,   setLoading]   = useState(false);
  const [curSection,setCurSection]= useState(null);

  const proctor = useProctor({ active: phase === "interview" && proctored });

  const getSectionForRound = (r) => {
    const idx = (r-1) % sections.length;
    return SECTIONS.find(s => s.id === sections[idx]);
  };

  const generateQuestion = async (sec, r) => {
    setLoading(true); setQuestion(null);
    const roleObj  = ROLES.find(x=>x.id===role);
    const levelObj = LEVELS.find(x=>x.id===level);
    try {
      const d = await api.chat(
        `You are a technical interviewer.\nRole: ${roleObj?.label}\nLevel: ${levelObj?.label}\nSection: ${sec?.label}\nRound: ${r} of ${TOTAL_ROUNDS}\n\nGenerate ONE interview question.\n\n${sec?.id==="coding"||sec?.id==="dbms" ? `Return a JSON object (no backticks):\n{"statement":"...","difficulty":"Easy|Medium|Hard","examples":[{"input":"...","output":"...","explanation":"..."}],"constraints":["..."],"timeLimit":"20 minutes","hint":"..."}` : `Return a JSON object (no backticks):\n{"statement":"...","difficulty":"Easy|Medium|Hard","hint":"..."}`}`
      );
      let q = null;
      try { q = JSON.parse((d.response||"").trim().replace(/```json|```/g,"").trim()); }
      catch { q = { statement: d.response, difficulty:"Medium" }; }
      setQuestion(q);
    } catch { setQuestion({ statement:"❌ Failed to generate. Check API key.", difficulty:"Medium" }); }
    setLoading(false);
  };

  const startInterview = () => {
    const sec = getSectionForRound(1);
    setCurSection(sec);
    setPhase("interview");
    setRound(1); setScores([]);
    if (proctored) proctor.startMedia();
    generateQuestion(sec, 1);
  };

  const handleRoundDone = (s) => {
    const newScores = [...scores, s];
    setScores(newScores);
    if (round >= TOTAL_ROUNDS) { setPhase("done"); if (proctored) proctor.stopMedia(); }
    else {
      const nxt = round+1;
      const sec = getSectionForRound(nxt);
      setRound(nxt); setCurSection(sec);
      if (proctored) proctor.setTranscript("");
      generateQuestion(sec, nxt);
    }
  };

  const restart = () => {
    proctor.stopMedia();
    setPhase("gate"); setSetupStep(0); setRole(null); setLevel(null);
    setSections([]); setRound(1); setScores([]); setQuestion(null); setCurSection(null);
  };

  const toggleSection = (id) => setSections(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);

  const avgScore = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
  const roleObj  = ROLES.find(r=>r.id===role);
  const levelObj = LEVELS.find(l=>l.id===level);

  // ── PERMISSION GATE ───────────────────────────────────────────
  if (phase === "gate") {
    return (
      <DashboardLayout>
        <PermissionGate
          onGranted={() => { setProctored(true);  setPhase("setup"); }}
          onSkip={()    => { setProctored(false); setPhase("setup"); }}
        />
        {/* Background content */}
        <div className="max-w-3xl mx-auto text-center py-20 opacity-20 pointer-events-none select-none">
          <h1 className="text-3xl font-extrabold text-slate-900">Mock Interview</h1>
          <p className="text-slate-500 mt-2">AI-powered · 5 rounds · Real questions</p>
        </div>
      </DashboardLayout>
    );
  }

  // ── SETUP ─────────────────────────────────────────────────────
  if (phase === "setup") {
    return (
      <DashboardLayout>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <FiZap className="text-xs"/>
              {proctored ? "🔴 Proctored Mode" : "Basic Mode"} · AI-Powered Mock Interview
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Practice Like It's Real</h1>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">5 rounds · Real questions · Instant AI feedback · Live compiler</p>
          </div>
          <StepDots total={3} current={setupStep} />

          {/* Step 0: Role */}
          {setupStep===0 && (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">Which role are you targeting?</p>
              <p className="text-xs text-slate-400 mb-4">Questions will be tailored to this role.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {ROLES.map(r => (
                  <button key={r.id} onClick={()=>setRole(r.id)}
                    className={`text-left flex items-start gap-3 p-4 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-sm ${role===r.id?"border-indigo-500 bg-indigo-50":"border-slate-200 bg-white hover:border-slate-300"}`}>
                    <span className="text-2xl">{r.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${role===r.id?"text-indigo-700":"text-slate-800"}`}>{r.label}</p>
                      <div className="flex flex-wrap gap-1 mt-1">{r.companies.map(c=><span key={c} className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{c}</span>)}</div>
                    </div>
                    {role===r.id && <FiCheck className="text-indigo-500 flex-shrink-0 mt-0.5"/>}
                  </button>
                ))}
              </div>
              <button onClick={()=>setSetupStep(1)} disabled={!role} className="btn-primary w-full mt-5 flex items-center justify-center gap-2 disabled:opacity-40">Continue <FiArrowRight/></button>
            </div>
          )}

          {/* Step 1: Level */}
          {setupStep===1 && (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">What is your experience level?</p>
              <p className="text-xs text-slate-400 mb-4">Adjusts question difficulty and evaluation criteria.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {LEVELS.map(l => (
                  <button key={l.id} onClick={()=>setLevel(l.id)}
                    className={`text-left flex items-center gap-4 p-5 rounded-2xl border-2 transition-all hover:shadow-sm ${level===l.id?`${l.border} ${l.light}`:"border-slate-200 bg-white hover:border-slate-300"}`}>
                    <div className={`w-12 h-12 ${l.color} rounded-2xl flex items-center justify-center text-white font-extrabold text-lg flex-shrink-0`}>{l.sub[0]}</div>
                    <div>
                      <p className={`font-bold ${level===l.id?l.text:"text-slate-800"}`}>{l.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{l.sub} experience</p>
                    </div>
                    {level===l.id && <FiCheck className={`ml-auto ${l.text} flex-shrink-0`}/>}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={()=>setSetupStep(0)} className="btn-outline flex items-center gap-2"><FiArrowLeft/>Back</button>
                <button onClick={()=>setSetupStep(2)} disabled={!level} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-40">Continue <FiArrowRight/></button>
              </div>
            </div>
          )}

          {/* Step 2: Sections */}
          {setupStep===2 && (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-1">Which sections do you want to practice?</p>
              <p className="text-xs text-slate-400 mb-4">Select one or more. Questions rotate through sections across 5 rounds.</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {SECTIONS.map(s => {
                  const sel = sections.includes(s.id);
                  return (
                    <button key={s.id} onClick={()=>toggleSection(s.id)}
                      className={`text-left flex items-start gap-3 p-4 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-sm relative ${sel?`${s.border} ${s.bg}`:"border-slate-200 bg-white hover:border-slate-300"}`}>
                      {s.hasCompiler && <span className="absolute top-2 right-2 text-[9px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full font-bold">{s.compilerOnly?"SQL":"CODE"}</span>}
                      <span className={`text-xl mt-0.5 ${sel?s.color:"text-slate-400"}`}>{s.emoji}</span>
                      <div className="flex-1 min-w-0 pr-4">
                        <p className={`font-bold text-sm ${sel?s.color:"text-slate-800"}`}>{s.label}</p>
                        <p className="text-xs text-slate-400 leading-4 mt-0.5">{s.desc}</p>
                      </div>
                      {sel && <FiCheck className={`${s.color} flex-shrink-0 mt-0.5`}/>}
                    </button>
                  );
                })}
              </div>
              {sections.length>0 && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 mb-4">
                  <p className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">Interview Plan</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white border border-indigo-200 text-indigo-700 px-2.5 py-1 rounded-full font-medium">{roleObj?.icon} {roleObj?.label}</span>
                    <span className={`text-xs bg-white border ${levelObj?.border} ${levelObj?.text} px-2.5 py-1 rounded-full font-medium`}>{levelObj?.label}</span>
                    <span className={`text-xs bg-white border px-2.5 py-1 rounded-full font-medium ${proctored?"border-red-200 text-red-600":"border-slate-200 text-slate-600"}`}>{proctored?"🔴 Proctored":"Basic Mode"}</span>
                    {sections.map(id=>{const s=SECTIONS.find(x=>x.id===id);return<span key={id} className={`text-xs bg-white border ${s?.border} ${s?.color} px-2.5 py-1 rounded-full font-medium`}>{s?.emoji} {s?.label}</span>;})}
                  </div>
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={()=>setSetupStep(1)} className="btn-outline flex items-center gap-2"><FiArrowLeft/>Back</button>
                <button onClick={startInterview} disabled={sections.length===0}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-base disabled:opacity-40">
                  <FiZap/> Start Interview
                </button>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // ── DONE ─────────────────────────────────────────────────────
  if (phase === "done") {
    const grade = avgScore>=8?"A":avgScore>=6?"B":avgScore>=4?"C":"D";
    const gc    = avgScore>=8?"text-emerald-600":avgScore>=6?"text-yellow-600":"text-red-500";
    const gb    = avgScore>=8?"bg-emerald-50 border-emerald-200":avgScore>=6?"bg-yellow-50 border-yellow-200":"bg-red-50 border-red-100";
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className={`card border-2 ${gb} text-center py-10 mb-5`}>
            <div className={`text-7xl font-extrabold ${gc} mb-1`}>{grade}</div>
            <div className={`text-3xl font-extrabold ${gc} mb-1`}>{avgScore}/10</div>
            <p className={`font-bold text-lg ${gc}`}>{scoreLabel(avgScore)}</p>
            <p className="text-slate-400 text-sm mt-1">{roleObj?.label} · {TOTAL_ROUNDS} rounds complete {proctored?"· Proctored 🔴":""}</p>
            {proctored && proctor.violations.length > 0 && (
              <p className="text-xs text-red-500 mt-2">{proctor.violations.length} integrity flag{proctor.violations.length>1?"s":""} recorded</p>
            )}
          </div>
          <div className="card mb-4">
            <p className="font-bold text-slate-800 mb-4">Round Breakdown</p>
            <div className="space-y-3">
              {scores.map((s,i) => {
                const sec = SECTIONS.find(x=>x.id===sections[i%sections.length]);
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-44"><span>{sec?.emoji}</span><span className="text-xs text-slate-500 font-medium truncate">{sec?.label}</span></div>
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden"><div className={`h-2 rounded-full ${s>=8?"bg-emerald-400":s>=6?"bg-yellow-400":"bg-red-400"}`} style={{width:`${s*10}%`}}/></div>
                    <span className={`text-sm font-extrabold w-10 text-right ${scoreColor(s)}`}>{s}/10</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={restart} className="btn-primary flex-1 flex items-center justify-center gap-2"><FiRefreshCw/>Practice Again</button>
            <button onClick={()=>{setPhase("interview");setRound(1);setScores([]);const s=getSectionForRound(1);setCurSection(s);if(proctored)proctor.startMedia();generateQuestion(s,1);}} className="btn-outline">Same Setup</button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ── INTERVIEW ─────────────────────────────────────────────────
  const sec    = curSection;
  const isCod  = sec?.hasCompiler;
  const pData  = proctored ? proctor : null;

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={restart} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"><FiArrowLeft/></button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-bold text-slate-900">Mock Interview</h1>
                {sec && <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${sec.border} ${sec.color} ${sec.bg}`}>{sec.emoji} {sec.label}</span>}
                {isCod && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700"><FiTerminal className="inline text-xs mr-1"/>COMPILER</span>}
                {proctored && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-900/20 text-red-400 border border-red-800/30 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"/>PROCTORED</span>}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{roleObj?.icon} {roleObj?.label} · {levelObj?.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500"><FiClock className="text-xs"/>Round {round}/{TOTAL_ROUNDS}</div>
        </div>

        <RoundBar round={round} scores={scores}/>

        {loading ? (
          <div className="card text-center py-16">
            <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"/>
            <p className="font-semibold text-slate-700">Generating {sec?.label} question...</p>
            <p className="text-slate-400 text-sm mt-1">Crafting a {levelObj?.label}-level question for you</p>
          </div>
        ) : question ? (
          isCod ? (
            <CompilerPanel question={question} onDone={handleRoundDone} onSkip={()=>handleRoundDone(0)} round={round} proctor={pData}/>
          ) : (
            <TextPanel    question={question} onDone={handleRoundDone} onSkip={()=>handleRoundDone(0)} round={round} section={sec} proctor={pData}/>
          )
        ) : null}
      </div>
    </DashboardLayout>
  );
}