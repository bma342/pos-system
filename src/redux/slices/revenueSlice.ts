import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RevenueData } from '../../types/revenueTypes';
import * as revenueApi from '../../api/revenueApi';

interface RevenueState {
  data: RevenueData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RevenueState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchRevenueData = createAsyncThunk(
  'revenue/fetchRevenueData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await revenueApi.fetchRevenueData();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRevenueData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRevenueData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default revenueSlice.reducer;