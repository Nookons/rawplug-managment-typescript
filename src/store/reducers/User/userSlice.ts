import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getAuth, onAuthStateChanged} from "firebase/auth";

type userState = {
    user: any,
    loading: boolean,
    error: string | undefined
}

export const fetchUser = createAsyncThunk<any, undefined, { rejectValue: string }>(
    'user/fetchUser',

    async (_, { rejectWithValue }) => {
        try {
            const auth = getAuth();
            return new Promise((resolve, reject) => {
                onAuthStateChanged(auth, (user: any) => {
                    if (user) {
                        resolve(user); // Resolve with fetched user data
                    } else {
                        reject('User not found'); // Reject with an error message
                    }
                });
            });
        } catch (e) {
            return rejectWithValue("Can't get user");
        }
    }
);


const initialState: userState = {
    user: {},
    loading: false,
    error: undefined
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userSignOut(state, action: PayloadAction<boolean>) {
            state.user = null;
            state.error = 'User logout'
        },
        userSignIn(state, action: PayloadAction<any>) {
            state.user = action.payload;
            state.loading = false;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                const user = {
                    uid: action.payload.uid,
                    email: action.payload.email
                }
                state.user = user;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = 'User not enter';
            })
    }
})

export const {userSignOut, userSignIn} = userSlice.actions;
export default userSlice.reducer;
