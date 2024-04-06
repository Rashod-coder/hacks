import React, { useState, useEffect  } from 'react';
import './Login.css'; // Use the same CSS file for both login and signin pages for consistent styling.
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import {GoogleButton} from "react-google-button"
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {auth} from "./auth/Authentication"


function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState("");
  const [uid, setUid] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser){
        setUid(currentUser?.uid);
        console.log(uid);
      }

    }); 
  }, []);
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = provider.credentialFromResult(result);
        if (credential != null) {
          const token = credential.accessToken;
          const USER = result.user.displayName;
          // result.user
          if (USER != null) setUser(USER);
          // console.log(USER);
        }
        console.log("Here");
        console.log(result.user.uid);
        // setUser(result.user.uid);
        // The signed-in user info.
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };



  const navigate = useNavigate(); // Define navigate function
  axios.defaults.withCredentials = true;
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8801/signin', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/Dashboard');
        } else {
          alert(res.data.Error);
        }
      })  
      .catch(err => console.log(err)); 
  };

  return (
    <div className="wrapper"> 
      <form onSubmit={handleSubmit}>
        <h1 id = "signIn">Sign In</h1>
        <div className="input-box">
          <input
            type="email"
            value={values.email} // Use values.email instead of email
            onChange={e => setValues({...values, email: e.target.value})}
            placeholder="Email"
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            value={values.password} // Use values.password instead of password
            onChange={e => setValues({...values, password: e.target.value})}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
        <br/>
        <br/>
        <div>
          <h1 id = "signIn">Or</h1>
          <GoogleButton id = "googleSignIn"onClick = {googleSignIn}/>
          <div>HI {user}</div>
        </div>
        <a>Don't  have an account? <Link to="/register"> Sign up</Link> </a>
        

      </form>
    </div>
  );
}

export default Login;
