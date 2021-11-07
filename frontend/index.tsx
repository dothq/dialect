import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "../assets/application.scss";
import "../assets/tailwind.scss";
import { App } from "./components/App";

ReactDOM.hydrate(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("app")
)