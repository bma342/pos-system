import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ClientConfig } from '../../types/clientTypes';
import { clientConfigService } from '../../services/clientConfigService';
import { Client } from '../../types';

interface ClientConfigState {
  config: ClientConfig | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedClient: Client | null;
}

const initialState: ClientConfigState = {
  config: null,
  status: 'idle',
  error: null,
  selectedClient: null,
};

export const fetchClientConfig = createAsyncThunk<ClientConfig, string, { rejectValue: string }>(
  'clientConfig/fetchClientConfig',
  async (clientId, { rejectWithValue }) => {
    try {
      return await clientConfigService.fetchClientConfig(clientId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateClientConfig = createAsyncThunk<ClientConfig, { clientId: string; config: Partial<ClientConfig> }, { rejectValue: string }>(
  'clientConfig/updateClientConfig',
  async ({ clientId, config }, { rejectWithValue }) => {
    try {
      return await clientConfigService.updateClientConfig(clientId, config);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const clientConfigSlice = createSlice({
  name: 'clientConfig',
  initialState,
  reducers: {
    setSelectedClient: (state, action: PayloadAction<Client>) => {
      state.selectedClient = action.payload;
    },
  },
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
        state.error = action.payload || 'Failed to fetch client config';
      })
      .addCase(updateClientConfig.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateClientConfig.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.config = action.payload;
      })
      .addCase(updateClientConfig.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to update client config';
      });
  },
});

export const selectClientConfig = (state: RootState) => state.clientConfig.config;
export const selectClientConfigStatus = (state: RootState) => state.clientConfig.status;
export const selectClientConfigError = (state: RootState) => state.clientConfig.error;
export const { setSelectedClient } = clientConfigSlice.actions;

export default clientConfigSlice.reducer;
