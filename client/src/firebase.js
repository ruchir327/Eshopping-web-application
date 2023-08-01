import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

 
const firebaseConfig = {
  apiKey: "AIzaSyCZhcMdWT82hxz1ARGkEk-m-B7Hv2MStIY",
  authDomain: "fir-950fc.firebaseapp.com",
  projectId: "fir-950fc",
  storageBucket: "fir-950fc.appspot.com",
  messagingSenderId: "848614825630",
  appId: "1:848614825630:web:d186fbfaf8cb85694b258f"
};

firebase.initializeApp(firebaseConfig);
 
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 
export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();

