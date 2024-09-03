import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Revenue, CustomerMetrics, SalesReport, InventoryItem, RealtimeMetrics } from '../../types';
import { dashboardApi } from '../../api/dashboardApi';

interface DashboardState {
  revenue: Revenue[];
  customerMetrics: CustomerMetrics;
  inventory: InventoryItem[];
  salesReport: {
    salesByCategory: any[]; // Replace 'any' with the correct type
    topSellingItems: any[]; // Replace 'any' with the correct type
  };
  realtimeMetrics: RealtimeMetrics;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  revenue: [],
  customerMetrics: {} as CustomerMetrics,
  inventory: [],
  salesReport: {
    salesByCategory: [],
    topSellingItems: [],
  },
  realtimeMetrics: {} as RealtimeMetrics,
  loading: false,
  error: null,
};

export const fetchRevenue = createAsyncThunk(
  'dashboard/fetchRevenue',
  async (dateRange: { start: Date; end: Date }) => {
    const response = await dashboardApi.getRevenue(dateRange);
    return response.data;
  }
);

export const fetchCustomerMetrics = createAsyncThunk(
  'dashboard/fetchCustomerMetrics',
  async () => {
    const response = await dashboardApi.getCustomerMetrics();
    return response.data;
  }
);

export const fetchSalesByCategory = createAsyncThunk(
  'dashboard/fetchSalesByCategory',
  async (dateRange: { start: Date; end: Date }) => {
    const response = await dashboardApi.getSalesByCategory(dateRange);
    return response.data;
  }
);

export const fetchTopSellingItems = createAsyncThunk(
  'dashboard/fetchTopSellingItems',
  async (dateRange: { start: Date; end: Date }) => {
    const response = await dashboardApi.getTopSellingItems(dateRange);
    return response.data;
  }
);

export const fetchRealtimeMetrics = createAsyncThunk(
  'dashboard/fetchRealtimeMetrics',
  async () => {
    const response = await dashboardApi.getRealtimeMetrics();
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenue.fulfilled, (state, action) => {
        state.revenue = action.payload;
      })
      .addCase(fetchCustomerMetrics.fulfilled, (state, action) => {
        state.customerMetrics = action.payload;
      })
      .addCase(fetchSalesByCategory.fulfilled, (state, action) => {
        state.salesReport.salesByCategory = action.payload;
      })
      .addCase(fetchTopSellingItems.fulfilled, (state, action) => {
        state.salesReport.topSellingItems = action.payload;
      })
      .addCase(fetchRealtimeMetrics.fulfilled, (state, action) => {
        state.realtimeMetrics = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
