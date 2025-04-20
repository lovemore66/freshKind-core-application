import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../productApi/productAPI';
import { orderApi } from '../orderApi/orderApi';
import cartReducer from './cartSlice/cartSlice';

const loadCartFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem('cart');
    if (stored) return JSON.parse(stored);
  } catch (err) {
    console.error("Failed to load cart from localStorage", err);
  }
  return {
    items: [],
    total: 0,
  };
};

const preloadedState = {
  cart: loadCartFromLocalStorage(),
};

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, orderApi.middleware),
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  } catch (err) {
    console.error("Failed to save cart to localStorage", err);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
