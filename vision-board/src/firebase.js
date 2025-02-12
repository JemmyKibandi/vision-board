import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC8xShWAfpOKBBRVgF0QXuKbh9qJVM7ulo",
  authDomain: "vision-board-4ab0b.firebaseapp.com",
  projectId: "vision-board-4ab0b",
  storageBucket: "vision-board-4ab0b.firebasestorage.app",
  messagingSenderId: "481701329931",
  appId: "1:481701329931:web:8fbfea2f0d06010bb31b0e",
  measurementId: "G-HB535GT2PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, db, storage, provider };