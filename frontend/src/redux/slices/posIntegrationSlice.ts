import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { POSIntegration } from '../../types/posIntegrationTypes';
import { posIntegrationService } from '../../services/posIntegrationService';

interface POSIntegrationState {
  integrations: POSIntegration[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: POSIntegrationState = {
  integrations: [],
  status: 'idle',
  error: null,
};

export const fetchPOSIntegrations = createAsyncThunk<POSIntegration[], { clientId: string; locationId?: string }, { rejectValue: string }>(
  'posIntegration/fetchPOSIntegrations',
  async ({ clientId, locationId }, { rejectWithValue }) => {
    try {
      return await posIntegrationService.fetchPOSIntegrations(clientId, locationId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createPOSIntegration = createAsyncThunk<POSIntegration, { clientId: string, integration: Omit<POSIntegration, 'id'> }, { rejectValue: string }>(
  'posIntegration/createPOSIntegration',
  async ({ clientId, integration }, { rejectWithValue }) => {
    try {
      return await posIntegrationService.createPOSIntegration(clientId, integration);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updatePOSIntegration = createAsyncThunk<POSIntegration, { clientId: string, integrationId: string, integration: Partial<POSIntegration> }, { rejectValue: string }>(
  'posIntegration/updatePOSIntegration',
  async ({ clientId, integrationId, integration }, { rejectWithValue }) => {
    try {
      return await posIntegrationService.updatePOSIntegration(clientId, integrationId, integration);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deletePOSIntegration = createAsyncThunk<string, { clientId: string, integrationId: string }, { rejectValue: string }>(
  'posIntegration/deletePOSIntegration',
  async ({ clientId, integrationId }, { rejectWithValue }) => {
    try {
      await posIntegrationService.deletePOSIntegration(clientId, integrationId);
      return integrationId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const syncPOSData = createAsyncThunk<void, { clientId: string, locationId: string, integrationType: string }, { rejectValue: string }>(
  'posIntegration/syncPOSData',
  async ({ clientId, locationId, integrationType }, { rejectWithValue }) => {
    try {
      await posIntegrationService.syncPOSData(clientId, locationId, integrationType);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const posIntegrationSlice = createSlice({
  name: 'posIntegration',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPOSIntegrations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPOSIntegrations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.integrations = action.payload;
      })
      .addCase(fetchPOSIntegrations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch POS integrations';
      })
      .addCase(createPOSIntegration.fulfilled, (state, action) => {
        state.integrations.push(action.payload);
      })
      .addCase(updatePOSIntegration.fulfilled, (state, action) => {
        const index = state.integrations.findIndex(integration => integration.id === action.payload.id);
        if (index !== -1) {
          state.integrations[index] = action.payload;
        }
      })
      .addCase(deletePOSIntegration.fulfilled, (state, action: PayloadAction<string>) => {
        state.integrations = state.integrations.filter(integration => integration.id !== action.payload);
      })
      .addCase(syncPOSData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(syncPOSData.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(syncPOSData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to sync POS data';
      });
  },
});

export const selectPOSIntegrations = (state: RootState) => state.posIntegration.integrations;
export const selectPOSIntegrationStatus = (state: RootState) => state.posIntegration.status;
export const selectPOSIntegrationError = (state: RootState) => state.posIntegration.error;

export const selectPOSIntegrationsByLocation = (state: RootState, locationId: string) =>
  state.posIntegration.integrations.filter(integration => (integration as any).locationId === locationId);

export default posIntegrationSlice.reducer;
