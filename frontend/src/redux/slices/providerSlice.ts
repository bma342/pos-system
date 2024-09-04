import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Provider, PaginatedResponse } from '../../types/providerTypes';
import { fetchProviders } from 'frontend/src/api/providerApi';

interface ProviderState {
  providers: Provider[];
  loading: boolean;
  error: string | null;
  totalProviders: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

const initialState: ProviderState = {
  providers: [],
  loading: false,
  error: null,
  totalProviders: 0,
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,
};

export const fetchProviders = createAsyncThunk<
  PaginatedResponse<Provider>,
  { page: number; limit: number },
  { rejectValue: string }
>(
  'providers/fetchProviders',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await providerService.getProviders({ page, limit });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
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
      })
      .addCase(fetchProviders.fulfilled, (state, action: PayloadAction<PaginatedResponse<Provider>>) => {
        state.loading = false;
        state.providers = action.payload.data;
        state.totalProviders = action.payload.total;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.pageSize = action.payload.limit; // Changed from pageSize to limit
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export const selectProviders = (state: RootState) => state.provider.providers;
export const selectProvidersLoading = (state: RootState) => state.provider.loading;
export const selectProvidersError = (state: RootState) => state.provider.error;
export const selectTotalProviders = (state: RootState) => state.provider.totalProviders;
export const selectCurrentPage = (state: RootState) => state.provider.currentPage;
export const selectTotalPages = (state: RootState) => state.provider.totalPages;
export const selectPageSize = (state: RootState) => state.provider.pageSize;

export default providerSlice.reducer;