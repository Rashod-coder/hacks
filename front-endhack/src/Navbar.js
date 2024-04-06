import React from 'react';
import { auth } from './auth/Authentication';
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const [user, setUser] = useState("");
  const [image, setImage] = useState("./images/blankpfp.png");
  const [isUser, setIsUser] = useState(false);
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsUser(true);
        setUser(currentUser?.displayName); // Set user's display name
        if (currentUser.photoURL) {
          setImage(currentUser.photoURL);
        } else {
          setImage("./images/blankpfp.png");
        }
      } else {
        setIsUser(false);
        setUser("");
        setImage("./images/blankpfp.png");
      }
    });
  }, []);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Signed out");
      setIsUser(false);
      navigate('/Login')
      window.alert("You have logged out")
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" >
      <div className="container fs-5">
        <a className="navbar-brand" href="/">Fresh For All</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/Store">Store</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Dashboard">Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Sell">Sell Produce</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {isUser ? user : "Account"} {/* Display user's name if logged in, otherwise display "Account" */}
                </a>
                <ul className="dropdown-menu">
                  {!isUser && (
                    <React.Fragment>
                      <li><a className="dropdown-item" href="/Login">Login</a></li>
                      <li><a className="dropdown-item" href="/Register">Register</a></li>
                    </React.Fragment>
                  )}
                  {isUser && <li><a className="dropdown-item" href="/Settings">Settings</a></li>}
                  <hr className="dropdown-divider"/>
                  <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
