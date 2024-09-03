import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Client } from '../../types/clientTypes';
import { clientApi } from '../../api/clientApi';

interface ClientState {
  clients: Client[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  status: 'idle',
  error: null,
};

export const fetchClients = createAsyncThunk('client/fetchClients', async () => {
  const response = await clientApi.getClients();
  return response.data;
});

export const createClient = createAsyncThunk(
  'client/createClient',
  async (newClient: Partial<Client>) => {
    const response = await clientApi.createClient(newClient);
    return response.data;
  }
);

export const updateClient = createAsyncThunk(
  'client/updateClient',
  async (updatedClient: Client) => {
    const response = await clientApi.updateClient(updatedClient);
    return response.data;
  }
);

export const deleteClient = createAsyncThunk(
  'client/deleteClient',
  async (id: string) => {
    await clientApi.deleteClient(id);
    return id;
  }
);

const clientSlice = createSlice({
  name: 'client',
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
        const index = state.clients.findIndex((client) => client.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
      })
      .addCase(deleteClient.fulfilled, (state, action: PayloadAction<string>) => {
        state.clients = state.clients.filter((client) => client.id !== action.payload);
      });
  },
});

export default clientSlice.reducer;
