// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth, initializeAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

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

// import { getReactNativePersistence } from "firebase/auth";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
