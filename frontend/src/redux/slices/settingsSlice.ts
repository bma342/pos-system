import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ClientSettings } from '../../types';
import * as settingsApi from '../../api/settingsApi';

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async () => {
    return await settingsApi.getSettings();
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (settings: Partial<ClientSettings>) => {
    return await settingsApi.updateSettings(settings);
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {} as ClientSettings,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      });
  },
});

export default settingsSlice.reducer;
