//TODO THIS IS WHERE WE CONNECTS OUR FIREBASE TO OUT APPLICATION

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA-G4E-BdjBfNbBmyDdq7xCS32LDsUXYDw",
  authDomain: "whatsapp-clone-nextjs-27667.firebaseapp.com",
  projectId: "whatsapp-clone-nextjs-27667",
  storageBucket: "whatsapp-clone-nextjs-27667.appspot.com",
  messagingSenderId: "752202418793",
  appId: "1:752202418793:web:21caa032599d8f8c20f0f8",
};

//* IF THE FIREBASE APP IS ALREADY INITIALIZE THEN DON'T REINITIALIZE IT. USE THE ONE THAT IS ALREADY INITIALIZED.
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

//* HERE WE GOT ACCESS TO THE DATABASE, AUTHENTICATION, AND GOOGLEAUTHPROVIDER
const db = app.firestore();
// const db = getFirestore(app);
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
