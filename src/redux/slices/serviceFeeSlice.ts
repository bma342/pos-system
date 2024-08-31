import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ServiceFee } from '../../types/serviceFeeTypes';
import * as serviceFeeApi from '../../api/serviceFeeApi';

interface ServiceFeeState {
  serviceFees: ServiceFee[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ServiceFeeState = {
  serviceFees: [],
  status: 'idle',
  error: null,
};

export const fetchServiceFees = createAsyncThunk(
  'serviceFee/fetchServiceFees',
  async () => {
    const response = await serviceFeeApi.getServiceFees();
    return response;
  }
);

export const addServiceFee = createAsyncThunk(
  'serviceFee/addServiceFee',
  async (serviceFee: Omit<ServiceFee, 'id'>) => {
    const response = await serviceFeeApi.addServiceFee(serviceFee);
    return response;
  }
);

export const updateServiceFee = createAsyncThunk(
  'serviceFee/updateServiceFee',
  async (serviceFee: ServiceFee) => {
    const response = await serviceFeeApi.updateServiceFee(serviceFee);
    return response;
  }
);

export const deleteServiceFee = createAsyncThunk(
  'serviceFee/deleteServiceFee',
  async (id: string) => {
    await serviceFeeApi.deleteServiceFee(id);
    return id;
  }
);

const serviceFeeSlice = createSlice({
  name: 'serviceFee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceFees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServiceFees.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.serviceFees = action.payload;
      })
      .addCase(fetchServiceFees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addServiceFee.fulfilled, (state, action) => {
        state.serviceFees.push(action.payload);
      })
      .addCase(updateServiceFee.fulfilled, (state, action) => {
        const index = state.serviceFees.findIndex(
          (fee) => fee.id === action.payload.id
        );
        if (index !== -1) {
          state.serviceFees[index] = action.payload;
        }
      })
      .addCase(deleteServiceFee.fulfilled, (state, action) => {
        state.serviceFees = state.serviceFees.filter(
          (fee) => fee.id !== action.payload
        );
      });
  },
});

export const selectServiceFees = (state: RootState) => state.serviceFee.serviceFees;
export const selectServiceFeeStatus = (state: RootState) => state.serviceFee.status;
export const selectServiceFeeError = (state: RootState) => state.serviceFee.error;

export default serviceFeeSlice.reducer;