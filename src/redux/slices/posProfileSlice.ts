import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { POSProfile } from '../../types/posTypes';
import * as posProfileApi from '../../api/posProfileApi';

interface POSProfileState {
  profiles: POSProfile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: POSProfileState = {
  profiles: [],
  status: 'idle',
  error: null,
};

export const fetchPOSProfiles = createAsyncThunk(
  'posProfile/fetchPOSProfiles',
  async () => {
    const response = await posProfileApi.getPOSProfiles();
    return response;
  }
);

const posProfileSlice = createSlice({
  name: 'posProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPOSProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPOSProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchPOSProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectPOSProfiles = (state: RootState) => state.posProfile.profiles;
export const selectPOSProfileStatus = (state: RootState) => state.posProfile.status;
export const selectPOSProfileError = (state: RootState) => state.posProfile.error;

export default posProfileSlice.reducer;