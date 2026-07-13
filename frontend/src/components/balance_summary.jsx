function BalanceSummary({ income, expenses, balance }) {

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Balance Summary</h2>

      <div className="flex justify-between mb-4">
        <div>
          <p className="text-gray-500">Income</p>
          <p className="text-green-600 text-xl font-bold">Rs. {income}</p>
        </div>

        <div>
          <p className="text-gray-500">Expense</p>
          <p className="text-red-600 text-xl font-bold">Rs. {expenses}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-gray-500">Current Balance</p>
        <p className="text-2xl font-bold text-blue-600">Rs. {balance}</p>
      </div>
    </div>
  );
}

export default BalanceSummary;
