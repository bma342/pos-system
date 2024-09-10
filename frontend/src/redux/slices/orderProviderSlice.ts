import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderProviderApi } from '../../api/orderProviderApi';
import { OrderProvider } from '../../types/orderProviderTypes';

interface OrderProviderState {
  providers: OrderProvider[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderProviderState = {
  providers: [],
  status: 'idle',
  error: null,
};

export const fetchOrderProvider = createAsyncThunk(
  'orderProvider/fetchOrderProvider',
  async ({ locationId, providerId }: { locationId: string; providerId: string }) => {
    return await orderProviderApi.getOrderProvider(locationId, providerId);
  }
);

export const updateOrderProvider = createAsyncThunk(
  'orderProvider/updateOrderProvider',
  async ({ locationId, providerId, ...updateData }: { locationId: string; providerId: string; [key: string]: any }) => {
    return await orderProviderApi.updateOrderProvider(locationId, providerId, updateData);
  }
);

const orderProviderSlice = createSlice({
  name: 'orderProvider',
  initialState,
  reducers: {
    // ... (your reducers)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderProvider.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderProvider.fulfilled, (state, action: PayloadAction<OrderProvider>) => {
        state.status = 'succeeded';
        const index = state.providers.findIndex(provider => provider.id === action.payload.id);
        if (index !== -1) {
          state.providers[index] = action.payload;
        } else {
          state.providers.push(action.payload);
        }
      })
      .addCase(fetchOrderProvider.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch order provider';
      })
      .addCase(updateOrderProvider.fulfilled, (state, action: PayloadAction<OrderProvider>) => {
        const index = state.providers.findIndex(provider => provider.id === action.payload.id);
        if (index !== -1) {
          state.providers[index] = action.payload;
        }
      });
  },
});

export default orderProviderSlice.reducer;