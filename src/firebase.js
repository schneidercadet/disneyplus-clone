import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiYa75I5PxPJgGDeo_Z19r5WkhXjs0e-4",
  authDomain: "disneyplus-clone-2059a.firebaseapp.com",
  projectId: "disneyplus-clone-2059a",
  storageBucket: "disneyplus-clone-2059a.appspot.com",
  messagingSenderId: "481010968069",
  appId: "1:481010968069:web:b78b3fa67494cfe7a8de6c",
  measurementId: "G-LNNRPGP6XY",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
