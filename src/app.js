import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisableExpenses from "./selectors/expenses";
import { addExpense } from "./actions/expenses";
import { setTextFilter, sortByDate, sortByAmount } from "./actions/filters";

// reset css
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const expenses = getVisableExpenses(state.expenses, state.filters);
  console.log(expenses);
});

store.dispatch(
  addExpense({
    description: "Water Bill",
    amount: 1000,
    createAt: 1000
  })
);

store.dispatch(
  addExpense({
    description: "Gas Bill",
    amount: 150,
    createAt: 1500
  })
);

store.dispatch(
  addExpense({
    description:"Rent",
    amount: 10000,
    createAt: 5000
  })
);
// store.dispatch(setTextFilter("bill"));

store.dispatch(sortByAmount("bill"));

// store.dispatch(setTextFilter("wateR"));

setTimeout(() => {
    store.dispatch(sortByDate("bill"));
}, 3000);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("app"));
