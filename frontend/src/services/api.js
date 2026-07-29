const BASE = "http://localhost:8000";

const getToken = () => localStorage.getItem("token");
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

const req = async (url, opts = {}) => {
  const res = await fetch(`${BASE}${url}`, opts);
  return res.json();
};

export const api = {
  // ── Auth ──────────────────────────────────────────
  register: (data) =>
    req("/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
  login: (data) =>
    req("/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),

  // ── Profile ───────────────────────────────────────
  getProfile: () => req("/profile/me", { headers: authHeaders() }),
  saveOnboarding: (data) =>
    req("/profile/onboarding", { method: "POST", headers: authHeaders(), body: JSON.stringify(data) }),
  updateProfile: (data) =>
    req("/profile/update", { method: "PUT", headers: authHeaders(), body: JSON.stringify(data) }),

  // ── Assessment ────────────────────────────────────
  getAssessment: () => req("/assessment/generate", { headers: authHeaders() }),

  // ── AI ────────────────────────────────────────────
  getCareerAdvice: (data) =>
    req("/ai/career-advice", { method: "POST", headers: authHeaders(), body: JSON.stringify(data) }),
  chat: (message) =>
    req("/ai/chat", { method: "POST", headers: authHeaders(), body: JSON.stringify({ message }) }),

  // ── Chat History ──────────────────────────────────
  getChatHistory: () => req("/chat-history/", { headers: authHeaders() }),
  saveChatMessage: (data) =>
    req("/chat-history/", { method: "POST", headers: authHeaders(), body: JSON.stringify(data) }),
  clearChatHistory: () =>
    req("/chat-history/", { method: "DELETE", headers: authHeaders() }),

  // ── Coding Progress ───────────────────────────────
  getCodingProgress: () => req("/coding-progress/", { headers: authHeaders() }),
  updateCodingProgress: (topic, data) =>
    req(`/coding-progress/${encodeURIComponent(topic)}`, {
      method: "PUT", headers: authHeaders(), body: JSON.stringify(data),
    }),

  // ── Resume ────────────────────────────────────────
  analyzeResume: (data) =>
    req("/resume/analyze", { method: "POST", headers: authHeaders(), body: JSON.stringify(data) }),
};
