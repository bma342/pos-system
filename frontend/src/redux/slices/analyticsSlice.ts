import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyticsService } from '../../services/analyticsService';

export interface SalesByCategory {
  category: string;
  sales: number;
}

export interface AnalyticsData {
  labels: string[];
  orderCounts: number[];
}

export const fetchSalesByCategory = createAsyncThunk(
  'analytics/fetchSalesByCategory',
  async (clientId: string) => {
    return await analyticsService.getSalesByCategory(clientId);
  }
);

export const fetchAnalytics = createAsyncThunk(
  'analytics/fetchAnalytics',
  async (clientId: string) => {
    return await analyticsService.getAnalytics(clientId);
  }
);

interface AnalyticsState {
  salesByCategory: SalesByCategory[];
  analyticsData: AnalyticsData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AnalyticsState = {
  salesByCategory: [],
  analyticsData: null,
  status: 'idle',
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSalesByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.salesByCategory = action.payload;
      })
      .addCase(fetchSalesByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchAnalytics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.analyticsData = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default analyticsSlice.reducer;