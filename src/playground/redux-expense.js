import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

//
// Action generators
//

// ADD_EXPENSE
const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expenses: {
    id: uuidv4(),
    description,
    note,
    amount,
    createdAt
  }
});

// REMOVE_EXPENSE
const removeExpense = ({ id: removedId } = {}) => ({
  type: "REMOVE_EXPENSE",
  removedId
});

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

// SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

// SET_START_DATE
const setStartDate = startDate => ({
  type: "SET_START_DATE",
  startDate
});

// SET_END_DATE
const setEndDate = endDate => ({
  type: "SET_END_DATE",
  endDate
});

//
// Expenses Reducer
//

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expenses];
    case "REMOVE_EXPENSE": {
      console.log(action.removedId);
      return state.filter(({ id }) => {
        return id !== action.removedId;
      });
    }
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

//
// Filters Reducer
//

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

//
// Get visiable expenses
//
const getVisableExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      // if all three of these are true,
      // we have complete mathch and
      // we want to return `True` form the filter

      // undifined startDate or createdAt is after the startDate
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      // const textMatch =
      //   typeof text !== "string" ||
      //   (expense.description &&
      //     expense.description.toLowerCase().includes(text.toLowerCase())) ||
      //   (expense.note && expense.note.toLowerCase().includes(text.toLowerCase()));

      // only figure out if expense.description as the text variable string inside of it
      const textMatch =
        typeof text !== "string" ||
        (expense.description &&
          expense.description.toLowerCase().includes(text.toLowerCase()));

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      // sort by deceending
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
      if (sortBy === "amount") {
        return b.amount - a.amount;
      }
    });
};

//
// Store creation
//

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

//
// subscribe
//
const unsubscribe = store.subscribe(() => {
  const state = store.getState();
  const visableExpenses = getVisableExpenses(state.expenses, state.filters);
  //   console.log(store.getState());
  console.log(visableExpenses);
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: 1000 })
);
const expenseTwo = store.dispatch(
  addExpense({ description: "Coffee", amount: 300, createdAt: -1000 })
);
const expenseThree = store.dispatch(
  addExpense({ description: "Food", amount: 400, createdAt: 1500 })
);
// console.log(expenseOne);

// const { id: idOne } = expenseOne.expenses;
// const { id: idTwo } = expenseTwo.expenses;
// console.log(idOne);
// store.dispatch(removeExpense({ id: idOne }));
// store.dispatch(editExpense(idTwo, { amount: 222 }));

// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(125));
// store.dispatch(setEndDate());

const demoState = {
  expenses: [
    {
      id: "id1",
      description: "January Rent",
      note: "This was the fial payment for that address",
      amount: 54500,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // date of amount
    startDate: undefined,
    endDate: undefined
  }
};
