import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD59Je9mk6o8bRX09Bk_IxejBlgpODOPdg",
  authDomain: "dawnclassified-fbb87.firebaseapp.com",
  projectId: "dawnclassified-fbb87",
  storageBucket: "dawnclassified-fbb87.appspot.com",
  messagingSenderId: "993961833786",
  appId: "1:993961833786:web:7e3737e002ee0051fd0c03",
  measurementId: "G-8QVLDJV5C0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  auth,
  db,
  doc,
  setDoc,
  getDoc,
};
