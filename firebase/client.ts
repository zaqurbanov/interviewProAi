// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqn--PVtOaPqoOsBrfShtW6NR91UxPUt8",
  authDomain: "interviewapp-5eec4.firebaseapp.com",
  projectId: "interviewapp-5eec4",
  storageBucket: "interviewapp-5eec4.firebasestorage.app",
  messagingSenderId: "919567301418",
  appId: "1:919567301418:web:9296d9e4fcd8631d19bc53",
  measurementId: "G-Q98R9X8B36"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp();
export const auth  = getAuth(app)
export const db = getFirestore(app)