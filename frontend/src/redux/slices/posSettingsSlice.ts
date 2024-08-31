import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchPOSSettings as fetchPOSSettingsAPI,
  updatePOSSettings as updatePOSSettingsAPI,
} from '../../api/posSettingsApi';

interface POSSettingsState {
  modifierSendMethod: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: POSSettingsState = {
  modifierSendMethod: '',
  status: 'idle',
  error: null,
};

export const fetchPOSSettings = createAsyncThunk(
  'posSettings/fetchPOSSettings',
  async () => {
    const response = await fetchPOSSettingsAPI();
    return response;
  }
);

export const updatePOSSettings = createAsyncThunk(
  'posSettings/updatePOSSettings',
  async (settings: { modifierSendMethod: string }) => {
    const response = await updatePOSSettingsAPI(settings);
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
        state.modifierSendMethod = action.payload.modifierSendMethod;
      })
      .addCase(fetchPOSSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updatePOSSettings.fulfilled, (state, action) => {
        state.modifierSendMethod = action.payload.modifierSendMethod;
      });
  },
});

export default posSettingsSlice.reducer;
