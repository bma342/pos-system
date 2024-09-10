import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Location } from '../../types/locationTypes';
import { fetchLocations as fetchLocationsApi } from '../../api/locationApi';

interface LocationState {
  locations: Location[];
  selectedLocation: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  locations: [],
  selectedLocation: null,
  loading: false,
  error: null,
};

export const fetchLocations = createAsyncThunk(
  'location/fetchLocations',
  async (clientId: string) => {
    return await fetchLocationsApi(clientId);
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Location[]>) => {
      state.locations = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
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

export const { setLocations, setSelectedLocation } = locationSlice.actions;
export default locationSlice.reducer;
