import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as settingsApi from '../../api/settingsApi';
import { Settings } from '../../types/settingsTypes';

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (clientId: number) => {
    return await settingsApi.fetchSettings(clientId);
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async ({
    clientId,
    settings,
  }: {
    clientId: number;
    settings: Partial<Settings>;
  }) => {
    return await settingsApi.updateSettings(clientId, settings);
  }
);

interface SettingsState {
  data: Settings | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SettingsState = {
  data: null,
  status: 'idle',
  error: null,
};

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
        state.data = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch settings';
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default settingsSlice.reducer;
