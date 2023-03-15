// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABKJSKac31hSPgRfCYDNf4WGrETpCdCXQ",
  authDomain: "economic-691ea.firebaseapp.com",
  projectId: "economic-691ea",
  storageBucket: "economic-691ea.appspot.com",
  messagingSenderId: "314514195539",
  appId: "1:314514195539:web:b1e71e8f59836325b932a6",
  measurementId: "G-ZPRK7V1LS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);