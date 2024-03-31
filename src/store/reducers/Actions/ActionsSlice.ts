import {IItem, IStatsItem} from "../../../types/Item";
import {child, get, getDatabase, ref} from "firebase/database";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../../firebaseConfig";
import {IAction} from "../../../types/Action";

type itemsState = {
    actions: IAction[],
    loading: boolean,
    error: string | undefined
}


export const fetchActions = createAsyncThunk<IAction[], undefined, { rejectValue: string }>(
    'actions/fetchActions',

    async (_, {rejectWithValue}) => {
        initializeApp(firebaseConfig);
        const database = ref(getDatabase());
        const dbRef = child(database, 'actions/');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const actionsArray = Object.values(snapshot.val()) as IAction[];
            return actionsArray;
        } else {
            return rejectWithValue('There was an error loading data from the server. Please try again.');
        }
    }
);


const initialState: itemsState = {
    actions: [],
    loading: false,
    error: undefined
}

const actionsSlice = createSlice({
    name: 'actions',
    initialState,
    reducers: {
        addAction(state, action: PayloadAction<IAction>) {
            state.actions.push(action.payload);
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchActions.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchActions.fulfilled, (state, action) => {
                state.actions = action.payload;
                state.loading = false;
            })
            .addCase(fetchActions.rejected, (state, action) => {
                console.log(action);
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const {addAction} = actionsSlice.actions;
export default actionsSlice.reducer;
