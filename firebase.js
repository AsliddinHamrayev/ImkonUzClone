const firebaseConfig = {
  apiKey: "AIzaSyDQSImi3ij02PBuKunF6TERMbPUFu0eVoc",
  authDomain: "login-page-8b0f8.firebaseapp.com",
  projectId: "login-page-8b0f8",
  storageBucket: "login-page-8b0f8.appspot.com",
  messagingSenderId: "946999779267",
  appId: "1:946999779267:web:bbe40646056093ccfe2776",
  measurementId: "G-HQSH0DMZ5H"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()    
