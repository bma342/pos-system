import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../types/cartTypes';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<{ clientId: string; locationId: string; menuItemId: string }>) => {
      state.items = state.items.filter(item => 
        item.clientId !== action.payload.clientId ||
        item.locationId !== action.payload.locationId ||
        item.menuItem.id !== action.payload.menuItemId
      );
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ clientId: string; locationId: string; menuItemId: string; quantity: number }>) => {
      const item = state.items.find(item => 
        item.clientId === action.payload.clientId &&
        item.locationId === action.payload.locationId &&
        item.menuItem.id === action.payload.menuItemId
      );
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
