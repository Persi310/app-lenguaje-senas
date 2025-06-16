import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

export default function ProfileScreen() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sesión cerrada');
      })
      .catch((error) => {
        console.log('Error al cerrar sesión:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Cerrar sesión" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
