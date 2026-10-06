/**
 * Calculates debt repayment strategy
 * @param {Array} debts - List of debts
 * @param {number} availableAmount - Amount available to pay
 * @param {string} strategy - Strategy type: 'snowball' or 'avalanche'
 */
export function calculateStrategy(debts, availableAmount, strategy = 'snowball') {
  if (!debts || debts.length === 0) {
    return { strategy, availableAmount, allocation: [], message: 'No debts to pay' };
  }

  let sortedDebts;

  if (strategy === 'snowball') {
    // Sort by amount (smallest first)
    sortedDebts = [...debts].sort((a, b) => a.amount - b.amount);
  } else if (strategy === 'avalanche') {
    // Sort by interest rate (highest first)
    sortedDebts = [...debts].sort((a, b) => b.interest_rate - a.interest_rate);
  } else {
    sortedDebts = debts;
  }

  const allocation = [];
  let remainingAmount = availableAmount;

  for (const debt of sortedDebts) {
    if (remainingAmount <= 0) break;

    const minPayment = debt.min_payment || 0;
    const payAmount = Math.min(remainingAmount, debt.amount);

    allocation.push({
      debtId: debt.id,
      debtName: debt.name,
      minPayment,
      suggestedPayment: payAmount,
      debtAmount: debt.amount,
      interestRate: debt.interest_rate
    });

    remainingAmount -= payAmount;
  }

  return {
    strategy,
    availableAmount,
    allocation,
    remainingAmount,
    totalDebts: debts.length,
    successRate: allocation.length === debts.length ? 100 : (allocation.length / debts.length) * 100
  };
}
