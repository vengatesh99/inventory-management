// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// import {firebase} from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB59Ns7jMkirpqVEXLrcDkO-iUVf6xENXY",
  authDomain: "inventory-management-ef872.firebaseapp.com",
  projectId: "inventory-management-ef872",
  storageBucket: "inventory-management-ef872.appspot.com",
  messagingSenderId: "563994939298",
  appId: "1:563994939298:web:a61661b38cd4d27230ecfb",
  measurementId: "G-Y1EXFK72LX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firestore = getFirestore(app)

export {firestore}