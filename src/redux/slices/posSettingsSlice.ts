import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { POSSettings } from '../../types/posTypes';
import * as posSettingsApi from '../../api/posSettingsApi';

interface POSSettingsState {
  settings: POSSettings | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: POSSettingsState = {
  settings: null,
  status: 'idle',
  error: null,
};

export const fetchPOSSettings = createAsyncThunk(
  'posSettings/fetchPOSSettings',
  async () => {
    const response = await posSettingsApi.getPOSSettings();
    return response;
  }
);

export const updatePOSSettings = createAsyncThunk(
  'posSettings/updatePOSSettings',
  async (settings: Partial<POSSettings>) => {
    const response = await posSettingsApi.updatePOSSettings(settings);
    return response;
  }
);

const posSettingsSlice = createSlice({
  name: 'posSettings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPOSSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPOSSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.settings = action.payload;
      })
      .addCase(fetchPOSSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updatePOSSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      });
  },
});

export const selectPOSSettings = (state: RootState) => state.posSettings.settings;
export const selectPOSSettingsStatus = (state: RootState) => state.posSettings.status;
export const selectPOSSettingsError = (state: RootState) => state.posSettings.error;

export default posSettingsSlice.reducer;