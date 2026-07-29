import { useState, useEffect } from "react";
import { api } from "../services/api";

export function useCodingProgress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCodingProgress().then((data) => {
      if (Array.isArray(data)) setProgress(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const update = async (topic, solved, total) => {
    // Optimistic update
    setProgress((prev) =>
      prev.map((p) => p.topic === topic ? { ...p, solved } : p)
    );
    await api.updateCodingProgress(topic, { topic, solved, total }).catch(() => {});
  };

  const totalSolved = progress.reduce((a, b) => a + b.solved, 0);
  const totalProblems = progress.reduce((a, b) => a + b.total, 0);

  return { progress, loading, update, totalSolved, totalProblems };
}
