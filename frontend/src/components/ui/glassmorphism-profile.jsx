// ─────────────────────────────────────────────────────────────────
// components/ui/glassmorphism-profile.jsx
// Inspired by GlassmorphismPortfolioBlock from 21st.dev
// Full profile UI — avatar, career info, social links, coding profiles
// ─────────────────────────────────────────────────────────────────

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEdit2, FiSave, FiX, FiCamera, FiCheck,
  FiUser, FiBook, FiCode, FiLink, FiAward,
  FiTarget, FiClock, FiChevronRight, FiGlobe,
} from "react-icons/fi";
import {
  cn, fadeUp, stagger, staggerItem,
  CAREER_GOALS, SKILL_LEVELS, DSA_LEVELS, YEARS,
  STUDY_HOURS, LEARNING_STYLES, LANGUAGES_LIST,
  SOCIAL_PLATFORMS, getInitials, calcCompletion,
} from "../../lib/profile-utils.jsx";

// ── Glassmorphism Card ────────────────────────────────────────────
function GlassCard({ children, className, hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl",
        "hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300",
        className
      )}
    >
      {/* subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

// ── Section Header ────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, onEdit, editing, onSave, onCancel, saving }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/[0.06]">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-indigo-500/15 border border-indigo-500/20 rounded-lg flex items-center justify-center">
          <Icon className="text-indigo-400 text-xs" />
        </div>
        <p className="font-semibold text-white text-sm tracking-tight">{title}</p>
      </div>
      {onEdit && !editing && (
        <button onClick={onEdit}
          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-indigo-400 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-indigo-500/10">
          <FiEdit2 className="text-[11px]" /> Edit
        </button>
      )}
      {editing && (
        <div className="flex items-center gap-2">
          <button onClick={onCancel}
            className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/5">
            <FiX className="text-[11px]" /> Cancel
          </button>
          <button onClick={onSave} disabled={saving}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors px-3 py-1.5 rounded-lg disabled:opacity-50">
            {saving ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave className="text-[11px]" />}
            Save
          </button>
        </div>
      )}
    </div>
  );
}

// ── Field Row (view) ──────────────────────────────────────────────
function FieldRow({ label, value, placeholder = "Not set" }) {
  return (
    <div className="flex items-start justify-between py-2.5 px-5 border-b border-white/[0.04] last:border-0 group">
      <span className="text-xs text-white/30 w-36 flex-shrink-0 pt-0.5">{label}</span>
      <span className={cn("text-sm text-right leading-relaxed", value ? "text-white/75" : "text-white/15 italic")}>
        {value || placeholder}
      </span>
    </div>
  );
}

// ── Input Field ───────────────────────────────────────────────────
function Field({ label, value, onChange, type = "text", placeholder, opts }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">{label}</label>
      {opts ? (
        <select value={value || ""} onChange={(e) => onChange(e.target.value)}
          className="w-full h-9 bg-white/[0.05] border border-white/10 text-white text-sm rounded-xl px-3 outline-none focus:border-indigo-500 transition-colors appearance-none">
          <option value="" className="bg-slate-900">Select...</option>
          {opts.map((o) => <option key={o} value={o} className="bg-slate-900">{o}</option>)}
        </select>
      ) : (
        <input type={type} value={value || ""} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-9 bg-white/[0.05] border border-white/10 text-white text-sm rounded-xl px-3 outline-none focus:border-indigo-500 transition-colors placeholder:text-white/20" />
      )}
    </div>
  );
}

// ── Language Tag Selector ─────────────────────────────────────────
function LanguageSelector({ selected, onChange }) {
  const arr = selected ? selected.split(",").map((s) => s.trim()).filter(Boolean) : [];
  const toggle = (lang) => {
    const next = arr.includes(lang) ? arr.filter((l) => l !== lang) : [...arr, lang];
    onChange(next.join(", "));
  };
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-semibold text-white/30 uppercase tracking-wider">Programming Languages</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {LANGUAGES_LIST.map((lang) => {
          const active = arr.includes(lang);
          return (
            <button key={lang} type="button" onClick={() => toggle(lang)}
              className={cn(
                "text-xs px-3 py-1.5 rounded-xl border transition-all duration-200 font-medium",
                active
                  ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-300"
                  : "bg-white/[0.04] border-white/10 text-white/35 hover:border-white/20 hover:text-white/60"
              )}>
              {active && <FiCheck className="inline text-[10px] mr-1" />}
              {lang}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Avatar Block ──────────────────────────────────────────────────
function AvatarBlock({ name, email, completion, photo, onPhotoChange }) {
  const inputRef = useRef(null);
  const initials = getInitials(name);

  return (
    <div className="flex flex-col items-center text-center p-6">
      {/* Avatar */}
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-xl scale-110" />
        <div className="relative w-24 h-24 rounded-full border-2 border-white/15 overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl">
          {photo ? (
            <img src={photo} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-3xl font-bold text-white">
              {initials}
            </span>
          )}
        </div>
        <button onClick={() => inputRef.current?.click()}
          className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center border-2 border-[#0a0a0c] transition-colors shadow-lg">
          <FiCamera className="text-white text-[10px]" />
        </button>
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (ev) => onPhotoChange(ev.target.result);
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>

      <h2 className="text-lg font-bold text-white tracking-tight">{name || "Your Name"}</h2>
      <p className="text-xs text-white/35 mt-0.5">{email}</p>

      {/* Completion ring */}
      <div className="mt-5 w-full">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-white/30">Profile completion</span>
          <span className="text-[11px] font-bold text-indigo-400">{completion}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Social Link Item ──────────────────────────────────────────────
function SocialLinkItem({ platform, value, editing, onChange }) {
  const url = value ? (value.startsWith("http") ? value : `https://${value}`) : null;

  if (!editing && !value) return null;

  return (
    <motion.div variants={staggerItem}>
      {editing ? (
        <div className="flex items-center gap-3 py-2.5 px-5 border-b border-white/[0.04] last:border-0">
          <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0", platform.bg)}>
            {platform.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-white/30 mb-1">{platform.label}</p>
            <input
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder={platform.placeholder}
              className="w-full bg-white/[0.05] border border-white/10 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 transition-colors placeholder:text-white/15"
            />
          </div>
        </div>
      ) : (
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="group flex items-center justify-between py-3 px-5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors">
          <div className="flex items-center gap-3">
            <div className={cn("w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg", platform.bg)}>
              {platform.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{platform.label}</p>
              <p className="text-[11px] text-white/30 truncate max-w-[180px]">{value}</p>
            </div>
          </div>
          <FiChevronRight className="text-white/20 group-hover:text-white/50 group-hover:translate-x-0.5 transition-all text-sm" />
        </a>
      )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN EXPORTED COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function GlassmorphismProfile({
  user, profile, onSaveCareer, onSaveSocial, loading,
}) {
  const [photo, setPhoto] = useState(null);

  // ── Career Info state ──
  const [careerEditing, setCareerEditing] = useState(false);
  const [careerSaving, setCareerSaving] = useState(false);
  const [careerForm, setCareerForm] = useState({
    current_year: profile?.current_year || "",
    career_goal: profile?.career_goal || "",
    skill_level: profile?.skill_level || "",
    languages: profile?.languages || "",
    dsa_level: profile?.dsa_level || "",
    study_hours: profile?.study_hours || "",
    learning_style: profile?.learning_style || "",
    interests: profile?.interests || "",
  });

  // ── Social links state ──
  const [socialEditing, setSocialEditing] = useState(false);
  const [socialSaving, setSocialSaving] = useState(false);
  const [socialForm, setSocialForm] = useState({
    github: profile?.github || "",
    linkedin: profile?.linkedin || "",
    leetcode: profile?.leetcode || "",
    codeforces: profile?.codeforces || "",
    gfg: profile?.gfg || "",
    twitter: profile?.twitter || "",
    portfolio: profile?.portfolio || "",
  });

  const setCareer = (k, v) => setCareerForm((f) => ({ ...f, [k]: v }));
  const setSocial = (k, v) => setSocialForm((f) => ({ ...f, [k]: v }));

  const handleSaveCareer = async () => {
    setCareerSaving(true);
    await onSaveCareer?.(careerForm);
    setCareerSaving(false);
    setCareerEditing(false);
  };

  const handleSaveSocial = async () => {
    setSocialSaving(true);
    await onSaveSocial?.({ ...careerForm, ...socialForm });
    setSocialSaving(false);
    setSocialEditing(false);
  };

  const completion = calcCompletion(careerForm, socialForm);
  const langArray = careerForm.languages
    ? careerForm.languages.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <section className="min-h-screen bg-[#050507] py-8 px-4">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/6 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Page header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-7">
          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] text-white/40 text-[11px] font-semibold px-3 py-1.5 rounded-full mb-3 uppercase tracking-widest">
            <FiUser className="text-indigo-400 text-xs" /> My Profile
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Account & Career Profile</h1>
          <p className="text-white/35 text-sm mt-1">Manage your career information, coding profiles and social links</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-[300px_1fr] gap-4">

            {/* ── LEFT COLUMN ── */}
            <div className="space-y-4">

              {/* Avatar Card */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
                <GlassCard hover={false}>
                  <AvatarBlock
                    name={user?.full_name}
                    email={user?.email}
                    completion={completion}
                    photo={photo}
                    onPhotoChange={setPhoto}
                  />
                </GlassCard>
              </motion.div>

              {/* Quick Stats */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
                <GlassCard hover={false}>
                  <div className="p-5 space-y-3">
                    <p className="text-[11px] font-bold text-white/25 uppercase tracking-widest">Quick Info</p>
                    {[
                      { label: "Year", value: careerForm.current_year, icon: FiBook },
                      { label: "Goal", value: careerForm.career_goal, icon: FiTarget },
                      { label: "DSA Level", value: careerForm.dsa_level, icon: FiCode },
                      { label: "Study", value: careerForm.study_hours, icon: FiClock },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="flex items-center gap-3 py-1">
                        <div className="w-6 h-6 bg-white/[0.04] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="text-white/25 text-[10px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-white/25">{label}</p>
                          <p className="text-xs text-white/60 truncate">{value || "—"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Languages */}
              {langArray.length > 0 && (
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.15}>
                  <GlassCard hover={false}>
                    <div className="p-5">
                      <p className="text-[11px] font-bold text-white/25 uppercase tracking-widest mb-3">Languages</p>
                      <div className="flex flex-wrap gap-1.5">
                        {langArray.map((lang) => (
                          <span key={lang} className="text-[11px] px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg font-medium">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="space-y-4">

              {/* Career Information Card */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1}>
                <GlassCard hover={false}>
                  <SectionHeader
                    icon={FiAward}
                    title="Career Information"
                    onEdit={() => setCareerEditing(true)}
                    editing={careerEditing}
                    onSave={handleSaveCareer}
                    onCancel={() => setCareerEditing(false)}
                    saving={careerSaving}
                  />

                  <AnimatePresence mode="wait">
                    {careerEditing ? (
                      <motion.div
                        key="edit"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="p-5 grid sm:grid-cols-2 gap-4"
                      >
                        <Field label="Current Year / Status" value={careerForm.current_year}
                          onChange={(v) => setCareer("current_year", v)} opts={YEARS} />
                        <Field label="Career Goal" value={careerForm.career_goal}
                          onChange={(v) => setCareer("career_goal", v)} opts={CAREER_GOALS} />
                        <Field label="Skill Level" value={careerForm.skill_level}
                          onChange={(v) => setCareer("skill_level", v)} opts={SKILL_LEVELS} />
                        <Field label="DSA Level" value={careerForm.dsa_level}
                          onChange={(v) => setCareer("dsa_level", v)} opts={DSA_LEVELS} />
                        <Field label="Daily Study Hours" value={careerForm.study_hours}
                          onChange={(v) => setCareer("study_hours", v)} opts={STUDY_HOURS} />
                        <Field label="Learning Style" value={careerForm.learning_style}
                          onChange={(v) => setCareer("learning_style", v)} opts={LEARNING_STYLES} />
                        <div className="sm:col-span-2">
                          <Field label="Interests / Topics" value={careerForm.interests}
                            onChange={(v) => setCareer("interests", v)}
                            placeholder="e.g. Machine Learning, Web Dev, Competitive Programming" />
                        </div>
                        <div className="sm:col-span-2">
                          <LanguageSelector
                            selected={careerForm.languages}
                            onChange={(v) => setCareer("languages", v)}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <FieldRow label="Year / Status"     value={careerForm.current_year} />
                        <FieldRow label="Career Goal"       value={careerForm.career_goal} />
                        <FieldRow label="Skill Level"       value={careerForm.skill_level} />
                        <FieldRow label="DSA Level"         value={careerForm.dsa_level} />
                        <FieldRow label="Daily Study"       value={careerForm.study_hours} />
                        <FieldRow label="Learning Style"    value={careerForm.learning_style} />
                        <FieldRow label="Interests"         value={careerForm.interests} />
                        <FieldRow label="Languages"         value={careerForm.languages} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlassCard>
              </motion.div>

              {/* Social & Coding Profiles Card */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
                <GlassCard hover={false}>
                  <SectionHeader
                    icon={FiLink}
                    title="Social & Coding Profiles"
                    onEdit={() => setSocialEditing(true)}
                    editing={socialEditing}
                    onSave={handleSaveSocial}
                    onCancel={() => setSocialEditing(false)}
                    saving={socialSaving}
                  />

                  {socialEditing && (
                    <div className="px-5 pt-3 pb-1">
                      <div className="flex items-center gap-2 py-2.5 border-b border-white/[0.04]">
                        <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                          <FiGlobe className="text-white/40 text-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-white/30 mb-1">Portfolio / Website</p>
                          <input value={socialForm.portfolio || ""} onChange={(e) => setSocial("portfolio", e.target.value)}
                            placeholder="yourportfolio.com"
                            className="w-full bg-white/[0.05] border border-white/10 text-white text-xs rounded-lg px-2.5 py-1.5 outline-none focus:border-indigo-500 transition-colors placeholder:text-white/15" />
                        </div>
                      </div>
                    </div>
                  )}

                  {!socialEditing && socialForm.portfolio && (
                    <a href={socialForm.portfolio.startsWith("http") ? socialForm.portfolio : `https://${socialForm.portfolio}`}
                      target="_blank" rel="noopener noreferrer"
                      className="group flex items-center justify-between py-3 px-5 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                          <FiGlobe className="text-white text-sm" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Portfolio</p>
                          <p className="text-[11px] text-white/30 truncate max-w-[200px]">{socialForm.portfolio}</p>
                        </div>
                      </div>
                      <FiChevronRight className="text-white/20 group-hover:text-white/50 transition-all text-sm" />
                    </a>
                  )}

                  <motion.div variants={stagger} initial="hidden" animate="visible">
                    {SOCIAL_PLATFORMS.map((platform) => (
                      <SocialLinkItem
                        key={platform.key}
                        platform={platform}
                        value={socialForm[platform.key]}
                        editing={socialEditing}
                        onChange={(v) => setSocial(platform.key, v)}
                      />
                    ))}
                  </motion.div>

                  {!socialEditing && Object.values(socialForm).every((v) => !v) && (
                    <div className="text-center py-8 px-5">
                      <div className="w-10 h-10 bg-white/[0.04] rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <FiLink className="text-white/20 text-base" />
                      </div>
                      <p className="text-sm text-white/25">No social links added yet</p>
                      <button onClick={() => setSocialEditing(true)}
                        className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                        Add your profiles →
                      </button>
                    </div>
                  )}
                </GlassCard>
              </motion.div>

              {/* Achievement Badge */}
              {completion >= 80 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <GlassCard hover={false}>
                    <div className="p-5 flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/20 text-2xl">
                        🏆
                      </div>
                      <div>
                        <p className="font-bold text-white">Profile Champion!</p>
                        <p className="text-xs text-white/40 mt-0.5">Your profile is {completion}% complete — you're ready to get noticed by recruiters!</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

            </div>
          </div>
        )}
      </div>
    </section>
  );
}