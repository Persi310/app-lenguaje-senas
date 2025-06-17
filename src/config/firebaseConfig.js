// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDFuMIPsCyGF8R6wsJ1HO0mF486zYX2oV4",
  authDomain: "lenguajedeseniasapp.firebaseapp.com",
  projectId: "lenguajedeseniasapp",
  storageBucket: "lenguajedeseniasapp.appspot.com",
  messagingSenderId: "1031326158682",
  appId: "1:1031326158682:web:cbcb0639cd4b2736a36d63",
  measurementId: "G-0XX7LMLXFT"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
