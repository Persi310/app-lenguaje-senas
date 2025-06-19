import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Inicio</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.getParent()?.navigate('Aprendizaje');
        }}
      >
        <Text style={styles.buttonText}>Aprender señas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.getParent()?.navigate('Quiz');
        }}
      >
        <Text style={styles.buttonText}>Quiz</Text>
      </TouchableOpacity>
      <Button title="Ir a Lecciones" onPress={() => navigation.navigate('Lecciones')} />
      <Button title="Ir a Práctica" onPress={() => navigation.navigate('Práctica')} />
      <Button title="Ir a Progreso" onPress={() => navigation.navigate('Progreso')} />
      <Button title="Ir a Perfil" onPress={() => navigation.navigate('Perfil')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  button: {
    backgroundColor: '#2196f3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 18 },
});
