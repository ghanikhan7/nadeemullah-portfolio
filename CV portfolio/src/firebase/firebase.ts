import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAysfOMzitZ7GWmhTHImDxjJ8wYNIs69uc",
  authDomain: "m-nadeemullah.firebaseapp.com",
  projectId: "m-nadeemullah",
  storageBucket: "m-nadeemullah.firebasestorage.app",
  messagingSenderId: "840092814723",
  appId: "1:840092814723:web:7503c9132368dd793e3ab6",
  measurementId: "G-X4PXR3VM8S"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
