import React from "react";
import { connect } from "react-redux";
import ExpenseForm from "./ExpenseForm";
import { startEditExpenses, startRemoveExpenses } from "../actions/expenses";

export class EditExpensePage extends React.Component {
  onSubmit = expense => {
    this.props.startEditExpenses(this.props.expense.id, expense);
    this.props.history.push("/");
  };
  onRemove = () => {
    this.props.startRemoveExpenses();
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Update Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            isUpdate={true}
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <div className="form">
            <button className="button button--remove" onClick={this.onRemove}>
              Remove Expense
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find(expense => expense.id === props.match.params.id)
});
const mapDispatchToProps = (dispatch, props) => ({
  startEditExpenses: (id, expense) => dispatch(startEditExpenses(id, expense)),
  startRemoveExpenses: () =>
    dispatch(startRemoveExpenses({ id: props.match.params.id }))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
