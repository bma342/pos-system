import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { posIntegrationService } from '../../services/posIntegrationService';

interface POSDiscountState {
  isSyncing: boolean;
  lastSyncTime: string | null;
  error: string | null;
}

const initialState: POSDiscountState = {
  isSyncing: false,
  lastSyncTime: null,
  error: null,
};

export const syncDiscounts = createAsyncThunk(
  'posDiscount/syncDiscounts',
  async (clientId: string) => {
    return await posIntegrationService.syncDiscounts(clientId);
  }
);

export const fetchLastSyncTime = createAsyncThunk(
  'posDiscount/fetchLastSyncTime',
  async (clientId: string) => {
    // Implement this API call
    const response = await fetch(`/api/pos-integration/${clientId}/last-sync-time`);
    return await response.json();
  }
);

const posDiscountSlice = createSlice({
  name: 'posDiscount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncDiscounts.pending, (state) => {
        state.isSyncing = true;
        state.error = null;
      })
      .addCase(syncDiscounts.fulfilled, (state, action) => {
        state.isSyncing = false;
        state.lastSyncTime = new Date().toISOString();
      })
      .addCase(syncDiscounts.rejected, (state, action) => {
        state.isSyncing = false;
        state.error = action.error.message || 'Failed to sync discounts';
      })
      .addCase(fetchLastSyncTime.fulfilled, (state, action) => {
        state.lastSyncTime = action.payload.lastSyncTime;
      });
  },
});

export default posDiscountSlice.reducer;