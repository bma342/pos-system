import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { Wallet, WalletTransaction, Reward, Discount } from '../../types/walletTypes';
import { walletService } from '../../services/walletService';

interface WalletState {
  balance: number;
  transactions: WalletTransaction[];
  rewards: Reward[];
  discounts: Discount[];
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  balance: 0,
  transactions: [],
  rewards: [],
  discounts: [],
  loading: false,
  error: null,
};

export const fetchWalletBalance = createAsyncThunk<number, { clientId: string; locationId?: string }>(
  'wallet/fetchBalance',
  async ({ clientId, locationId }, { rejectWithValue }) => {
    try {
      return await walletService.getBalance(clientId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchWalletTransactions = createAsyncThunk<
  WalletTransaction[],
  { clientId: string; locationId?: string; page: number; limit: number }
>(
  'wallet/fetchTransactions',
  async ({ clientId, locationId, page, limit }, { rejectWithValue }) => {
    try {
      return await walletService.getTransactions(clientId, locationId, page, limit);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchWalletRewards = createAsyncThunk<Reward[], { clientId: string; locationId?: string }>(
  'wallet/fetchRewards',
  async ({ clientId, locationId }, { rejectWithValue }) => {
    try {
      return await walletService.getRewards(clientId, locationId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchWalletDiscounts = createAsyncThunk<Discount[], { clientId: string; locationId?: string }>(
  'wallet/fetchDiscounts',
  async ({ clientId, locationId }, { rejectWithValue }) => {
    try {
      return await walletService.getDiscounts(clientId, locationId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const loadWalletData = createAsyncThunk<void, { clientId: string; locationId?: string }>(
  'wallet/loadWalletData',
  async ({ clientId, locationId }, { dispatch }) => {
    await dispatch(fetchWalletBalance({ clientId, locationId }));
    await dispatch(fetchWalletTransactions({ clientId, locationId, page: 1, limit: 10 }));
    await dispatch(fetchWalletRewards({ clientId, locationId }));
    await dispatch(fetchWalletDiscounts({ clientId, locationId }));
  }
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
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
      .addCase(fetchWalletTransactions.fulfilled, (state, action: PayloadAction<WalletTransaction[]>) => {
        state.transactions = action.payload;
      })
      .addCase(fetchWalletRewards.fulfilled, (state, action: PayloadAction<Reward[]>) => {
        state.rewards = action.payload;
      })
      .addCase(fetchWalletDiscounts.fulfilled, (state, action: PayloadAction<Discount[]>) => {
        state.discounts = action.payload;
      });
  },
});

export const selectWalletBalance = (state: RootState) => state.wallet.balance;
export const selectWalletTransactions = (state: RootState) => state.wallet.transactions;
export const selectWalletRewards = (state: RootState) => state.wallet.rewards;
export const selectWalletDiscounts = (state: RootState) => state.wallet.discounts;
export const selectWalletLoading = (state: RootState) => state.wallet.loading;
export const selectWalletError = (state: RootState) => state.wallet.error;

export default walletSlice.reducer;
