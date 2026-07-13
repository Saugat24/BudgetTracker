import TransactionItem from "./transaction_item";

function TransactionList({ transactions, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>

      <ul className="space-y-3">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
