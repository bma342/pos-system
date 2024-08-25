import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, CateringOrder } from '../../types';
import axios from 'axios';

interface CateringOrderState {
  orders: CateringOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CateringOrderState = {
  orders: [],
  status: 'idle',
  error: null,
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

const cateringOrderSlice = createSlice({
  name: 'cateringOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCateringOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchCateringOrders.fulfilled,
        (state, action: PayloadAction<CateringOrder[]>) => {
          state.status = 'succeeded';
          state.orders = action.payload;
        }
      )
      .addCase(fetchCateringOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(
        createCateringOrder.fulfilled,
        (state, action: PayloadAction<CateringOrder>) => {
          state.orders.push(action.payload);
        }
      );
  },
});

export default cateringOrderSlice.reducer;

export const selectCateringOrders = (state: RootState) =>
  state.cateringOrders.orders;
