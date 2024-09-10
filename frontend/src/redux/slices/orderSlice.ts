import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderItem, OrderStatus } from '../../types/orderTypes';
import { orderApi } from '../../api/orderApi';
import { RootState } from '../store';

interface OrderState {
  orders: Order[];
  activeOrders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  activeOrders: [],
  status: 'idle',
  error: null
};

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (clientId: string) => {
    return await orderApi.getOrders(clientId);
  }
);

export const fetchActiveOrders = createAsyncThunk(
  'order/fetchActiveOrders',
  async (clientId: string) => {
    return await orderApi.getActiveOrders(clientId);
  }
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({ clientId, orderData }: { clientId: string; orderData: Omit<Order, 'id'> }, { rejectWithValue }) => {
    try {
      const response = await orderApi.createOrder(clientId, orderData);
      return response as Order;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async ({ clientId, orderId }: { clientId: string; orderId: string }, { rejectWithValue }) => {
    try {
      await orderApi.cancelOrder(clientId, orderId);
      return orderId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const markItemOutOfStock = createAsyncThunk(
  'order/markItemOutOfStock',
  async ({ clientId, orderId, itemId }: { clientId: string; orderId: string; itemId: string }, { rejectWithValue }) => {
    try {
      await orderApi.markItemOutOfStock(clientId, orderId, itemId);
      return { orderId, itemId };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ orderId, status }: { orderId: string; status: string }, { getState }) => {
    const state = getState() as RootState;
    const clientId = state.user.currentUser?.clientId;
    if (!clientId) throw new Error('Client ID not found');
    return await orderApi.updateOrderStatus(clientId, orderId, status);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(fetchActiveOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.activeOrders = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
        if (action.payload.status === OrderStatus.PENDING) {
          state.activeOrders.push(action.payload);
        }
      })
      .addCase(cancelOrder.fulfilled, (state, action: PayloadAction<string>) => {
        state.orders = state.orders.filter(order => order.id !== action.payload);
        state.activeOrders = state.activeOrders.filter(order => order.id !== action.payload);
      })
      .addCase(markItemOutOfStock.fulfilled, (state, action: PayloadAction<{ orderId: string; itemId: string }>) => {
        const order = state.orders.find(order => order.id === action.payload.orderId);
        const activeOrder = state.activeOrders.find(order => order.id === action.payload.orderId);
        if (order) {
          const item = order.items?.find((item) => item.itemId === action.payload.itemId);
          if (item) {
            item.outOfStock = true;
          }
        }
        if (activeOrder) {
          const item = activeOrder.items?.find((item) => item.itemId === action.payload.itemId);
          if (item) {
            item.outOfStock = true;
          }
        }
      })
      .addCase(updateOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  },
});

export const selectActiveOrders = (state: RootState) => state.order.activeOrders;

export default orderSlice.reducer;
