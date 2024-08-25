import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BrandingProfile, RootState, BrandingState } from '../../types';
import {
  fetchBrandingProfiles as apiFetchBrandingProfiles,
  saveBrandingProfile as apiSaveBrandingProfile,
} from '../../api/brandingApi';

const initialState: BrandingState = {
  profiles: [],
  status: 'idle',
  error: null,
};

export const fetchBrandingProfiles = createAsyncThunk(
  'branding/fetchBrandingProfiles',
  async (clientId: number) => {
    return await apiFetchBrandingProfiles(clientId);
  }
);

export const addBrandingProfile = createAsyncThunk(
  'branding/addBrandingProfile',
  async (profile: Omit<BrandingProfile, 'id'>) => {
    return await apiSaveBrandingProfile(profile as BrandingProfile);
  }
);

export const updateBrandingProfile = createAsyncThunk(
  'branding/updateBrandingProfile',
  async (profile: BrandingProfile) => {
    return await apiSaveBrandingProfile(profile);
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
      .addCase(
        fetchBrandingProfiles.fulfilled,
        (state, action: PayloadAction<BrandingProfile[]>) => {
          state.status = 'succeeded';
          state.profiles = action.payload;
        }
      )
      .addCase(fetchBrandingProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(
        addBrandingProfile.fulfilled,
        (state, action: PayloadAction<BrandingProfile>) => {
          state.profiles.push(action.payload);
        }
      )
      .addCase(
        updateBrandingProfile.fulfilled,
        (state, action: PayloadAction<BrandingProfile>) => {
          const index = state.profiles.findIndex(
            (profile) => profile.id === action.payload.id
          );
          if (index !== -1) {
            state.profiles[index] = action.payload;
          }
        }
      );
  },
});

export const selectBrandingProfiles = (state: RootState) =>
  state.branding.profiles;
export const selectBrandingStatus = (state: RootState) => state.branding.status;
export const selectBrandingError = (state: RootState) => state.branding.error;

export default brandingSlice.reducer;
