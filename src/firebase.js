// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCRgStykzJ6depiL4S5YZDeFk4Jf1plnc",
  authDomain: "social-media-clone-e4f34.firebaseapp.com",
  projectId: "social-media-clone-e4f34",
  storageBucket: "social-media-clone-e4f34.appspot.com",
  messagingSenderId: "1000802667877",
  appId: "1:1000802667877:web:f22fe2051d3efd7015e58c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
