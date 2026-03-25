import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBV8kB66flE0Xy3riz3ncmYAK2Ypk3ROg4",
  authDomain: "studysync-8716b.firebaseapp.com",
  projectId: "studysync-8716b",
  storageBucket: "studysync-8716b.firebasestorage.app",
  messagingSenderId: "81680610415",
  appId: "1:81680610415:web:462a3e3ca59f00f9ea499a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

console.log("Firebase Connected");