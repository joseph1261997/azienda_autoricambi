import { configureStore } from '@reduxjs/toolkit';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import authReducer from './authSlice';
import productsReducer from './productsSlice';

const persistConfigProducts = {
  key: 'products',
  storage: storageSession,
}

const persistConfingAuth = {
  key: 'auth',
  storage: storageSession,
}

const persistedAuthReducer = persistReducer(persistConfingAuth, authReducer);
const persistedProductsReducer = persistReducer(persistConfigProducts, productsReducer);

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