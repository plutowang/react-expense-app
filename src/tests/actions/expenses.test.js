import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpenses,
  startRemoveAllExpenses,
  startEditExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from "../../firebase/firebase";

const uid = "12345abc";
const createMockStore = configureStore([thunk]);
beforeEach(done => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(done());
});

test("should setup remove expense action object", () => {
  const action = removeExpense({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc"
  });
});

test("should setup edit expense action object", () => {
  const action = editExpense("123aaa", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: "123aaa",
    updates: {
      note: "New note value"
    }
  });
});

test("should edit expense to database and store", done => {
  const store = createMockStore({ auth: { uid } });
  const id = expenses[0].id;
  const updates = {
    note: "UPDATES NOTES",
    amount: 9999999.99
  };
  store
    .dispatch(startEditExpenses(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        id,
        updates
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual({
        description: "January Rent",
        note: "This was the fial payment for that address",
        amount: 54500,
        createdAt: 0,
        ...updates
      });
      done();
    });
});

test("should setup add expense action object with provide value", () => {
  const action = addExpense(expenses[0]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[0]
  });
});

test("should add expense to database and store", done => {
  const store = createMockStore({ auth: { uid } });
  const expense = {
    description: "Mock",
    note: "Test Mock Note",
    amount: 120,
    createdAt: -20
  };
  store
    .dispatch(startAddExpense(expense))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expense
        }
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      const val = snapshot.val();
      expect(val).toEqual(expense);
      // database.ref(`expenses/${snapshot.key}`).remove()
      done();
    });
});

test("should add expense with default to database and store", done => {
  const store = createMockStore({ auth: { uid } });
  const defaultExpense = { description: "", note: "", amount: 0, createdAt: 0 };
  store
    .dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...defaultExpense
        }
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(defaultExpense);
      // database.ref(`expenses/${snapshot.key}`).remove()
      done();
    });
});

test("should setup expense action object with expenses", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses
  });
});

test("should fatch the expenses from firebase correctly", done => {
  const store = createMockStore({ auth: { uid } });
  store.getState();
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses
    });
    done();
  });
});

test("should remove expenses from firebase correctly", done => {
  const store = createMockStore({ auth: { uid } });
  const afterExpenses = [];
  store
    .dispatch(startRemoveExpenses({ id: expenses[0].id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id: expenses[0].id
      });
      return database
        .ref(`users/${uid}/expenses`)
        .once("value")
        .then(snapshot => {
          snapshot.forEach(snapshotChild => {
            afterExpenses.push({
              id: snapshotChild.key,
              ...snapshotChild.val()
            });
          });
        });
    })
    .then(() => {
      expect(afterExpenses).toEqual([expenses[1], expenses[2], expenses[3]]);
      done();
    });
});

test("should remove all expenses from firebase correctly", done => {
  const store = createMockStore({ auth: { uid } });
  const afterExpenses = [];
  store
    .dispatch(startRemoveAllExpenses())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_ALL_EXPENSES"
      });
      return database
        .ref(`users/${uid}/expenses`)
        .once("value")
        .then(snapshot => {
          snapshot.forEach(snapshotChild => {
            afterExpenses.push({
              id: snapshotChild.key,
              ...snapshotChild.val()
            });
          });
        });
    })
    .then(() => {
      expect(afterExpenses).toEqual([]);
      done();
    });
});
