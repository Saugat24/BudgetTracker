function BalanceSummary({ income, expenses, balance }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Income</p>
        <p className="text-xl font-bold text-emerald-500 mt-1">Rs. {income.toLocaleString()}</p>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Expenses</p>
        <p className="text-xl font-bold text-rose-500 mt-1">Rs. {expenses.toLocaleString()}</p>
      </div>
      <div className="bg-indigo-600 rounded-2xl p-5 shadow-sm">
        <p className="text-xs text-indigo-200 uppercase tracking-wide font-medium">Balance</p>
        <p className="text-xl font-bold text-white mt-1">Rs. {balance.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default BalanceSummary;
