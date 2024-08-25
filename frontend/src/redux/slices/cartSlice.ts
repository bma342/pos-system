import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, CartItem, Discount } from '../../types';

interface CartState {
  items: CartItem[];
  discount: Discount | null;
}

const initialState: CartState = {
  items: [],
  discount: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    applyDiscount: (state, action: PayloadAction<Discount>) => {
      state.discount = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, applyDiscount } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartDiscount = (state: RootState) => state.cart.discount;

export default cartSlice.reducer;
