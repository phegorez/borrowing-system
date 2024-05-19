import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { profileInterface } from '@/app/type'

const authSlice = createSlice({
    name: "auth",
    initialState: {
        profile: <profileInterface>{},
        isLoggedIn: false
    },
    reducers: {
        signIn: (state) => {
            state.isLoggedIn = true;
        },
        getCurrent: (state, action) => {
            const currentUser: profileInterface = {
                uid: action.payload.uid,
                email: action.payload.email,
                photo: action.payload.photo,
                role: action.payload.role,
                displayName: action.payload.username,
                createdDate: action.payload.createdDate,
                updatedDate: action.payload.updatedDate
            }
            state.isLoggedIn = true;
            state.profile = currentUser;
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.profile = <profileInterface>{};
        }
    },
})

export const { signIn, getCurrent, logOut } = authSlice.actions

export default authSlice.reducer
