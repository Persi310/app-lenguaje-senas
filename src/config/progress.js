import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const markLessonAsViewed = async (userId, lessonId) => {
  const ref = doc(db, 'user_progress', userId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    // Crear el documento si no existe
    await setDoc(ref, {
      viewedLessons: [lessonId],
    });
  } else {
    // Actualizar el arreglo si ya existe
    await updateDoc(ref, {
      viewedLessons: arrayUnion(lessonId),
    });
  }
};

export const getViewedLessons = async (userId) => {
  const ref = doc(db, 'user_progress', userId);
  const snapshot = await getDoc(ref);

  if (snapshot.exists()) {
    return snapshot.data().viewedLessons || [];
  }

  return [];
};
