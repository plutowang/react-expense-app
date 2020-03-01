import moment from "moment";
import filtersReducer from "../../reducers/filters";

test("should set up default filter values", () => {
  const state = filtersReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("should set sortBy to amount", () => {
  const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" });
  expect(state.sortBy).toEqual("amount");
});

test("should set sortBy to date", () => {
  const currentState = {
    text: "",
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  };
  const action = { type: "SORT_BY_DATE" };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toEqual("date");
});

test("should set text filter", () => {
  const text = "Bill";
  const state = filtersReducer(undefined, {
    type: "SET_TEXT_FILTER",
    text
  });
  expect(state.text).toEqual(text);
});
test("should set startDate filter", () => {
  const startDate = moment(-20);
  const state = filtersReducer(undefined, {
    type: "SET_START_DATE",
    startDate
  });
  expect(state.startDate).toEqual(startDate);
});
test("should set endDate filter", () => {
  const endDate = moment(20);

  const state = filtersReducer(undefined, {
    type: "SET_END_DATE",
    endDate
  });
  expect(state.endDate).toEqual(endDate);
});
