import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// Replace with your own Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBUps2KfpnDzJO0pVRJrr2PDUJefXPI-6E",
    authDomain: "eleccycle.firebaseapp.com",
    projectId: "eleccycle",
    storageBucket: "eleccycle.firebasestorage.app",
    messagingSenderId: "260897654498",
    appId: "1:260897654498:web:4aa6025dc8cee5f3d240bb"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  
  // Initialize Firestore
  const db = getFirestore(app);
  
  export { auth, db };