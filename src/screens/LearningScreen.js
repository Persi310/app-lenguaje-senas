import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import senas from '../data/senas';
import { getViewedLessons } from '../config/progress';
import { auth } from '../config/firebaseConfig';

export default function LearningScreen({ navigation }) {
  const [viewedLessons, setViewedLessons] = useState([]);

  useEffect(() => {
    const loadProgress = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        const vistos = await getViewedLessons(userId);
        setViewedLessons(vistos);
      }
    };

    loadProgress();
  }, []);

  const renderItem = ({ item }) => {
    const visto = viewedLessons.includes(item.id);

    let icon = 'image-outline';
    let color = '#2196f3';

    if (item.tipo === 'video') {
      icon = 'play-circle-outline';
      color = '#f44336';
    } else if (item.tipo === 'quiz') {
      icon = 'help-circle-outline';
      color = '#4caf50';
    }

    return (
      <TouchableOpacity
        style={[styles.card, visto && { backgroundColor: '#e0f7fa' }]}
        onPress={() => navigation.navigate('LessonDetail', { leccion: item })}
      >
        <Ionicons name={icon} size={28} color={color} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text>{item.descripcion}</Text>
          {visto && <Text style={styles.visto}>✓ Visto</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={senas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  visto: {
    color: 'green',
    marginTop: 4,
    fontWeight: 'bold',
  },
});
