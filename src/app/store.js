import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);


export const store = configureStore({
  reducer: {
      allCart: cartReducer,
      user: persistedReducer,
  },
});


//Add vào local storage
export const persistor = persistStore(store);