import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  //   // COPY this from your Firebase Console
  //   apiKey: "your-api-key-goes-here",
  //   authDomain: "your-project-name-here.firebaseapp.com",
  //   databaseURL: "https://your-project-name-here.firebaseio.com",
  //   projectId: "your-project-name-here",
  //   storageBucket: "your-project-name.appspot.com",
  //   messagingSenderId: "xxxxxxxx",
  apiKey: "AIzaSyBlafRrv2Wdh5MarcAZGGsgELVB-OSyhf4",
  authDomain: "hw3-cis371.firebaseapp.com",
  projectId: "hw3-cis371",
  storageBucket: "hw3-cis371.firebasestorage.app",
  messagingSenderId: "578499173072",
  appId: "1:578499173072:web:df4c15c72ea6e3758c1cd5",
  measurementId: "G-G16ZW007FS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
