import firebase from 'firebase/app';
import "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBIjJSvbsB3qRHxRXbwoi-u_t1Vp5aisa8",
  authDomain: "rental-apartment-finder-7e3da.firebaseapp.com",
  projectId: "rental-apartment-finder-7e3da",
  storageBucket: "rental-apartment-finder-7e3da.appspot.com",
  messagingSenderId: "794100277407",
  appId: "1:794100277407:web:9786e30d91751f7e5002aa",
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
export { db };
