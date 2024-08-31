import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPOSIntegrations as fetchPOSIntegrationsAPI } from '../../api/posIntegrationApi';

export const fetchPOSIntegrations = createAsyncThunk(
  'posIntegration/fetchPOSIntegrations',
  async () => {
    const response = await fetchPOSIntegrationsAPI();
    return response.data;
  }
);

const posIntegrationSlice = createSlice({
  name: 'posIntegration',
  initialState: {
    integrations: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPOSIntegrations.fulfilled, (state, action) => {
      state.integrations = action.payload;
    });
  },
});

export default posIntegrationSlice.reducer;
