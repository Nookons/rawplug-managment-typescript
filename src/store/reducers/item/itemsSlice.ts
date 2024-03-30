import {IItem, IStatsItem} from "../../../types/Item";
import {child, get, getDatabase, ref} from "firebase/database";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../../firebaseConfig";

type itemsState = {
    items: IItem[],
    itemsStats: IStatsItem[],
    loading: boolean,
    error: string | undefined
}


export const fetchItems = createAsyncThunk<IItem[], undefined, { rejectValue: string }>(
    'items/fetchItems',

    async (_, {rejectWithValue}) => {
        initializeApp(firebaseConfig);
        const database = ref(getDatabase());
        const dbRef = child(database, 'items/');
        const snapshot = await get(dbRef);

        console.log(snapshot.exists());

        if (snapshot.exists()) {
            const itemsArray = Object.values(snapshot.val()) as IItem[];
            return itemsArray;
        } else {
            return rejectWithValue('There was an error loading data from the server. Please try again.');
        }
    }
);


const initialState: itemsState = {
    items: [],
    itemsStats: [],
    loading: false,
    error: undefined
}

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<IItem>) {
            state.items.push(action.payload);
            state.error = undefined;
        },
        openItem(state, action: PayloadAction<number>) {
            const itemIdToOpen = action.payload;
            const itemToOpenIndex = state.items.findIndex(item => item.id === itemIdToOpen);

            if (itemToOpenIndex !== -1) {
                const updatedItem = { ...state.items[itemToOpenIndex] };
                updatedItem.status = updatedItem.status === 'Available' ? "Hold" : "Available";
                updatedItem.index = updatedItem.status === 'Available' ? updatedItem.index.replace('CMB', 'CM') : updatedItem.index.replace('CM', 'CMB');

                const updatedItems = [...state.items];
                updatedItems[itemToOpenIndex] = updatedItem;

                return {
                    ...state,
                    items: updatedItems
                };
            }
            return state;
        },
        removeItem(state, action: PayloadAction<number>) {
            console.log(action.payload);
            state.items = state.items.filter(item => item.id !== Number(action.payload));
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const {addItem, openItem, removeItem} = itemsSlice.actions;
export default itemsSlice.reducer;
