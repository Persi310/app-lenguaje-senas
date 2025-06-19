// src/navigation/LessonStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LessonScreen from '../screens/LessonScreen';
import LessonDetail from '../screens/LessonDetail';
import LearningScreen from '../screens/LearningScreen';
import QuizScreen from '../screens/QuizScreen';

const Stack = createNativeStackNavigator();

export default function LessonStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LessonScreen" component={LessonScreen} options={{ title: 'Lecciones' }} />
      <Stack.Screen name="LessonDetail" component={LessonDetail} options={{ title: 'Detalle' }} />
      <Stack.Screen name="Aprendizaje" component={LearningScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}
