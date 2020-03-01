import { createStore } from "redux";

// Action generators - function that return action
const incrementCount = ({ incrementBy = 1 } = {}) => {
  console.log("incrementBy", incrementBy, typeof incrementBy === "number");
  return {
    type: "INCREMENT",
    incrementBy
  };
};

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

const setCount = ({ count } = {}) => ({
  type: "SET",
  count
});

const resetCount = () => ({
  type: "RESET"
});

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT": {
      const incrementBy =
        typeof action.incrementBy === "number" ? action.incrementBy : 1;
      return { count: state.count + incrementBy };
    }
    case "DECREMENT": {
      const decrementBy =
        typeof action.decrementBy === "number" ? action.decrementBy : 1;
      return { count: state.count - decrementBy };
    }
    case "SET":
      return { count: action.count };
    case "RESET":
      return { count: 0 };
    default:
      return { count: state.count };
  }
};
const store = createStore(countReducer);
const unsubscribe = store.subscribe(() => {
  console.log("store.getState()", store.getState());
});
// Action
// increment the coint
// reset the count to zero
store.dispatch({
  type: "SET",
  count: 101
});
store.dispatch(incrementCount({ incrementBy: 300 }));
store.dispatch(incrementCount());
store.dispatch(decrementCount({ decrementBy: 400 }));
store.dispatch(resetCount());
store.dispatch(decrementCount());
store.dispatch(setCount({ count: 1000 }));
unsubscribe();
export default store;
