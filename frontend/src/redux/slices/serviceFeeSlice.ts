import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ServiceFee, RootState } from '../../types';

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
  'serviceFees/fetchServiceFees',
  async () => {
    // Simulated API call
    const response = await fetch('/api/serviceFees');
    return await response.json();
  }
);

export const addServiceFee = createAsyncThunk(
  'serviceFees/addServiceFee',
  async (fee: Omit<ServiceFee, 'id'>) => {
    // Simulated API call
    const response = await fetch('/api/serviceFees', {
      method: 'POST',
      body: JSON.stringify(fee),
    });
    return await response.json();
  }
);

export const updateServiceFee = createAsyncThunk(
  'serviceFees/updateServiceFee',
  async (fee: Partial<ServiceFee> & { id: number }) => {
    // Simulated API call
    const response = await fetch(`/api/serviceFees/${fee.id}`, {
      method: 'PUT',
      body: JSON.stringify(fee),
    });
    return await response.json();
  }
);

const serviceFeeSlice = createSlice({
  name: 'serviceFees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceFees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchServiceFees.fulfilled,
        (state, action: PayloadAction<ServiceFee[]>) => {
          state.status = 'succeeded';
          state.serviceFees = action.payload;
        }
      )
      .addCase(fetchServiceFees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(
        addServiceFee.fulfilled,
        (state, action: PayloadAction<ServiceFee>) => {
          state.serviceFees.push(action.payload);
        }
      )
      .addCase(
        updateServiceFee.fulfilled,
        (state, action: PayloadAction<ServiceFee>) => {
          const index = state.serviceFees.findIndex(
            (fee) => fee.id === action.payload.id
          );
          if (index !== -1) {
            state.serviceFees[index] = action.payload;
          }
        }
      );
  },
});

export const selectServiceFees = (state: RootState) =>
  state.serviceFee.serviceFees;
export const selectServiceFeeStatus = (state: RootState) =>
  state.serviceFee.status;
export const selectServiceFeeError = (state: RootState) =>
  state.serviceFee.error;

export default serviceFeeSlice.reducer;
