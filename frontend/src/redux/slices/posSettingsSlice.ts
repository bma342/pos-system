import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { posSettingService } from '../../services/posSettingService';
import { POSSettings } from '../../types/posSettingsTypes';

interface POSSettingsState {
  settings: Record<string, POSSettings>;
  loading: boolean;
  error: string | null;
}

const initialState: POSSettingsState = {
  settings: {},
  loading: false,
  error: null,
};

export const fetchPOSSettings = createAsyncThunk<
  POSSettings,
  string,
  { rejectValue: string }
>(
  'posSettings/fetchSettings',
  async (locationId, { rejectWithValue }) => {
    try {
      const settings = await posSettingService.getSettings(locationId);
      return settings;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const updatePOSSettings = createAsyncThunk<
  POSSettings,
  { locationId: string; settings: Partial<POSSettings> },
  { rejectValue: string }
>(
  'posSettings/updateSettings',
  async ({ locationId, settings }, { rejectWithValue }) => {
    try {
      // Changed from updateSyncSettings to updateSettings
      const updatedSettings = await posSettingService.updateSettings(locationId, settings);
      return updatedSettings;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const posSettingsSlice = createSlice({
  name: 'posSettings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPOSSettings.pending, (state) => {
        state.loading = true;
        state.error = null;  // Clear error when starting a new fetch
      })
      .addCase(fetchPOSSettings.fulfilled, (state, action) => {
        state.settings[action.meta.arg] = action.payload;
        state.loading = false;
      })
      .addCase(fetchPOSSettings.rejected, (state, action) => {
        state.error = action.payload || 'An unknown error occurred';
        state.loading = false;
      })
      .addCase(updatePOSSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePOSSettings.fulfilled, (state, action) => {
        state.settings[action.meta.arg.locationId] = action.payload;
        state.loading = false;
      })
      .addCase(updatePOSSettings.rejected, (state, action) => {
        state.error = action.payload || 'An unknown error occurred';
        state.loading = false;
      });
  },
});

export const { clearError } = posSettingsSlice.actions;

export const selectPOSSettingsForLocation = (state: RootState, locationId: string) => 
  state.posSettings.settings[locationId];

export const selectPOSSettings = (state: RootState) => state.posSettings.settings;
export const selectPOSSettingsLoading = (state: RootState) => state.posSettings.loading;
export const selectPOSSettingsError = (state: RootState) => state.posSettings.error;

export default posSettingsSlice.reducer;
