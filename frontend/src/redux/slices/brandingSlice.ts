import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { BrandingState, BrandingProfile } from '../../types/clientTypes';
import { brandingService } from '../../services/brandingService';
import { RootState } from '../rootReducer';

const initialState: BrandingState = {
  profiles: [],
  status: 'idle',
  error: null,
};

export const fetchBrandingProfiles = createAsyncThunk<
  BrandingProfile[],
  void,
  { rejectValue: string }
>('branding/fetchProfiles', async (_, { rejectWithValue }) => {
  try {
    const profiles = await brandingService.getBrandingProfiles();
    return profiles.map(profile => ({
      ...profile,
      secondaryFontColor: profile.secondaryFontColor || ''
    }));
  } catch (error) {
    return rejectWithValue('Failed to fetch branding profiles');
  }
});

export const createBrandingProfile = createAsyncThunk<
  BrandingProfile,
  Partial<BrandingProfile>,
  { rejectValue: string }
>('branding/createProfile', async (profileData, { rejectWithValue }) => {
  try {
    const profile = await brandingService.createBrandingProfile(profileData);
    return {
      ...profile,
      secondaryFontColor: profile.secondaryFontColor || ''
    };
  } catch (error) {
    return rejectWithValue('Failed to create branding profile');
  }
});

export const updateBrandingProfile = createAsyncThunk<
  BrandingProfile,
  BrandingProfile,
  { rejectValue: string }
>('branding/updateProfile', async (profileData, { rejectWithValue }) => {
  try {
    const profile = await brandingService.updateBrandingProfile(profileData);
    return {
      ...profile,
      secondaryFontColor: profile.secondaryFontColor || ''
    };
  } catch (error) {
    return rejectWithValue('Failed to update branding profile');
  }
});

export const deleteBrandingProfile = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('branding/deleteProfile', async (id, { rejectWithValue }) => {
  try {
    await brandingService.deleteBrandingProfile(id);
    return id;
  } catch (error) {
    return rejectWithValue('Failed to delete branding profile');
  }
});

const brandingSlice = createSlice({
  name: 'branding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandingProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandingProfiles.fulfilled, (state, action: PayloadAction<BrandingProfile[]>) => {
        state.status = 'succeeded';
        state.profiles = action.payload;
      })
      .addCase(fetchBrandingProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Unknown error occurred';
      })
      .addCase(createBrandingProfile.fulfilled, (state, action: PayloadAction<BrandingProfile>) => {
        state.profiles.push(action.payload);
      })
      .addCase(updateBrandingProfile.fulfilled, (state, action: PayloadAction<BrandingProfile>) => {
        const index = state.profiles.findIndex(
          (profile) => profile.id === action.payload.id
        );
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
      })
      .addCase(deleteBrandingProfile.fulfilled, (state, action: PayloadAction<number>) => {
        state.profiles = state.profiles.filter(
          (profile) => profile.id !== action.payload
        );
      });
  },
});

export const selectBrandingProfiles = (state: RootState) => state.branding;

export default brandingSlice.reducer;
