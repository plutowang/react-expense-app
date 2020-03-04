import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import { startRemoveAllExpenses } from "../actions/expenses";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = props => (
  <div>
    <h1>Expense List</h1>
    <button onClick={props.removeAll}>
      Remove All
    </button>
    {props.expenses && props.expenses.length === 0 ? (
      <p>No expenses</p>
    ) : (
      props.expenses.map(expense => (
        <ExpenseListItem key={expense.id} {...expense} />
      ))
    )}
  </div>
);
const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};
const mapDispatchToProps = dispatch => ({
  removeAll: ()=>dispatch(startRemoveAllExpenses())
});
// HOC
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
