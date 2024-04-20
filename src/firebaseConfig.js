// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsEQb7vCshDM2EKQSyDaNuXPPY6X8uuQI",
  authDomain: "jumcloud-8368b.firebaseapp.com",
  projectId: "jumcloud-8368b",
  storageBucket: "jumcloud-8368b.appspot.com",
  messagingSenderId: "752738083943",
  appId: "1:752738083943:web:1d3f6d761d143276ece0c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)