import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwOtb7SFh2XHDg0s8hYCUQp1qNHENcsGg",
  authDomain: "vexius-56e53.firebaseapp.com",
  projectId: "vexius-56e53",
  storageBucket: "vexius-56e53.appspot.com",
  messagingSenderId: "221517160649",
  appId: "1:221517160649:web:b2d46cc50d3d9cb5f46d18",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
