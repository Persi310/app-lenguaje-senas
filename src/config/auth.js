// src/config/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // ✅ Esta ruta debe ser correcta

export async function signUp(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export async function logIn(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}
