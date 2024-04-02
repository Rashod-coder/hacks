// Login.js
import React, { useState } from 'react'; // Import React and useState
import {auth} from './auth/Authentication'
import {createUserWithEmailAndPassword} from 'firebase/auth';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();
  const register = async () => {
    console.log("hello!");
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log("Successful");
      // setLoggedIn(true);
      console.log(registerEmail);

      try {
        await signOut(auth);
        // set
        console.log("Signed out");
      } catch (error) {
        console.log("error")
      }
      // navigate('/');
    } catch (error) {
      console.log(error.errorMessage);
    }
  };

  

  return (
    <div id = "box"className='wrapper'>
      <form>
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
          <input type="password" placeholder='Password' name="password"  onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}/>
        </div>
        <div className='input-box'>
          <a>Already have an account? <Link to="/login">Sign in</Link></a>
        </div>
        <button id = "submit" type='submit' onClick = {register}>Create Account</button>
      </form>
    </div>
  );
}

export default Register;
