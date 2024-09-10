import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { posSettingsApi } from '../../api/posSettingsApi';

export interface POSSettings {
  modifierSendMethod: string;
  // Add other POS settings properties here
}

interface POSSettingsState {
  settings: { [locationId: string]: POSSettings };
  loading: boolean;
  error: string | null;
}

const initialState: POSSettingsState = {
  settings: {},
  loading: false,
  error: null,
};

export const fetchPOSSettings = createAsyncThunk(
  'posSettings/fetchPOSSettings',
  async (locationId: string) => {
    return await posSettingsApi.fetchPOSSettings(locationId);
  }
);

export const updatePOSSettings = createAsyncThunk(
  'posSettings/updatePOSSettings',
  async ({ locationId, settings }: { locationId: string; settings: Partial<POSSettings> }) => {
    return await posSettingsApi.updatePOSSettings(locationId, settings);
  }
);

const posSettingsSlice = createSlice({
  name: 'posSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPOSSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPOSSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings[action.meta.arg] = action.payload;
      })
      .addCase(fetchPOSSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch POS settings';
      })
      .addCase(updatePOSSettings.fulfilled, (state, action) => {
        const { locationId } = action.meta.arg;
        state.settings[locationId] = { ...state.settings[locationId], ...action.payload };
      });
  },
});

export default posSettingsSlice.reducer;
