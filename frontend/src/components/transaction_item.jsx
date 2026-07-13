function TransactionItem({ transaction, onDelete }) {
  return (
    <li
      className={`flex justify-between items-center p-4 rounded-lg text-white ${
        transaction.type === "income" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <div>
        <p className="font-semibold">{transaction.description}</p>
        <p className="text-sm opacity-80">{transaction.category} · {transaction.date}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-semibold">
          {transaction.type === "income" ? "+" : "-"}
          Rs. {transaction.amount}
        </span>
        <button
          onClick={() => onDelete(transaction.id)}
          className="text-white opacity-70 hover:opacity-100 font-bold text-lg leading-none"
        >
          ×
        </button>
      </div>
    </li>
  );
}

export default TransactionItem;
