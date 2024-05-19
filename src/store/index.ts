import { configureStore } from '@reduxjs/toolkit';
import itemsSlice from "./reducers/item/itemsSlice";
import userSlice from "./reducers/User/userSlice";
import palletsSlice from "./reducers/Pallets/PalletsSlice";
import actionsSlice from "./reducers/Actions/ActionsSlice";
import removedSlice from "./reducers/Removed/RemovedSlice";

const store = configureStore({
    reducer: {
        items: itemsSlice,
        user: userSlice,
        pallets: palletsSlice,
        actions: actionsSlice,
        removed: removedSlice
    }
});

export default store;

export type RootState = ReturnType<typeof  store.getState>;
export type AppDispatch = typeof store.dispatch;