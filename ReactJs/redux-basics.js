const redux = require("redux");
const createStore = redux.createStore; // createStore is function

const initailState = {
  count: 0
};

//Reducer
const rootReducer = (state = initailState, action) => {
  if (action.type === "INC_COUNT") {
    return {
      ...state,
      count: state.count + 1
    };
  }
  if (action.type === "ADD_COUNT") {
    return {
      ...state,
      count: state.count + action.payload.value
    };
  }
  return state;
};

//store
const store = createStore(rootReducer);

//subscription
store.subscribe(() => {
  console.log("subscription-->>", store.getState());
});

//Dispatching Action
store.dispatch({ type: "INC_COUNT" });
store.dispatch({ type: "ADD_COUNT", payload: { value: 10 } });
