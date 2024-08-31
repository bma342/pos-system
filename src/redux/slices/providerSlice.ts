import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Provider } from '../../types/providerTypes';
import * as providerApi from '../../api/providerApi';

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
  'provider/fetchProviders',
  async () => {
    const response = await providerApi.getProviders();
    return response.data;
  }
);

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    addProvider: (state, action) => {
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
        state.error = action.error.message || null;
      });
  },
});

export const selectProviders = (state: RootState) => state.provider.providers;
export const selectProvidersStatus = (state: RootState) => state.provider.status;
export const selectProvidersError = (state: RootState) => state.provider.error;

export const { addProvider } = providerSlice.actions;

export default providerSlice.reducer;