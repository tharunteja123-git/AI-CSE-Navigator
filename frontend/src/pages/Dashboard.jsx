import { useAuth } from "../context/AuthContext";
import { useAssessment } from "../hooks/useAssessment";
import { useCodingProgress } from "../hooks/useCodingProgress";
import DashboardLayout from "../layouts/DashboardLayout";
import GlassmorphismDashboard from "../components/ui/glassmorphism-dashboard";
import { QUICK_LINKS, firstName } from "../lib/dashboard-utils";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: assessment, loading: assessLoading } = useAssessment();
  const { progress, loading: progressLoading, totalSolved, totalProblems } = useCodingProgress();

  return (
    <DashboardLayout>
      <GlassmorphismDashboard
        userName={firstName(user?.full_name)}
        quickLinks={QUICK_LINKS}
        assessLoading={assessLoading}
        assessment={assessment}
        progress={progress}
        progressLoading={progressLoading}
        totalSolved={totalSolved}
        totalProblems={totalProblems}
      />
    </DashboardLayout>
  );
}