import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ClientSettings } from '../../types/clientTypes';
import * as settingsApi from '../../api/settingsApi';

interface SettingsState {
  settings: ClientSettings | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SettingsState = {
  settings: null,
  status: 'idle',
  error: null,
};

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async () => {
    const response = await settingsApi.fetchSettings();
    return response;
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (settings: Partial<ClientSettings>) => {
    const response = await settingsApi.updateSettings(settings);
    return response;
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      });
  },
});

export default settingsSlice.reducer;