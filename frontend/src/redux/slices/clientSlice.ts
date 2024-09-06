import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Client } from '../../types/clientTypes';
import { clientService } from '../../services/clientService'; // Correct import

export interface ClientState {
  clients: Client[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  status: 'idle',
  error: null,
};

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const response = await clientService.getAllClients();
    return response;
  }
);

export const createClient = createAsyncThunk(
  'clients/createClient',
  async (clientData: Partial<Client>) => {
    const response = await clientService.createClient(clientData);
    return response;
  }
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async (clientData: Client) => {
    const response = await clientService.updateClient(clientData.id, clientData);
    return response;
  }
);

export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (clientId: string) => {
    await clientService.deleteClient(clientId);
    return clientId;
  }
);

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action: PayloadAction<Client[]>) => {
        state.status = 'succeeded';
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch clients';
      })
      .addCase(createClient.fulfilled, (state, action: PayloadAction<Client>) => {
        state.clients.push(action.payload);
      })
      .addCase(updateClient.fulfilled, (state, action: PayloadAction<Client>) => {
        const index = state.clients.findIndex(client => client.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(deleteClient.fulfilled, (state, action: PayloadAction<string>) => {
        state.clients = state.clients.filter(client => client.id !== action.payload);
      });
  },
});

export default clientSlice.reducer;
