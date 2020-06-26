import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyB7-GyImhej_rq4ylJGf3FlvHxHVzibt9k",
    authDomain: "musicfy-eed20.firebaseapp.com",
    databaseURL: "https://musicfy-eed20.firebaseio.com",
    projectId: "musicfy-eed20",
    storageBucket: "musicfy-eed20.appspot.com",
    messagingSenderId: "567005415206",
    appId: "1:567005415206:web:d08ec2cfe349fdae2de3e7"
  };

export default firebase.initializeApp(firebaseConfig);