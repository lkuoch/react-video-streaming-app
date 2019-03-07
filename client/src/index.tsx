import App from "./components/App";
import AuthStore from "./redux/AuthStore";
import { StreamApiReducer } from "./redux/StreamApiStore";
import DebugStore from "./redux/DebugStore";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { combineReducers } from "redux";
import { configureStore } from "redux-starter-kit";
import thunk from "redux-thunk";

//# Set up redux store
const reducer = combineReducers({
  auth_store: AuthStore.reducer,
  stream_api_store: StreamApiReducer,
  debug_store: DebugStore.reducer
});

export const store = configureStore({
  reducer: reducer,
  middleware: [thunk]
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
