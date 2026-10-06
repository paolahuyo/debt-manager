export default function DebtList({ debts, onDelete }) {
  if (!debts || debts.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        <p>No debts yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-xl font-bold p-6 border-b">Active Debts</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Interest Rate</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Min Payment</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {debts.map(debt => (
              <tr key={debt.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 text-sm text-gray-900">{debt.name}</td>
                <td className="px-6 py-3 text-sm text-gray-900">${parseFloat(debt.amount).toFixed(2)}</td>
                <td className="px-6 py-3 text-sm text-gray-900">{debt.interest_rate}%</td>
                <td className="px-6 py-3 text-sm text-gray-900">${parseFloat(debt.min_payment || 0).toFixed(2)}</td>
                <td className="px-6 py-3 text-sm">
                  <button
                    onClick={() => onDelete(debt.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
