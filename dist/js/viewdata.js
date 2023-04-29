   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
   import { getFirestore, getDocs, collection, onSnapshot, doc, deleteDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

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
 // Initialize Cloud Firestore and get a reference to the service
 const db = getFirestore(app);
 firebase.initializeApp(firebaseConfig);
 const db2 = firebase.firestore();  // Function for Database Firestore 

//  const querySnapshot = await getDocs(collection(db, "NewTeams"));

db2.collection("2015")
 .onSnapshot(
   (querySnapshot) => {
 let counter = 1; // initialize counter variable
//  let updateCount = 0; // initialize update counter 
 const table =  $('#2015Datatables').DataTable();
 table.clear(); // clear existing data in the table

querySnapshot.forEach((doc) => {
  const data = doc.data();

       // Displays the Data to the Tables
      table.row.add([
        counter++,
        data.Region,
        data.Municipality,
        data.PovertyIncidence,
      ]);
      table.draw(); // refresh the table with new data


    });
    
  // },
  // (error) => {
  //   console.log(`Error getting documents: ${error}`);
   });


  

   const activitylog = document.getElementById('history-box');


   // / Check if there are any blogs in the Firestore database
db2.collection("activity-logs")
// .where("Datecreated", ">=", timestampss)
.orderBy("Datecreated")
 .onSnapshot(
   (querySnapshot) => {
// getDocs(collection(db, "activity-logs").orderBy("Datecreated")).then(docSnap => {
    // Display the logs
    let activitylogs = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const action = data.action;
      const details = data.details;
      const Datecreated = data.Datecreated;
      activitylogs.push({ ...data, id: doc.id });
      console.log("New Activity Log:", Datecreated);
      activitylog.innerHTML += `
      <section class="log"><br>
        <div class="boxes">
          <p>${details}</p>
          <span>${new Date(Datecreated).toLocaleString(undefined, 
            { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
        </div>
      
      </section>
      `;
    });
});