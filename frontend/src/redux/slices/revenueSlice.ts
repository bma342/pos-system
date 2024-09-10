import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRevenueData as fetchRevenueDataApi } from '../../api/revenueApi';
import { RevenueData } from '../../types/revenueTypes';

interface RevenueState {
  data: RevenueData[];
  loading: boolean;
  error: string | null;
}

const initialState: RevenueState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchRevenueData = createAsyncThunk(
  'revenue/fetchRevenueData',
  async ({ clientId, startDate, endDate }: { clientId: string; startDate: string; endDate: string }) => {
    const data = await fetchRevenueDataApi(clientId, startDate, endDate);
    return data;
  }
);

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevenueData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRevenueData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default revenueSlice.reducer;
