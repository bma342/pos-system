import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, Order } from '../../types';
import * as orderApi from '../../api/orderApi';

interface OrderState {
  orders: Order[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  status: 'idle',
  error: null,
};

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
  const response = await orderApi.getActiveOrders();
  return response.data;
});

export const scheduleOrder = createAsyncThunk(
  'order/scheduleOrder',
  async (orderData: Partial<Order>) => {
    const response = await orderApi.createOrder(orderData);
    return response.data;
  }
);

export const fetchActiveOrders = createAsyncThunk(
  'orders/fetchActive',
  async () => {
    const response = await orderApi.getActiveOrders();
    return response.data;
  }
);

export const cancelOrder = createAsyncThunk(
  'orders/cancel',
  async (orderId: string) => {
    await orderApi.cancelOrder(orderId);
    return orderId;
  }
);

export const markItemOutOfStock = createAsyncThunk(
  'orders/markItemOutOfStock',
  async ({ orderId, itemId }: { orderId: string; itemId: string }) => {
    await orderApi.markItemOutOfStock(orderId, itemId);
    return { orderId, itemId };
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    setOrderStatus: (state, action: PayloadAction<OrderState['status']>) => {
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
      })
      .addCase(fetchActiveOrders.fulfilled, (state, action) => {
        state.activeOrders = action.payload;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.activeOrders = state.activeOrders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(markItemOutOfStock.fulfilled, (state, action) => {
        state.activeOrders = state.activeOrders.map((order) => {
          if (order.id === action.payload.orderId) {
            return {
              ...order,
              items: order.items.map((item) =>
                item.id === action.payload.itemId
                  ? { ...item, isAvailable: false }
                  : item
              ),
            };
          }
          return order;
        });
      });
  },
});

export const { setOrders, setOrderStatus, setOrderError } = orderSlice.actions;

export const selectOrders = (state: RootState) => state.order.orders;
export const selectOrderStatus = (state: RootState) => state.order.status;
export const selectOrderError = (state: RootState) => state.order.error;

export default orderSlice.reducer;
