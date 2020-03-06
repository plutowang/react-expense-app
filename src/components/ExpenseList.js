import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import { startRemoveAllExpenses } from "../actions/expenses";
import selectExpenses from "../selectors/expenses";

export const ExpenseList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-moblie">Ecpenses</div>
      <div className="show-for-desktop">Ecpense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {props.expenses && props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span className="list-content">No expenses</span>
        </div>
      ) : (
        props.expenses.map(expense => (
          <ExpenseListItem key={expense.id} {...expense} />
        ))
      )}
      <br></br>
      <button className="button button--remove" onClick={props.removeAll}>
        Remove All
      </button>
    </div>
  </div>
);
const mapStateToProps = state => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};
const mapDispatchToProps = dispatch => ({
  removeAll: () => dispatch(startRemoveAllExpenses())
});
// HOC
export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);
