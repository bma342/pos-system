import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Location {
  id: number;
  name: string;
  client: { name: string };
  isTestLocation: boolean;
}

interface LocationState {
  list: Location[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LocationState = {
  list: [],
  status: 'idle',
  error: null,
};

export const fetchLocations = createAsyncThunk(
  'locations/fetchLocations',
  async () => {
    const response = await fetch('/api/locations');
    if (!response.ok) throw new Error('Failed to fetch locations');
    return await response.json();
  }
);

export const updateLocation = createAsyncThunk(
  'locations/updateLocation',
  async ({
    locationId,
    isTestLocation,
  }: {
    locationId: number;
    isTestLocation: boolean;
  }) => {
    const response = await fetch(`/api/locations/${locationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isTestLocation }),
    });
    if (!response.ok) throw new Error('Failed to update location');
    return await response.json();
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
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateLocation.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (location) => location.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default locationSlice.reducer;
