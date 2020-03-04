import database from "../firebase/firebase";

// Expense Action Generators

// ADD_EXPENSE
export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = expenseData => {
  return dispatch => {
    const { description = "", note = "", amount = 0, createdAt = 0 } =
      expenseData || {};
    const expense = {
      description,
      note,
      amount,
      createdAt
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

export const startRemoveExpenses = ({ id } = {}) => {
  return dispatch => {
    return database
      .ref(`expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }));
      });
  };
};

// REMOVE_ALL_EXPENSES
export const removeAllExpenses = () => ({
  type: "REMOVE_ALL_EXPENSES"
});

export const startRemoveAllExpenses = () => {
  return dispatch => {
    return database
      .ref("expenses")
      .remove()
      .then(() => dispatch(removeAllExpenses()));
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: "SET_EXPENSES",
  expenses
});

export const startSetExpenses = () => {
  return dispatch => {
    return database
      .ref("expenses")
      .once("value")
      .then(snapshot => {
        const expensesData = [];
        snapshot.forEach(childSnapshot => {
          expensesData.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        return expensesData;
      })
      .then(expensesData => {
        dispatch(setExpenses(expensesData));
      });
  };
};
