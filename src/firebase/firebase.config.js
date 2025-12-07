// src/firebase/firebase.config.js

// Import Firebase initializer
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUeJVmTpOgie0ZI7YAw-fpsn1-YorJhbM",
  authDomain: "contesthub-4e52d.firebaseapp.com",
  projectId: "contesthub-4e52d",
  storageBucket: "contesthub-4e52d.appspot.com", // ✔️ FIXED
  messagingSenderId: "142802576140",
  appId: "1:142802576140:web:7b39922f5d48938de09f29",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig); // ✔️ MUST EXPORT
