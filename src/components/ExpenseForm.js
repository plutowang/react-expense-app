import React from "react";
import moment from "moment";
import "react-dates/initialize";
// import "react-dates/lib/css/_datepicker.css";
import { SingleDatePicker } from "react-dates";

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.expense ? props.expense.description : "",
      note: props.expense ? props.expense.note : "",
      amount: props.expense ? (props.expense.amount / 100).toString() : "",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      calendarFocused: false,
      error: "",
      isUpdate: props.isUpdate
    };
  }

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onAmountChange = e => {
    const amount = e.target.value ? e.target.value : "";
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      const error = "Please provide description and amount";
      this.setState(() => ({ error }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        note: this.state.note,
        createdAt: this.state.createdAt.valueOf()
      });
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {!!this.state.error && (
          <p className="form__error">{this.state.error}</p>
        )}
        <input
          type="text"
          name="description"
          className="text-input"
          placeholder="Description"
          value={this.state.description}
          onChange={this.onDescriptionChange}
          autoFocus
        />
        <input
          type="text"
          name="amount"
          className="text-input"
          placeholder="$"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          name="note"
          id="note"
          className="textarea"
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.onNoteChange}
        ></textarea>

        <button className="button">
          {this.state.isUpdate ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    );
  }
}
