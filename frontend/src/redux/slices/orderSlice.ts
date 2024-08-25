import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, Order, OrderState } from '../../types';
import axios from '../../api/axios';

const initialState: OrderState = {
  orders: [],
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const response = await axios.get<Order[]>('/api/orders');
  return response.data;
});

export const scheduleOrder = createAsyncThunk(
  'order/scheduleOrder',
  async (orderData: { locationId: string; timeSlot: Date }) => {
    const response = await axios.post<Order>('/api/orders/schedule', orderData);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setOrderStatus: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'failed' | 'succeeded'>
    ) => {
      state.status = action.payload;
    },
    setOrderError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(scheduleOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      });
  },
});

export const { setOrders, setOrderStatus, setOrderError } = orderSlice.actions;

export const selectOrders = (state: RootState) => state.order.orders;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectOrderError = (state: RootState) => state.order.error;

export default orderSlice.reducer;
