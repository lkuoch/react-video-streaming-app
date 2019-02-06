import React from "react";
import ReactDOM from "react-dom";
import { reducer as reduxFormReducer } from "redux-form";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import App from "./components/App";
import AuthUnit from "./redux/AuthUnit";
import { configureStore } from "redux-starter-kit";

//~ Set up redux store
const reducer = combineReducers({
  AuthUnit: AuthUnit.reducer,
  Form: reduxFormReducer
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
