import React from "react";
import { connect } from "react-redux";
import numeral from "numeral";
import selectExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";

export const ExpensesSummary = ({expensesCount, expensesTotal}) => {
    const total = numeral(expensesTotal / 100).format("$0,0.00");
    const expr = expensesCount > 1 ? "expenses":"expense"
    return (
        <div>
        <h3>Viewing {expensesCount} {expr} totalling {total}</h3>
        </div>
        )
};

const mapStateToProps = state => {
  const expenses = selectExpenses(state.expenses, state.filters);
  return {
    expensesCount: expenses.length,
    expensesTotal: selectExpensesTotal(expenses)
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
