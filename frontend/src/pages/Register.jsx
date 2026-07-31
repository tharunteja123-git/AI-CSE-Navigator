// ─────────────────────────────────────────────────────────────────
// pages/Register.jsx
// Thin page — delegates all UI to AnimatedRegister component
// Handles: form submission, API calls, navigation, toasts
// ─────────────────────────────────────────────────────────────────

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import toast from "react-hot-toast";
import { useState } from "react";
import AnimatedRegister from "../components/ui/animated-register";
import { getPasswordStrength } from "../lib/utilsreg";
import { PASSWORD_CHECKS } from "../lib/utilsreg";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    // ── Client-side validation ──────────────────────────────────
    if (!form.full_name.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }

    const { isStrong } = getPasswordStrength(form.password);
    if (!isStrong) {
      const failing = PASSWORD_CHECKS.filter((c) => !c.test(form.password));
      toast.error(`Password needs: ${failing[0]?.label}`);
      return;
    }

    if (form.password !== form.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    // ── API ──────────────────────────────────────────────────────
    setLoading(true);
    try {
      const payload = {
        full_name: form.full_name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        graduation_year: form.graduation_year ? Number(form.graduation_year) : null,
      };

      const regData = await api.register(payload);

      if (regData?.id) {
        // Auto-login after register
        const loginData = await api.login({
          email: payload.email,
          password: payload.password,
        });

        if (loginData?.access_token) {
          login(loginData.access_token);
          toast.success("Account created! Let's set up your profile 🎉", {
            duration: 3000,
            icon: "🚀",
          });
          navigate("/onboarding");
        } else {
          toast.error(loginData?.detail || "Login after register failed");
          navigate("/login");
        }
      } else {
        // Handle specific backend errors
        const msg = regData?.detail || "";
        if (msg.toLowerCase().includes("email")) {
          toast.error("This email is already registered. Try signing in.");
        } else {
          toast.error(msg || "Registration failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return <AnimatedRegister onSubmit={handleSubmit} loading={loading} />;
}