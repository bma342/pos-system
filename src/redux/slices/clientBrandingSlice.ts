import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ClientBranding } from '../../types/clientTypes';
import { fetchClientBrandingAPI, updateClientBrandingAPI } from '../../api/clientBrandingApi';
import { createTheme, Theme } from '@mui/material/styles';

interface ClientBrandingState {
  branding: ClientBranding | null;
  theme: Theme | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientBrandingState = {
  branding: null,
  theme: null,
  status: 'idle',
  error: null,
};

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