import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Discount } from '../../types/cartTypes';

interface CartState {
  items: CartItem[];
  discount: number;
}

const initialState: CartState = {
  items: [],
  discount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.menuItemId !== action.payload);
    },
    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, applyDiscount } = cartSlice.actions;
export default cartSlice.reducer;
