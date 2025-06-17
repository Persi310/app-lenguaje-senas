import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';
import moment from 'moment';

export default function PracticeHistoryScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, 'practice_results'),
        where('userId', '==', auth.currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => ({
        
        id: doc.id,
        ...doc.data(),
      }));
      console.log(results)
      setHistory(results);
      setLoading(false);
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Cargando historial...</Text>
      </View>
    );
  }

  if (history.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No hay resultados aún. ¡Realiza tu primera práctica!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>Lección: {item.lessonId}</Text>
            <Text>Puntaje: {item.score} / {item.totalQuestions}</Text>
            <Text>Fecha: {moment(item.createdAt?.toDate()).format('DD/MM/YYYY HH:mm')}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
