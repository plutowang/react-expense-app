import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test("shoul render ExpenseForm correctly with expense data", () => {
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} isUpdate={false} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render error message for invalid form submission", () => {
  const wrapper = shallow(
    <ExpenseForm
      expense={{ amount: expenses[0].amount, note: expenses[0].note }}
      isUpdate={true}
    />
  );
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const value = "New Description";
  const wrapper = shallow(
    <ExpenseForm
      expense={{ description: expenses[0].description }}
      isUpdate={true}
    />
  );
  expect(wrapper).toMatchSnapshot();
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("description")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should set note on textarea change", () => {
  const value = "New Note";
  const wrapper = shallow(
    <ExpenseForm
      expense={{ description: expenses[0].description }}
      isUpdate={true}
    />
  );
  expect(wrapper).toMatchSnapshot();
  wrapper.find("textarea").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should set amount if valid input", () => {
  const value = "100.98";
  const wrapper = shallow(
    <ExpenseForm
      expense={{ description: expenses[0].description }}
      isUpdate={true}
    />
  );
  expect(wrapper).toMatchSnapshot();
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe(value);
  expect(wrapper).toMatchSnapshot();
});

test("should set amount if invalid input 1", () => {
  const value = "100.1919";
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe("");
  expect(wrapper).toMatchSnapshot();
});

test("should set amount if invalid input 2", () => {
  const value = "1ab";
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe("");
  expect(wrapper).toMatchSnapshot();
});

test("should set amount if empty input", () => {
  const value = undefined;
  const wrapper = shallow(
    <ExpenseForm
      expense={{ description: expenses[0].description }}
      isUpdate={true}
    />
  );
  expect(wrapper).toMatchSnapshot();
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("amount")).toBe("");
  expect(wrapper).toMatchSnapshot();
});

test("should call onSubmit props for valid form submittion", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(
    <ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />
  );
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt.valueOf()
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("withStyles(SingleDatePicker)").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendar focus on change", () => {
  let focused = true;
  const wrapper = shallow(<ExpenseForm />);
  wrapper.find("withStyles(SingleDatePicker)").prop("onFocusChange")({
    focused
  });
  expect(wrapper.state("calendarFocused")).toEqual(focused);
  focused = false;
  wrapper.find("withStyles(SingleDatePicker)").prop("onFocusChange")({
    focused
  });
  expect(wrapper.state("calendarFocused")).toEqual(focused);
});
