import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense("123aaa", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123aaa",
    updates: {
      note: "New note value"
    }
  });
});

test("should setup add expense action object with provide value", () => {
  const expenseDate = {
    description: "Rent",
    amount: 1000,
    createAt: 14500,
    note: "Rent Note"
  };
  const action = addExpense(expenseDate);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expenses: {
      ...expenseDate,
      id: expect.any(String)
    }
  });
});

test("should setup add expense action object with default value", () => {
  const defaultDate = {
    description: "",
    note: "",
    amount: 0,
    createAt: 0
  };
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expenses: {
      ...defaultDate,
      id: expect.any(String)
    }
  });
});
