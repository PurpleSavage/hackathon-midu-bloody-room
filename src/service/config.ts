// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey:process.env.APIKEY_FIREBASE,
  authDomain:process.env.AUTH_DOMAIN,
  projectId:process.env.PROJECT_ID,
  storageBucket:process.env.STORAGE_BUCKET,
  messagingSenderId:process.env.MESSASGING_SENDER_ID,
  measurementId:process.env.MESSURE_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, db, auth};
