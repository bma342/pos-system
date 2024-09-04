import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchClientBranding } from 'frontend/src/api/clientApi';
import { ClientBrandingService } from '../../services/clientBrandingService';
import { ClientBranding } from '../../types/clientTypes';
import { RootState } from '../store';

interface ClientBrandingState {
  data: ClientBranding | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientBrandingState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchClientBranding = createAsyncThunk<
  ClientBranding,
  string,
  { rejectValue: string }
>(
  'clientBranding/fetchClientBranding',
  async (clientId, { rejectWithValue }) => {
    try {
      return await ClientBrandingService.fetchClientBranding(clientId);
    } catch (error) {
      return rejectWithValue('Failed to fetch client branding');
    }
  }
);

export const updateClientBranding = createAsyncThunk<
  ClientBranding,
  { clientId: string; brandingData: Partial<ClientBranding> },
  { rejectValue: string }
>(
  'clientBranding/updateClientBranding',
  async ({ clientId, brandingData }, { rejectWithValue }) => {
    try {
      return await ClientBrandingService.updateClientBranding(clientId, brandingData);
    } catch (error) {
      return rejectWithValue('Failed to update client branding');
    }
  }
);

const clientBrandingSlice = createSlice({
  name: 'clientBranding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientBranding.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientBranding.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchClientBranding.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(updateClientBranding.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateClientBranding.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateClientBranding.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default clientBrandingSlice.reducer;

// Selectors
export const selectClientBranding = (state: RootState) => state.clientBranding.data;
export const selectClientBrandingStatus = (state: RootState) => state.clientBranding.status;
export const selectClientBrandingError = (state: RootState) => state.clientBranding.error;
