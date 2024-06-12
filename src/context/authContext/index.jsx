import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log("Current user:", user); // Log the current user to verify
    });

    return unsubscribe;
  }, []);

  const value = {
    userLoggedIn: !!currentUser,
    currentUser,
    displayName: currentUser?.displayName || "",
    photoURL: currentUser?.photoURL || "",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
