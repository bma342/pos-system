import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { serviceFeeService } from '../../services/serviceFeeService';

interface ServiceFee {
  id: string;
  name: string;
  amount: number;
  type: 'FIXED' | 'PERCENTAGE';
}

interface ServiceFeeState {
  fees: ServiceFee[];
  loading: boolean;
  error: string | null;
}

const initialState: ServiceFeeState = {
  fees: [],
  loading: false,
  error: null,
};

export const fetchServiceFees = createAsyncThunk(
  'serviceFees/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const fees = await serviceFeeService.getAllFees();
      return fees;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const serviceFeeSlice = createSlice({
  name: 'serviceFees',
  initialState,
  reducers: {
    addServiceFee: (state, action: PayloadAction<ServiceFee>) => {
      state.fees.push(action.payload);
    },
    updateServiceFee: (state, action: PayloadAction<ServiceFee>) => {
      const index = state.fees.findIndex(fee => fee.id === action.payload.id);
      if (index !== -1) {
        state.fees[index] = action.payload;
      }
    },
    removeServiceFee: (state, action: PayloadAction<string>) => {
      state.fees = state.fees.filter(fee => fee.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceFees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceFees.fulfilled, (state, action) => {
        state.loading = false;
        state.fees = action.payload;
      })
      .addCase(fetchServiceFees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addServiceFee, updateServiceFee, removeServiceFee } = serviceFeeSlice.actions;

export const selectServiceFees = (state: RootState) => state.serviceFees.fees;
export const selectServiceFeesLoading = (state: RootState) => state.serviceFees.loading;
export const selectServiceFeesError = (state: RootState) => state.serviceFees.error;

export default serviceFeeSlice.reducer;
