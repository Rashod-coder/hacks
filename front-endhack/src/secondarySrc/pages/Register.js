import React, { useState } from 'react'; // Import React and useState
import {auth} from '../../auth/Authentication'
import {createUserWithEmailAndPassword, signOut} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../Firestore/Firestore';
import { Link } from 'react-router-dom';


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
        <div className={`w-screen`}>return (
            <div id = "box"className='wrapper'>
              <div className='register-container'>
                <h1>Registration</h1>
                <div className='input-box'>
                  <input type="text" placeholder='First Name' name="firstName" onChange={(event) => {
                    setFirstName(event.target.value);
                  }}/>
                </div>
                <div className='input-box'>
                  <input type="text" placeholder='Last Name' name="lastName" onChange={(event) => {
                    setLastName(event.target.value);
                  }}/>
                </div>
                <div className='input-box'>
                  <input type="text" placeholder='Email' name="email"  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}/>
                </div>
                <div className='input-box'>
                  <input type="text" placeholder='Username' name="username" onChange={(event) => {
                    setUsername(event.target.value);
                  }}/>
                </div>
                <div className='input-box'>
                  <input type="password" placeholder='Password' name="password"  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}/>
                </div>
                <div className='input-box'>
                  <a>Already have an account? <Link to="/login">Sign in</Link></a>
                </div>
                <button id = "submit" type='submit' onClick = {keepDatabase}>Create Account</button>
              {/* </form> */}
            </div>
            </div>
        
          );
        </div>
    )
}