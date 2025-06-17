import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LessonDetail from '../screens/LessonDetail';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import BottomTabs from './BottomTabs';
import PracticeHistoryScreen from '../screens/practiceHistoryScreen';
import LearningScreen from '../screens/LearningScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen name="LessonDetail" component={LessonDetail} />
      <Stack.Screen name="Aprendizaje" component={LearningScreen} />
    </Stack.Navigator>
  );
}
