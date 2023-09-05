import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA7Vu9Kbm98T4Kz18pgiubp8RzIp33WRLE",
  authDomain: "ecommerce-4thapr.firebaseapp.com",
  projectId: "ecommerce-4thapr",
  storageBucket: "ecommerce-4thapr.appspot.com",
  messagingSenderId: "157819680299",
  appId: "1:157819680299:web:8f42c010cb46dcbf261c6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
export default app