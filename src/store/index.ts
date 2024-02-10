import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from "./reducers/item/itemsSlice";
import userSlice from "./reducers/User/userSlice";

const store = configureStore({
    reducer: {
        items: itemsSlice,
        user: userSlice
    }
});

export default store;

export type RootState = ReturnType<typeof  store.getState>;
export type AppDispatch = typeof store.dispatch;