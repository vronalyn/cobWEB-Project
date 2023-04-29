import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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

  //----- Logout code start	  
  document.getElementById("logout").addEventListener("click", function() {
    signOut(auth).then(() => {
          // Sign-out successful.
          console.log('Sign-out successful.');
          alert('Sign-out successful.');
          window.location = "./index.html";

          // document.getElementById('logout').style.display = 'none';
        }).catch((error) => {
          // An error happened.
          console.log('An error happened.');
        });		  		  
  });
  //----- End