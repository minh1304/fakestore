import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import orderReducer from '../features/orderSlice';
import userReducer from './userSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import productReducer from '~/features/productSlice';

//Tạo persist config cho mỗi reducer
// Nếu kh cần add vào local storage thì kh cần làm
const userPersistConfig = {
    key: 'user',
    storage,
};

const cartPersistConfig = {
    key: 'allCart',
    storage,
};
const orderPersistConfig = {
    key: 'order',
    storage,
};
const productPersistConfig = {
    key: 'product',
    storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedOrderReducer = persistReducer(orderPersistConfig, orderReducer);
const persistedProductReducer = persistReducer(
    productPersistConfig,
    productReducer,
);

//ghép các persistedReducer lại với nhau
const rootReducer = combineReducers({
    user: persistedUserReducer,
    allCart: persistedCartReducer,
    order: persistedOrderReducer,
    product: persistedProductReducer,
});

// Tạo store và persistor từ rootReducer
export const store = configureStore({
    reducer: rootReducer,
});

//Add vào local storage
export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//       allCart: cartReducer,
//       user: persistedReducer,
//   },
// });

//Code cũ khi chỉ add user vào localStorage bằng redux persist

// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from '../features/cartSlice';
// import userReducer from './userSlice';
// import storage from 'redux-persist/lib/storage';
// import { persistStore, persistReducer } from 'redux-persist';

// const persistConfig = {
//     key: 'root',
//     storage,
// };
// const persistedReducer = persistReducer(persistConfig, userReducer);

// export const store = configureStore({
//   reducer: {
//       allCart: cartReducer,
//       user: persistedReducer,
//   },
// });

// //Add vào local storage
// export const persistor = persistStore(store);
