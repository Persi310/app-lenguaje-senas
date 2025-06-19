import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth, db } from '../config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { getViewedLessons } from '../config/progress';
import { getPracticeResults } from '../config/savePracticeResult';

export default function ProgressScreen() {
  const [totalLessons, setTotalLessons] = useState(0);
  const [viewedLessons, setViewedLessons] = useState(0);
  const [practicesDone, setPracticesDone] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) return;

      const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
      setTotalLessons(lessonsSnapshot.size);

      const viewed = await getViewedLessons(auth.currentUser.uid);
      setViewedLessons(viewed.length);

      const practices = await getPracticeResults(auth.currentUser.uid);
      setPracticesDone(practices.length);
    };

    fetchData();
  }, []);

  const progressPercent =
    totalLessons > 0 ? Math.round((viewedLessons / totalLessons) * 100) : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tu progreso</Text>

      <View style={styles.card}>
        <Ionicons name="book" size={30} color="#2196f3" />
        <Text style={styles.cardTitle}>Lecciones vistas</Text>
        <Text style={styles.cardValue}>{viewedLessons} / {totalLessons}</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="create" size={30} color="#4caf50" />
        <Text style={styles.cardTitle}>Prácticas realizadas</Text>
        <Text style={styles.cardValue}>{practicesDone}</Text>
      </View>

      <View style={styles.card}>
        <Ionicons name="trophy" size={30} color="#ff9800" />
        <Text style={styles.cardTitle}>Progreso total</Text>
        <Text style={styles.cardValue}>{progressPercent}%</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: { marginTop: 10, fontSize: 18, color: '#333' },
  cardValue: { fontSize: 20, fontWeight: 'bold', marginTop: 4 },
});
