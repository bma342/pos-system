import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { posSettingsService } from '../../services/posSettingsService';

interface POSSettings {
  id: string;
  // Add other POS settings properties
}

interface POSSettingsState {
  settings: POSSettings | null;
  loading: boolean;
  error: string | null;
}

const initialState: POSSettingsState = {
  settings: null,
  loading: false,
  error: null,
};

export const fetchPOSSettings = createAsyncThunk(
  'posSettings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const settings = await posSettingsService.getSettings();
      return settings;
    } catch (error: unknown) {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPOSSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPOSSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
        state.loading = false;
      })
      .addCase(fetchPOSSettings.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const selectPOSSettings = (state: RootState) => state.posSettings.settings;
export const selectPOSSettingsLoading = (state: RootState) => state.posSettings.loading;
export const selectPOSSettingsError = (state: RootState) => state.posSettings.error;

export default posSettingsSlice.reducer;
