import firebase from "firebase/compat";


const firebaseConfig = {
  apiKey: "AIzaSyAghmcGT8Vx9NJYaJJrQZv9KGGQJoSrj3M",
  authDomain: "messanger-d22bd.firebaseapp.com",
  projectId: "messanger-d22bd",
  storageBucket: "messanger-d22bd.appspot.com",
  messagingSenderId: "924028479563",
  appId: "1:924028479563:web:d969696cf156cdb9e305ce",
  measurementId: "G-LL04W52QS6"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;