import { db } from '../config/firebaseConfig';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

export const savePracticeResult = async (userId, lessonId, score, totalQuestions) => {
  try {
    await addDoc(collection(db, 'practice_results'), {
      userId,
      lessonId,
      score,
      totalQuestions,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error al guardar resultado de práctica:', error);
  }
};

export const getPracticeResults = async (userId) => {
  const q = query(
    collection(db, 'practice_results'),
    where('userId', '==', userId)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
