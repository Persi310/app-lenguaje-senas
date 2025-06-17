import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LessonScreen from '../screens/LessonScreen';
import PracticeScreen from '../screens/PracticeScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import LessonStack from './LessonStack';
import PracticeHistoryScreen from '../screens/practiceHistoryScreen';
import LearningScreen from '../screens/LearningScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
    
              switch (route.name) {
                case 'Inicio':
                  iconName = 'home';
                  break;
                case 'Lecciones':
                  iconName = 'book';
                  break;
                case 'Práctica':
                  iconName = 'create';
                  break;
                case 'Progreso':
                  iconName = 'bar-chart';
                  break;
                case 'Perfil':
                  iconName = 'person';
                  break;
                case 'Historial':
                    iconName = 'reader-outline';
                    break;
              }
    
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Inicio" component={HomeScreen} />
          <Tab.Screen name="Lecciones" component={LessonStack} />
          <Tab.Screen name="Práctica" component={PracticeScreen} />
          <Tab.Screen name="Progreso" component={ProgressScreen} />
          <Tab.Screen name="Perfil" component={ProfileScreen} />
          <Tab.Screen name="Historial" component={PracticeHistoryScreen} />
          <Tab.Screen name="Aprendizaje" component={LearningScreen} />
        </Tab.Navigator>
      );
}
