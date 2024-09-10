import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { posAlertsApi } from '../../api/posAlertsApi';

export interface POSAlert {
  id: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  posProfileId: string;
  createdAt: string;
}

interface POSAlertsState {
  alerts: POSAlert[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: POSAlertsState = {
  alerts: [],
  status: 'idle',
  error: null,
};

export const fetchPOSAlerts = createAsyncThunk(
  'posAlerts/fetchPOSAlerts',
  async (clientId: string) => {
    return await posAlertsApi.getAlerts(clientId);
  }
);

const posAlertsSlice = createSlice({
  name: 'posAlerts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPOSAlerts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPOSAlerts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.alerts = action.payload;
      })
      .addCase(fetchPOSAlerts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch POS alerts';
      });
  },
});

export default posAlertsSlice.reducer;