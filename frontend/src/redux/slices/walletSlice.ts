import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
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

// Ensure this async thunk is exported
export const loadWalletData = createAsyncThunk(
  'wallet/loadData',
  async (_, { rejectWithValue }) => {
    try {
      // Replace this with your actual API call
      const response = await fetch('/api/wallet');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Failed to load wallet data');
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

// Export the reducer
export default walletSlice.reducer;

// Export selectors
export const selectWalletBalance = (state: RootState) => state.wallet.balance;
export const selectWalletRewards = (state: RootState) => state.wallet.rewards;
export const selectWalletDiscounts = (state: RootState) => state.wallet.discounts;
export const selectWalletLoading = (state: RootState) => state.wallet.loading;
export const selectWalletError = (state: RootState) => state.wallet.error;
