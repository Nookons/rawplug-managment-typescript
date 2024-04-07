import {IItem, IStatsItem} from "../../../types/Item";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRemoved} from "../../../types/Removed";
import {collection, onSnapshot, query} from "firebase/firestore";
import {db} from "../../../firebase";

type itemsState = {
    removed: IRemoved[],
    loading: boolean,
    error: string | undefined
}


export const fetchRemoved = createAsyncThunk<IItem[], undefined, { rejectValue: string }>(
    'removed/fetchRemoved',
    async (_, { rejectWithValue }) => {
        try {
            const q = query(collection(db, "removed"));
            let array: IItem[] = [];

            return new Promise<IItem[]>((resolve, reject) => {
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const newArray: IItem[] = []; // Create a new array
                    querySnapshot.forEach(doc => {
                        newArray.push(doc.data() as IItem);
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
