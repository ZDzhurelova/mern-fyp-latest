import React from "react";
// import 'antd/dist/antd.min.css';
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./reducers/store";


//Set Redux https://redux.js.org/api/createstore
//https://redux.js.org/usage/configuring-your-store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


reportWebVitals();
