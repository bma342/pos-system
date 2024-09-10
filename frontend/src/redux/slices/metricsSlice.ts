import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRealtimeMetrics as fetchRealtimeMetricsApi } from '../../api/metricsApi';
import { RealtimeMetrics } from '../../types/metricsTypes';

interface MetricsState {
  data: RealtimeMetrics | null;
  loading: boolean;
  error: string | null;
}

const initialState: MetricsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchRealtimeMetrics = createAsyncThunk(
  'metrics/fetchRealtimeMetrics',
  async (clientId: string) => {
    const response = await fetchRealtimeMetricsApi(clientId);
    return response.data;
  }
);

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRealtimeMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRealtimeMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRealtimeMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default metricsSlice.reducer;