import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAfu27YdZG6BI4q7z5PO8NQri8R_ANNt64",
        authDomain: "whatsapp-mern-3217d.firebaseapp.com",
        databaseURL: "https://whatsapp-mern-3217d.firebaseio.com",
        projectId: "whatsapp-mern-3217d",
        storageBucket: "whatsapp-mern-3217d.appspot.com",
        messagingSenderId: "149144346076",
        appId: "1:149144346076:web:6bde1f73a2f4d09d770319",
        measurementId: "G-PGXDK8MCKP"
  }
);

//const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
//const storage = firebaseApp.storage();

export {auth};

  //export default db;