import database from "../firebase/firebase";

// Expense Action Generators

// ADD_EXPENSE
export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = expenseData => {
  return dispatch => {
    const {
      description = "",
      note = "",
      amount = 0,
      createAt = 0
    } = expenseData || {};
    const expense = {
      description,
      note,
      amount,
      createAt
    };
    // By returning the `promise chain` we can continue chaining on over here
    return database
      .ref("expenses")
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// REMOVE_ALL_EXPENSE
export const removeAllExpense = () => ({
  type: "REMOVE_ALL_EXPENSE"
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});
