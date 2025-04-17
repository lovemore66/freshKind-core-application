import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../productApi/productAPI';
import cartReducer from './cartSlice/cartSlice';
import { orderApi } from '../orderApi/orderApi';

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer, 
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
