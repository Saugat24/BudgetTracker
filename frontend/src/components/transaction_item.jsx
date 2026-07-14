function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.type === "income";

  return (
    <li className="flex justify-between items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${isIncome ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-500"}`}>
          {isIncome ? "+" : "-"}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">{transaction.description || "No description"}</p>
          <p className="text-xs text-gray-400">{transaction.category} · {new Date(transaction.date).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`text-sm font-bold ${isIncome ? "text-emerald-500" : "text-rose-500"}`}>
          {isIncome ? "+" : "-"}Rs. {transaction.amount.toLocaleString()}
        </span>
        <button
          onClick={() => onDelete(transaction._id)}
          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-rose-100 text-gray-400 hover:text-rose-500 transition-colors flex items-center justify-center text-base font-bold"
        >
          ×
        </button>
      </div>
    </li>
  );
}

export default TransactionItem;
