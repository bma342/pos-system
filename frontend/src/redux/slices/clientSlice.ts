import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../types';
import axios from 'axios';

export interface Client {
  id: number;
  name: string;
  email: string;
  // Add other client properties as needed
}

interface ClientState {
  clients: Client[];
  selectedClient: Client | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  selectedClient: null,
  status: 'idle',
  error: null,
};

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const response = await axios.get<Client[]>('/api/clients');
    return response.data;
  }
);

export const fetchClientById = createAsyncThunk(
  'clients/fetchClientById',
  async (clientId: number) => {
    const response = await axios.get<Client>(`/api/clients/${clientId}`);
    return response.data;
  }
);

export const updateClientDetails = createAsyncThunk(
  'clients/updateClientDetails',
  async ({
    clientId,
    clientData,
  }: {
    clientId: number;
    clientData: Partial<Client>;
  }) => {
    const response = await axios.put<Client>(
      `/api/clients/${clientId}`,
      clientData
    );
    return response.data;
  }
);

export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (clientId: number) => {
    await axios.delete(`/api/clients/${clientId}`);
  }
);

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    updateClientStatus: (
      state,
      action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>
    ) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchClients.fulfilled,
        (state, action: PayloadAction<Client[]>) => {
          state.status = 'succeeded';
          state.clients = action.payload;
        }
      )
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch clients';
      })
      .addCase(
        fetchClientById.fulfilled,
        (state, action: PayloadAction<Client>) => {
          state.selectedClient = action.payload;
        }
      )
      .addCase(
        updateClientDetails.fulfilled,
        (state, action: PayloadAction<Client>) => {
          const index = state.clients.findIndex(
            (client) => client.id === action.payload.id
          );
          if (index >= 0) {
            state.clients[index] = action.payload;
          }
        }
      )
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(
          (client) => client.id !== action.meta.arg
        );
      });
  },
});

export const { updateClientStatus } = clientSlice.actions;

export const selectClient = (state: RootState) => state.client.clients;
export const selectClientStatus = (state: RootState) => state.client.status;
export const selectClientError = (state: RootState) => state.client.error;
export const selectSelectedClient = (state: RootState) =>
  state.client.selectedClient;

export default clientSlice.reducer;
