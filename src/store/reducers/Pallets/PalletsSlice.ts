import {IItem, IStatsItem} from "../../../types/Item";
import {child, get, getDatabase, ref, DatabaseReference} from "firebase/database";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../../firebaseConfig";
import {IPallets} from "../../../types/Pallet";

type itemsState = {
    pallets: IPallets[],
    loading: boolean,
    error: string | undefined
}

export const fetchPallets = createAsyncThunk<IPallets[], undefined, { rejectValue: string }>(
    'items/fetchPallets',

    async (_, {rejectWithValue}) => {
        // Asserting the type of 'database' as DatabaseReference
        const app = initializeApp(firebaseConfig);
        const database = ref(getDatabase());
        const dbRef = child(database, 'pallets/');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            // Convert object to array
            const itemsArray = Object.values(snapshot.val()) as IPallets[];
            return itemsArray;
        } else {
            return rejectWithValue('There was an error loading data from the server. Please try again.');
        }
    }
);


const initialState: itemsState = {
    pallets: [],
    loading: false,
    error: undefined
}

const palletsSlice = createSlice({
    name: 'pallets',
    initialState,
    reducers: {
        addPallet(state, action: PayloadAction<IPallets>) {
            state.pallets.push(action.payload)
            state.error = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPallets.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchPallets.fulfilled, (state, action) => {
                state.pallets = action.payload;
                state.loading = false;
            })
            .addCase(fetchPallets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})

export const {addPallet} = palletsSlice.actions;
export default palletsSlice.reducer;
