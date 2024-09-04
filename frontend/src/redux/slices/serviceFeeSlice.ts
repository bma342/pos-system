import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ServiceFee } from '../../types/serviceFeeTypes';
import { fetchServiceFees } from 'frontend/src/api/serviceFeeApi';

interface ServiceFeeState {
  serviceFees: ServiceFee[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceFeeState = {
  serviceFees: [],
  loading: false,
  error: null,
};

export const fetchServiceFees = createAsyncThunk(
  'serviceFees/fetchServiceFees',
  async (clientId: string) => {
    const response = await fetchServiceFees(clientId);
    return response;
  }
);

export const createServiceFee = createAsyncThunk(
  'serviceFees/createServiceFee',
  async ({ clientId, serviceFee }: { clientId: string; serviceFee: Omit<ServiceFee, 'id'> }) => {
    const response = await createServiceFee(clientId, serviceFee);
    return response;
  }
);

const serviceFeeSlice = createSlice({
  name: 'serviceFee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceFees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchServiceFees.fulfilled, (state, action) => {
        state.loading = false;
        state.serviceFees = action.payload;
      })
      .addCase(fetchServiceFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch service fees';
      })
      .addCase(createServiceFee.fulfilled, (state, action) => {
        state.serviceFees.push(action.payload);
      });
  },
});

export default serviceFeeSlice.reducer;
