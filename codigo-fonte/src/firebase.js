import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQn8GEUzQRFVpJ0C_vKHwTpZF-_SJw7HQ",
  authDomain: "souschef-30ac1.firebaseapp.com",
  projectId: "souschef-30ac1",
  storageBucket: "souschef-30ac1.firebasestorage.app",
  messagingSenderId: "784908941631",
  appId: "1:784908941631:web:a767a2ac9897c000c6bb8a"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
