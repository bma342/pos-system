import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Client {
  id: number;
  name: string;
  subdomain: string;
  active: boolean;
}

interface ClientState {
  list: Client[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ClientState = {
  list: [],
  status: 'idle',
  error: null,
};

// Async thunk for fetching clients
export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const response = await fetch('/api/clients');
    if (!response.ok) throw new Error('Failed to fetch clients');
    return await response.json();
  }
);

// Async thunk for updating a client’s status
export const updateClientStatus = createAsyncThunk(
  'clients/updateClientStatus',
  async ({ clientId, status }: { clientId: number; status: boolean }) => {
    const response = await fetch(`/api/clients/${clientId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ active: status }),
    });
    if (!response.ok) throw new Error('Failed to update client status');
    return await response.json();
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
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(updateClientStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (client) => client.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default clientSlice.reducer;
