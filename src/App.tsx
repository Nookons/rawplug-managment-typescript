import React from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {HOME_ROUTE, SIGN_IN_ROUTE} from "./utils/consts";
import {app} from "./firebase";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter/>
        </BrowserRouter>
    );
};

export default App;