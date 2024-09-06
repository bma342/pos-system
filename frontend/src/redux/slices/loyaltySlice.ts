import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LoyaltyReward, LoyaltyConfig } from '../../types/loyaltyTypes';
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
  async ({ clientId, locationId }: { clientId: string; locationId?: string }, { rejectWithValue }) => {
    try {
      return await loyaltyService.getLoyaltyRewards(clientId, locationId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createLoyaltyReward = createAsyncThunk(
  'loyalty/createReward',
  async ({ clientId, locationId, reward }: { clientId: string; locationId?: string; reward: LoyaltyReward }, { rejectWithValue }) => {
    try {
      return await loyaltyService.createLoyaltyReward(clientId, locationId, reward);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateLoyaltyReward = createAsyncThunk(
  'loyalty/updateReward',
  async (reward: LoyaltyReward, { rejectWithValue }) => {
    try {
      return await loyaltyService.updateLoyaltyReward(reward);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteLoyaltyReward = createAsyncThunk(
  'loyalty/deleteReward',
  async (rewardId: string, { rejectWithValue }) => {
    try {
      await loyaltyService.deleteLoyaltyReward(rewardId);
      return rewardId;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchLoyaltyConfig = createAsyncThunk(
  'loyalty/fetchConfig',
  async (_, { rejectWithValue }) => {
    try {
      return await loyaltyService.getLoyaltyConfig();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateLoyaltyConfig = createAsyncThunk(
  'loyalty/updateConfig',
  async (config: LoyaltyConfig, { rejectWithValue }) => {
    try {
      return await loyaltyService.updateLoyaltyConfig(config);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
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
        state.error = action.payload as string;
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
      .addCase(deleteLoyaltyReward.fulfilled, (state, action: PayloadAction<string>) => {
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

export const selectLoyaltyRewardsByLocation = (state: RootState, locationId: string) => 
  state.loyalty.rewards.filter(reward => (reward as any).locationId === locationId);

export default loyaltySlice.reducer;
