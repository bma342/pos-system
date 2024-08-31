import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartItem, Discount } from '../../types';

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
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    applyDiscount: (state, action: PayloadAction<Discount>) => {
      state.discount = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.discount = null;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, applyDiscount, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartDiscount = (state: RootState) => state.cart.discount;
export const selectCartTotal = (state: RootState) => {
  const subtotal = state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = state.cart.discount ? state.cart.discount.value : 0;
  return subtotal - (subtotal * discount) / 100;
};

export default cartSlice.reducer;