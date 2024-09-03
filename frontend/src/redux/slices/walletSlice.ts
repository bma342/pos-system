import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { walletService } from '../../services/walletService';
import { Wallet, WalletTransaction } from '../../types';

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

export const fetchWallet = createAsyncThunk(
  'wallet/fetchWallet',
  async (userId: string, { rejectWithValue }) => {
    try {
      const wallet = await walletService.getWallet(userId);
      return wallet;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'wallet/fetchTransactions',
  async (walletId: string, { rejectWithValue }) => {
    try {
      const transactions = await walletService.getTransactions(walletId);
      return transactions;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload;
    },
    setRewards(state, action: PayloadAction<Reward[]>) {
      state.rewards = action.payload;
    },
    setDiscounts(state, action: PayloadAction<Discount[]>) {
      state.discounts = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setBalance, setRewards, setDiscounts, setLoading, setError } = walletSlice.actions;

// Selectors
export const selectWalletBalance = (state: RootState): number => state.wallet.balance;
export const selectWalletRewards = (state: RootState): Reward[] => state.wallet.rewards;
export const selectWalletDiscounts = (state: RootState): Discount[] => state.wallet.discounts;

// Async thunk for loading wallet data
export const loadWalletData = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    // Fetch wallet data from API
    const response = await fetch('/api/wallet');
    const data = await response.json();
    
    dispatch(setBalance(data.balance));
    dispatch(setRewards(data.rewards));
    dispatch(setDiscounts(data.discounts));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default walletSlice.reducer;
