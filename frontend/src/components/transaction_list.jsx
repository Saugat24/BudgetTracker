import TransactionItem from "./transaction_item";

function TransactionList({ transactions, onDelete }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-base font-semibold text-gray-700 mb-4">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-8">No transactions yet. Add one above!</p>
      ) : (
        <ul className="space-y-2">
          {transactions.map((t) => (
            <TransactionItem key={t._id} transaction={t} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;
