import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

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


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);