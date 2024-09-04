import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GuestMetrics } from '../../types/guestTypes';
import { GuestService } from '../../services/guestService';

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
  string,
  { rejectValue: string }
>(
  'guest/fetchMetrics',
  async (locationId, { rejectWithValue }) => {
    try {
      return await GuestService.fetchGuestMetrics(locationId);
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

export default guestSlice.reducer;
