import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Order, OrderStatus } from '../../types/orderTypes';
import { orderService } from '../../services/orderService';

interface OrderState {
  activeOrders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  activeOrders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk<Order[], string, { rejectValue: string }>(
  'order/fetchOrders',
  async (clientId, { rejectWithValue }) => {
    try {
      return await orderService.fetchOrders(clientId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk<Order, { clientId: string; orderId: string; status: OrderStatus }, { rejectValue: string }>(
  'order/updateOrderStatus',
  async ({ clientId, orderId, status }, { rejectWithValue }) => {
    try {
      return await orderService.updateOrderStatus(clientId, orderId, status);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createOrder = createAsyncThunk<Order, { clientId: string; orderData: Omit<Order, 'id'> }, { rejectValue: string }>(
  'order/createOrder',
  async ({ clientId, orderData }, { rejectWithValue }) => {
    try {
      return await orderService.createOrder(clientId, orderData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.activeOrders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.activeOrders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.activeOrders[index] = action.payload;
        }
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.activeOrders.push(action.payload);
      });
  },
});

export const selectActiveOrders = (state: RootState) => state.order.activeOrders;
export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderError = (state: RootState) => state.order.error;

export default orderSlice.reducer;
