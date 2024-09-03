import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ClientBranding } from '../../types/clientTypes';
import { clientBrandingApi } from '../../api/clientBrandingApi';

interface ClientBrandingState {
  branding: ClientBranding | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientBrandingState = {
  branding: null,
  status: 'idle',
  error: null,
};

export const fetchClientBranding = createAsyncThunk(
  'clientBranding/fetchClientBranding',
  async () => {
    const response = await clientBrandingApi.getClientBranding();
    return response.data;
  }
);

export const updateClientBranding = createAsyncThunk(
  'clientBranding/updateClientBranding',
  async (brandingData: ClientBranding) => {
    const response = await clientBrandingApi.updateClientBranding(brandingData);
    return response.data;
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
        state.branding = action.payload;
      })
      .addCase(fetchClientBranding.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateClientBranding.fulfilled, (state, action) => {
        state.branding = action.payload;
      });
  },
});

export default clientBrandingSlice.reducer;
