import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import App from "./components/App";
import AuthSlice from "./redux/AuthSlice";

//~ Set up redux store
const reducer = combineReducers({
  AuthSlice: AuthSlice.reducer
});

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
