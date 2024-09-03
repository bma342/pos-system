import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchClientBranding as fetchClientBrandingAPI,
  updateClientBranding as updateClientBrandingAPI,
} from '../../api/clientApi';
import { ClientBranding } from '../../types';
import { createTheme } from '../../utils/themeUtils';

export const fetchClientBrandingAsync = createAsyncThunk(
  'clientBranding/fetchClientBranding',
  async () => {
    const branding = await fetchClientBrandingAPI();
    const theme = createTheme(branding);
    return { branding, theme };
  }
);

export const updateClientBrandingAsync = createAsyncThunk(
  'clientBranding/updateClientBranding',
  async (brandingData: ClientBranding) => {
    const updatedBranding = await updateClientBrandingAPI(brandingData);
    const theme = createTheme(updatedBranding);
    return { branding: updatedBranding, theme };
  }
);

const initialState: ClientBrandingState = {
  branding: {
    primaryColor: '#000000',
    secondaryColor: '#FFFFFF',
    fontFamily: 'Arial, sans-serif',
    logo: '',
    // ... other initial branding values
  },
  status: 'idle',
  error: null,
};

const clientBrandingSlice = createSlice({
  name: 'clientBranding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientBrandingAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientBrandingAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.branding = action.payload.branding;
        state.theme = action.payload.theme;
      })
      .addCase(fetchClientBrandingAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateClientBrandingAsync.fulfilled, (state, action) => {
        state.branding = action.payload.branding;
        state.theme = action.payload.theme;
      });
  },
});

export default clientBrandingSlice.reducer;
