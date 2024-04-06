// UserContextProvider.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from './auth/Authentication';
import { onAuthStateChanged } from "firebase/auth";

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider }; // Export both UserContext and UserContextProvider
