import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, CateringOrder } from '../../types';
import axios from 'axios';

interface CateringOrderState {
  cateringOrder: {
    orders: CateringOrder[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
  };
}

const initialState: CateringOrderState = {
  cateringOrder: {
    orders: [],
    status: 'idle',
  },
};

export const fetchCateringOrders = createAsyncThunk(
  'cateringOrders/fetchCateringOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<CateringOrder[]>('/api/catering-orders');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch catering orders');
    }
  }
);

export const createCateringOrder = createAsyncThunk(
  'cateringOrders/createCateringOrder',
  async (order: Omit<CateringOrder, 'id'>, { rejectWithValue }) => {
    try {
      const response = await axios.post<CateringOrder>(
        '/api/catering-orders',
        order
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create catering order');
    }
  }
);

const cateringOrdersSlice = createSlice({
  name: 'cateringOrder',
  initialState,
  reducers: {
    // ... other reducers
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCateringOrders.fulfilled, (state, action) => {
      state.cateringOrder.orders = action.payload;
      state.cateringOrder.status = 'succeeded';
    });
    // ... other cases
  },
});

export default cateringOrdersSlice.reducer;

export const selectCateringOrders = (state: RootState) =>
  state.cateringOrder.cateringOrder.orders;
