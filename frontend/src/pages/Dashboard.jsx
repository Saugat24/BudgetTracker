import { useState, useEffect, useMemo } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BalanceSummary from "../components/balance_summary";
import TransactionList from "../components/transaction_list";
import AddTransactionForm from "../components/AddTransactionForm";
import CategoryChart from "../components/CategoryChart";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function MonthFilter({ selected, onChange }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());

  const pills = useMemo(() =>
    MONTHS.map((label, i) => {
      const val = `${year}-${String(i + 1).padStart(2, "0")}`;
      return { label, val };
    }), [year]
  );

  return (
    <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setYear((y) => y - 1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm transition-colors">‹</button>
        <span className="text-sm font-semibold text-gray-700">{year}</span>
        <button onClick={() => setYear((y) => y + 1)} className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm transition-colors">›</button>
      </div>
      <div className="grid grid-cols-6 gap-2">
        {pills.map(({ label, val }) => (
          <button
            key={val}
            onClick={() => onChange(selected === val ? "" : val)}
            className={`py-1.5 rounded-xl text-xs font-medium transition-all ${
              selected === val
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expenses: 0, balance: 0, byCategory: [] });
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async (m) => {
    setLoading(true);
    setError(null);
    try {
      const params = m ? { month: m } : {};
      const [txRes, sumRes] = await Promise.all([
        api.get("/transactions", { params }),
        api.get("/transactions/summary", { params }),
      ]);
      setTransactions(txRes.data);
      setSummary(sumRes.data);
    } catch (err) {
      setError(err.response?.data?.error ?? "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(month); }, [month]);
  useEffect(() => { document.title = `Balance: Rs. ${summary.balance}`; }, [summary.balance]);

  const handleAdd = (t) => {
    setTransactions((prev) => [t, ...prev]);
    fetchAll(month);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
      fetchAll(month);
    } catch (err) {
      setError(err.response?.data?.error ?? "Delete failed");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Budget Tracker</h1>
            <p className="text-gray-400 text-sm mt-1">Welcome, {user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-500 hover:text-rose-600 border border-gray-200 hover:border-rose-200 px-4 py-2 rounded-xl transition-colors"
          >
            Logout
          </button>
        </div>

        <MonthFilter selected={month} onChange={setMonth} />

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-sm text-gray-400 py-12">Loading...</p>
        ) : (
          <>
            <BalanceSummary income={summary.income} expenses={summary.expenses} balance={summary.balance} />
            <AddTransactionForm onAdd={handleAdd} />
            <CategoryChart data={summary.byCategory} />
            <TransactionList transactions={transactions} onDelete={handleDelete} />
          </>
        )}
      </div>
    </div>
  );
}
