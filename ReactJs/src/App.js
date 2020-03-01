import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
// import logger from "redux-logger";
import Routes from "./Routes";
import reducer from "./Reducer";
import saga from "./Saga";

const sagaMiddleware = createSagaMiddleware();
var middlewares = [sagaMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// if (process.env.NODE_ENV === "development")
//   middlewares = [...middlewares, logger];

const store = createStore(
  reducer(),
  composeEnhancers(applyMiddleware(...middlewares))
);
export const runSaga = sagaMiddleware.run;
runSaga(saga);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
  }
}
