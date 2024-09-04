import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchOrders } from 'frontend/src/api/orderApi';

interface Order {
  id: string;
  clientId: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItem {
  id: string;
  menuItemId: string;
  quantity: number;
  price: number;
  modifiers?: Modifier[];
}

interface Modifier {
  id: string;
  name: string;
  price: number;
}

enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

interface OrderState {
  activeOrders: Order[];
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
  },
});

export const { setActiveOrders, removeOrder, updateOrder } = orderSlice.actions;

export const selectActiveOrders = (state: RootState) => state.order.activeOrders;

export default orderSlice.reducer;
