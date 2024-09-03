import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { walletService } from '../../services/walletService';
import { Wallet, WalletTransaction } from '../../types/walletTypes';

interface Reward {
  id: string;
  name: string;
  // Add other relevant properties
}

interface Discount {
  id: string;
  name: string;
  // Add other relevant properties
}

interface WalletState {
  balance: number;
  rewards: Reward[];
  discounts: Discount[];
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  balance: 0,
  rewards: [],
  discounts: [],
  loading: false,
  error: null,
};

export const fetchWalletBalance = createAsyncThunk(
  'wallet/fetchBalance',
  async (_, { rejectWithValue }) => {
    try {
      const balance = await walletService.getBalance();
      return balance;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const addFunds = createAsyncThunk(
  'wallet/addFunds',
  async (amount: number, { rejectWithValue }) => {
    try {
      const updatedBalance = await walletService.addFunds(amount);
      return updatedBalance;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    // Add any synchronous actions here
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWalletBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchWalletBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addFunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFunds.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(addFunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectWalletBalance = (state: RootState) => state.wallet.balance;
export const selectWalletLoading = (state: RootState) => state.wallet.loading;
export const selectWalletError = (state: RootState) => state.wallet.error;

export default walletSlice.reducer;
