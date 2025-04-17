import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

interface CartState {
  items: Product[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
