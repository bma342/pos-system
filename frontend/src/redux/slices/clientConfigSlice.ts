import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ClientService } from '../../services/clientService';
import { ClientConfig } from '../../types/clientTypes';
import { RootState } from '../store'; // Add this import

export const fetchClientConfig = createAsyncThunk<
  ClientConfig,
  void,
  { rejectValue: string }
>(
  'clientConfig/fetchClientConfig',
  async (_, { rejectWithValue }) => {
    try {
      const config = await ClientService.fetchClientConfig();
      return config;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const clientConfigSlice = createSlice({
  name: 'clientConfig',
  initialState: {
    config: null as ClientConfig | null,
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientConfig.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientConfig.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.config = action.payload;
      })
      .addCase(fetchClientConfig.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default clientConfigSlice.reducer;

// Selectors
export const selectClientConfig = (state: RootState) => state.clientConfig.config;
export const selectClientConfigStatus = (state: RootState) => state.clientConfig.status;
export const selectClientConfigError = (state: RootState) => state.clientConfig.error;
