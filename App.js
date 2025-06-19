import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/navigation/AuthNavigator';
import BottomTabs from './src/navigation/BottomTabs';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/config/firebaseConfig';
import { uploadPractices } from './src/data/uploadPractice';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /* useEffect(() => {
    uploadPractices();
  }, []); */

  if (loading) return null;

  return (
    <NavigationContainer>
      <AuthNavigator user={user} />
    </NavigationContainer>
  );
}
