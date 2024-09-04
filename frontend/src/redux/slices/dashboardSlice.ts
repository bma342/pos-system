import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { DashboardData, DashboardParams } from '../../types/dashboardTypes';
import { fetchDashboardDataAPI } from '../../services/dashboardService';

export const fetchDashboardData = createAsyncThunk<DashboardData, DashboardParams, { rejectValue: string }>(
  'dashboard/fetchDashboardData',
  async (params: DashboardParams, { rejectWithValue }) => {
    try {
      const response = await fetchDashboardDataAPI(params);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
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
        state.error = action.payload ?? 'An error occurred';
      });
  },
});

export default dashboardSlice.reducer;
