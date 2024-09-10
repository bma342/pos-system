import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ServiceFee } from '../../types/serviceFeeTypes';
import { serviceFeeApi } from '../../api/serviceFeeApi';

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
  'serviceFee/fetchServiceFees',
  async (clientId, { rejectWithValue }) => {
    try {
      return await serviceFeeApi.getServiceFees(clientId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createServiceFee = createAsyncThunk<ServiceFee, { clientId: string; serviceFee: Omit<ServiceFee, 'id'> }, { rejectValue: string }>(
  'serviceFee/createServiceFee',
  async ({ clientId, serviceFee }, { rejectWithValue }) => {
    try {
      return await serviceFeeApi.createServiceFee(clientId, serviceFee);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateServiceFee = createAsyncThunk<ServiceFee, { clientId: string; serviceFee: ServiceFee }, { rejectValue: string }>(
  'serviceFee/updateServiceFee',
  async ({ clientId, serviceFee }, { rejectWithValue }) => {
    try {
      return await serviceFeeApi.updateServiceFee(clientId, serviceFee);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteServiceFee = createAsyncThunk<string, { clientId: string; serviceFeeId: string }, { rejectValue: string }>(
  'serviceFee/deleteServiceFee',
  async ({ clientId, serviceFeeId }, { rejectWithValue }) => {
    try {
      await serviceFeeApi.deleteServiceFee(clientId, serviceFeeId);
      return serviceFeeId;
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
      })
      .addCase(updateServiceFee.fulfilled, (state, action) => {
        const index = state.serviceFees.findIndex(fee => fee.id === action.payload.id);
        if (index !== -1) {
          state.serviceFees[index] = action.payload;
        }
      })
      .addCase(deleteServiceFee.fulfilled, (state, action) => {
        state.serviceFees = state.serviceFees.filter(fee => fee.id !== action.payload);
      });
  },
});

export default serviceFeeSlice.reducer;
