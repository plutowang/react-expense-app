import moment from "moment";
import {
  setTextFilter,
  sortByDate,
  sortByAmount,
  setStartDate,
  setEndDate
} from "../../actions/filters";

test("should generate set start date action object", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0)
  });
});

test("should generate set end date action object", () => {
  const action = setEndDate(moment(110));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(110)
  });
});

test("should generate set sort by amount action object", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SORT_BY_AMOUNT"
  });
});
test("should generate set sort by date action object", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SORT_BY_DATE"
  });
});
test("should generate set text action object with provide data", () => {
  const filterText = "Bill";
  const action = setTextFilter(filterText);
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: filterText
  });
});

test("should generate set text action object with default value", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: ""
  });
});
