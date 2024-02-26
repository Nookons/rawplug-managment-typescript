import React, {useCallback, useEffect} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar/Navbar";
import {fetchItems} from "./store/reducers/item/itemsSlice";
import {fetchUser} from "./store/reducers/User/userSlice";
import {useAppDispatch} from "./hooks/storeHooks";
import {fetchPlans} from "./store/reducers/Plan/PlansReducer";
import {fetchPallets} from "./store/reducers/Pallets/PalletsSlice";

const App = () => {
    const dispatch = useAppDispatch();

    const navigate = useCallback(() => {
        dispatch(fetchItems());
        dispatch(fetchUser())
        dispatch(fetchPlans())
        dispatch(fetchPallets())
    }, [dispatch]);

    navigate();

    return (
        <BrowserRouter>
            <Navbar />
            <div style={{display: 'flex', justifyContent: 'center', padding: 4, backgroundColor: '#d9d9d9',}}>
                <p>version 0.1.2 | (18/02/2024)</p>
            </div>
            <AppRouter/>
        </BrowserRouter>
    );
};

export default App;