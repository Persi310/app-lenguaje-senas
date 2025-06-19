import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';
import { getViewedLessons } from '../config/progress';
import { Ionicons } from '@expo/vector-icons';

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

  const renderLessonItem = ({ item }) => {
    const completada = viewedLessons.includes(item.id);

    return (
      <TouchableOpacity style={styles.card} onPress={() => handleLessonPress(item)}>
        <View style={styles.cardContent}>
          <Ionicons
            name={completada ? 'checkmark-circle' : 'ellipse-outline'}
            size={28}
            color={completada ? 'green' : 'gray'}
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, completada && { color: 'green' }]}>
              {item.title}
            </Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginTop: 4,
    color: '#555',
    fontSize: 14,
  },
});
