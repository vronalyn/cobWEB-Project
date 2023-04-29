    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
    import { getFirestore, addDoc,collection} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

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
    


    const submitDatabtn = document.getElementById('submitData');
    submitDatabtn.addEventListener('click', (e) => {
        var RegionAdd = document.getElementById('RegionAdd').value.trim();
        var ProvinceAdd = document.getElementById('ProvinceAdd').value.trim();
        var MunicipalityAdd = document.getElementById('MunicipalityAdd').value.trim();
        var PovertyIncidenceAdd = document.getElementById('PovertyIncidenceAdd').value.trim();

        if (RegionAdd && MunicipalityAdd && PovertyIncidenceAdd) {
          addDoc(collection(db, "2015"), {
            Region: RegionAdd,
            Province: ProvinceAdd,
            Municipality: MunicipalityAdd,
            PovertyIncidence: PovertyIncidenceAdd
          }).then(() => {
            // Add a new activity log document
            const activityLogCollection = collection(db, "activity-logs");
            const Datecreated = new Date().toISOString();
            addDoc(activityLogCollection, {
              Datecreated: Datecreated,
              action: `${MunicipalityAdd} has been Add`,
              details: `${MunicipalityAdd} data has been added to the 2015 Municipal and City Poverty Dataset.`
            }).then(() => {
              alert("Data added successfully");
              location.reload();
            });
          }).catch((error) => {
            console.error("Error adding document: ", error);
          });
        } else {
          alert("Please fill in all the input fields");
        }
      });

     