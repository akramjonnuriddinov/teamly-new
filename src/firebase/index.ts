// import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyDlfZbiukwJSXE-v02BZRATzIK_yrTBr6E",
//   authDomain: "teamly-new.firebaseapp.com",
//   projectId: "teamly-new",
//   storageBucket: "teamly-new.appspot.com",
//   messagingSenderId: "48403964383",
//   appId: "1:48403964383:web:ae3d0e15e8e33145daa46a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig)
// console.log(app, 'firebase')


// *****************vue-eats-web*******************
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp)