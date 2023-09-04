import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJvytFYyxGUjXEMMJfeNAdkc_3avjLZI8",
  authDomain: "rn-goit-proj-ea64c.firebaseapp.com",
  projectId: "rn-goit-proj-ea64c",
  storageBucket: "rn-goit-proj-ea64c.appspot.com",
  messagingSenderId: "217388096113",
  appId: "1:217388096113:web:312cf89545585ccbaed9d0",
  measurementId: "G-1XBQZXTZXY",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
