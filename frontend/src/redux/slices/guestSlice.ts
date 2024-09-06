import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GuestMetrics } from '../../types/guestTypes';
import { guestService } from '../../services/guestService';
import { RootState } from '../store';

interface GuestState {
  metrics: GuestMetrics | null;
  loading: boolean;
  error: string | null;
}

const initialState: GuestState = {
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
  reducers: {},
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

export const selectGuestMetrics = (state: RootState) => state.guest.metrics;
export const selectGuestLoading = (state: RootState) => state.guest.loading;
export const selectGuestError = (state: RootState) => state.guest.error;

export default guestSlice.reducer;
