import React from "react";
import { shallow } from "enzyme";
import { ExpenseList } from "../../components/ExpenseList";
import expenses from "../fixtures/expenses";

test("should render ExpenseList with expenses", () => {
  const wrapper = shallow(<ExpenseList expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseList empty expenses", () => {
  const wrapper = shallow(<ExpenseList expenses={[]} />);
  expect(wrapper).toMatchSnapshot();
});


test("should remove all expenses", () => {
  const removeAllExpense = jest.fn();
  const wrapper = shallow(<ExpenseList expenses={expenses} removeAll={removeAllExpense}/>);
  wrapper.find("button").simulate("click")
  expect(removeAllExpense).toHaveBeenLastCalledWith()
});