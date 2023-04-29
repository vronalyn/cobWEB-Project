    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
    import { getFirestore, getDocs, collection} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

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
const db = getFirestore(app);



Promise.all([
  getDocs(collection(db, "2012region")),
  getDocs(collection(db, "2015-region")),
]).then(([docSnap1, docSnap2]) => {
  let Poverty2012Data = [];
  let Poverty2015Data = [];

  docSnap1.forEach((doc) => {
    const data = doc.data();
    const Region = data.Region;
    const PovertyIncidence = parseFloat(data.PovertyIncidence);
    Poverty2012Data.push({ x: Region, y: PovertyIncidence });
  });

  docSnap2.forEach((doc) => {
    const data = doc.data();
    const Region = data.Region;
    const PovertyIncidence = parseFloat(data.PovertyIncidence);
    Poverty2015Data.push({ x: Region, y: PovertyIncidence });
  });


var chart2 = new JSC.Chart('chartDivPie', {
  debug: true,
  type: 'pie donut',
legend: {
     template: '%icon %name',
      position: 'bottom',
    margin_top: 10,
      outline: { color: 'grass', width: 3 },
      defaultEntry: {
        iconWidth: 10,
        padding: 2,
        style: {
          color: '#3A5254',
          fontSize: '7pt',
          fontStyle: 'italic',
          fontFamily: 'Arial',
          fontWeight: 'normal'
        },
        states: {
          hover_style: { color: '#FF5254' },
          hidden_style: { color: '#c2bec1' }
        }
      }
    },
  defaultPoint_tooltip: '<b>%name</b><br/>Poverty Incidence <b>%value%',
  toolbar_items_export_description: 'export menu',   //for export and printing the graph
  title_label_text: 'Region Poverty Level Estimation', 
  title_label_style: { 
    color: '#263238', 
    fontWeight: 'bold', 
    fontSize: '20px',
  },
  defaultPoint_label: {
    text: '{%percentOfSeries:n1}%',
    placement: 'inside',
    style: {
      color: 'grass',
      fontWeight: 'bold',
      fontSize: '15px'
    }
  },
  defaultSeries: {
    palette: 'waterMeadow',
    pointSelection: 'multiple',
    shape_size: '90%',
    firstPoint_legendEntry_lineAbove: true
  },
  series: [
    {
    //   angle_orientation: 100,
      points:Poverty2012Data
    }
  ], toolbar_items: {
    "updateDropdown": {
      type: "select",
      position: "top",
      height: "25px", // Set the height of the button to 30 pixels
      width:"110px",
      margin_top:"10px",
      items: {
        "Year 2012": {
          events_click: function () {
            // Code to update chart with new data
            chart2.series([{
              points: Poverty2012Data
            }])
  
          }
        },
        "Year 2015": {
          events_click: function () {
            // Code to revert chart to original data
            chart2.series([{
              points: Poverty2015Data
            }])
  
          }
        }
      },
      style: {
        color: '#3A5254',
            fontSize: '13pt',
            fontFamily: 'Arial',
            fontWeight: 'bold',
      }
    }
  } //toolbar items end
});

});

