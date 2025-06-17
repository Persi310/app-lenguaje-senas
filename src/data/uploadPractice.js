import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';

const practices = [
    {
      "question": "¿Cuál es el signo correcto para 'Hola'?",
      "options": [
        { "text": "👋", "isCorrect": true },
        { "text": "✋", "isCorrect": false },
        { "text": "🤟", "isCorrect": false },
        { "text": "🙌", "isCorrect": false }
      ],
      "order": 1
    },
    {
      "question": "¿Cuál es el signo de 'Adiós'?",
      "options": [
        { "text": "👋 moviendo la mano", "isCorrect": true },
        { "text": "✌️", "isCorrect": false },
        { "text": "🤝", "isCorrect": false },
        { "text": "👍", "isCorrect": false }
      ],
      "order": 2
    },
    {
      "question": "¿Cuál es el signo para 'Gracias'?",
      "options": [
        { "text": "🤟", "isCorrect": true },
        { "text": "🙏", "isCorrect": false },
        { "text": "👐", "isCorrect": false },
        { "text": "✋", "isCorrect": false }
      ],
      "order": 3
    },
    {
      "question": "¿Cuál es el signo para 'Familia'?",
      "options": [
        { "text": "🫂", "isCorrect": true },
        { "text": "👨‍👩‍👧‍👦", "isCorrect": false },
        { "text": "🏠", "isCorrect": false },
        { "text": "❤️", "isCorrect": false }
      ],
      "order": 4
    },
    {
      "question": "¿Cuál es el signo para 'Yo'?",
      "options": [
        { "text": "👆 en el pecho", "isCorrect": true },
        { "text": "👇 en la espalda", "isCorrect": false },
        { "text": "✋ en la mano", "isCorrect": false },
        { "text": "🤚 en la frente", "isCorrect": false }
      ],
      "order": 5
    },
    {
      "question": "¿Cuál es el signo para 'Tú'?",
      "options": [
        { "text": "👉 señalando hacia afuera", "isCorrect": true },
        { "text": "👋 levantando la mano", "isCorrect": false },
        { "text": "✋ tocando la cabeza", "isCorrect": false },
        { "text": "🤟 en el pecho", "isCorrect": false }
      ],
      "order": 6
    },
    {
      "question": "¿Cuál es el signo del número '5'?",
      "options": [
        { "text": "🖐️ abierta", "isCorrect": true },
        { "text": "✋ doblada", "isCorrect": false },
        { "text": "🤟", "isCorrect": false },
        { "text": "✌️", "isCorrect": false }
      ],
      "order": 7
    },
    {
      "question": "¿Cuál es el signo de 'Rojo'?",
      "options": [
        { "text": "🟥 en la mejilla", "isCorrect": true },
        { "text": "🟦", "isCorrect": false },
        { "text": "🟩", "isCorrect": false },
        { "text": "🟨", "isCorrect": false }
      ],
      "order": 8
    },
    {
      "question": "¿Cuál es el signo de 'Lunes'?",
      "options": [
        { "text": "L moviéndose", "isCorrect": true },
        { "text": "M señal en la frente", "isCorrect": false },
        { "text": "D tocando la palma", "isCorrect": false },
        { "text": "V haciendo V", "isCorrect": false }
      ],
      "order": 9
    },
    {
      "question": "¿Cuál es el signo de 'Departamento'?",
      "options": [
        { "text": "Señal indican zona", "isCorrect": true },
        { "text": "Señal de edificio", "isCorrect": false },
        { "text": "Señal de casa", "isCorrect": false },
        { "text": "Señal de ciudad", "isCorrect": false }
      ],
      "order": 10
    }
  ];

  export const uploadPractices = async () => {
    const collectionRef = collection(db, 'practices');
    for (const practice of practices) {
      await addDoc(collectionRef, practice);
    }
    console.log('✅ Prácticas subidas exitosamente');
  };
