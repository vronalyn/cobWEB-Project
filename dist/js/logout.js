import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCVcBjemdXl_Voqmf-bacf4kf9989tD9-w",
    authDomain: "cobwebproject.firebaseapp.com",
    projectId: "cobwebproject",
    storageBucket: "cobwebproject.appspot.com",
    messagingSenderId: "120520164746",
    appId: "1:120520164746:web:5e8b969ba9c307f0c23473",
    measurementId: "G-9M1TYVJ98Z"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// Get the authentication state of the user
onAuthStateChanged(auth,(user) => {
    if (user) {
      // User is logged in, update button to show sign out
      const authBtn = document.getElementById('sign-in');
      authBtn.textContent = 'Sign out';
      authBtn.onclick = () => auth.signOut();
    } else {
      // User is not logged in, update button to show sign in
      const authBtn = document.getElementById('sign-in');
      authBtn.textContent = 'Sign in';
      authBtn.onclick = () => location.href='form.html';
    }
  });
  
   //----- Logout code start	  
 document.getElementById("sign-in").addEventListener("click", function() {
    signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Sign-out successful.');
    alert('Sign-out successful.');
    window.location.href = "./index.html";
    }).catch((error) => {
    // An error happened.
    console.log('An error happened.');
    });		  		  
  });