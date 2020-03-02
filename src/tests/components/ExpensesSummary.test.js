import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

test("should render ExpensesSummary with 1 expense correctly", () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={123} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary with multiple expenses correctly", () => {
  const wrapper = shallow(<ExpensesSummary expensesCount={expenses.length} expensesTotal={233} />);
  expect(wrapper).toMatchSnapshot();
});
