import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { userInterface, profileInterface } from '@/app/type'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: <userInterface>{},
        profile: <profileInterface>{},
        isLoggedIn: false
    },
    reducers: {
        signIn: (state, action) => {
            const signInUser : userInterface = {
                id: action.payload.id,
                email: action.payload.email
            }
            state.isLoggedIn = true;
            state.user = signInUser;
        },
        getCurrent: (state, action) => {
            const currentUser : profileInterface = {
                id: action.payload.id,
                email: action.payload.email,
                displayName: action.payload.displayName
            }
            state.isLoggedIn = true;
            state.profile = currentUser;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.user = <userInterface>{};
            state.profile = <profileInterface>{};
        }
    },
})

export const { signIn, getCurrent, logOut } = authSlice.actions

export default authSlice.reducer
