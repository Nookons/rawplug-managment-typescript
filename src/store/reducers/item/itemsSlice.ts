import {IItem} from "../../../types/Item";
import {child, get, getDatabase, ref, DatabaseReference} from "firebase/database";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../../firebaseConfig";

type itemsState = {
    items: IItem[],
    loading: boolean,
    error: string | undefined
}


export const fetchItems = createAsyncThunk<IItem[], undefined, { rejectValue: string }>(
    'items/fetchItems',

    async (_, {rejectWithValue}) => {
        // Asserting the type of 'database' as DatabaseReference
        const app = initializeApp(firebaseConfig);
        const database = ref(getDatabase());
        const dbRef = child(database, 'items/');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            // Convert object to array
            const itemsArray = Object.values(snapshot.val()) as IItem[];
            return itemsArray;
        } else {
            return rejectWithValue('There was an error loading data from the server. Please try again.');
        }
    }
);


const initialState: itemsState = {
    items: [],
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

export const {addItem} = itemsSlice.actions;
export default itemsSlice.reducer;
