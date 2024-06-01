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
    const {user, loading, error} = useAppSelector(state => state.user)

    const dispatch = useAppDispatch();

    const [myVersion, setMyVersion] = useState("");
    const [lastUpdate, setLastUpdate] = useState("");


    useEffect(() => {
        const items = query(collection(db, "items"));
        const actions = query(collection(db, "actions"));
        const removed = query(collection(db, "removed"));

        dispatch(fetchUser());

        onSnapshot(items, (querySnapshot) => {
            dispatch(fetchItems());
        });

        onSnapshot(actions, (querySnapshot) => {
            dispatch(fetchActions());
        });

        onSnapshot(removed, (querySnapshot) => {
            dispatch(fetchRemoved());
        });
    }, []);

    useEffect(() => {
        (async () => {
            try {
                onSnapshot(doc(db, "main", "config"), (doc) => {
                    if (doc.exists()) {
                        setMyVersion(doc.data().version)
                        setLastUpdate(doc.data().lastUpdate)
                    }
                });
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        const localVersion = localStorage.getItem('version');

        if (myVersion) {
            if (localVersion !== myVersion) {
                localStorage.setItem('version', myVersion)
                alert("Hey there, we have new version app for you.We will reload this page to set update >" +
                    "Привіт, у нас є нова версія програми для вас.Ми перезавантажимо цю сторінку, щоб встановити оновлення")
                setTimeout(() => {
                    window.location.reload();
                }, 500)
            }
        }

    }, [myVersion]);


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
                    <p>version {myVersion} | ({lastUpdate})</p>
                </div>
        </BrowserRouter>
    );
};

export default App;
