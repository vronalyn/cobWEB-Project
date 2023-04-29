import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, addDoc } 
from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

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
const db = getFirestore(app);

const form = document.querySelector('form');
const submitButton = document.querySelector('#contact-btn');

submitButton.addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent form from submitting

  const formData = new FormData(form);
  const firstName = formData.get('fname');
  const lastName = formData.get('lname');
  const email = formData.get('email');
  const subject = formData.get('Subject');
  const message = formData.get('message');

  try {
    const docRef = await addDoc(collection(db, "contacts"), {
      firstName,
      lastName,
      email,
      subject,
      message
    });
    alert("Thank you for Contacting us!");
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});
