import { applyMiddleware, createStore } from "redux";

import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import reducer from "../reducers";

let middleware;

if (process.env === "production") {
  middleware = applyMiddleware(promise, thunk);
} else {
  middleware = applyMiddleware(promise, createLogger(), thunk);
}

export default createStore(reducer, middleware);
