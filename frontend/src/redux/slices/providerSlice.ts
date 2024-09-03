import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { providerService } from '../../services/providerService';

interface Provider {
  id: string;
  name: string;
  // Add other provider properties
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

interface ProviderState {
  providers: Provider[];
  loading: boolean;
  error: string | null;
  totalProviders: number;
  currentPage: number;
  totalPages: number;
}

const initialState: ProviderState = {
  providers: [],
  loading: false,
  error: null,
  totalProviders: 0,
  currentPage: 1,
  totalPages: 1,
};

export const fetchProviders = createAsyncThunk<
  PaginatedResponse<Provider>,
  { page: number; limit: number },
  { rejectValue: string }
>(
  'providers/fetchProviders',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await providerService.getProviders(page, limit);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const providerSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload.data;
        state.totalProviders = action.payload.total;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectProviders = (state: RootState) => state.providers.providers;
export const selectProvidersLoading = (state: RootState) => state.providers.loading;
export const selectProvidersError = (state: RootState) => state.providers.error;
export const selectTotalProviders = (state: RootState) => state.providers.totalProviders;
export const selectCurrentPage = (state: RootState) => state.providers.currentPage;
export const selectTotalPages = (state: RootState) => state.providers.totalPages;

export default providerSlice.reducer;