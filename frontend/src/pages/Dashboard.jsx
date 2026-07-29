import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAssessment } from "../hooks/useAssessment";
import { useCodingProgress } from "../hooks/useCodingProgress";
import DashboardLayout from "../layouts/DashboardLayout";
import CareerScoreCard from "../components/dashboard/CareerScoreCard";
import ProgressChart from "../components/dashboard/ProgressChart";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import DashboardHero from "../components/dashboard/DashboardHero";
import DashboardStats from "../components/dashboard/DashboardStats";
import QuickActionsBento from "../components/dashboard/QuickActionsBento";
import ResumeCard from "../components/dashboard/ResumeCard";
import InterviewCard from "../components/dashboard/InterviewCard";
import WeeklyPlanCard from "../components/dashboard/WeeklyPlanCard";
//import SkillsCard from "../components/dashboard/SkillsCard";
import ProjectsCard from "../components/dashboard/ProjectsCard";
//import CompaniesCard from "../components/dashboard/CompaniesCard";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";

const quickLinks = [
  { to: "/mock-interview",  emoji: "🎯", label: "Mock Interview",  desc: "Practice with AI", isNew: true },
  { to: "/skill-gap",       emoji: "🔍", label: "Skill Gap",       desc: "Analyze any JD",  isNew: true },
  { to: "/roadmap",         emoji: "🗺️", label: "Roadmap",         desc: "Weekly plan" },
  { to: "/resume-analyzer", emoji: "📄", label: "Resume",          desc: "ATS check" },
  { to: "/interview-ai",    emoji: "🤖", label: "AI Mentor",       desc: "Ask anything" },
  { to: "/jobs",            emoji: "💼", label: "Jobs",            desc: "Find opportunities" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { data: assessment, loading: assessLoading } = useAssessment();
  const { progress, loading: progressLoading, totalSolved, totalProblems } = useCodingProgress();

  return (
     <DashboardLayout>
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Hero */}
        <DashboardHero
          user={user}
          totalSolved={totalSolved}
          totalProblems={totalProblems}
        />

        {/* Top Stats */}
        <DashboardStats
          assessment={assessment}
          totalSolved={totalSolved}
          totalProblems={totalProblems}
        />

        {/* Quick Actions */}
        <QuickActionsBento />

        {assessLoading ? (
          <LoadingSpinner text="Loading Dashboard..." />
        ) : assessment ? (
          <>

            <div className="grid xl:grid-cols-3 gap-6">

              <CareerScoreCard assessment={assessment} />

              <ResumeCard assessment={assessment} />

              <InterviewCard assessment={assessment} />

            </div>

            <div className="grid xl:grid-cols-2 gap-6">

              <WeeklyPlanCard
                weeklyPlan={assessment.weekly_plan}
              />

              {/*<SkillsCard
                skills={assessment.missing_skills}
              />*/}

            </div>

            <div className="grid xl:grid-cols-2 gap-6">

              <ProgressChart
                progress={progress}
              />

              <ProjectsCard
                projects={assessment.recommended_projects}
              />

            </div>

            <div className="grid xl:grid-cols-2 gap-6">

              {/*<CompaniesCard
                companies={assessment.target_companies}
              />*/}

              <ActivityTimeline />

            </div>

          </>
        ) : (
          <EmptyState
            emoji="🚀"
            title="Start Your AI Career Journey"
            desc="Complete onboarding to unlock personalized AI career recommendations."
            cta="Get Started"
            ctaLink="/onboarding"
          />
        )}

      </div>

    </div>
  </DashboardLayout>
);
    
}
