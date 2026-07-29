import { useState, useEffect, useRef } from "react";
import { api } from "../services/api";

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const bottomRef = useRef(null);

  // Load chat history on mount
  useEffect(() => {
    api.getChatHistory().then((history) => {
      if (Array.isArray(history) && history.length > 0) {
        setMessages(history.map((m) => ({ role: m.role, text: m.message })));
      } else {
        setMessages([{
          role: "ai",
          text: "Hi! 👋 I'm your AI Career Mentor. Ask me anything about careers, DSA, placements, or tech skills!",
        }]);
      }
      setHistoryLoaded(true);
    }).catch(() => {
      setMessages([{
        role: "ai",
        text: "Hi! 👋 I'm your AI Career Mentor. Ask anything about your CSE career!",
      }]);
      setHistoryLoaded(true);
    });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text) => {
    if (!text?.trim() || loading) return;

    const userMsg = { role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    // Save user message to DB
    api.saveChatMessage({ role: "user", message: text }).catch(() => {});

    try {
      const data = await api.chat(text);
      const aiText = data.response || "Sorry, I couldn't get a response.";
      setMessages((m) => [...m, { role: "ai", text: aiText }]);
      api.saveChatMessage({ role: "ai", message: aiText }).catch(() => {});
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "❌ Failed to get response. Please check your API key." }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    await api.clearChatHistory().catch(() => {});
    setMessages([{ role: "ai", text: "Chat cleared! How can I help you? 😊" }]);
  };

  return { messages, loading, send, clearChat, bottomRef, historyLoaded };
}
