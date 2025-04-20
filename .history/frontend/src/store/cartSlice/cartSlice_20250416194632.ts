import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

// Load from localStorage
const loadCartFromLocalStorage = (): Product[] => {
    try {
      const data = localStorage.getItem('cart');
      return data ? JSON.parse(data) : [];
    } catch (err) {
      return [];
    }
  };
  
  interface CartState {
    items: Product[];
  }
  
  const initialState: CartState = {
    items: loadCartFromLocalStorage(),
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart: (state, action: PayloadAction<Product>) => {
        state.items.push(action.payload);
        localStorage.setItem('cart', JSON.stringify(state.items));
      },
      removeFromCart: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item._id !== action.payload);
        localStorage.setItem('cart', JSON.stringify(state.items));
      },
      clearCart: (state) => {
        state.items = [];
        localStorage.removeItem('cart');
      }
    },
  });
  
  export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
  export default cartSlice.reducer;