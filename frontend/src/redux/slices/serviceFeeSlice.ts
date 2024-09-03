import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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

export const fetchServiceFees = createAsyncThunk(
  'serviceFee/fetchServiceFees',
  async () => {
    const response = await serviceFeeApi.getServiceFees();
    return response.data;
  }
);

export const createServiceFee = createAsyncThunk(
  'serviceFee/createServiceFee',
  async (newFee: ServiceFee) => {
    const response = await serviceFeeApi.createServiceFee(newFee);
    return response.data;
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
