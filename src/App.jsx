import BalanceSummary from "./components/balance_summary";
import TransactionList from "./components/transaction_list";

function App() {
  const transactions = [
    { id: 1, title: "Salary", amount: 50000, type: "income" },
    { id: 2, title: "Groceries", amount: 2500, type: "expense" },
    { id: 3, title: "Freelance Work", amount: 12000, type: "income" },
    { id: 4, title: "Electricity Bill", amount: 1800, type: "expense" },
    { id: 5, title: "Internet Bill", amount: 1200, type: "expense" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">Budget Tracker</h1>

        <BalanceSummary />

        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
}

export default App;
