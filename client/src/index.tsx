import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import AuthSlice from "./redux/AuthSlice";
import { configureStore } from "redux-starter-kit";

//~ Set up redux store
const reducer = combineReducers({
  AuthSlice: AuthSlice.reducer
});

const store = configureStore({
  reducer: reducer,
  middleware: [thunk]
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
