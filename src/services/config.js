import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "tradicion-mate-912.firebaseapp.com",
    projectId: "tradicion-mate-912",
    storageBucket: "tradicion-mate-912.appspot.com",
    messagingSenderId: "135688425791",
    appId: "1:135688425791:web:d0f81a518cb8f7e0dc438a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
    