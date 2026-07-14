import { useState, useMemo, useEffect } from "react";
import BalanceSummary from "./components/balance_summary";
import TransactionList from "./components/transaction_list";
import AddTransactionForm from "./components/AddTransactionForm";
import CategoryChart from "./components/CategoryChart";

const API = "http://localhost:3001/api/transactions";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setTransactions);
  }, []);

  const { income, expenses, balance, categoryData } = useMemo(() => {
    const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const categoryMap = {};
    transactions.filter((t) => t.type === "expense").forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
    const categoryData = Object.entries(categoryMap).map(([category, amount]) => ({ category, amount }));
    return { income, expenses, balance: income - expenses, categoryData };
  }, [transactions]);

  useEffect(() => { document.title = `Balance: Rs. ${balance}`; }, [balance]);

  const handleAdd = (t) => setTransactions((prev) => [t, ...prev]);
  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Budget Tracker</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your income & expenses</p>
        </div>
        <BalanceSummary income={income} expenses={expenses} balance={balance} />
        <AddTransactionForm onAdd={handleAdd} />
        <CategoryChart data={categoryData} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
