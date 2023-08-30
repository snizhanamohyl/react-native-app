// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення бази даних у проект
import {
  getFirestore,
  initializeFirestore,
  FirestoreSettings,
} from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDs1w38e9nXh8kOPFiuPMQqpPcWHQolhRw",
  authDomain: "react-native-app-88163.firebaseapp.com",
  projectId: "react-native-app-88163",
  storageBucket: "react-native-app-88163.appspot.com",
  messagingSenderId: "543514573221",
  appId: "1:543514573221:web:36c9b54104bcfd2dda104c",
  databaseURL:
    "https://react-native-app-88163-default-rtdb.europe-west1.firebasedatabase.app",
  // measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const firestoreSettings = {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  // experimentalAutoDetectLongPolling: true,
};

export const db = initializeFirestore(app, firestoreSettings);

// export const db = getFirestore(app);
export const storage = getStorage(app);
