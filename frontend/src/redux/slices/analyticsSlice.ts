import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyticsService } from '../../services/analyticsService';

export interface SalesByCategory {
  category: string;
  sales: number;
}

interface AnalyticsState {
  salesByCategory: SalesByCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  salesByCategory: [],
  loading: false,
  error: null,
};

export const fetchSalesByCategory = createAsyncThunk(
  'analytics/fetchSalesByCategory',
  async (clientId: string) => {
    return await analyticsService.getSalesByCategory(clientId);
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.salesByCategory = action.payload;
      })
      .addCase(fetchSalesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch sales by category';
      });
  },
});

export default analyticsSlice.reducer;