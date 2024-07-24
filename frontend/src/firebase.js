// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-1a56b.firebaseapp.com",
  projectId: "blog-app-1a56b",
  storageBucket: "blog-app-1a56b.appspot.com",
  messagingSenderId: "904963916617",
  appId: "1:904963916617:web:4f01781d178d6ebef0d098",
  measurementId: "G-0EV19651LN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);