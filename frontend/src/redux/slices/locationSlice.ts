import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Location } from '../../types/locationTypes';
import { locationApi } from '../../api/locationApi';

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

export const fetchLocations = createAsyncThunk(
  'location/fetchLocations',
  async () => {
    const response = await locationApi.getLocations();
    return response.data;
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
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch locations';
      });
  },
});

export default locationSlice.reducer;
