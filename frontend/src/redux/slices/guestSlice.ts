import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { GuestMetrics } from '../../types/guestTypes';
import { guestService } from '../../services/guestService';

interface GuestProfile {
  id: string;
  // Add other guest profile properties
}

interface GuestState {
  profile: GuestProfile | null;
  metrics: GuestMetrics | null;
  loading: boolean;
  error: string | null;
}

const initialState: GuestState = {
  profile: null,
  metrics: null,
  loading: false,
  error: null,
};

export const fetchGuestMetrics = createAsyncThunk<
  GuestMetrics,
  { locationId: string; guestId: string },
  { rejectValue: string }
>(
  'guest/fetchMetrics',
  async ({ locationId, guestId }, { rejectWithValue }) => {
    try {
      return await guestService.fetchGuestMetrics(locationId, guestId);
    } catch (error) {
      return rejectWithValue('Failed to fetch guest metrics');
    }
  }
);

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    setGuestProfile: (state, action: PayloadAction<GuestProfile>) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuestMetrics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGuestMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.metrics = action.payload;
      })
      .addCase(fetchGuestMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const { setGuestProfile } = guestSlice.actions;

export const selectGuestProfile = (state: RootState) => state.guest.profile;
export const selectGuestMetrics = (state: RootState) => state.guest.metrics;
export const selectGuestLoading = (state: RootState) => state.guest.loading;
export const selectGuestError = (state: RootState) => state.guest.error;

export default guestSlice.reducer;
