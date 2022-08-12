// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfTqoc2IyntvHJWDZaCJAyKGo46Yg_uF0",
  authDomain: "kay-clothing-db.firebaseapp.com",
  projectId: "kay-clothing-db",
  storageBucket: "kay-clothing-db.appspot.com",
  messagingSenderId: "82000459915",
  appId: "1:82000459915:web:b26ee872c4f76aa3e67c8e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = async () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocFromAuth = async (userAuth)=>{
  const userDocRef = doc(db, 'users', userAuth.uid)
  
  const userOverview = await getDoc(userDocRef)
  if(userOverview.exists()===false){
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try{
      await setDoc(userDocRef, {displayName, email, createdAt})
    }catch(error){
      console.log('error while trying to create user doc');
    }
  }

  return userDocRef
}

