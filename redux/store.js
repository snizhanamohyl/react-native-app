import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import authSlice from "./auth/authSlice";
import postsSlice from "./posts/postsSlice";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
};

const reducer = {
  [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer),
  [postsSlice.name]: postsSlice.reducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
