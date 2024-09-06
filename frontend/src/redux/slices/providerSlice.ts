import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Provider, PaginatedResponse } from '../../types/providerTypes';
import { providerService } from '../../services/providerService';

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
  { clientId: string; page: number; limit: number },
  { rejectValue: string }
>(
  'providers/fetchProviders',
  async ({ clientId, page, limit }, { rejectWithValue }) => {
    try {
      return await providerService.getProviders(clientId, { page, limit });
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createProvider = createAsyncThunk<
  Provider,
  { clientId: string; providerData: Omit<Provider, 'id'> },
  { rejectValue: string }
>(
  'providers/createProvider',
  async ({ clientId, providerData }, { rejectWithValue }) => {
    try {
      return await providerService.createProvider(clientId, providerData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateProvider = createAsyncThunk<
  Provider,
  { clientId: string; providerId: string; providerData: Partial<Provider> },
  { rejectValue: string }
>(
  'providers/updateProvider',
  async ({ clientId, providerId, providerData }, { rejectWithValue }) => {
    try {
      return await providerService.updateProvider(clientId, providerId, providerData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteProvider = createAsyncThunk<
  string,
  { clientId: string; providerId: string },
  { rejectValue: string }
>(
  'providers/deleteProvider',
  async ({ clientId, providerId }, { rejectWithValue }) => {
    try {
      await providerService.deleteProvider(clientId, providerId);
      return providerId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
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
        state.pageSize = action.payload.limit;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      })
      .addCase(createProvider.fulfilled, (state, action) => {
        state.providers.push(action.payload);
        state.totalProviders += 1;
      })
      .addCase(updateProvider.fulfilled, (state, action) => {
        const index = state.providers.findIndex(provider => provider.id === action.payload.id);
        if (index !== -1) {
          state.providers[index] = action.payload;
        }
      })
      .addCase(deleteProvider.fulfilled, (state, action) => {
        state.providers = state.providers.filter(provider => provider.id !== action.payload);
        state.totalProviders -= 1;
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