import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state"; // This is the reducer from state\index.js (jsconfig is set to src)
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { api } from "state/api";

// Configure the Redux store with a single reducer for the "global" state slice
const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)
});
setupListeners(store.dispatch);

// Render the app using ReactDOM.createRoot and the Redux store provider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
