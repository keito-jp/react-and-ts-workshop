import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import * as firebaseui from "firebaseui";

const firebaseConfig = {
  apiKey: "AIzaSyCg1_67iOUHrrIve37OmUkbVCP9W4cEbhU",
  authDomain: "fir-worksheop.firebaseapp.com",
  projectId: "fir-worksheop",
  storageBucket: "fir-worksheop.appspot.com",
  messagingSenderId: "472338827070",
  appId: "1:472338827070:web:fa95f8395c5614d9850e6f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const authUI = new firebaseui.auth.AuthUI(auth);
