// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateEmail as firebaseUpdateEmail,
  updatePassword as firebaseUpdatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Wrap Firebase auth functions with error handling
  const handleFirebaseOperation = async (operation, ...args) => {
    try {
      return await operation(...args);
    } catch (error) {
      console.error(`Firebase operation error: ${error.code}`, error.message);
      throw error;
    }
  };

  function signup(email, password) {
    return handleFirebaseOperation(() => createUserWithEmailAndPassword(auth, email, password));
  }

  function login(email, password) {
    return handleFirebaseOperation(() => signInWithEmailAndPassword(auth, email, password));
  }

  function logout() {
    return handleFirebaseOperation(() => signOut(auth));
  }

  function resetPassword(email) {
    return handleFirebaseOperation(() => sendPasswordResetEmail(auth, email));
  }

  function updateEmail(newEmail) {
    if (!auth.currentUser) throw new Error("No user is logged in");
    return handleFirebaseOperation(() => firebaseUpdateEmail(auth.currentUser, newEmail));
  }

  function updatePassword(newPassword) {
    if (!auth.currentUser) throw new Error("No user is logged in");
    return handleFirebaseOperation(() => firebaseUpdatePassword(auth.currentUser, newPassword));
  }

  function reauthenticate(password) {
    if (!auth.currentUser) throw new Error("No user is logged in");
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    return handleFirebaseOperation(() => 
      reauthenticateWithCredential(auth.currentUser, credential)
    );
  }

  useEffect(() => {
    console.log("Setting up auth state listener");
    let unsubscribe = () => {};
    
    try {
      unsubscribe = onAuthStateChanged(auth, 
        (user) => {
          console.log("Auth state changed:", user ? "User logged in" : "No user");
          setCurrentUser(user);
          setLoading(false);
        }, 
        (error) => {
          console.error("Auth state change error:", error);
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Failed to set up auth state listener:", error);
      setLoading(false);
    }
    
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    reauthenticate,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}