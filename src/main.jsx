/*eslint-disable*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StateProvider from "./components/StateProvider.jsx";
import reducer, { initialstate } from "./components/reducer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StateProvider initialstate={initialstate} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
