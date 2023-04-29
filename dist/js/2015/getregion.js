   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
   import { getFirestore, getDocs, collection,onSnapshot, doc, deleteDoc,updateDoc,limit, addDoc } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

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

db2.collection("2015-region")
.orderBy("Region")
 .onSnapshot(
   (querySnapshot) => {
 let counter = 1; // initialize counter variable
//  let updateCount = 0; // initialize update counter 
 const table =  $('#2015Datatables').DataTable();
 table.clear(); // clear existing data in the table

querySnapshot.forEach((doc) => {
  const data = doc.data();
  const editButton = `<button type="button" class="btn btn-primary edit" data-id="${doc.id}" data-region="${data.Region}" data-poverty-incidence="${data.PovertyIncidence}" data-toggle="modal" data-target="#edit-modal">Edit </button>  `
  const deleteButton = `    <button type="button" class="btn btn-danger delete" data-id="${doc.id}" data-toggle="modal" data-target="#delete-modal">Delete</button>`

    // Add event listener for edit button
    $(document).on('click', '.edit', function() {
      if ($(this).data('id') === `${doc.id}`) {
        console.log(`Editing document with ID: ${doc.id}`); // add this line

        const docId = $(this).data('id');
        const Region = $(this).data('region');
        console.log(`Editing document with team value: ${Region}`); // add this line
        const PovertyIncidence = $(this).data('poverty-incidence');

           // Pass data to edit form and display it
          $('#RegionEdit').val(Region);
          $('#PovertyIncidenceEdit').val(PovertyIncidence);

          $('#edit-modal').modal('show');
          $('#update-button').data('id', docId);
      }
     });

    // Add event listener for update button
    $(document).off('click', '#update-button').on('click', '#update-button', function () {
        const docId = $(this).data('id');
        const Region = $('#RegionEdit').val();
        const Province = $('#ProvinceEdit').val();
        const Municipality = $('#MunicipalityEdit').val();
        const PovertyIncidence = $('#PovertyIncidenceEdit').val();
        const newData = {
          'Region': Region,
          'PovertyIncidence': PovertyIncidence,
        };          
          

             db2.collection("2015-region").doc(docId).update(newData).then(() => {
           
                      // Add a new activity log document
            const activityLogCollection = collection(db, "activity-logs");
            const Datecreated = new Date().toISOString();
            addDoc(activityLogCollection, {
              Datecreated: Datecreated,
              action: `${Region} has been Updated`,
              details: `${Region} data from 2015 Rgion Poverty Dataset has been Updated.`
            }).then(() => {
               console.log("update success");
              //  $('#edit-modal').modal('hide');

               alert('update success');
              //  $(this).off('click'); // Remove event listener after update is completed
               location.reload();
              });


             })
             .catch((error) => {
               console.error("Error updating record: ", error);
               console.log("Error message: ", error.message);
               updateError(error.message);
             });
        
      
     });

      // Add event listener for delete button

      $(document).on('click', '.delete', function() {
        if ($(this).data('id') === `${doc.id}`) {
          const docId = $(this).data('id');
          console.log('Deleting docId:', docId); // Check if Document ID matches with docID
          $('#delete-modal').modal('show');
          $('#deleteData').data('id', docId);

          }
        });

      $(document).off('click', '#deleteData').on('click', '#deleteData', function () {
        const docId = $(this).data('id');     
        console.log('Delete docId:', docId); // Check if Document ID matches with docID

             db2.collection("2015-region").doc(docId).delete().then(() => {
           
               console.log("update success");
               $('#delete-modal').modal('hide');
               alert('Delete success');

              //  $(this).off('click'); // Remove event listener after update is completed
               location.reload();

             })
             .catch((error) => {
               console.error("Error updating record: ", error);
               console.log("Error message: ", error.message);
               updateError(error.message);
             });
        
      
     });

    //dismiss the modal for edit and delete modal

     $(document).on('click', '.btn-close',  function() {
      // location.reload(); // Reload the page
      $('#edit-modal').modal('hide'); // Hide the modal
      $('#delete-modal').modal('hide'); // Hide the modal

    });

    $(document).on('click', '.close',  function() {
      // location.reload(); // Reload the page
      $('#edit-modal').modal('hide'); // Hide the modal
      $('#delete-modal').modal('hide'); // Hide the modal

    });

       // Displays the Data to the Tables
      table.row.add([
        counter++,
        data.Region,
        data.PovertyIncidence,
        `${editButton} ${deleteButton}`
      ]);
      table.draw(); // refresh the table with new data


    });
    
  // (error) => {
  //   console.log(`Error getting documents: ${error}`);
   });
