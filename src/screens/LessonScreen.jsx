import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { getViewedLessons } from '../config/progress';
import { auth } from '../config/firebaseConfig';

export default function LessonScreen({ navigation }) {
  const [lessons, setLessons] = useState([]);
  const [viewedLessons, setViewedLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const q = query(collection(db, 'lessons'), orderBy('order'));
      const snapshot = await getDocs(q);
      const lessonList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLessons(lessonList);
  
      if (auth.currentUser) {
        const seen = await getViewedLessons(auth.currentUser.uid);
        setViewedLessons(seen);
      }
    };
  
    fetchLessons();
  }, []);

  const handleLessonPress = (lesson) => {
    if (!viewedLessons.includes(lesson.id)) {
      setViewedLessons(prev => [...prev, lesson.id]);
    }
  
    navigation.navigate('LessonDetail', { lesson });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleLessonPress(item)}
    >
      <Text style={styles.title}>
        {item.title} {viewedLessons.includes(item.id) && '✅'}
      </Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        );

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  description: { marginTop: 8, color: '#555' },
});
