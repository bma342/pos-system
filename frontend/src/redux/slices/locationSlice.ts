import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, Location } from '../../types';
import axios from 'axios';

const initialState: LocationState = {
  locations: [],
  status: 'idle',
  selectedLocation: null,
  error: null,
};

interface LocationState {
  locations: Location[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedLocation: Location | null; // Add this property
}

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    const response = await axios.get<Location[]>('/api/locations');
    return response.data;
  }
);

export const updateLocation = createAsyncThunk(
  'locations/updateLocation',
  async (location: Partial<Location> & { id: number }) => {
    const response = await axios.put<Location>(
      `/api/locations/${location.id}`,
      location
    );
    return response.data;
  }
);

const locationSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchLocations.fulfilled,
        (state, action: PayloadAction<Location[]>) => {
          state.status = 'succeeded';
          state.locations = action.payload;
        }
      )
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(
        updateLocation.fulfilled,
        (state, action: PayloadAction<Location>) => {
          const index = state.locations.findIndex(
            (location) => location.id === action.payload.id
          );
          if (index !== -1) {
            state.locations[index] = action.payload;
          }
        }
      );
  },
});

export const selectLocations = (state: RootState) => state.locations.locations;
export const selectLocationStatus = (state: RootState) =>
  state.locations.status;
export const selectLocationError = (state: RootState) => state.locations.error;

export default locationSlice.reducer;
