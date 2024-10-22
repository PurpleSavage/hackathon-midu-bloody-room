// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey:process.env.NEXT_APIKEY_FIREBASE,
  authDomain:process.env.NEXT_AUTH_DOMAIN,
  projectId:process.env.NEXT_PROJECT_ID,
  storageBucket:process.env.NEXT_STORAGE_BUCKET,
  messagingSenderId:process.env.NEXT_MESSASGING_SENDER_ID,
  measurementId:process.env.NEXT_MESSURE_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, db, auth};
