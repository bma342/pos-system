import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { DashboardData, DashboardParams } from '../../types/dashboardTypes';
import { fetchDashboardDataAPI } from '../../services/dashboardService';

export const fetchDashboardData = createAsyncThunk<DashboardData, DashboardParams>(
  'dashboard/fetchDashboardData',
  async (params: DashboardParams) => {
    const response = await fetchDashboardDataAPI(params.clientId, params.locationId, params.dateRange);
    return response;
  }
);

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action: PayloadAction<DashboardData>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'An error occurred';
      });
  },
});

export default dashboardSlice.reducer;
