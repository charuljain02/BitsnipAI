import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "chapterone-e823e.firebaseapp.com",
  projectId: "chapterone-e823e",
  storageBucket: "chapterone-e823e.firebasestorage.app",
  messagingSenderId: "1094212453203",
  appId: "1:1094212453203:web:d3b68c2136550f8789d7a6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
export {auth,provider}