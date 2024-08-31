import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RealtimeMetrics } from '../../types/realtimeMetricsTypes';

interface RealtimeMetricsState {
  metrics: RealtimeMetrics;
  loading: boolean;
  error: string | null;
}

const initialState: RealtimeMetricsState = {
  metrics: {
    todaySales: 0,
    todayOrders: 0,
    averageOrderValue: 0,
    newGuests: 0,
    activeGuests: 0,
    conversionRate: 0,
  },
  loading: false,
  error: null,
};

const realtimeMetricsSlice = createSlice({
  name: 'realtimeMetrics',
  initialState,
  reducers: {
    updateMetric: (
      state,
      action: PayloadAction<{ key: keyof RealtimeMetrics; value: number }>
    ) => {
      const { key, value } = action.payload;
      state.metrics[key] = value;
    },
  },
});

export const { updateMetric } = realtimeMetricsSlice.actions;

export default realtimeMetricsSlice.reducer;