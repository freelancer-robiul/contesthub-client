// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔐 এগুলা চাইলে .env VITE_ দিয়ে নিতে পারো
const firebaseConfig = {
  apiKey: "AIzaSyDUeJVmTpOgie0ZI7YAw-fpsn1-YorJhbM",
  authDomain: "contesthub-4e52d.firebaseapp.com",
  projectId: "contesthub-4e52d",
  storageBucket: "contesthub-4e52d.firebasestorage.app",
  messagingSenderId: "142802576140",
  appId: "1:142802576140:web:7b39922f5d48938de09f29",
};

const app = initializeApp(firebaseConfig);

// ✅ এই auth-টাই Login.jsx থেকে use করব
export const auth = getAuth(app);
export default app;
