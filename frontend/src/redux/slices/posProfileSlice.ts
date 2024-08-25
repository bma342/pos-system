import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, POSProfile, POSProfileState } from '../../types';

const initialState: POSProfileState = {
  profiles: [],
  status: 'idle',
  error: null,
};

export const fetchPOSProfiles = createAsyncThunk(
  'posProfiles/fetchPOSProfiles',
  async () => {
    // Simulated API call
    return [
      { id: 1, name: 'Main Profile', provider: 'Square' },
      { id: 2, name: 'Backup Profile', provider: 'Toast' },
    ];
  }
);

const posProfileSlice = createSlice({
  name: 'posProfiles',
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<POSProfile>) => {
      state.profiles.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPOSProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchPOSProfiles.fulfilled,
        (state, action: PayloadAction<POSProfile[]>) => {
          state.status = 'succeeded';
          state.profiles = action.payload;
        }
      )
      .addCase(fetchPOSProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch POS profiles';
      });
  },
});

export const selectPOSProfiles = (state: RootState) =>
  state.posProfiles.profiles;
export const selectPOSProfilesStatus = (state: RootState) =>
  state.posProfiles.status;
export const selectPOSProfilesError = (state: RootState) =>
  state.posProfiles.error;

export const { addProfile } = posProfileSlice.actions;

export default posProfileSlice.reducer;
