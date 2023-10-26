// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjQG-GwJpBW02zXsoBV2ShgIToFVnHi4Y",
  authDomain: "tweet-clone-a083d.firebaseapp.com",
  projectId: "tweet-clone-a083d",
  storageBucket: "tweet-clone-a083d.appspot.com",
  messagingSenderId: "1002080403279",
  appId: "1:1002080403279:web:92c91b9bd1811c3b084f3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);