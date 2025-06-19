// src/screens/ProfileScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { getViewedLessons } from '../config/progress';
import { getPracticeResults } from '../config/savePracticeResult';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [lessonCount, setLessonCount] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [nivelUsuario, setNivelUsuario] = useState('Principiante');

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
  
        const seenLessons = await getViewedLessons(currentUser.uid);
        setLessonCount(seenLessons.length);
  
        const results = await getPracticeResults(currentUser.uid);
        setPracticeCount(results.length);
  
        const totalCorrect = results.reduce((sum, r) => sum + (r.correctCount || r.score || 0), 0);
        const totalQuestions = results.reduce((sum, r) => sum + (r.totalCount || r.totalQuestions || 0), 0);
  
        const average = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : 0;
        setAccuracy(average);
  
        let nivel = 'Principiante';
        if (results.length >= 5 && average >= 50) nivel = 'Intermedio';
        if (results.length >= 10 && average >= 75) nivel = 'Avanzado';
        setNivelUsuario(nivel);
      }
    };
  
    fetchData();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigation.replace('Login'); 
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Perfil del Usuario</Text>
          <Text style={styles.info}>Nombre: {user.displayName || 'Sin nombre'}</Text>
          <Text style={styles.info}>Correo: {user.email}</Text>
          <Text style={styles.info}>Lecciones vistas: {lessonCount}</Text>
          <Text style={styles.info}>Prácticas realizadas: {practiceCount}</Text>
          <Text style={styles.info}>Precisión promedio: {accuracy}%</Text>
          <Text style={styles.info}>Nivel: {nivelUsuario}</Text>
          <Text style={styles.info}>
            Medalla: {nivelUsuario === 'Avanzado' ? '🥇 Oro' : nivelUsuario === 'Intermedio' ? '🥈 Plata' : '🥉 Bronce'}
          </Text>

          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#2196f3', marginTop: 16 }]}
            onPress={() => navigation.getParent()?.navigate('Historial')}
          >
            <Text style={styles.buttonText}>Ver historial de prácticas</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Cargando usuario...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  info: { fontSize: 18, marginBottom: 10 },
  button: {
    marginTop: 30,
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 10,
  },
  buttonText: { color: 'white', fontSize: 18, textAlign: 'center' },
});
