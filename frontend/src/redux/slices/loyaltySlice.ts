import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  RootState,
  LoyaltyReward,
  LoyaltyConfig,
  LoyaltyState,
} from '../../types'; // Updated path to the correct location

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
  'loyalty/fetchLoyaltyRewards',
  async (clientId: number): Promise<LoyaltyReward[]> => {
    const response = await axios.get(
      `/api/clients/${clientId}/loyalty/rewards`
    );
    return response.data;
  }
);

// Async thunk to fetch loyalty configuration from the API
export const fetchLoyaltyConfig = createAsyncThunk(
  'loyalty/fetchLoyaltyConfig',
  async (clientId: number): Promise<LoyaltyConfig> => {
    const response = await axios.get(`/api/clients/${clientId}/loyalty/config`);
    return response.data;
  }
);

// Async thunk to update loyalty configuration
export const updateLoyaltyConfig = createAsyncThunk(
  'loyalty/updateLoyaltyConfig',
  async ({
    clientId,
    config,
  }: {
    clientId: number;
    config: LoyaltyConfig;
  }): Promise<LoyaltyConfig> => {
    const response = await axios.put(
      `/api/clients/${clientId}/loyalty/config`,
      config
    );
    return response.data;
  }
);

// Loyalty slice
const loyaltySlice = createSlice({
  name: 'loyalty',
  initialState,
  reducers: {
    addReward: (state, action: PayloadAction<LoyaltyReward>) => {
      state.rewards.push(action.payload);
    },
    updateReward: (
      state,
      action: PayloadAction<{
        id: number;
        pointsRequired: number;
        isActive: boolean;
      }>
    ) => {
      const reward = state.rewards.find(
        (r: LoyaltyReward) => r.id === action.payload.id // Explicitly typed
      );
      if (reward) {
        reward.pointsRequired = action.payload.pointsRequired;
        reward.isActive = action.payload.isActive;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoyaltyRewards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoyaltyRewards.fulfilled, (state, action) => {
        state.rewards = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchLoyaltyRewards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch rewards';
      })
      .addCase(fetchLoyaltyConfig.fulfilled, (state, action) => {
        state.config = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateLoyaltyConfig.fulfilled, (state, action) => {
        state.config = action.payload;
      });
  },
});

// Selectors
export const selectLoyaltyRewards = (state: RootState) => state.loyalty.rewards;
export const selectLoyaltyConfig = (state: RootState) => state.loyalty.config;
export const selectLoyaltyStatus = (state: RootState) => state.loyalty.status;
export const selectLoyaltyError = (state: RootState) => state.loyalty.error;

// Actions and reducer
export const { addReward, updateReward } = loyaltySlice.actions;
export default loyaltySlice.reducer;
