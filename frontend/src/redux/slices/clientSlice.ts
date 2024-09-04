import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ClientService } from '../../services/clientService';
import { ClientMetrics } from '../../types/clientTypes';
import { fetchClient } from 'frontend/src/api/clientApi';

interface ClientState {
  metrics: ClientMetrics | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  metrics: null,
  loading: false,
  error: null,
};

export const fetchClientMetrics = createAsyncThunk<
  ClientMetrics,
  string,
  { rejectValue: string }
>(
  'client/fetchMetrics',
  async (locationId, { rejectWithValue }) => {
    try {
      return await ClientService.fetchClientMetrics(locationId);
    } catch (error) {
      return rejectWithValue('Failed to fetch client metrics');
    }
  }
);

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchClientMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default clientSlice.reducer;
