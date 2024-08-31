import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Location, LocationUpdateData } from '../../types/locationTypes';
import locationService from '../../services/locationService';

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    return await locationService.getLocations();
  }
);

export const updateLocation = createAsyncThunk(
  'locations/updateLocation',
  async ({
    locationId,
    updateData,
  }: {
    locationId: string;
    updateData: LocationUpdateData;
  }) => {
    return await locationService.updateLocation(locationId, updateData);
  }
);

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

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateLocationStatus: (
      state,
      action: PayloadAction<{ locationId: string; status: string }>
    ) => {
      const { locationId, status } = action.payload;
      const location = state.locations.find((loc) => loc.id === locationId);
      if (location) {
        location.status = status;
      }
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
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        const index = state.locations.findIndex(
          (loc) => loc.id === action.payload.id
        );
        if (index !== -1) {
          state.locations[index] = action.payload;
        }
      });
  },
});

export const { updateLocationStatus } = locationSlice.actions;
export default locationSlice.reducer;
