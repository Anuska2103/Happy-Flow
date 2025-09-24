import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// IMPORTANT: Replace with your Firebase project's configuration
const firebaseConfig = {
  apiKey: "AIzaSyChBFS1WUBSwcCKkjuKeZ4mKbA9VbIYmYM",
  authDomain: "first-project-e8c14.firebaseapp.com",
  projectId: "first-project-e8c14",
  storageBucket: "first-project-e8c14.firebasestorage.app",
  messagingSenderId: "807011360991",
  appId: "1:807011360991:web:8f525c1f1bcd05689c496a" 
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Get Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };