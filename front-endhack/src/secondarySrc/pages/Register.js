import React, { useState } from 'react'; // Import React and useState
import {auth} from '../../auth/Authentication'
import {createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../Firestore/Firestore';

export default function Register() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");



    const navigate = useNavigate();
    const handleSubmit = (event) => {
        
    };


    const keepDatabase = async () => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
                firstName: firstName,
                lastName: lastName,
                userName: username,
                email: registerEmail,
                password: registerPassword
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        console.log("hello");

        try {
        const user = await createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
        );
        console.log(user.user.uid);
        try {
            await signOut(auth);
            // set
            console.log("Signed out");
        } catch (error) {
            console.log("error")
        }
        navigate("/Login");
        }
        catch (error) {
        console.log(error.errorMessage);
        }
    }

    return (
        <div className={`w-screen`}></div>
    )
}