import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './authSlice';
import productsReducer from './productsSlice';

const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedProductsReducer = persistReducer(persistConfig, productsReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: persistedProductsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>