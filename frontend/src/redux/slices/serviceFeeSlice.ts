import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ServiceFee } from '../../types/serviceFeeTypes';
import { serviceFeeService } from '../../services/serviceFeeService';

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

export const fetchServiceFees = createAsyncThunk<ServiceFee[], string, { rejectValue: string }>(
  'serviceFees/fetchServiceFees',
  async (clientId, { rejectWithValue }) => {
    try {
      return await serviceFeeService.fetchServiceFees(clientId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createServiceFee = createAsyncThunk<ServiceFee, { clientId: string; serviceFee: Omit<ServiceFee, 'id'> }, { rejectValue: string }>(
  'serviceFees/createServiceFee',
  async ({ clientId, serviceFee }, { rejectWithValue }) => {
    try {
      return await serviceFeeService.createServiceFee(clientId, serviceFee);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
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
        state.error = action.payload || 'Failed to fetch service fees';
      })
      .addCase(createServiceFee.fulfilled, (state, action) => {
        state.serviceFees.push(action.payload);
      });
  },
});

export const selectServiceFees = (state: RootState) => state.serviceFee.serviceFees;
export const selectServiceFeeLoading = (state: RootState) => state.serviceFee.loading;
export const selectServiceFeeError = (state: RootState) => state.serviceFee.error;

export default serviceFeeSlice.reducer;
