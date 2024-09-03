import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ClientConfig } from '../../types/clientTypes';
import { clientConfigService } from '../../services/clientConfigService';

interface ClientConfigState {
  config: ClientConfig | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientConfigState = {
  config: null,
  status: 'idle',
  error: null,
};

export const fetchClientConfig = createAsyncThunk(
  'clientConfig/fetchClientConfig',
  async (clientId: string, { rejectWithValue }) => {
    try {
      const config = await clientConfigService.getClientConfig(clientId);
      return config;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const clientConfigSlice = createSlice({
  name: 'clientConfig',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientConfig.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientConfig.fulfilled, (state, action: PayloadAction<ClientConfig>) => {
        state.status = 'succeeded';
        state.config = action.payload;
      })
      .addCase(fetchClientConfig.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectClientConfig = (state: RootState) => state.clientConfig.config;
export const selectClientConfigStatus = (state: RootState) => state.clientConfig.status;
export const selectClientConfigError = (state: RootState) => state.clientConfig.error;

export default clientConfigSlice.reducer;
