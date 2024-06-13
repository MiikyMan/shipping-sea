import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCslSmQRRPrQfkUblida3XAD4YvIoR51Bg",
  authDomain: "shipping-sea-c57ec.firebaseapp.com",
  projectId: "shipping-sea-c57ec",
  storageBucket: "shipping-sea-c57ec.appspot.com",
  messagingSenderId: "951774315030",
  appId: "1:951774315030:web:50a6f5321fc0e53ffe6b37",
  measurementId: "G-1GB93EPL8X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // if you need Firestore
export const storage = getStorage(app);

export default app;
