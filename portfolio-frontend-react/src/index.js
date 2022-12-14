import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import { getEducations } from "./actions/educationAction";
import { getExperiences } from "./actions/experienceAction";
import { getprojects } from "./actions/projectAction";
import { getSkills } from "./actions/skillAction";
import api from "./apis/serverApi";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = configureStore({reducer:allReducers}, composeEnhancer(applyMiddleware(thunk)));
store.dispatch(getEducations());
store.dispatch(getExperiences());
store.dispatch(getprojects());
store.dispatch(getSkills());

const user = JSON.parse(localStorage.getItem("userData"));

if (user !== null) {
  api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();