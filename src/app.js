import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import { firebase } from "./firebase/firebase";

import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import LoginPage from "./components/LoginPage";

import "./firebase/firebase";

// reset css
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render("Loading...", document.getElementById("app"));

// store.dispatch(startSetExpenses())

store.dispatch(startSetExpenses()).then(() => {
  ReactDOM.render(jsx, document.getElementById("app"));
});

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("log in");
  } else {
    console.log("log out");
  }
});
