import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoyaltyReward, LoyaltyConfig } from '../../types';
import { loyaltyService } from '../../services/loyaltyService';

interface LoyaltyState {
  rewards: LoyaltyReward[];
  config: LoyaltyConfig | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: LoyaltyState = {
  rewards: [],
  config: null,
  status: 'idle',
  error: null,
};

export const fetchLoyaltyRewards = createAsyncThunk(
  'loyalty/fetchRewards',
  async () => {
    const response = await loyaltyService.getLoyaltyRewards();
    return response;
  }
);

export const createLoyaltyReward = createAsyncThunk(
  'loyalty/createReward',
  async (reward: Partial<LoyaltyReward>) => {
    const response = await loyaltyService.createLoyaltyReward(reward);
    return response;
  }
);

export const updateLoyaltyReward = createAsyncThunk(
  'loyalty/updateReward',
  async (reward: LoyaltyReward) => {
    const response = await loyaltyService.updateLoyaltyReward(reward);
    return response;
  }
);

export const deleteLoyaltyReward = createAsyncThunk(
  'loyalty/deleteReward',
  async (rewardId: number) => {
    await loyaltyService.deleteLoyaltyReward(rewardId);
    return rewardId;
  }
);

export const fetchLoyaltyConfig = createAsyncThunk(
  'loyalty/fetchConfig',
  async () => {
    const response = await loyaltyService.getLoyaltyConfig();
    return response;
  }
);

export const updateLoyaltyConfig = createAsyncThunk(
  'loyalty/updateConfig',
  async (config: LoyaltyConfig) => {
    const response = await loyaltyService.updateLoyaltyConfig(config);
    return response;
  }
);

const loyaltySlice = createSlice({
  name: 'loyalty',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoyaltyRewards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoyaltyRewards.fulfilled, (state, action: PayloadAction<LoyaltyReward[]>) => {
        state.status = 'succeeded';
        state.rewards = action.payload;
      })
      .addCase(fetchLoyaltyRewards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch loyalty rewards';
      })
      .addCase(createLoyaltyReward.fulfilled, (state, action: PayloadAction<LoyaltyReward>) => {
        state.rewards.push(action.payload);
      })
      .addCase(updateLoyaltyReward.fulfilled, (state, action: PayloadAction<LoyaltyReward>) => {
        const index = state.rewards.findIndex((reward) => reward.id === action.payload.id);
        if (index !== -1) {
          state.rewards[index] = action.payload;
        }
      })
      .addCase(deleteLoyaltyReward.fulfilled, (state, action: PayloadAction<number>) => {
        state.rewards = state.rewards.filter((reward) => reward.id !== action.payload);
      })
      .addCase(fetchLoyaltyConfig.fulfilled, (state, action: PayloadAction<LoyaltyConfig>) => {
        state.config = action.payload;
      })
      .addCase(updateLoyaltyConfig.fulfilled, (state, action: PayloadAction<LoyaltyConfig>) => {
        state.config = action.payload;
      });
  },
});

export const selectLoyaltyRewards = (state: RootState) => state.loyalty.rewards;
export const selectLoyaltyConfig = (state: RootState) => state.loyalty.config;
export const selectLoyaltyStatus = (state: RootState) => state.loyalty.status;
export const selectLoyaltyError = (state: RootState) => state.loyalty.error;

export default loyaltySlice.reducer;