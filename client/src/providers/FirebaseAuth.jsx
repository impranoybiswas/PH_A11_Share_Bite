import React, { useEffect, useState } from "react";
import { FirebaseContext } from "./Context";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import axios from "axios";

export default function FirebaseAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);

  //Create New User in Firebase
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //Update User Data
  const updateData = (displayName, photoURL) => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    });
  };

  //Sign in User
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //Google Sign in
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  //Sign out User
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      const getUserData = async (email) => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/users?email=${email}`
          );
          setDbUser(res.data);
        } catch (err) {
          console.error("Axios error:", err);
        } finally {
          setLoading(false);
        }
      };

      if (currentUser) {
        getUserData(currentUser.email);
      } else {
        setDbUser(null);
        setLoading(false);
      }
    });

    return () => unSubscribe();
  }, []);

  const firebaseValue = {
    loading,
    setLoading,
    user,
    setUser,
    createUser,
    updateData,
    signInUser,
    googleSignIn,
    signOutUser,
    dbUser,
  };
  return (
    <FirebaseContext.Provider value={firebaseValue}>
      {children}
    </FirebaseContext.Provider>
  );
}
