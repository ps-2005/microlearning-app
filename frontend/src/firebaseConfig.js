// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC98XpbsmcSbZBSafNiGVHw1aoaoYNWJVU",
  authDomain: "microlearning-app-962b3.firebaseapp.com",
  projectId: "microlearning-app-962b3",
  storageBucket: "microlearning-app-962b3.firebasestorage.app",
  messagingSenderId: "586618784804",
  appId: "1:586618784804:web:67c100a729064999c2dcb1",
  measurementId: "G-WEMM0FX7HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // ✅ named export
export const auth = getAuth(app);
