import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { getAuth, onAuthStateChanged} from 'firebase/auth';

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
const analytics = getAnalytics(app);
const auth = getAuth(app);
console.log(app)


const storage = getStorage();
//connectStorageEmulator(storage, 'localhost', 9199);

const storageTxt = ref(storage, "storage.txt");
/** 
const notesFolder = ref(storage, "notes");
const newTxtInSubFolder = ref(storage, "newText.txt");
const shortcutWay = ref(storage, "another-notes/newNewText.txt");
const anotherText = ref(notesFolder, "anotherText.txt");

const upload = document.querySelector('.upload')
upload.addEventListener('click', () => {
  const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 
    0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);

  uploadBytes(storageTxt, bytes).then((snapshot) => {
    console.log('Uploaded an array!'); 
  });
  
const newTextfile = new File(["Hello", " ", "World"], "newTextfile.txt")

  uploadBytes(newTxtInSubFolder, newTextfile).then((snapshot) =>{
    console.log("Upload file from a buffer")
  })  
  const message = "Hello World!"
  uploadString(shortcutWay, message).then((snapshot) =>{
    console.log('Upload from string')
  })
  uploadString(anotherText, message).then((snapshot) =>{
    console.log('Upload from string again')
  })
    
})


const downloadBtn = document.querySelector('.dl')
downloadBtn.addEventListener('click', () => {
  getDownloadURL(storageTxt).then((url) => {
    console.log(`Download file at: ${url}`)
  })

})


const downloadBtn = document.querySelector('.dl')
downloadBtn.addEventListener('click', () => {
  getDownloadURL(storageTxt).then((url) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = storageTxt.name; // set the download filename
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    console.log(`Download file at: ${url}`);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'storage/unauthorized') {
      // Show popup and prevent default action
      togglePopup();
    } else {
      console.log(errorMessage);
    }
  });
});*/


const downloadBtn = document.querySelector('.dl')
downloadBtn.addEventListener('click', () => {
  getDownloadURL(storageTxt).then((url) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = storageTxt.name; // set the download filename
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        console.log(`Download file at: ${url}`);
      } else {
        // Show popup and prevent default action
        togglePopup();
      }
    });
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'storage/unauthorized') {
      // Show popup and prevent default action
      togglePopup();
    } else {
      console.log(errorMessage);
    }
  });
});

function togglePopup(){
  document.getElementById("popup-1").classList.toggle("active");
}



