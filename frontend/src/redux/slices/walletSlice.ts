import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLoyaltyRewards, fetchWalletDiscounts } from '../../api/walletApi';
import { RootState } from '../store';
import { LoyaltyReward, Discount } from '../../types';

// Define the initial state
interface WalletState {
  balance: number;
  rewards: LoyaltyReward[];
  discounts: Discount[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WalletState = {
  balance: 0,
  rewards: [],
  discounts: [],
  status: 'idle',
  error: null,
};

// Create a thunk to load wallet data
export const loadWalletData = createAsyncThunk(
  'wallet/loadWalletData',
  async (_, { rejectWithValue }) => {
    try {
      const [rewards, discounts] = await Promise.all([
        fetchLoyaltyRewards(),
        fetchWalletDiscounts(),
      ]);
      return { rewards, discounts };
    } catch (error) {
      return rejectWithValue('Failed to load wallet data');
    }
  }
);
// Create the slice
const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    updateWalletBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    addLoyaltyReward: (state, action: PayloadAction<LoyaltyReward>) => {
      state.rewards.push(action.payload);
    },
    addDiscount: (state, action: PayloadAction<Discount>) => {
      state.discounts.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadWalletData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadWalletData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rewards = action.payload.rewards;
        state.discounts = action.payload.discounts;
      })
      .addCase(loadWalletData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Export selectors and actions
export const { updateWalletBalance, addLoyaltyReward, addDiscount } =
  walletSlice.actions;

export const selectWalletBalance = (state: RootState) => state.wallet.balance;
export const selectWalletRewards = (state: RootState) => state.wallet.rewards;
export const selectWalletDiscounts = (state: RootState) =>
  state.wallet.discounts;

export default walletSlice.reducer;
