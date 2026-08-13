import { useState } from "react";
import api from "../api/axios";

export default function AIInsights({ transactions, month }) {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyse = async () => {
    setLoading(true);
    setError(null);
    setAdvice(null);
    try {
      const { data } = await api.post("/ai/analyse", { transactions, month });
      setAdvice(data.advice);
    } catch (err) {
      setError(err.response?.data?.error ?? err.message ?? "AI analysis failed");
    } finally {
      setLoading(false);
    }
  };

  const bullets = advice
    ? advice
        .split("\n")
        .map((l) => l.replace(/^[\s*•\-]+/, "").trim())
        .filter(Boolean)
    : [];

  return (
    <div className="mb-6">
      <button
        onClick={handleAnalyse}
        disabled={loading || !transactions.length}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors shadow-sm"
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analysing...
          </>
        ) : (
          <>
            <span>✨</span> Get AI Insights
          </>
        )}
      </button>

      {error && (
        <div className="mt-3 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-xl">
          {error}
        </div>
      )}

      {bullets.length > 0 && (
        <div className="mt-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🤖</span>
            <h3 className="font-semibold text-indigo-800 text-sm">AI Financial Insights</h3>
          </div>
          <ul className="space-y-2">
            {bullets.map((point, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-700">
                <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
