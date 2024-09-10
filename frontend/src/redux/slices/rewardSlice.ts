import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rewardService } from '../../services/rewardService';

interface FetchGuestRewardsParams {
  guestId: string;
  clientId: string;
}

export const fetchGuestRewards = createAsyncThunk(
  'rewards/fetchGuestRewards',
  async ({ guestId, clientId }: FetchGuestRewardsParams, { rejectWithValue }) => {
    try {
      const rewards = await rewardService.getGuestRewards(guestId, clientId);
      return rewards;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const rewardSlice = createSlice({
  name: 'rewards',
  initialState: {
    guestRewards: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuestRewards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuestRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.guestRewards = action.payload;
        state.error = null;
      })
      .addCase(fetchGuestRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An error occurred';
      });
  },
});

export default rewardSlice.reducer;