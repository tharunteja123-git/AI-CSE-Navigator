import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Onboarding from "../pages/Onboarding";
import Dashboard from "../pages/Dashboard";
import CareerPath from "../pages/CareerPath";
import Roadmap from "../pages/Roadmap";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";
import InterviewAI from "../pages/InterviewAI";
import CodingTracker from "../pages/CodingTracker";
import Jobs from "../pages/Jobs";
import Profile from "../pages/Profile";
import MockInterview from "../pages/MockInterview";
import SkillGapAnalyzer from "../pages/SkillGapAnalyzer";
import ConceptHub from "../pages/ConceptHub";

function PrivateRoute({ children }) {
  const { token, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
  return token ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/"                element={<Home />} />
      <Route path="/login"           element={<Login />} />
      <Route path="/register"        element={<Register />} />
      <Route path="/onboarding"      element={<PrivateRoute><Onboarding /></PrivateRoute>} />
      <Route path="/dashboard"       element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/career-path"     element={<PrivateRoute><CareerPath /></PrivateRoute>} />
      <Route path="/roadmap"         element={<PrivateRoute><Roadmap /></PrivateRoute>} />
      <Route path="/concept-hub"     element={<PrivateRoute><ConceptHub /></PrivateRoute>} />
      <Route path="/mock-interview"  element={<PrivateRoute><MockInterview /></PrivateRoute>} />
      <Route path="/skill-gap"       element={<PrivateRoute><SkillGapAnalyzer /></PrivateRoute>} />
      <Route path="/resume-analyzer" element={<PrivateRoute><ResumeAnalyzer /></PrivateRoute>} />
      <Route path="/interview-ai"    element={<PrivateRoute><InterviewAI /></PrivateRoute>} />
      <Route path="/coding-tracker"  element={<PrivateRoute><CodingTracker /></PrivateRoute>} />
      <Route path="/jobs"            element={<PrivateRoute><Jobs /></PrivateRoute>} />
      <Route path="/profile"         element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  );
}




