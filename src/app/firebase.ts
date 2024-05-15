// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3legUpZsNHX_bQMjFnes8WUUM2A9CNbs",
    authDomain: "borrowingsystem-9e4ad.firebaseapp.com",
    projectId: "borrowingsystem-9e4ad",
    storageBucket: "borrowingsystem-9e4ad.appspot.com",
    messagingSenderId: "784502684123",
    appId: "1:784502684123:web:86402e54010e85906f8ffe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;