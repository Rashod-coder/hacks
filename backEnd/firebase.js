// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKH5-Fv_8a4_Lz9nhevCfJ3HxmKEixoes",
  authDomain: "hackathon-9336d.firebaseapp.com",
  projectId: "hackathon-9336d",
  storageBucket: "hackathon-9336d.appspot.com",
  messagingSenderId: "382951603421",
  appId: "1:382951603421:web:e96eae98c2e32ae0826f34",
  measurementId: "G-7M80RLN56N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const analytics = getAnalytics(app);

export {app, auth};