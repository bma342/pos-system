import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  subscriptionPlan: string;
  status: 'active' | 'inactive' | 'suspended';
}

interface ClientState {
  clients: Client[];
  selectedClient: Client | null;
  loading: boolean;
  error: string | null;
}

const initialState: ClientState = {
  clients: [],
  selectedClient: null,
  loading: false,
  error: null,
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    fetchClientsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchClientsSuccess(state, action: PayloadAction<Client[]>) {
      state.clients = action.payload;
      state.loading = false;
    },
    fetchClientsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    selectClient(state, action: PayloadAction<string>) {
      state.selectedClient =
        state.clients.find((client) => client.id === action.payload) || null;
    },
    updateClientStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateClientSuccess(state, action: PayloadAction<Client>) {
      const index = state.clients.findIndex(
        (client) => client.id === action.payload.id
      );
      if (index !== -1) {
        state.clients[index] = action.payload;
      }
      if (
        state.selectedClient &&
        state.selectedClient.id === action.payload.id
      ) {
        state.selectedClient = action.payload;
      }
      state.loading = false;
    },
    updateClientFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchClientsStart,
  fetchClientsSuccess,
  fetchClientsFailure,
  selectClient,
  updateClientStart,
  updateClientSuccess,
  updateClientFailure,
} = clientSlice.actions;

export default clientSlice.reducer;
