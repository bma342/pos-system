import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { POSProfile, POSType } from '../../types/posTypes';
import { posIntegrationApi } from '../../api/posIntegrationApi';

interface POSIntegrationState {
  profiles: POSProfile[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: POSIntegrationState = {
  profiles: [],
  status: 'idle',
  error: null,
};

export const fetchProfiles = createAsyncThunk(
  'posIntegration/fetchProfiles',
  async (clientId: string) => {
    return await posIntegrationApi.getProfiles(clientId);
  }
);

export const createProfile = createAsyncThunk(
  'posIntegration/createProfile',
  async (profile: Omit<POSProfile, 'id'>) => {
    return await posIntegrationApi.createProfile(profile);
  }
);

export const updateProfile = createAsyncThunk(
  'posIntegration/updateProfile',
  async (profile: POSProfile) => {
    return await posIntegrationApi.updateProfile(profile);
  }
);

export const deleteProfile = createAsyncThunk(
  'posIntegration/deleteProfile',
  async (profileId: string) => {
    await posIntegrationApi.deleteProfile(profileId);
    return profileId;
  }
);

export const syncProfile = createAsyncThunk(
  'posIntegration/syncProfile',
  async (profileId: string) => {
    return await posIntegrationApi.syncProfile(profileId);
  }
);

const posIntegrationSlice = createSlice({
  name: 'posIntegration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfiles.fulfilled, (state, action: PayloadAction<POSProfile[]>) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch profiles';
      })
      .addCase(createProfile.fulfilled, (state, action: PayloadAction<POSProfile>) => {
        state.profiles.push(action.payload);
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<POSProfile>) => {
        const index = state.profiles.findIndex(profile => profile.id === action.payload.id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      .addCase(deleteProfile.fulfilled, (state, action: PayloadAction<string>) => {
        state.profiles = state.profiles.filter(profile => profile.id !== action.payload);
      })
      .addCase(syncProfile.fulfilled, (state, action: PayloadAction<POSProfile>) => {
        const index = state.profiles.findIndex(profile => profile.id === action.payload.id);
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      });
  },
});

export default posIntegrationSlice.reducer;
