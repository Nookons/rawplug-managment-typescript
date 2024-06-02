import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";

// Define the User type based on Firebase User type or extend as needed
type User = {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    phoneNumber: string;
    photoURL: string;
} | null;

type UserState = {
    user: User;
    loading: boolean;
    error: string | undefined;
};

// Function to unsubscribe from the onAuthStateChanged listener
let authStateChangedUnsubscribe: (() => void) | null = null;

export const fetchUser = createAsyncThunk<User | null, void, { rejectValue: string }>(
    "user/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const auth = getAuth();
            return new Promise<User | null>((resolve, reject) => {
                authStateChangedUnsubscribe = onAuthStateChanged(auth, (user) => {
                    if (user) {
                        console.log(user);
                        resolve({
                            uid: user.uid,
                            email: user.email,
                            emailVerified: user.emailVerified,
                            displayName: user.displayName,
                            phoneNumber: user.phoneNumber,
                            photoURL: user.photoURL,
                        } as User);
                    } else {
                        resolve(null);
                    }
                }, (error) => {
                    rejectWithValue("Failed to subscribe to auth state changes");
                });
            });
        } catch (e) {
            return rejectWithValue("Can't get user");
        }
    }
);

export const signOutUser = createAsyncThunk<void, void, { rejectValue: string }>(
    "user/signOutUser",
    async (_, { rejectWithValue }) => {
        const auth = getAuth();
        try {
            await signOut(auth);
            if (authStateChangedUnsubscribe) {
                authStateChangedUnsubscribe();
                authStateChangedUnsubscribe = null;
            }
        } catch (error) {
            return rejectWithValue("Failed to log out");
        }
    }
);

const initialState: UserState = {
    user: null,
    loading: false,
    error: undefined,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userSignIn(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.loading = false;
            state.error = undefined;
        },
        userChangeAvatar(state, action: PayloadAction<string>) {
            state.user.photoURL = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | null>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.user = null;
                state.error = "User logged out";
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { userSignIn, userChangeAvatar } = userSlice.actions;
export default userSlice.reducer;
