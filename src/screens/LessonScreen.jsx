import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LessonScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lecciones</Text>
      <Text>Aquí se mostrarán las lecciones disponibles.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
