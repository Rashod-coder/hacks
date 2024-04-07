import React, { useState, useEffect  } from 'react';
import '../../Login.js'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {GoogleButton} from "react-google-button"
import { FcGoogle } from 'react-icons/fc';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from '../../auth/Authentication';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from '../../Firestore/Firestore';

export default function Login({ setLoggedIn }) {
    const [values, setValues] = useState({
        email: '',
        password: ''
      });
    
      const [loginEmail, setLoginEmail] = useState("");
      const [loginPassword, setLoginPassword] = useState("");
    
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
    
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
    
      const login = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
          const user = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          // setLoggedIn(true);
          // console.log(user);
          // navigate("/login");
          console.log(user);
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("email", "==", values.email));
          const querySnapshot = await getDocs(q);
    
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setFirstName(doc.data().firstName);
              setLastName(doc.data().lastName);
            });
          } else {
            console.log("User email does not exist in database");
          }
          navigate("/Dashboard");
        } catch (error) {
          console.log("TEST", values.email, values.password);
        }
      };
      const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            if (result && result.user.accessToken) {
              const token = result.user.accessToken;
              const USER = result.user.displayName;
              // result.user
              if (USER != null) setUser(USER);
              // console.log(USER);
            }
              setDoc(doc(db, "users", result.user.uid), {
                email: result.user.email,
                firstName: "",
                lastName: "",
                username: result.user.displayName
              }, { merge: true }).then(() => {
                console.log("Here");
                console.log(result.user.uid);
                setLoggedIn(true);
                navigate('/Dashboard');
              });
            
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
      
      
    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.post('http://localhost:8801/signin', values)
    //       .then(res => {
    //         if (res.data.Status === "Success") {
    //           navigate('/Dashboard');
    //         } else {
    //           alert(res.data.Error);
    //         }
    //       })  
    //       .catch(err => console.log(err)); 
    //   };

    return (
        <div className="wrapper w-screen"> 
            <form>
                <h1 className={`text-4xl font-bold mb-3 text-green-800`}>Sign In</h1>
                <div className="input-box">
                    <input
                        className={`px-1 mb-5 py-2 rounded-md focus:outline-none`}
                        type="email"
                        value={values.email} // Use values.email instead of email
                        onChange={e => setValues({...values, email: e.target.value})}
                        placeholder="Email"
                        required
                    />
                    </div>
                    <div className={`py-1`}></div>
                    <div className="input-box">
                    <input
                        className={`px-1 py-2 rounded-md focus:outline-none`}
                        type="password"
                        value={values.password} // Use values.password instead of password
                        onChange={e => setValues({...values, password: e.target.value})}
                        placeholder="Password"
                        required
                    />
                    </div>
                    <button onClick={login} type="submit">Sign In</button>
                    <br/>
                    <br/>
                    <div>
                    <hr className={`border-t-4 w-5/6 border-blue-500 rounded-full my-3 mx-auto`} />
                    <div className={`w-full mb-2 rounded-lg bg-blue-500 py-1 pl-1 flex flex-row items-center cursor-pointer hover:bg-blue-400`} onClick={googleSignIn}>
                      <div className={`bg-white rounded-lg p-2 w-fit`}>
                        <FcGoogle size={30} className={``}/>
                      </div>
                      <p className={`ml-auto mr-20 text-white font-semibold`}>Sign in with Google</p>
                    </div>
                </div>
                <a className={`text-xl text-white mt-3`}>Don't  have an account? <Link to="/register"> Sign up</Link> </a>

            </form>
        </div>
    )
}