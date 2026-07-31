// ─────────────────────────────────────────────────────────────────
// components/ui/animated-register.jsx
// 21st.dev-style Register UI — form left, marketing panel right
// Based on: AuthSectionThree pattern from 21st.dev
// ─────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff, FiCheck, FiX, FiArrowRight, FiZap } from "react-icons/fi";
import {
  cn,
  PASSWORD_CHECKS,
  getPasswordStrength,
  GoogleIconSVG,
  GithubIconSVG,
  fadeUpVariant,
  slideUpVariant,
  REGISTER_STATS,
  REGISTER_FEATURES,
  TESTIMONIALS,
} from "../../lib/utilsreg";

// ── InputField ────────────────────────────────────────────────────
export function InputField({ label, required, icon: Icon, type = "text", className, ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className={cn("space-y-1.5 text-left w-full", className)}>
      <label className="flex items-center gap-1 text-xs font-semibold text-white/50 tracking-wide">
        {label}
        {required && <span className="text-indigo-400">*</span>}
      </label>
      <div className="relative flex h-11 items-center rounded-xl border border-white/10 bg-white/[0.04] px-3.5 focus-within:border-indigo-500 focus-within:bg-indigo-500/[0.04] transition-all duration-200">
        {Icon && <Icon className="text-white/20 mr-2.5 flex-shrink-0 text-[15px]" />}
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/20 autofill:bg-transparent"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="ml-2 text-white/20 hover:text-white/60 transition-colors flex-shrink-0"
            tabIndex={-1}
          >
            {show ? <FiEyeOff className="text-[15px]" /> : <FiEye className="text-[15px]" />}
          </button>
        )}
      </div>
    </div>
  );
}

// ── PasswordStrengthMeter ─────────────────────────────────────────
export function PasswordStrengthMeter({ password }) {
  if (!password) return null;
  const { score, label, barColor, textColor, isStrong } = getPasswordStrength(password);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-2 space-y-2 overflow-hidden"
      >
        {/* Bar */}
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-all duration-300",
                i < score ? barColor : "bg-white/10"
              )}
            />
          ))}
        </div>
        <p className={cn("text-[11px] font-semibold", textColor)}>{label}</p>
        {/* Checklist */}
        <div className="grid grid-cols-2 gap-y-1">
          {PASSWORD_CHECKS.map((c) => {
            const ok = c.test(password);
            return (
              <div
                key={c.label}
                className={cn(
                  "flex items-center gap-1.5 text-[11px] transition-colors",
                  ok ? "text-emerald-400" : "text-white/25"
                )}
              >
                {ok ? <FiCheck className="text-[9px] flex-shrink-0" /> : <FiX className="text-[9px] flex-shrink-0" />}
                {c.label}
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── PasswordMatchIndicator ────────────────────────────────────────
export function PasswordMatchIndicator({ password, confirm }) {
  if (!confirm) return null;
  const match = password === confirm;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold",
        match ? "text-emerald-400" : "text-red-400"
      )}
    >
      {match ? <FiCheck className="text-[9px]" /> : <FiX className="text-[9px]" />}
      {match ? "Passwords match" : "Passwords do not match"}
    </motion.div>
  );
}

// ── CheckboxLine ──────────────────────────────────────────────────
export function CheckboxLine({ checked, onChange, children }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group">
      <span className="relative mt-0.5 size-4 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer size-full cursor-pointer appearance-none rounded border border-white/20 bg-white/[0.04] checked:border-indigo-500 checked:bg-indigo-600 transition-colors"
        />
        <svg
          viewBox="0 0 12 12"
          className="pointer-events-none absolute inset-0 hidden size-full p-0.5 text-white peer-checked:block"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 6.2 5 8.1 9 3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-xs text-white/35 leading-5 group-hover:text-white/50 transition-colors">
        {children}
      </span>
    </label>
  );
}

// ── SocialButton ──────────────────────────────────────────────────
function SocialButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm font-medium text-white/70 transition-all hover:bg-white/[0.08] hover:border-white/20 hover:text-white active:scale-[0.98]"
    >
      {icon}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}

