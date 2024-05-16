// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API_KEY)
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-11c32.firebaseapp.com",
  projectId: "blog-11c32",
  storageBucket: "blog-11c32.appspot.com",
  messagingSenderId: "169774527948",
  appId: "1:169774527948:web:fae49a6b11a43c70019969"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);