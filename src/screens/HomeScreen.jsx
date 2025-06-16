import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Inicio</Text>
      
      <Button title="Ir a Lecciones" onPress={() => navigation.navigate('Lecciones')} />
      <Button title="Ir a Práctica" onPress={() => navigation.navigate('Práctica')} />
      <Button title="Ir a Progreso" onPress={() => navigation.navigate('Progreso')} />
      <Button title="Ir a Perfil" onPress={() => navigation.navigate('Perfil')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  }
});
