import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { POSProfile } from '../../types/posTypes';
import * as posProfileApi from '../../api/posProfileApi'; // Updated import

interface POSProfileState {
  profiles: POSProfile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: POSProfileState = {
  profiles: [],
  status: 'idle',
  error: null
};

export const fetchLocationPOSProfiles = createAsyncThunk(
  'posProfile/fetchLocationPOSProfiles',
  async (locationId: string) => {
    const response = await posProfileApi.fetchPOSProfiles(locationId);
    return response;
  }
);

const posProfileSlice = createSlice({
  name: 'posProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationPOSProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocationPOSProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchLocationPOSProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch POS profiles';
      });
  },
});

export default posProfileSlice.reducer;
