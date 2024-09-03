import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Location } from '../../types/locationTypes';
import { locationApi } from '../../api/locationApi';

interface LocationState {
  locations: Location[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LocationState = {
  locations: [],
  status: 'idle',
  error: null,
};

export const fetchLocationsAsync = createAsyncThunk(
  'location/fetchLocations',
  async () => {
    const response = await locationApi.getLocations();
    return response.data;
  }
);

// ... (implement other async thunks for CRUD operations)

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocationsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locations = action.payload;
      })
      .addCase(fetchLocationsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
    // ... (implement other cases for CRUD operations)
  },
});

export default locationSlice.reducer;
