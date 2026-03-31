import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ1TX5vK9eWClbkHsadWKOFF4HbG4aSsI",
  authDomain: "rag-assignment-b7cea.firebaseapp.com",
  projectId: "rag-assignment-b7cea",
  storageBucket: "rag-assignment-b7cea.firebasestorage.app",
  messagingSenderId: "505540216173",
  appId: "1:505540216173:web:f794df8e34e5fa71108664",
  measurementId: "G-DEX21PBF5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);

export default app;