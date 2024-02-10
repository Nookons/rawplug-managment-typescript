import React, {useEffect} from 'react';
import {BrowserRouter, Link} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {HOME_ROUTE, SIGN_IN_ROUTE} from "./utils/consts";
import {app} from "./firebase";
import Navbar from "./components/Navbar/Navbar";
import {fetchItems} from "./store/reducers/item/itemsSlice";
import {fetchUser} from "./store/reducers/User/userSlice";
import {useAppDispatch} from "./hooks/storeHooks";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchItems())
        dispatch(fetchUser())
    }, []);

    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter/>
        </BrowserRouter>
    );
};

export default App;