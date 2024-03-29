import {IItem} from "../../../types/Item";
import {child, get, getDatabase, ref, DatabaseReference} from "firebase/database";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../../firebaseConfig";
import {IPlan} from "../../../types/Plans";
import {IPallets} from "../../../types/Pallet";

type plansState = {
    items: IPlan[],
    loading: boolean,
    error: string | undefined
}


export const fetchPlans = createAsyncThunk<IPlan[], undefined, { rejectValue: string }>(
    'plans/fetchPlan',

    async (_, {rejectWithValue}) => {
        // Asserting the type of 'database' as DatabaseReference
        const app = initializeApp(firebaseConfig);
        const database = ref(getDatabase());
        const dbRef = child(database, 'plan/');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            // Convert object to array
            const itemsArray = Object.values(snapshot.val()) as IPlan[];
            return itemsArray;
        } else {
            return rejectWithValue('There was an error loading data from the server. Please try again.');
        }
    }
);


const initialState: plansState = {
    items: [],
    loading: false,
    error: undefined
}

const plansSlice = createSlice({
    name: 'plans',
    initialState,
    reducers: {
        addPlan(state, action: PayloadAction<IPlan>) {
            state.items.push(action.payload);
            state.error = undefined;
        },
        removePlan(state, action: PayloadAction<IPlan>) {
            state.items = state.items.filter(item => item.id !== action.payload.id)
            state.error = undefined;
        },
        changeReady(state, action: PayloadAction<IPallets>) {
            switch (action.payload.machine.toLowerCase()) {
                case 'first' :
                    console.log('This is first machine...')
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlans.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchPlans.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchPlans.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const {addPlan, removePlan, changeReady} = plansSlice.actions;
export default plansSlice.reducer;
