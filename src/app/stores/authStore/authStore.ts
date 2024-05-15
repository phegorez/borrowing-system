import { DocumentData } from "firebase/firestore";
import { create } from "zustand";

interface currentlyUserInt {
    username: string,
    role: string,
    photo: string,
    email: string
}

interface CheckAuthState {
    status: boolean;
    currentlyUser: currentlyUserInt | DocumentData
    setStatus: (status: boolean) => void;
    getCurrentlyUser: (userData: currentlyUserInt | DocumentData) => void;
}

const useAuthStore = create<CheckAuthState>((set) => ({
    status: false,
    currentlyUser: {
        username: '',
        role: '',
        photo: '',
        email: ''
    },
    setStatus: (() => set((state) => ({ status: !state }))),
    getCurrentlyUser: ((userData) => set((state) => ({ currentlyUser: userData })))
}));

export default useAuthStore;
