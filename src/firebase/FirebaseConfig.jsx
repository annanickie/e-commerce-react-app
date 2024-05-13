// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWDL5eOA-aZ2JFZy7E3xuTJqqY30R_ecU",
  authDomain: "myecom-84c4f.firebaseapp.com",
  projectId: "myecom-84c4f",
  storageBucket: "myecom-84c4f.appspot.com",
  messagingSenderId: "881277209969",
  appId: "1:881277209969:web:2d994e075145f18fd27ad0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }