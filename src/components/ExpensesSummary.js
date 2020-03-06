import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import selectExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
  const total = numeral(expensesTotal / 100).format("$0,0.00");
  const expr = expensesCount > 1 ? "expenses" : "expense";
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expensesCount}</span> {expr} totalling <span>{total}</span>
        </h1>
        <div className="page-header__action">
        <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const expenses = selectExpenses(state.expenses, state.filters);
  return {
    expensesCount: expenses.length,
    expensesTotal: selectExpensesTotal(expenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
