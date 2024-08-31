import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Order } from '../../types/orderTypes';
import { placeOrder, fetchOrderData } from '../../services/api';
import { RootState } from '../store';
import logger from '../../utils/logger';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  status: 'idle',
  error: null,
};

export const placeOrderAsync = createAsyncThunk(
  'order/placeOrder',
  async (order: Omit<Order, 'id'>, { rejectWithValue }) => {
    try {
      const response = await placeOrder(order);
      return response;
    } catch (error) {
      logger.error('Error in placeOrderAsync', error);
      return rejectWithValue(error.response?.data || 'An error occurred while placing the order');
    }
  }
);

export const fetchOrdersAsync = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchOrderData();
      return response;
    } catch (error) {
      logger.error('Error in fetchOrdersAsync', error);
      return rejectWithValue(error.response?.data || 'An error occurred while fetching orders');
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentOrder = action.payload;
        state.orders.push(action.payload);
      })
      .addCase(placeOrderAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;

export const selectOrders = (state: RootState) => state.order.orders;
export const selectCurrentOrder = (state: RootState) => state.order.currentOrder;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectOrderError = (state: RootState) => state.order.error;

export default orderSlice.reducer;