import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {collection, doc, getDoc, onSnapshot, query} from "firebase/firestore";
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
            const q = query(collection(db, "actions"));
            let array: IAction[] = [];

            return new Promise<IAction[]>((resolve, reject) => {
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const newArray: IAction[] = []; // Create a new array
                    querySnapshot.forEach(doc => {
                        newArray.push(doc.data() as IAction);
                    });
                    array = newArray; // Replace the old array with the new one
                    resolve(array);
                });
            });
        } catch (error) {
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
