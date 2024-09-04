import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LocationPOSProfile } from '../../types/posTypes';
import api from '../../services/api';

interface POSProfileState {
  locationProfiles: LocationPOSProfile[];
  loading: boolean;
  error: string | null;
}

const initialState: POSProfileState = {
  locationProfiles: [],
  loading: false,
  error: null,
};

export const fetchLocationPOSProfiles = createAsyncThunk<
  LocationPOSProfile[],
  string,
  { rejectValue: string }
>(
  'posProfile/fetchLocationProfiles',
  async (locationId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/locations/${locationId}/pos-profiles`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch location POS profiles');
    }
  }
);

const posProfileSlice = createSlice({
  name: 'posProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationPOSProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationPOSProfiles.fulfilled, (state, action) => {
        state.locationProfiles = action.payload;
        state.loading = false;
      })
      .addCase(fetchLocationPOSProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export const selectLocationPOSProfiles = (state: RootState) => state.posProfile.locationProfiles;
export const selectPOSProfileLoading = (state: RootState) => state.posProfile.loading;
export const selectPOSProfileError = (state: RootState) => state.posProfile.error;

export default posProfileSlice.reducer;
