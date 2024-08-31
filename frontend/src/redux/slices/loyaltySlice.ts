import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LoyaltyState, LoyaltyReward, LoyaltyConfig } from '../../types';
import { loyaltyService } from '../../services/loyaltyService';

// Initial state
const initialState: LoyaltyState = {
  rewards: [],
  config: { tiers: [] },
  userPoints: 0,
  status: 'idle',
  error: null,
};

// Async thunk to fetch loyalty rewards from the API
export const fetchLoyaltyRewards = createAsyncThunk(
  'loyalty/fetchRewards',
  async () => {
    return await loyaltyService.getLoyaltyRewards();
  }
);

// Async thunk to create loyalty reward
export const createLoyaltyReward = createAsyncThunk(
  'loyalty/createReward',
  async (rewardData: Partial<LoyaltyReward>) => {
    return await loyaltyService.createLoyaltyReward(rewardData);
  }
);

// Async thunk to update loyalty reward
export const updateLoyaltyReward = createAsyncThunk(
  'loyalty/updateReward',
  async (rewardData: LoyaltyReward) => {
    return await loyaltyService.updateLoyaltyReward(rewardData);
  }
);

// Async thunk to delete loyalty reward
export const deleteLoyaltyReward = createAsyncThunk(
  'loyalty/deleteReward',
  async (id: number) => {
    await loyaltyService.deleteLoyaltyReward(id);
    return id;
  }
);

// Async thunk to fetch loyalty configuration from the API
export const fetchLoyaltyConfig = createAsyncThunk(
  'loyalty/fetchConfig',
  async () => {
    return await loyaltyService.getLoyaltyConfig();
  }
);

// Async thunk to update loyalty configuration
export const updateLoyaltyConfig = createAsyncThunk(
  'loyalty/updateConfig',
  async (configData: LoyaltyConfig) => {
    return await loyaltyService.updateLoyaltyConfig(configData);
  }
);

// Loyalty slice
const loyaltySlice = createSlice({
  name: 'loyalty',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoyaltyRewards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoyaltyRewards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rewards = action.payload;
      })
      .addCase(fetchLoyaltyRewards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(createLoyaltyReward.fulfilled, (state, action) => {
        state.rewards.push(action.payload);
      })
      .addCase(updateLoyaltyReward.fulfilled, (state, action) => {
        const index = state.rewards.findIndex(
          (reward) => reward.id === action.payload.id
        );
        if (index !== -1) {
          state.rewards[index] = action.payload;
        }
      })
      .addCase(deleteLoyaltyReward.fulfilled, (state, action) => {
        state.rewards = state.rewards.filter(
          (reward) => reward.id !== action.payload
        );
      })
      .addCase(fetchLoyaltyConfig.fulfilled, (state, action) => {
        state.config = action.payload;
      })
      .addCase(updateLoyaltyConfig.fulfilled, (state, action) => {
        state.config = action.payload;
      });
  },
});

// Selectors
export const selectLoyaltyRewards = (state: LoyaltyState) => state.rewards;
export const selectLoyaltyConfig = (state: LoyaltyState) => state.config;
export const selectLoyaltyStatus = (state: LoyaltyState) => state.status;
export const selectLoyaltyError = (state: LoyaltyState) => state.error;

// Actions and reducer
export default loyaltySlice.reducer;
