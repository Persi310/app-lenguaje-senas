import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import senas from '../data/senas';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';

export default function QuizScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  const preguntas = senas.slice(0, 5); 
  const preguntaActual = preguntas[currentIndex];
  const opciones = generarOpciones(preguntaActual);

  function generarOpciones(correcta) {
    const mezcladas = [...senas]
      .filter((s) => s.id !== correcta.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    mezcladas.push(correcta);
    return mezcladas.sort(() => 0.5 - Math.random());
  }

  async function guardarResultado(score, total) {
    if (!auth.currentUser) return;
  
    try {
      await addDoc(collection(db, 'practiceResults'), {
        userId: auth.currentUser.uid,
        correctCount: score,
        totalCount: total,
        timestamp: Timestamp.now(),
        tipo: 'quiz', 
      });
    } catch (error) {
      console.error("Error al guardar resultado del quiz:", error);
    }
  }

  async function handleSeleccion(opcion) {
    if (opcion.palabra === preguntaActual.palabra) {
      setScore(score + 1);
    }
  
    if (currentIndex + 1 < preguntas.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await guardarResultado(score, preguntas.length);
      setShowResult(true);
    }
  }

  const mensajeFinal =
    score >= 4 ? '🎉 ¡Excelente!' : score >= 3 ? '👍 ¡Buen intento!' : '💪 ¡Sigue practicando!';

  return (
    <View style={styles.container}>
      {showResult ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>Resultado</Text>
          <Text style={styles.result}>Puntaje: {score} / {preguntas.length}</Text>
          <Text style={styles.result}>{mensajeFinal}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setCurrentIndex(0);
              setScore(0);
              setShowResult(false);
            }}
          >
            <Text style={styles.buttonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.title}>¿Qué significa esta seña?</Text>
          <Text style={styles.progress}>Pregunta {currentIndex + 1} de {preguntas.length}</Text>
          <Image source={preguntaActual.imagen} style={styles.image} />

          {opciones.map((op, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                respuestaSeleccionada === op && {
                  backgroundColor:
                    op.palabra === preguntaActual.palabra ? 'green' : 'red',
                },
              ]}
              onPress={() => handleSeleccion(op)}
              disabled={!!respuestaSeleccionada}
            >
              <Text style={styles.optionText}>{op.palabra}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  progress: { fontSize: 16, marginBottom: 10 },
  image: { width: 200, height: 200, marginBottom: 20, resizeMode: 'contain' },
  option: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    width: '100%',
  },
  optionText: { color: 'white', fontSize: 18, textAlign: 'center' },
  result: { fontSize: 22, marginVertical: 12, fontWeight: 'bold', textAlign: 'center' },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    width: 150,
  },
  buttonText: { color: 'white', fontSize: 18, textAlign: 'center' },
});
