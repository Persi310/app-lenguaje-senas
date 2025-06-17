import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { savePracticeAnswer } from '../config/practiceProgress';
import { auth } from '../config/firebaseConfig';
import { savePracticeResult } from '../config/savePracticeResult';

export default function PracticeScreen() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  

  useEffect(() => {
    const fetchQuestions = async () => {
      const q = query(collection(db, 'practices'), orderBy('order'));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuestions(list);
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    const saveResult = async () => {
      if (showSummary && auth.currentUser) {
        await savePracticeResult(
          auth.currentUser.uid,
          'default_lesson', // cámbialo si tienes un ID real
          correctCount,
          questions.length
        );
      }
    };
    saveResult();
  }, [showSummary]);

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#555" />
        <Text>Cargando preguntas...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setShowResult(true);
    if (option.isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    setTimeout(() => {
      setSelectedOption(null);
      setShowResult(false);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowSummary(true);
      }
    }, 1200);
  };

  if (showSummary) {
    const total = questions.length;
    const percentage = ((correctCount / total) * 100).toFixed(1);
  
    return (
      <View style={styles.container}>
        <Text style={styles.summaryTitle}>Resumen de práctica</Text>
        <Text style={styles.summaryText}>Preguntas: {total}</Text>
        <Text style={styles.summaryText}>Correctas: {correctCount}</Text>
        <Text style={styles.summaryText}>Incorrectas: {total - correctCount}</Text>
        <Text style={styles.summaryText}>Puntaje: {percentage}%</Text>
        <TouchableOpacity
          style={[styles.option, { backgroundColor: '#add8e6' }]}
          onPress={() => {
            setCurrentIndex(0);
            setCorrectCount(0);
            setShowSummary(false);
          }}
        >
          <Text style={styles.optionText}>Volver a empezar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedOption === option &&
              (option.isCorrect ? styles.correct : styles.incorrect),
          ]}
          onPress={() => handleAnswer(option)}
          disabled={showResult}
        >
          <Text style={styles.optionText}>{option.text}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.progress}>
        Pregunta {currentIndex + 1} de {questions.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  question: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  option: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: { fontSize: 18 },
  correct: { backgroundColor: '#c8e6c9' },
  incorrect: { backgroundColor: '#ffcdd2' },
  progress: { marginTop: 20, textAlign: 'center', fontSize: 16, color: '#777' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  summaryTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  summaryText: { fontSize: 18, marginBottom: 8 },
});
