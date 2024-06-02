import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import {fetchItems} from "./store/reducers/item/itemsSlice";
import {fetchUser} from "./store/reducers/User/userSlice";
import {useAppDispatch, useAppSelector} from "./hooks/storeHooks";
import {fetchPlans} from "./store/reducers/Plan/PlansReducer";
import {fetchPallets} from "./store/reducers/Pallets/PalletsSlice";
import {fetchActions} from "./store/reducers/Actions/ActionsSlice";
import {fetchRemoved} from "./store/reducers/Removed/RemovedSlice";
import {collection, doc, onSnapshot, query} from "firebase/firestore";
import {db} from "./firebase";
import {SIGN_IN_ROUTE} from "./utils/consts";

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const items = query(collection(db, "items"));
        const removed = query(collection(db, "removed"));

        dispatch(fetchUser());

        onSnapshot(items, (querySnapshot) => {
            dispatch(fetchItems());
        });

        onSnapshot(removed, (querySnapshot) => {
            dispatch(fetchRemoved());
        });
    }, []);



    return (
        <BrowserRouter>
                <Navbar />
                <AppRouter/>
                <div style={{display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'center', gap: 8, padding: 14, backgroundColor: '#f5f5f5',}}>
                    <p>Copyright © 2024 |
                        All Rights Reserved by
                        <a style={{color: "#c2fff6 !important"}} href="https://github.com/Nookons">
                            Nookon ™
                        </a>
                    </p>
                    <p>version 0.2.5 | (02-06-2024)</p>
                </div>
        </BrowserRouter>
    );
};

export default App;