// ── Divider ───────────────────────────────────────────────────────
export function OrDivider() {
  return (
    <div className="flex items-center gap-4 text-xs font-medium text-white/20">
      <div className="h-px flex-1 bg-white/10" />
      or continue with email
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

// ── MarketingPanel ────────────────────────────────────────────────
function MarketingPanel() {
  const testimonial = TESTIMONIALS[0];

  return (
    <div className="relative flex flex-col h-full px-12 py-14 xl:px-16 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-black" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-600/12 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 right-0 w-56 h-56 bg-blue-500/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Animated corner dots */}
      {[
        "top-8 right-8", "top-8 right-14", "top-14 right-8",
        "bottom-8 left-8", "bottom-8 left-14", "bottom-14 left-8",
      ].map((pos, i) => (
        <motion.div
          key={i}
          className={cn("absolute w-1 h-1 rounded-full bg-indigo-400/30", pos)}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
          custom={0}
          className="flex items-center gap-2.5 mb-12"
        >
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-extrabold text-xs shadow-lg shadow-indigo-500/30">
            AI
          </div>
          <span className="text-white font-bold text-sm">CSE Navigator</span>
        </motion.div>

        {/* Testimonial */}
        <motion.div variants={fadeUpVariant} initial="hidden" animate="visible" custom={0.1} className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className={cn("w-10 h-10 bg-gradient-to-br rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0", testimonial.gradient)}>
              {testimonial.initials}
            </div>
            <div>
              <p className="font-semibold text-white text-sm leading-tight">{testimonial.name}</p>
              <p className="text-white/40 text-xs mt-0.5">{testimonial.role}</p>
            </div>
            {/* Stars */}
            <div className="ml-auto flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <blockquote className="text-xl xl:text-2xl font-light leading-snug tracking-tight text-white/85">
            {testimonial.quote}
          </blockquote>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={slideUpVariant}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="grid grid-cols-2 gap-3 mb-10"
        >
          {REGISTER_STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              variants={slideUpVariant}
              initial="hidden"
              animate="visible"
              custom={0.25 + i * 0.05}
              className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 hover:bg-white/[0.07] transition-colors"
            >
              <p className="text-2xl font-extrabold text-indigo-400">{value}</p>
              <p className="text-xs text-white/30 mt-0.5">{label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div variants={slideUpVariant} initial="hidden" animate="visible" custom={0.4}>
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.15em] mb-4">
            Everything included
          </p>
          <div className="space-y-2.5">
            {REGISTER_FEATURES.map(({ emoji, text }, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.06 }}
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white/70 transition-colors"
              >
                <span className="text-base leading-none">{emoji}</span>
                {text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom badge */}
        <motion.div
          variants={slideUpVariant}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="mt-auto pt-10"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3.5 py-2 rounded-full">
            <motion.div
              className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            Free to use · No credit card required
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ── AnimatedRegister — main exported component ────────────────────
export default function AnimatedRegister({ onSubmit, loading }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    graduation_year: "",
  });
  const [agree, setAgree] = useState(false);
  const [updates, setUpdates] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const { isStrong } = getPasswordStrength(form.password);
  const passwordMatch = form.confirm_password
    ? form.password === form.confirm_password
    : true;
  const canSubmit =
    form.full_name &&
    form.email &&
    isStrong &&
    form.password === form.confirm_password &&
    agree &&
    !loading;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit?.(form);
  };

  return (
    <section className="min-h-screen bg-[#050507] text-white antialiased p-2.5">
      <div className="grid min-h-[calc(100vh-1.25rem)] gap-2.5 lg:grid-cols-[1fr_1fr]">

        {/* ── LEFT: Form ── */}
        <div className="flex min-h-[700px] items-center justify-center rounded-2xl border border-white/[0.06] bg-[#0a0a0c] px-6 py-12 lg:min-h-0 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-[420px]"
          >
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 mb-8 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-extrabold text-xs shadow-lg shadow-indigo-500/25 group-hover:bg-indigo-500 transition-colors">
                AI
              </div>
              <span className="text-white font-bold text-sm">CSE Navigator</span>
            </Link>

            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-3xl font-semibold tracking-tight">Create an account</h1>
              <p className="text-white/35 mt-2 text-sm">
                Join 12,000+ CSE students building their dream career
              </p>
            </div>

            {/* Social buttons */}
            <div className="grid gap-3 sm:grid-cols-2 mb-6">
              <SocialButton icon={<GoogleIconSVG size={15} />} label="Sign up with Google" />
              <SocialButton icon={<GithubIconSVG size={16} />} label="Sign up with GitHub" />
            </div>

            <OrDivider />

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Name + Year */}
              <div className="grid gap-3 sm:grid-cols-2">
                <InputField
                  label="Full Name" required
                  placeholder="Rahul Kumar"
                  value={form.full_name}
                  onChange={(e) => set("full_name", e.target.value)}
                />
                <InputField
                  label="Grad Year"
                  type="number"
                  placeholder="2026"
                  value={form.graduation_year}
                  onChange={(e) => set("graduation_year", e.target.value)}
                  min="2020" max="2030"
                />
              </div>

              {/* Email */}
              <InputField
                label="Email address" required
                type="email"
                placeholder="rahul@example.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />

              {/* Password */}
              <div>
                <InputField
                  label="Password" required
                  type="password"
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                />
                <PasswordStrengthMeter password={form.password} />
              </div>

              {/* Confirm Password */}
              <div>
                <InputField
                  label="Re-enter Password" required
                  type="password"
                  placeholder="Confirm your password"
                  value={form.confirm_password}
                  onChange={(e) => set("confirm_password", e.target.value)}
                />
                <PasswordMatchIndicator
                  password={form.password}
                  confirm={form.confirm_password}
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 pt-1">
                <CheckboxLine checked={updates} onChange={(e) => setUpdates(e.target.checked)}>
                  I'd like to receive DSA tips, career resources and product updates.
                </CheckboxLine>
                <CheckboxLine checked={agree} onChange={(e) => setAgree(e.target.checked)}>
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300">
                    Privacy Policy
                  </a>
                  .<span className="text-indigo-400"> *</span>
                </CheckboxLine>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-600 text-sm font-semibold text-white transition-all hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-35 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <FiZap className="text-sm" />
                    Create Account
                    <FiArrowRight className="text-sm" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-white/25 text-xs mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Sign in →
              </Link>
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT: Marketing Panel ── */}
        <div className="hidden lg:block rounded-2xl overflow-hidden border border-white/[0.04]">
          <MarketingPanel />
        </div>

      </div>
    </section>
  );
}