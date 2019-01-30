import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import App from "./components/App";
import AuthSlice from "./components/redux/AuthSlice";

//~ Set up redux store
const reducer = combineReducers({
  Auth: AuthSlice.reducer
});

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
