// src/config/practiceProgress.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const savePracticeAnswer = async (userId, questionId, isCorrect) => {
  try {
    await addDoc(collection(db, 'practiceProgress'), {
      userId,
      questionId,
      isCorrect,
      answeredAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error guardando la respuesta:', error);
  }
};
