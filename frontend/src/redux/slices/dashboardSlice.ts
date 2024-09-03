import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DateRange } from '../../types/dateTypes';
import { dashboardApi } from '../../api/dashboardApi';

interface DashboardState {
  stats: {
    revenue: number;
    orders: number;
    averageOrderValue: number;
    barChartData: any; // Replace 'any' with the appropriate type
    lineChartData: any; // Replace 'any' with the appropriate type
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DashboardState = {
  stats: {
    revenue: 0,
    orders: 0,
    averageOrderValue: 0,
    barChartData: null,
    lineChartData: null,
  },
  status: 'idle',
  error: null,
};

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (dateRange: DateRange) => {
    const response = await dashboardApi.getStats(dateRange);
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch dashboard stats';
      });
  },
});

export default dashboardSlice.reducer;
