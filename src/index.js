import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-alice-carousel/lib/alice-carousel.css";

// Provider bọc lấy app. Nó implement việc tương tác tới core (reducer, store) trong redux
// store chính là phần kho mà mình sẽ lưu các state (Redux)
ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * Set localStorage
 */
 export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  return window.localStorage.setItem(name, content)
}

/**
  * Get localStorage
*/
export const getStore = (name) => {
  if (!name) return
  return JSON.parse(window.localStorage.getItem(name))
}

/**
 * Clear localStorage
*/
export const removeItem = (name) => {
  if (!name) return
  return window.localStorage.removeItem(name)
}

/**
 * Validate Email address
 */
export const isValidEmail = (value) => {
  return !(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value))
}

/**
 * Format Phone Number
 */
export const formatPhoneNumber = (value) => {
  if (!value) return
  const currentValue = value.replace(/[^\d]/g, '');
  const mobileNoLength = currentValue.length;
  if (mobileNoLength >=7) {
    if (mobileNoLength < 4) return currentValue;
    if (mobileNoLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  } else{
    return currentValue;
  }
}

