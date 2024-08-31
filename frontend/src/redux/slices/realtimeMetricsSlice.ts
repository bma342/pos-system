import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRealtimeMetrics } from '../../api/metricsApi';
import { RealtimeMetrics } from '../../types';

interface RealtimeMetricsState {
  metrics: RealtimeMetrics;
  loading: boolean;
  error: string | null;
}

const initialState: RealtimeMetricsState = {
  metrics: {},
  loading: false,
  error: null,
};

export const fetchRealtimeMetricsAsync = createAsyncThunk(
  'realtimeMetrics/fetchRealtimeMetrics',
  async (clientId: string) => {
    const response = await fetchRealtimeMetrics(clientId);
    return response.data;
  }
);

const realtimeMetricsSlice = createSlice({
  name: 'realtimeMetrics',
  initialState,
  reducers: {
    updateMetric: (
      state,
      action: PayloadAction<{ key: string; value: number }>
    ) => {
      const { key, value } = action.payload;
      state.metrics[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRealtimeMetricsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRealtimeMetricsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchRealtimeMetricsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Failed to fetch realtime metrics';
      });
  },
});

export const { updateMetric } = realtimeMetricsSlice.actions;
export default realtimeMetricsSlice.reducer;
