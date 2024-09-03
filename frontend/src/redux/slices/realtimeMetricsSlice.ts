import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface TopSellingItem {
  id: string;
  name: string;
  quantity: number;
}

interface RealtimeMetrics {
  todaySales: number;
  todayOrders: number;
  averageOrderValue: number;
  newGuests: number;
  topSellingItems: TopSellingItem[];
}

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
    topSellingItems: [],
  },
  loading: false,
  error: null,
};

const realtimeMetricsSlice = createSlice({
  name: 'realtimeMetrics',
  initialState,
  reducers: {
    updateMetrics: (state, action: PayloadAction<Partial<RealtimeMetrics>>) => {
      state.metrics = { ...state.metrics, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { updateMetrics, setLoading, setError } = realtimeMetricsSlice.actions;

export const selectRealtimeMetrics = (state: RootState) => state.realtimeMetrics.metrics;
export const selectRealtimeMetricsLoading = (state: RootState) => state.realtimeMetrics.loading;
export const selectRealtimeMetricsError = (state: RootState) => state.realtimeMetrics.error;

export default realtimeMetricsSlice.reducer;