const { createStore } = require("redux");

const initState = 0;

const reducer = (currState = initState, action) => {
  if (action.type === "INCREMENT") {
    const updatedState = currState + 1;
    return updatedState;
  }
};

const store = createStore(reducer);

console.log(store);

const action = {type:"INCREMENT"}

store.dispatch(action)
console.log(store.getState())
store.dispatch(action)
store.dispatch(action)
console.log(store.getState())