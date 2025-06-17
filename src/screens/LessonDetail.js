import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { useEffect } from 'react';
import { markLessonAsViewed } from '../config/progress';
import { auth } from '../config/firebaseConfig';

export default function LessonDetail({ route }) {
  const { lesson } = route.params;

  // Extraer el ID del video desde el enlace de YouTube
  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    if (auth.currentUser) {
      markLessonAsViewed(auth.currentUser.uid, lesson.id);
    }
  }, []);

  const videoId = extractVideoId(lesson.videoUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.description}>{lesson.description}</Text>

      {videoId ? (
        <WebView
          style={styles.video}
          javaScriptEnabled
          allowsFullscreenVideo
          source={{ uri: embedUrl }}
        />
      ) : (
        <Text style={styles.error}>No se pudo cargar el video</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  video: {
    width: '100%',
    height: (Dimensions.get('window').width * 9) / 16, // Proporción 16:9
    borderRadius: 8,
    overflow: 'hidden',
  },
  error: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});
