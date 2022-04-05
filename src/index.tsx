import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import "./index.scss";
import { rootReducer } from "@/reducers";
import { Provider } from "react-redux";
import "./common/helpers/i18";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "@/sagas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
