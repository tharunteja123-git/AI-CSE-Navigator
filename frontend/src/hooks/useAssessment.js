import { useState, useEffect } from "react";
import { api } from "../services/api";

export function useAssessment() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getAssessment();
      if (res.detail) throw new Error(res.detail);
      setData(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  return { data, loading, error, refetch: fetch };
}
