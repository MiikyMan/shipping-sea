// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;