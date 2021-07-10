// import * as firebase from 'firebase';
import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/analytics';

let config = {
  apiKey: 'AIzaSyAc6E2THO9RSofbD9f9HeHFaY9fkgIgQ-w',
  authDomain: 'laundry-status-d34ba.firebaseapp.com',
  projectId: 'laundry-status-d34ba',
  storageBucket: 'laundry-status-d34ba.appspot.com',
  messagingSenderId: '1084297284192',
  appId: '1:1084297284192:web:114702775729684f939105',
  measurementId: 'G-4BDHYPWSYR'
};

firebase.initializeApp(config);
firebase.analytics();

export default firebase.database();
