// Import Firebase core and modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Konfigurasi Firebase dari Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDQ8o9-2H0IJ8subpyYGwANpmHVzJ3Ktoc",
  authDomain: "kopi-kenangan-app.firebaseapp.com",
  projectId: "kopi-kenangan-app",
  storageBucket: "kopi-kenangan-app.appspot.com", // ✅ diperbaiki (awalnya typo: firebasestorage.app)
  messagingSenderId: "597596680028",
  appId: "1:597596680028:web:401cbf539bdeabc31ddb99",
  measurementId: "G-RZEMHVGJ95",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Firestore dan Auth
const db = getFirestore(app);
const auth = getAuth(app);

// Export instance yang bisa digunakan di komponen lain
export { db, auth };
