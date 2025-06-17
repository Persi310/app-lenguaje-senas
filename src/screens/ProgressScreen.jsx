import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';
import { getViewedLessons } from '../config/progress';

export default function ProgressScreen() {
  const [totalLessons, setTotalLessons] = useState(0);
  const [viewedLessonsCount, setViewedLessonsCount] = useState(0);

  useEffect(() => {
    const fetchProgress = async () => {
      const snapshot = await getDocs(collection(db, 'lessons'));
      setTotalLessons(snapshot.size);

      if (auth.currentUser) {
        const viewed = await getViewedLessons(auth.currentUser.uid);
        setViewedLessonsCount(viewed.length);
      }
    };

    fetchProgress();
  }, []);

  const percentage = totalLessons > 0
    ? Math.round((viewedLessonsCount / totalLessons) * 100)
    : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Progreso</Text>
      <Text style={styles.text}>
        Has completado {viewedLessonsCount} de {totalLessons} lecciones
      </Text>
      <Text style={styles.percentage}>{percentage}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  text: { fontSize: 16, marginBottom: 12 },
  percentage: { fontSize: 40, fontWeight: 'bold', color: '#4CAF50' },
});
