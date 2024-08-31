import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BrandingState, BrandingProfile } from '../../types';
import { brandingService } from '../../services/brandingService';

const initialState: BrandingState = {
  profiles: [],
  status: 'idle',
  error: null,
};

export const fetchBrandingProfiles = createAsyncThunk(
  'branding/fetchProfiles',
  async () => {
    return await brandingService.getBrandingProfiles();
  }
);

export const createBrandingProfile = createAsyncThunk(
  'branding/createProfile',
  async (profileData: Partial<BrandingProfile>) => {
    return await brandingService.createBrandingProfile(profileData);
  }
);

export const updateBrandingProfile = createAsyncThunk(
  'branding/updateProfile',
  async (profileData: BrandingProfile) => {
    return await brandingService.updateBrandingProfile(profileData);
  }
);

export const deleteBrandingProfile = createAsyncThunk(
  'branding/deleteProfile',
  async (id: number) => {
    await brandingService.deleteBrandingProfile(id);
    return id;
  }
);

const brandingSlice = createSlice({
  name: 'branding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandingProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandingProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchBrandingProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createBrandingProfile.fulfilled, (state, action) => {
        state.profiles.push(action.payload);
      })
      .addCase(updateBrandingProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex(
          (profile) => profile.id === action.payload.id
        );
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      .addCase(deleteBrandingProfile.fulfilled, (state, action) => {
        state.profiles = state.profiles.filter(
          (profile) => profile.id !== action.payload
        );
      });
  },
});

export default brandingSlice.reducer;
