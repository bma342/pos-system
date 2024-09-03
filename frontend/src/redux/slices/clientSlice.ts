import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const fetchClientsAsync = createAsyncThunk(
  'client/fetchClients',
  async () => {
    const response = await clientApi.getClients();
    return response.data;
  }
);

// ... (implement other async thunks for CRUD operations)

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClientsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
      })
      .addCase(fetchClientsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
    // ... (implement other cases for CRUD operations)
  },
});

export default clientSlice.reducer;
