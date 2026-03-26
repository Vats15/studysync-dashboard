import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";


/* FIREBASE CONFIG */

const firebaseConfig = {
  apiKey: "AIzaSyBV8kB66flE0Xy3riz3ncmYAK2Ypk3ROg4",
  authDomain: "studysync-8716b.firebaseapp.com",
  projectId: "studysync-8716b",
  storageBucket: "studysync-8716b.appspot.com",
  messagingSenderId: "81680610415",
  appId: "1:81680610415:web:462a3e3ca59f00f9ea499a"
};


/* INITIALIZE APP */

const app = initializeApp(firebaseConfig);


/* EXPORT SERVICES */

export const db = getFirestore(app);

export const auth = getAuth(app);


/* DEBUG MESSAGE */

console.log("Firebase Connected Successfully");