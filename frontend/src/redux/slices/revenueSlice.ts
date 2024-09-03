import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchRevenueData } from '../../api/revenueApi';

interface RevenueData {
  date: string;
  amount: number;
}

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

export const fetchRevenue = createAsyncThunk(
  'revenue/fetchRevenue',
  async (dateRange: { startDate: string; endDate: string }, { rejectWithValue }) => {
    try {
      const data = await fetchRevenueData(dateRange);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectRevenueData = (state: RootState) => state.revenue.data;
export const selectRevenueLoading = (state: RootState) => state.revenue.loading;
export const selectRevenueError = (state: RootState) => state.revenue.error;

export default revenueSlice.reducer;
