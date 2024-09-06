import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Location } from '../../types/locationTypes';
import { locationService } from '../../services/locationService';

interface LocationState {
  locations: Location[];
  selectedLocation: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LocationState = {
  locations: [],
  selectedLocation: null,
  status: 'idle',
  error: null,
};

export const fetchLocations = createAsyncThunk(
  'location/fetchLocations',
  async (clientId: string) => {
    const response = await locationService.fetchLocations(clientId);
    return response;
  }
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLocations.fulfilled, (state, action: PayloadAction<Location[]>) => {
        state.status = 'succeeded';
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch locations';
      });
  },
});

export const { setSelectedLocation } = locationSlice.actions;
export default locationSlice.reducer;
