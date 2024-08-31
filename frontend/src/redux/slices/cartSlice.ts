import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem, Modifier } from '../types/menuTypes';

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  modifiers: Modifier[];
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
    addItem(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(
        (item) => item.menuItem.id === action.payload.menuItem.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.total = calculateTotal(state.items);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.menuItem.id !== action.payload
      );
      state.total = calculateTotal(state.items);
    },
    updateItemQuantity(
      state,
      action: PayloadAction<{ itemId: string; quantity: number }>
    ) {
      const item = state.items.find(
        (item) => item.menuItem.id === action.payload.itemId
      );
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = calculateTotal(state.items);
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const itemTotal = item.menuItem.price * item.quantity;
    const modifiersTotal = item.modifiers.reduce(
      (sum, modifier) => sum + modifier.price,
      0
    );
    return total + itemTotal + modifiersTotal;
  }, 0);
};

export const { addItem, removeItem, updateItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
