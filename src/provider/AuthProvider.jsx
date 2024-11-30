import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(user);

  const createNewUser = (email, password) => {
    // setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    // setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createNewUser,
    userLogin,
    logOut,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
