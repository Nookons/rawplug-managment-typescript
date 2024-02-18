import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from "./reducers/item/itemsSlice";
import userSlice from "./reducers/User/userSlice";
import plansSlice from "./reducers/Plan/PlansReducer"
import palletsSlice from "./reducers/Pallets/PalletsSlice";

const store = configureStore({
    reducer: {
        items: itemsSlice,
        user: userSlice,
        plans: plansSlice,
        pallets: palletsSlice
    }
});

export default store;

export type RootState = ReturnType<typeof  store.getState>;
export type AppDispatch = typeof store.dispatch;