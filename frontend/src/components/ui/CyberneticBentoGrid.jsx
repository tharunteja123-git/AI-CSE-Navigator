import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./cybernetic-bento.css";

import {
  BrainCircuit,
  Route,
  FileText,
  Code2,
  BookOpen,
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  ArrowRight,
  Sparkles,
  Bot,
  Trophy,
  Target,
} from "lucide-react";

import "./cybernetic-bento.css";

function BentoItem({
  children,
  className = "",
  onClick,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const card = ref.current;

    if (!card) return;

    function handleMove(e) {
      const rect = card.getBoundingClientRect();

      card.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );

      card.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );
    }

    card.addEventListener("mousemove", handleMove);

    return () => {
      card.removeEventListener(
        "mousemove",
        handleMove
      );
    };
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`bento-item group cursor-pointer rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 ${className}`}
    >
      {children}
    </div>
  );
}

export default function CyberneticBentoGrid() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "AI Mentor",
      desc: "Ask coding, interview and career doubts using AI.",
      icon: BrainCircuit,
      route: "/interview-ai",
      color: "text-cyan-400",
    },

    {
      title: "Career Roadmaps",
      desc: "Backend, Full Stack, AI, DevOps, Cloud and more.",
      icon: Route,
      route: "/career-path",
      color: "text-blue-400",
    },

    {
      title: "Resume Analyzer",
      desc: "Get ATS score and AI suggestions instantly.",
      icon: FileText,
      route: "/resume-analyzer",
      color: "text-green-400",
    },

    {
      title: "Coding Tracker",
      desc: "Track DSA progress and company questions.",
      icon: Code2,
      route: "/coding-tracker",
      color: "text-purple-400",
    },

    {
      title: "Concept Hub",
      desc: "DBMS, OS, CN, SQL, Aptitude and DSA.",
      icon: BookOpen,
      route: "/concepts",
      color: "text-pink-400",
    },

    {
      title: "Jobs",
      desc: "Latest internships and fresher jobs.",
      icon: Briefcase,
      route: "/jobs",
      color: "text-orange-400",
    },

    {
      title: "Interview Prep",
      desc: "HR, Technical, Coding and Mock Interviews.",
      icon: GraduationCap,
      route: "/interview",
      color: "text-red-400",
    },

    {
      title: "Dashboard",
      desc: "Monitor your complete learning journey.",
      icon: LayoutDashboard,
      route: "/dashboard",
      color: "text-yellow-400",
    },
  ];
    return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500/10 blur-[140px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">

        {/* Heading */}

        <div className="text-center mb-14">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm mb-5">

            <Sparkles size={16} />

            AI Powered Career Platform

          </div>

          <h1 className="text-6xl font-black text-white leading-tight">

            Build Your
            <span className="text-cyan-400"> Dream Career </span>
            with AI

          </h1>

          <p className="text-slate-400 max-w-3xl mx-auto mt-6 text-lg leading-8">

            Learn DSA, System Design, Interview Preparation,
            Resume Building, Career Roadmaps and AI Mentoring —
            everything in one intelligent platform.

          </p>

        </div>

        {/* GRID */}

        <div className="grid lg:grid-cols-4 gap-6 auto-rows-[220px]">

          {/* Hero Card */}

          <BentoItem
            className="lg:col-span-2 lg:row-span-2"
            onClick={() => navigate("/interview-ai")}
          >

            <div className="flex flex-col justify-between h-full">

              <div>

                <div className="flex items-center gap-4">

                  <BrainCircuit
                    size={60}
                    className="text-cyan-400"
                  />

                  <div>

                    <h2 className="text-3xl font-bold text-white">

                      AI Mentor

                    </h2>

                    <p className="text-slate-400 mt-2">

                      Your 24×7 coding companion

                    </p>

                  </div>

                </div>

                <p className="mt-8 text-slate-300 leading-8">

                  Ask doubts, generate interview answers,
                  solve coding problems, build resumes,
                  receive personalized learning plans,
                  practice HR interviews,
                  and prepare for FAANG companies.

                </p>

              </div>

              <div className="flex items-center gap-3 text-cyan-400 font-semibold">

                Explore AI Mentor

                <ArrowRight className="group-hover:translate-x-2 transition-transform" />

              </div>

            </div>

          </BentoItem>

          {/* Stats */}

          <BentoItem>

            <Target
              className="text-cyan-400 mb-6"
              size={40}
            />

            <h2 className="text-5xl font-black text-white">

              500+

            </h2>

            <p className="text-slate-400 mt-2">

              Coding Problems

            </p>

          </BentoItem>

          <BentoItem>

            <Trophy
              className="text-yellow-400 mb-6"
              size={40}
            />

            <h2 className="text-5xl font-black text-white">

              100+

            </h2>

            <p className="text-slate-400 mt-2">

              Company Sheets

            </p>

          </BentoItem>
                    {/* Remaining Feature Cards */}

          {cards.slice(1, 7).map((card, index) => {
            const Icon = card.icon;

            return (
              <BentoItem
                key={index}
                onClick={() => navigate(card.route)}
              >
                <div className="flex flex-col h-full justify-between">

                  <div>

                    <Icon
                      size={38}
                      className={`${card.color} mb-5`}
                    />

                    <h3 className="text-2xl font-bold text-white">

                      {card.title}

                    </h3>

                    <p className="text-slate-400 mt-4 leading-7">

                      {card.desc}

                    </p>

                  </div>

                  <div className="flex items-center text-cyan-400 font-semibold">

                    Explore

                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-2 transition-transform"
                    />

                  </div>

                </div>

              </BentoItem>
            );
          })}

          {/* Dashboard Card */}

          <BentoItem
            className="lg:col-span-2"
            onClick={() => navigate("/dashboard")}
          >

            <div className="flex justify-between h-full items-center">

              <div>

                <LayoutDashboard
                  size={45}
                  className="text-cyan-400 mb-5"
                />

                <h2 className="text-3xl font-bold text-white">

                  Student Dashboard

                </h2>

                <p className="text-slate-400 mt-4 max-w-md leading-7">

                  Track coding streaks, completed DSA,
                  interview preparation, career progress,
                  roadmap completion and AI activity.

                </p>

              </div>

              <div className="text-right">

                <h1 className="text-6xl font-black text-cyan-400">

                  92%

                </h1>

                <p className="text-slate-500">

                  Progress

                </p>

              </div>

            </div>

          </BentoItem>

        </div>

        {/* Bottom CTA */}

        <div className="mt-20 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-12 text-center">

          <Bot
            size={70}
            className="mx-auto text-cyan-400 mb-6"
          />

          <h2 className="text-4xl font-bold text-white">

            Ready To Become Interview Ready?

          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-lg leading-8">

            Master DSA, System Design,
            Resume Building,
            Mock Interviews,
            AI Mentor,
            Career Roadmaps,
            and crack your dream software job.

          </p>

          <button
            onClick={() => navigate("/career-path")}
            className="mt-10 px-10 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all duration-300 hover:scale-105"
          >

            Start Learning →

          </button>

        </div>

      </div>

    </div>
  );
}