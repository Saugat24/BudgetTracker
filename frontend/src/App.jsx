import { useState, useMemo, useEffect } from "react";
import BalanceSummary from "./components/balance_summary";
import TransactionList from "./components/transaction_list";
import AddTransactionForm from "./components/AddTransactionForm";
import CategoryChart from "./components/CategoryChart";

const INITIAL = [
  {
    id: 1,
    description: "Salary",
    amount: 50000,
    type: "income",
    category: "Salary",
    date: "2025-06-01",
  },
  {
    id: 2,
    description: "Groceries",
    amount: 2500,
    type: "expense",
    category: "Food",
    date: "2025-06-02",
  },
  {
    id: 3,
    description: "Freelance Work",
    amount: 12000,
    type: "income",
    category: "Freelance",
    date: "2025-06-03",
  },
  {
    id: 4,
    description: "Electricity Bill",
    amount: 1800,
    type: "expense",
    category: "Utilities",
    date: "2025-06-04",
  },
  {
    id: 5,
    description: "Internet Bill",
    amount: 1200,
    type: "expense",
    category: "Utilities",
    date: "2025-06-05",
  },
];

function App() {
  const [transactions, setTransactions] = useState(INITIAL);

  const { income, expenses, balance, categoryData } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);
    const categoryMap = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      });
    const categoryData = Object.entries(categoryMap).map(([category, amount]) => ({ category, amount }));
    return { income, expenses, balance: income - expenses, categoryData };
  }, [transactions]);

  useEffect(() => {
    document.title = `Balance: Rs. ${balance}`;
  }, [balance]);

  const handleDelete = (id) => setTransactions((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Budget Tracker</h1>

        <BalanceSummary income={income} expenses={expenses} balance={balance} />

        <AddTransactionForm
          onAdd={(t) => setTransactions((prev) => [t, ...prev])}
        />

        <CategoryChart data={categoryData} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
