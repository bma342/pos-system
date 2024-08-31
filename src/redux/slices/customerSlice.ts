import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerMetrics } from '../../types/customerTypes';
import { fetchCustomerMetricsData } from '../../api/customerApi';

interface CustomerState {
  metrics: CustomerMetrics;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CustomerState = {
  metrics: {
    totalCustomers: 0,
    newCustomers: 0,
    returningCustomers: 0,
    averageOrderValue: 0,
  },
  status: 'idle',
  error: null,
};

export const fetchCustomerMetrics = createAsyncThunk(
  'customer/fetchMetrics',
  async () => {
    const response = await fetchCustomerMetricsData();
    return response;
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerMetrics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomerMetrics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.metrics = action.payload;
      })
      .addCase(fetchCustomerMetrics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default customerSlice.reducer;