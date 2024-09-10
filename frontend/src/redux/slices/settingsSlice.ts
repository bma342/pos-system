import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Settings } from '../../types/settingsTypes';
import * as settingsApi from '../../api/settingsApi';

export const fetchSettings = createAsyncThunk<Settings, string>(
  'settings/fetchSettings',
  async (clientId: string) => {
    return await settingsApi.fetchSettings(clientId);
  }
);

export const updateSettings = createAsyncThunk<
  Settings,
  { clientId: string; settings: Settings }
>(
  'settings/updateSettings',
  async ({ clientId, settings }) => {
    return await settingsApi.updateSettings(clientId, settings);
  }
);

interface SettingsState {
  data: Settings | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  data: null,
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch settings';
      })
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update settings';
      });
  },
});

export default settingsSlice.reducer;
