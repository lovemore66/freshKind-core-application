import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

interface CartItem extends Product {
    quantity: number;
  }
  
  interface CartState {
    items: CartItem[];
    total: number;
  }
  
  const initialState: CartState = {
    items: [],
    total: 0,
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart: (state, action: PayloadAction<Product>) => {
        const item = state.items.find((i) => i._id === action.payload._id);
        if (item) {
          item.quantity += 1;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
        cartSlice.caseReducers.calculateTotal(state);
      },
      removeFromCart: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
        cartSlice.caseReducers.calculateTotal(state);
      },
      increaseQuantity: (state, action: PayloadAction<string>) => {
        const item = state.items.find((i) => i._id === action.payload);
        if (item) item.quantity += 1;
        cartSlice.caseReducers.calculateTotal(state);
      },
      decreaseQuantity: (state, action: PayloadAction<string>) => {
        const item = state.items.find((i) => i._id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
        cartSlice.caseReducers.calculateTotal(state);
      },
      calculateTotal: (state) => {
        state.total = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },
      clearCart: (state) => {
        state.items = [];
        state.total = 0;
      },
    },
  });
  
  export const {
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
    clearCart
  } = cartSlice.actions;
  
  export default cartSlice.reducer;