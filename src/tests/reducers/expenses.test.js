import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const state = expensesReducer(expenses, { type: "REMOVE_EXPENSE", id: "1" });
  expect(state).toEqual([expenses[0], expenses[2], expenses[3]]);
});

test("should not remove expenses if id not found", () => {
  const action = { type: "REMOVE_EXPENSE", id: "-1" };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("should remove all expenses", () => {
  const action = { type: "REMOVE_ALL_EXPENSE" };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([]);
});

test("should not remove expenses if no expense", () => {
  const action = { type: "REMOVE_ALL_EXPENSE" };
  const state = expensesReducer(undefined, action);
  expect(state).toEqual([]);
});

test("should add expenses", () => {
  const expense = {
    id: "4",
    description: "January Water Bill",
    note: "This was the water bill",
    amount: 545,
    createAt: 0
  };
  const action = { type: "ADD_EXPENSE", expense };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses.concat(expense));
});

test("should edit expenses if provide id", () => {
  const amount = 12345;
  const description = "Feb Water Bill";
  const updates = {
    description,
    amount
  };
  const action = { type: "EDIT_EXPENSE", id: expenses[0].id, updates };
  const state = expensesReducer(expenses, action);
  expect(state[0].amount).toEqual(amount);
  expect(state[0].description).toEqual(description);
});

test("should not edit expenses if id not exist", () => {
  const amount = 12345;
  const description = "Feb Water Bill";
  const updates = {
    description,
    amount
  };
  const action = { type: "EDIT_EXPENSE", id:"-12", updates };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});