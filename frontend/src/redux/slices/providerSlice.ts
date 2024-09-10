import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider } from '../../types/providerTypes';
import { providerApi } from '../../api/providerApi';

interface ProviderState {
  providers: Provider[];
  loading: boolean;
  error: string | null;
}

const initialState: ProviderState = {
  providers: [],
  loading: false,
  error: null,
};

export const fetchProviders = createAsyncThunk(
  'provider/fetchProviders',
  async (clientId: string) => {
    return await providerApi.getProviders(clientId);
  }
);

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch providers';
      });
  },
});

export default providerSlice.reducer;