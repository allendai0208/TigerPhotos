import firebase from 'firebase/app';
import 'firebase/storage'; 
import 'firebase/firestore';


 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyA5c-9N-OiN5XmEgLl3GcDSblSbuzwA6YY",
    authDomain: "t-photos.firebaseapp.com",
    databaseURL: "https://t-photos.firebaseio.com",
    projectId: "t-photos",
    storageBucket: "t-photos.appspot.com",
    messagingSenderId: "916821464115",
    appId: "1:916821464115:web:c96bb1085a97fa85787f46"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  var fstore = firebase.firestore();
  
  
  export {
      storage, fstore, firebase as default
  }