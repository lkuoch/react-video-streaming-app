import App from "./components/App";
import AuthModule from "./redux/AuthModule";
// import StreamApiModule from "./redux/StreamApiModule";
import { default as StreamApiReducer } from "./redux/StreamApiModule/Reducers";
import DebugModule from "./redux/DebugModule";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { combineReducers } from "redux";
import { configureStore } from "redux-starter-kit";
import thunk from "redux-thunk";

//# Set up redux store
const reducer = combineReducers({
  auth_module: AuthModule.reducer,
  // RSK
  // stream_api_module: StreamApiModule.reducer,
  stream_api_module: StreamApiReducer,
  debug_module: DebugModule.reducer
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
