import React from 'react';
import auth from './auth/Authentication';
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const [user, setUser] = useState("");
  const [image, setImage] = useState("./images/b lankpfp.png");
  const [isUser, setIsUser] = useState(false);
  console.log(image);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     if (currentUser) setIsUser(true);
  //     if (currentUser && currentUser.displayName)
  //       setUser(currentUser?.displayName);
  //     //we can also set up an image url
  //     if (currentUser && currentUser.photoURL) {
  //       setImage(currentUser.photoURL);
  //       console.log(image);
  //     } else {
  //       setUser("");
  //       setImage("./images/blankpfp.png");
  //     }
  //   });
  // }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" >
      <div className="container fs-5">
        <a className="navbar-brand " href="/">Home</a>
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
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Account
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/Login">Login</a></li>
                  <li><a className="dropdown-item" href="/Register">Register</a></li>
                  <li><a className="dropdown-item" href="/Settings">Settings</a></li>
                  <hr className="dropdown-divider"/>
                  <li><a className="dropdown-item" href="#">Logout</a></li>
                </ul>
                <div>
                  {isUser == true ? "Signed in as " + user : "Not signed in"}
                </div>
              </li>
            </ul>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;