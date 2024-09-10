import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ClientBrandingService } from '../../services/clientBrandingService';
import { ClientBranding } from '../../types/clientTypes';
import { RootState } from '../store';

export interface ClientBrandingState {
  branding: ClientBranding | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientBrandingState = {
  branding: null,
  loading: false,
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
      const branding = await ClientBrandingService.fetchClientBranding(clientId);
      return branding;
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
      const updatedBranding = await ClientBrandingService.updateClientBranding(clientId, brandingData);
      return updatedBranding;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientBranding.fulfilled, (state, action: PayloadAction<ClientBranding>) => {
        state.branding = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchClientBranding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(updateClientBranding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClientBranding.fulfilled, (state, action: PayloadAction<ClientBranding>) => {
        state.branding = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateClientBranding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default clientBrandingSlice.reducer;

// Selectors
export const selectClientBranding = (state: RootState) => state.clientBranding.branding;
export const selectClientBrandingStatus = (state: RootState) => state.clientBranding.loading;
export const selectClientBrandingError = (state: RootState) => state.clientBranding.error;
