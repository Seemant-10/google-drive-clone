// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRqd9wGPss_Y0K0Y4d8eBonHb9lqXNQEc",
  authDomain: "drive-clone-a170a.firebaseapp.com",
  projectId: "drive-clone-a170a",
  storageBucket: "drive-clone-a170a.appspot.com",
  messagingSenderId: "808903628043",
  appId: "1:808903628043:web:f883b54989cebc41bafe0e",
  measurementId: "G-PW0Q1LP7QJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
