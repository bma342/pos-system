import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { posProfileService } from '../../services/posProfileService';

interface POSProfile {
  id: string;
  // Add other POS profile properties
}

interface POSProfileState {
  profiles: POSProfile[];
  loading: boolean;
  error: string | null;
}

const initialState: POSProfileState = {
  profiles: [],
  loading: false,
  error: null,
};

export const fetchPOSProfiles = createAsyncThunk(
  'posProfile/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const profiles = await posProfileService.getProfiles();
      return profiles;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const posProfileSlice = createSlice({
  name: 'posProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPOSProfiles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPOSProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
        state.loading = false;
      })
      .addCase(fetchPOSProfiles.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const selectPOSProfiles = (state: RootState) => state.posProfile.profiles;
export const selectPOSProfilesLoading = (state: RootState) => state.posProfile.loading;
export const selectPOSProfilesError = (state: RootState) => state.posProfile.error;

export default posProfileSlice.reducer;
