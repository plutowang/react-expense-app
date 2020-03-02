import selectExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test("should return 0 if no expenses", () => {
  const result = selectExpensesTotal();
  expect(result).toBe(0);
});

test("should correctly add up a single expenses", () => {
  const expense = expenses[1];
  const result = selectExpensesTotal([expense]);
  expect(result).toBe(expense.amount);
});

test("should correctly add up a multiple expenses", () => {
  const sum =
    expenses[0].amount +
    expenses[1].amount +
    expenses[2].amount +
    expenses[3].amount;
  const result = selectExpensesTotal(expenses);
  expect(result).toBe(sum);
});
