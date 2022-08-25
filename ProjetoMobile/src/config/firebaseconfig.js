import firebase from "firebase"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBhZC-2rKRMQxPXC0WjbPIXirnElpV7Hgw",
    authDomain: "authentication-ae0e7.firebaseapp.com",
    projectId: "authentication-ae0e7",
    storageBucket: "authentication-ae0e7.appspot.com",
    messagingSenderId: "181174441095",
    appId: "1:181174441095:web:972677570846d01d2d1422"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase