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

/**
 * FirebaseAuth Provider
 * ---------------------
 * Handles Firebase authentication and synchronizes
 * with the backend database user data.
 */

export default function FirebaseAuth({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // Firebase user
  const [dbUser, setDbUser] = useState(null); // Database user

  /** =============== 🔹 Auth Methods 🔹 =============== */

  // Create New User (Email/Password)
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update Firebase User Profile
  const updateData = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  // Sign In (Email/Password)
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Sign Out
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  /** =============== 🔹 Sync Firebase with DB 🔹 =============== */
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/users?email=${currentUser.email}`
          );
          setDbUser(response.data);
        } catch (error) {
          console.error("Failed to fetch DB user:", error);
          setDbUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setDbUser(null);
        setLoading(false);
      }
    });

    // Cleanup on unmount
    return () => unSubscribe();
  }, []);

  /** =============== 🔹 Context Value 🔹 =============== */
  const firebaseValue = {
    loading,
    setLoading,
    user,
    setUser,
    dbUser,
    setDbUser,
    createUser,
    updateData,
    signInUser,
    googleSignIn,
    signOutUser,
  };

  /** =============== 🔹 Render 🔹 =============== */
  return (
    <FirebaseContext.Provider value={firebaseValue}>
      {children}
    </FirebaseContext.Provider>
  );
}
