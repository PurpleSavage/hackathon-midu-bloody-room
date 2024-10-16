// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAkHQwdj6LyZPiy16l2Ky0RfBI8_7gMt6M",
  authDomain: "midu-hackathon.firebaseapp.com",
  projectId: "midu-hackathon",
  storageBucket: "midu-hackathon.appspot.com",
  messagingSenderId: "44709843145",
  appId: "1:44709843145:web:d9843178e3d881ef023d18",
  measurementId: "G-CE4Q1GQ7N6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app, db, auth};
