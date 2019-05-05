import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDa6CImXGO4xM2f_djYalyKhGl1cyG3PRE',
  authDomain: 'muvy-tv.firebaseapp.com',
  databaseURL: 'https://muvy-tv.firebaseio.com',
  projectId: 'muvy-tv',
  storageBucket: 'muvy-tv.appspot.com',
  messagingSenderId: '102398761262',
  appId: '1:102398761262:web:ff00afa8b0aaea39',
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore().enablePersistence();
