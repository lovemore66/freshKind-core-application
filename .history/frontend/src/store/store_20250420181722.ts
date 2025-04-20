// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../productApi/productAPI';
import { orderApi } from '../orderApi/orderApi';
import cartReducer, { CartState } from './cartSlice/cartSlice';

// ✅ Load cart from localStorage with fallback to a full valid shape
const loadCartFromLocalStorage = (): CartState => {
  try {
    const stored = localStorage.getItem('cart');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        items: Array.isArray(parsed.items) ? parsed.items : [],
        total: typeof parsed.total === 'number' ? parsed.total : 0,
      };
    }
  } catch (error) {
    console.error('Error loading cart from localStorage', error);
  }

  return {
    items: [],
    total: 0,
  };
};

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartFromLocalStorage(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, orderApi.middleware),
});

// ✅ Save cart to localStorage on every change
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('cart', JSON.stringify(state.cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
