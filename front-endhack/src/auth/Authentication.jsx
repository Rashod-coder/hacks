// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZDdedktj5NGfhOrTngfCpIrrb3Gg4i-M",
  authDomain: "freshforall-d3edb.firebaseapp.com",
  projectId: "freshforall-d3edb",
  storageBucket: "freshforall-d3edb.appspot.com",
  messagingSenderId: "327292123986",
  appId: "1:327292123986:web:b60a28c4396b5be115d88b",
  measurementId: "G-MQ39E56W0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
