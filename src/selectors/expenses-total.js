const selectExpensesTotal = (expenses = []) => {
  if (Array.isArray(expenses)) {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  } else {
    return expenses.amount;
  }
};

export default selectExpensesTotal;
