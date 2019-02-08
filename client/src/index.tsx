import App from "./components/App";
import AuthUnit from "./redux/AuthUnit";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { combineReducers } from "redux";
import { configureStore } from "redux-starter-kit";
import { reducer as formReducer } from "redux-form";
import thunk from "redux-thunk";

//# Set up redux store
const reducer = combineReducers({
  auth_unit: AuthUnit.reducer,
  form: formReducer
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
