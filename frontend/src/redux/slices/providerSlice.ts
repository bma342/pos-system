import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Updated import path

interface Provider {
  id: string;
  name: string;
  feePercentage: number;
}

interface ProviderState {
  providers: Provider[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProviderState = {
  providers: [],
  status: 'idle',
  error: null,
};

export const fetchProviders = createAsyncThunk(
  'providers/fetchProviders',
  async () => {
    // Simulated API call
    return [
      { id: '1', name: 'Uber Eats', feePercentage: 18 },
      { id: '2', name: 'DoorDash', feePercentage: 20 },
    ];
  }
);

const providerSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    addProvider: (state, action: PayloadAction<Provider>) => {
      state.providers.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.providers = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch providers';
      });
  },
});

export const selectProviders = (state: RootState) => state.provider.providers;
export const selectProvidersStatus = (state: RootState) =>
  state.provider.status;
export const selectProvidersError = (state: RootState) => state.provider.error;

export const { addProvider } = providerSlice.actions;

export default providerSlice.reducer;
