import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const config = {
  // api_key
  apiKey: "AIzaSyCcrbyCtvZvbuWw9h5hEWIpn3Yw4hbzxME",

  // storage_bucket ID
  authDomain: "csci-426-scholarship-recommend.appspot.com",
  
  // firebase_url
  databaseURL: "https://csci-426-scholarship-recommend.firebaseio.com",
  
  // project_id
  projectId: "csci-426-scholarship-recommend",
  
  // storage_bucket
  storageBucket: "csci-426-scholarship-recommend.appspot.com",

  // project_number
  messagingSenderId: "299473549423",

  // mobilesdk_app_id
  appId: "1:299473549423:web:fe945d28385c30e63c359a",
};

firebase.initializeApp(config);
firebase.firestore();
// const usersCollection = firestore().collection('Users');

export default firebase;