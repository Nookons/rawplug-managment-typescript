import {IItem, IStatsItem} from "../../../types/Item";
import {child, get, getDatabase, ref} from "firebase/database";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../../../firebaseConfig";
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {db} from "../../../firebase";


interface IAction {
    createTime: string;
    id: number;
    person: string;
    personUid: string;
    type: string;
    actionItem: any;
}

type itemsState = {
    actions: IAction[],
    loading: boolean,
    error: string | undefined
}


export const fetchActions = createAsyncThunk<IAction[], undefined, { rejectValue: string }>(
    'actions/fetchActions',

    async (_, { rejectWithValue }) => {
        try {
            let actions: IAction[] = [];

            // Using await with onSnapshot
            await onSnapshot(doc(db, "PWT70", "actions"), (snapshot) => {
                if (snapshot.exists()) {
                    actions = [...snapshot.data().items as IAction[]]
                }
            });

            console.log(actions);
            return actions;
        } catch (error) {
            // Catching errors without specifying type
            return rejectWithValue(error.message || 'Failed to fetch actions');
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
        addActionSlice(state, action: PayloadAction<IAction>) {
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
