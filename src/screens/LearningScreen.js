import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import senas from '../data/senas';

export default function LearningScreen() {
  const [index, setIndex] = useState(0);
  const currentSena = senas[index];

  const handleNext = () => {
    if (index < senas.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aprende señas</Text>

      <Image source={currentSena.imagen} style={styles.image} />

      <Text style={styles.word}>{currentSena.palabra}</Text>
      <Text style={styles.description}>{currentSena.descripcion}</Text>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  image: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 20 },
  word: { fontSize: 28, fontWeight: 'bold' },
  description: { fontSize: 18, marginTop: 10, textAlign: 'center' },
  button: {
    marginTop: 30,
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: { color: 'white', fontSize: 18 },
});
