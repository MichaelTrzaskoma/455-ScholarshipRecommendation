import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const config = {
  // api_key
  apiKey: "AIzaSyCkIma57Ux5jP4jX-cCtMc6jr3NWG1RDKc",

  // storage_bucket ID
  authDomain: "testing-845eb.appspot.com",
  
  // firebase_url
  databaseURL: "https://testing-845eb.firebaseio.com",
  
  // project_id
  projectId: "testing-845eb",
  
  // storage_bucket
  storageBucket: "testing-845eb.appspot.com",

  // project_number
  messagingSenderId: "865990037435",

  // mobilesdk_app_id
  appId: "1:865990037435:android:7e0708dce8b319789fbe9e",
};

firebase.initializeApp(config);
firebase.firestore();
// const usersCollection = firestore().collection('Users');

export default firebase;