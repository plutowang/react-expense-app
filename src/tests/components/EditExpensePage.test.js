import React from "react";
import { shallow } from "enzyme";
import { EditExpensePage } from "../../components/EditExpensePage";
import expenses from "../fixtures/expenses";

let startEditExpenses, startRemoveExpenses, expense, history, wrapper;
beforeEach(() => {
  startEditExpenses = jest.fn();
  startRemoveExpenses = jest.fn();
  expense = expenses[1];
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      expense={expense}
      startEditExpenses={startEditExpenses}
      startRemoveExpenses={startRemoveExpenses}
      history={history}
    />
  );
});
test("should render EditExpensePage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle eidtExpense", () => {
  const updates = {
    note: "Update Notes",
    description: "New Description"
  };
  wrapper.find("ExpenseForm").prop("onSubmit")(updates);
  expect(startEditExpenses).toHaveBeenLastCalledWith(expense.id, updates);
  expect(history.push).toHaveBeenLastCalledWith("/");
});

test("should remove eidtExpense", () => {
  wrapper.find("button").simulate("click");
  expect(startRemoveExpenses).toHaveBeenLastCalledWith();
  expect(history.push).toHaveBeenLastCalledWith("/");
});
