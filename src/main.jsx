/* eslint-disable no-unused-vars */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { apiSlice } from "./services/apiSlice.jsx";
import { store } from "./app/store.jsx";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllData from "./pages/allData.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all" element={<AllData />} />
      </Routes>
    </Provider>
  </BrowserRouter>
);
