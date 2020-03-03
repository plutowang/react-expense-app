import * as firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMmxNP7DTUT0E6Rtnc9maEOvkfuDCPXE8",
  authDomain: "react-expense-app-demo.firebaseapp.com",
  databaseURL: "https://react-expense-app-demo.firebaseio.com",
  projectId: "react-expense-app-demo",
  storageBucket: "react-expense-app-demo.appspot.com",
  messagingSenderId: "838981282055",
  appId: "1:838981282055:web:3429763ef22cf3df8ffda2",
  measurementId: "G-714DS1DKEM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };
