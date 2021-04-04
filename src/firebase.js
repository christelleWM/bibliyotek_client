import firebase from 'firebase'


//web app Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB6cdT99dL9jmhFXK2CI8GGU5Nz0h-cFHg",
    authDomain: "livreapp-16628.firebaseapp.com",
    projectId: "livreapp-16628",
    storageBucket: "livreapp-16628.appspot.com",
    messagingSenderId: "464989384463",
    appId: "1:464989384463:web:1f643239eaa466cab5587a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider() 