import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Location } from '../../types/locationTypes';
import { fetchLocations } from 'frontend/src/api/locationApi';

interface LocationState {
  locations: Location[];
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  locations: [],
  loading: false,
  error: null,
};

export const fetchLocations = createAsyncThunk<Location[], void, { rejectValue: string }>(
  'location/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/locations');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch locations');
    }
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload;
        state.loading = false;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

// Updated selector functions
export const selectLocations = (state: RootState) => state.location.locations;
export const selectLocationLoading = (state: RootState) => state.location.loading;
export const selectLocationError = (state: RootState) => state.location.error;

export default locationSlice.reducer;
