function TransactionItem({ transaction }) {
  return (
    <li
      className={`flex justify-between items-center p-4 rounded-lg text-white ${
        transaction.type === "income" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <span>{transaction.title}</span>

      <span className="font-semibold">
        {transaction.type === "income" ? "+" : "-"}
        Rs. {transaction.amount}
      </span>
    </li>
  );
}

export default TransactionItem;
