import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseCon";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

function MyApp({ Component, pageProps }) {
  //* THIS HERE IS TO CHECK WHETHER THERE IS ANY USER OR NOT FROM FIREBASE IF THERE IS THEN WE GET THE USER IF NOT THEN WE GET A FALSY VALUE
  //? WHEN USER LOGGED IN USING FIREBASE THEN THIS GIVES USER INFO
  const [user, loading] = useAuthState(auth);

  //todo this is where we store the users information in to firebase db as users collection for use the information to show the image, name on out app
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          //here we take the firebase timezone time and we will convert into IND time
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  //? USEAUTHSTATE TAKES A SMALL BIT OF TIME TO GET THE USER INFORMATION IF WE DON'T SHOW LOADING THEN IT SHOWS ONLY LOGIN PAGE IN THAT TIME SO THIS CONDITION HELPS TO SHOWS LOADING COMPONENT IN THAT TIME EXCEPT LOGIN PAGE
  if (loading) return <Loading />;

  //* IF THE USER IS NOT HERE THEN IT REDIRECT TO LOGIN PAGE
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
