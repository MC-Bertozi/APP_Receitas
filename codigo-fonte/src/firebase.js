import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQn8GEUzQRFVpJ0C_vKHwTpZF-_SJw7HQ",
  authDomain: "souschef-30ac1.firebaseapp.com",
  projectId: "souschef-30ac1",
  storageBucket: "souschef-30ac1.firebasestorage.app",
  messagingSenderId: "784908941631",
  appId: "1:784908941631:web:a767a2ac9897c000c6bb8a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
