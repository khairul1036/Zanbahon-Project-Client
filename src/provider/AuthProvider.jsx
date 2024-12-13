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

  const [dbUser, setDbUser] = useState([]);
  const fbUserEmail = user?.email;
  //   console.log(fbUserEmail);

  useEffect(() => {
    fetch("http://localhost/zanbahon-server/user1.php")
      .then((res) => res.json())
      .then((data) => setDbUser(data.users))
      .catch((err) => console.log(err));
  }, []);

  const findE = dbUser.find((email) => email.Email === fbUserEmail);
    // console.log(findE);

  let dbUserName = "";
  let UserId = 0;
  let dbUserEmail = "";
  let dbUserRole = 1;
  if (findE) {
    dbUserName = findE.Name;
    UserId = findE.UserId;
    dbUserEmail = findE.Email;
    dbUserRole = findE.RoleId;
  }


  console.log(user);

  const createNewUser = (email, password) => {
    // setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    // setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
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
    updateUserProfile,
    logOut,
    dbUserName,
    UserId,
    dbUserEmail,
    dbUserRole,
    forgotPassword,
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
