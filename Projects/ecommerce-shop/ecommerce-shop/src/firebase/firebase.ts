import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDt_1CkGisdbGHb3GBexY_MNPcljT9TmBE",
  authDomain: "ecommerce-fashion-shop-90b32.firebaseapp.com",
  projectId: "ecommerce-fashion-shop-90b32",
  storageBucket: "ecommerce-fashion-shop-90b32.appspot.com",
  messagingSenderId: "898979090595",
  appId: "1:898979090595:web:2f80c49e60dd0e36b62f16",
  measurementId: "G-GJMT8C9CBX",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export { app };
