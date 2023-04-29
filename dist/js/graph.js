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



  
// getDocs(collection(db, "2015")).then(docSnap => {
//   let Poverty2015Data = [];

//   docSnap.forEach((doc)=> {

//     const data = doc.data();
//     const teamname = data.Region;
//     const Municipality = data.Municipality;
//     const PovertyIncidence = parseFloat(data.PovertyIncidence);

//     Poverty2015Data.push({ x: Municipality, y: PovertyIncidence });
//     // newteam.push({ x: teamname, y: newscore });


//   });

 

Promise.all([
  getDocs(collection(db, "2015")),
  getDocs(collection(db, "2012city"))
]).then(([docSnap1, docSnap2]) => {
  let Poverty2015Data = [];
  let Poverty2012Data = [];

  docSnap1.forEach((doc) => {
    const data = doc.data();
    const Municipality = data.Municipality;
    const PovertyIncidence = parseFloat(data.PovertyIncidence);
    Poverty2015Data.push({ x: Municipality, y: PovertyIncidence });
  });

  docSnap2.forEach((doc) => {
    const data = doc.data();
    const Municipality = data.Municipality;
    const PovertyIncidence = parseFloat(data.PovertyIncidence);
    Poverty2012Data.push({ x: Municipality, y: PovertyIncidence });
  });

  // Create the chart using the retrieved data
  var chart = new JSC.Chart("chartDiv", {
    debug: true, // Set debug option to true to view full error messages

    type: "column",
    // legend: {
    //   template: '%icon %name'
    // },
    legend_visible: false,
    // legend: {
    //   label_text: 'Region', 
    //  template: '%icon %name',
    //   position: 'bottom',
    //   fill: '#f1f8ff',
    //   boxVisible: true,
    //   corners: 'round',
    //   radius: 5,
    //   margin_left: 30,
    //   margin_right: 10,

    //   outline: { color: 'grass', width: 3 },
    //   defaultEntry: {
    //     iconWidth: 25,
    //     padding: 4,
    //     style: {
    //       color: '#3A5254',
    //       fontSize: '7pt',
    //       fontStyle: 'italic',
    //       fontFamily: 'Arial',
    //       fontWeight: 'normal'
    //     },
    //     states: {
    //       hover_style: { color: '#FF5254' },
    //       hidden_style: { color: '#c2bec1' }
    //     }
    //   }
    // },
    defaultSeries: {
      palette: 'fiveColor36',
      pointSelection: 'multiple',
      firstPoint_legendEntry_lineAbove: true
    },
    toolbar_items_export_description: 'export menu',   //for export and printing the graph
    title_label_text: 'Municipal and City Poverty Incidence', 
    title_label_style: { 
      color: '#263238', 
      fontWeight: 'bold', 
      fontSize: '20px',
    },
  yAxis: { label_text: 'Poverty Incidence' }, 
  defaultPoint_label: {
    text: '%yValue',
    placement: 'inside',
    style: {
      color: 'Black',
      fontWeight: 'bold',
      fontSize: '11px'
    }
  },
  defaultPoint_label_autoHide:false, // Visible the value points of column
  xAxis: { 
    label_text: 'Municipal and City', 
    defaultTick: { label: { rotate: -30 } }

  },
    series: [{
      points: Poverty2012Data
    }
  ],
  toolbar_items: {
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
            chart.series([{
              points: Poverty2012Data
            }])
  
          }
        },
        "Year 2015": {
          events_click: function () {
            // Code to revert chart to original data
            chart.series([{
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

// var chart2 = new JSC.Chart('chartDivPie', {
//   debug: true,
//   type: 'pie donut',
//   legend_position: 'bottom',
//   defaultPoint_tooltip: '<b>%name</b><br/>Poverty Incidence <b>%value%',
//   toolbar_items_export_description: 'export menu',   //for export and printing the graph
//   title_label_text: 'Region Poverty Level Estimation', 
//   title_label_style: { 
//     color: '#263238', 
//     fontWeight: 'bold', 
//     fontSize: '20px',
//   },
//   defaultPoint_label: {
//     text: '{%percentOfSeries:n1}%',
//     placement: 'outside',
//     style: {
//       color: 'Black',
//       fontWeight: 'bold',
//       fontSize: '11px'
//     }
//   },
//   defaultSeries: {
//     palette: 'fiveColor36',
//     pointSelection: 'multiple',
//   },
//   series: [
//     {
//       // angle_orientation: 100,
//       points:Poverty2009Data
//     }
//   ], toolbar_items: {
//     "updateDropdown": {
//       type: "select",
//       position: "top",
//       height: "25px", // Set the height of the button to 30 pixels
//       width:"110px",
//       margin_top:"10px",
//       items: {
//         "Year 2009": {
//           events_click: function () {
//             // Code to update chart with new data
//             chart2.series([{
//               points: Poverty2009Data
//             }])
  
//           }
//         },
//         "Year 2015": {
//           events_click: function () {
//             // Code to revert chart to original data
//             chart2.series([{
//               points: Poverty2015Data
//             }])
  
//           }
//         }
//       },
//       style: {
//         color: '#3A5254',
//             fontSize: '13pt',
//             fontFamily: 'Arial',
//             fontWeight: 'bold',
//       }
//     }
//   } //toolbar items end
// });

});

// })  .catch(function(error) {
//   console.error("Error retrieving data from Firestore: ", error);
//   });

