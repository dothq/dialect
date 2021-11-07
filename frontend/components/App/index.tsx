import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../../pages/404";
import Home from "../../pages/index";

export class App extends React.Component {
    public render() {
        return (
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"*"} element={<NotFound />} />
            </Routes>
        );
    }
}