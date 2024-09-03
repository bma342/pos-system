import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface Order {
  id: string;
  // Add other order properties
}

interface OrderState {
  activeOrders: Order[];
  // Add other state properties as needed
}

const initialState: OrderState = {
  activeOrders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setActiveOrders: (state, action: PayloadAction<Order[]>) => {
      state.activeOrders = action.payload;
    },
    removeOrder: (state, action: PayloadAction<string>) => {
      state.activeOrders = state.activeOrders.filter(
        (order) => order.id !== action.payload
      );
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      state.activeOrders = state.activeOrders.map((order) => 
        order.id === action.payload.id ? action.payload : order
      );
    },
    // Add other reducers as needed
  },
});

export const { setActiveOrders, removeOrder, updateOrder } = orderSlice.actions;

export const selectActiveOrders = (state: RootState) => state.order.activeOrders;

export default orderSlice.reducer;
