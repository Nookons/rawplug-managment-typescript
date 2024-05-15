import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

type userState = {
    user: { uid: string; email: string } | null; // Serializable user object
    loading: boolean;
    error: string | undefined;
};

// Function to unsubscribe from the onAuthStateChanged listener
let authStateChangedUnsubscribe: (() => void) | null = null;

export const fetchUser = createAsyncThunk<
    { uid: string; email: string } | null,
    undefined,
    { rejectValue: string }
    >("user/fetchUser",
    async (_, { rejectWithValue }) => {
        try {
            const auth = getAuth();
            return new Promise((resolve, reject) => {
                authStateChangedUnsubscribe = onAuthStateChanged(auth, (user: any) => {
                    if (user) {
                        resolve({ uid: user.uid, email: user.email}); // Serializable object
                    } else {
                        reject("User not found");
                    }
                });
            });
        } catch (e) {
            return rejectWithValue("Can't get user");
        }
    }
);

const initialState: userState = {
    user: null,
    loading: false,
    error: undefined,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userSignOut(state, action: PayloadAction<boolean>) {
            // Unsubscribe from the auth state listener if active
            if (authStateChangedUnsubscribe) {
                authStateChangedUnsubscribe();
                authStateChangedUnsubscribe = null; // Reset the unsubscribe function
            }

            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    // You might want to add additional logic here, such as redirecting to the login page
                    state.user = null;
                    state.error = "User logged out";
                })
                .catch((error) => {
                    // Handle sign-out error
                    console.error("Sign out error:", error);
                    state.error = "Failed to log out";
                });
        },
        userSignIn(state, action: PayloadAction<any>) {
            state.user = action.payload; // Assuming payload is a serializable user object
            state.loading = false;
            state.error = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.loading = true;
                state.error = undefined;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload; //  The payload is already a serializable object
                state.loading = false;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.user = null;
                state.loading = false;
                state.error = "User not found"; // Use a more descriptive error message
            });
    },
});

export const { userSignOut, userSignIn } = userSlice.actions;
export default userSlice.reducer;