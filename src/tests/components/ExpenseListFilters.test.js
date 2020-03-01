import React from "react";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";
import moment from "moment";

let setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
  onFocusChange,
  wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render ExpenseListFilters correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpenseListFilters with alt data correctly", () => {
  wrapper.setProps({
    filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test("should handle sort by date", () => {
  wrapper.setProps({
    filters: altFilters
  });
  wrapper.find("select").prop("onChange")({ target: { value: "date" } });
  expect(sortByDate).toHaveBeenLastCalledWith();
});

test("should handle sort by amount", () => {
  wrapper.find("select").prop("onChange")({ target: { value: "amount" } });
  expect(sortByAmount).toHaveBeenLastCalledWith();
});

test("should handle text change", () => {
  wrapper.setProps({
    filters: altFilters
  });
  const text = "New Text!";
  wrapper.find("input").simulate("change", { target: { value: text } });
  expect(setTextFilter).toHaveBeenLastCalledWith(text);
});

test("should handl date change", () => {
  wrapper.setProps({
    filters: altFilters
  });
  const startDate = moment(0).add(2, "days");
  const endDate = moment(20).add(100, "days");
  wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({
    startDate,
    endDate
  });
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test("should handl date focucsed change", () => {
  wrapper.setProps({
    filters: altFilters
  });
  const calendarFocused = "startDate";
  wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(
    calendarFocused
  );
  expect(wrapper.state("calendarFocused")).toEqual(calendarFocused)
});
