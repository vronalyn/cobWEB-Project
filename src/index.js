// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVcBjemdXl_Voqmf-bacf4kf9989tD9-w",
  authDomain: "cobwebproject.firebaseapp.com",
  projectId: "cobwebproject",
  storageBucket: "cobwebproject.appspot.com",
  messagingSenderId: "120520164746",
  appId: "1:120520164746:web:5e8b969ba9c307f0c23473",
  measurementId: "G-9M1TYVJ98Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app)