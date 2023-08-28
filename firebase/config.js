// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
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

  //   databaseURL: "<https://project-id.firebaseio.com>",
  //   measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
