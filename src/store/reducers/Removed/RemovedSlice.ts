import {IItem, IStatsItem} from "../../../types/Item";
import {child, get, getDatabase, ref} from "firebase/database";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../../firebaseConfig";
import {IAction} from "../../../types/Action";
import {IRemoved} from "../../../types/Removed";

type itemsState = {
    removed: IRemoved[],
    loading: boolean,
    error: string | undefined
}


export const fetchRemoved = createAsyncThunk<IRemoved[], undefined, { rejectValue: string }>(
    'removed/fetchRemoved',

    async (_, {rejectWithValue}) => {
        initializeApp(firebaseConfig);
        const database = ref(getDatabase());
        const dbRef = child(database, 'removed/');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const actionsArray = Object.values(snapshot.val()) as IRemoved[];
            return actionsArray;
        } else {
            return rejectWithValue('There was an error loading data from the server. Please try again.');
        }
    }
);


const initialState: itemsState = {
    removed: [],
    loading: false,
    error: undefined
}

const removedSlice = createSlice({
    name: 'removed',
    initialState,
    reducers: {
        addRemoved(state, action: PayloadAction<IRemoved>) {
            state.removed.push(action.payload);
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRemoved.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchRemoved.fulfilled, (state, action) => {
                state.removed = action.payload;
                state.loading = false;
            })
            .addCase(fetchRemoved.rejected, (state, action) => {
                console.log(action);
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const {addRemoved} = removedSlice.actions;
export default removedSlice.reducer;
