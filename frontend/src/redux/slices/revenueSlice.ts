import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RevenueData } from '../../types';
import { fetchRevenueData } from '../../api/revenueApi';

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

export const fetchRevenue = createAsyncThunk(
  'revenue/fetchRevenue',
  async (dateRange: { start: Date; end: Date }) => {
    const response = await fetchRevenueData(dateRange);
    return response;
  }
);

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default revenueSlice.reducer;
