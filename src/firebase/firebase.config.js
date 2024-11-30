// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALSijglWuhjbzVzuUE0eG4MJy7CvUxchI",
  authDomain: "zanbahon-client.firebaseapp.com",
  projectId: "zanbahon-client",
  storageBucket: "zanbahon-client.firebasestorage.app",
  messagingSenderId: "837777862651",
  appId: "1:837777862651:web:cba757e6cf2ed053d7a55e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export default app;
