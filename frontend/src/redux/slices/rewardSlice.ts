import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { rewardService } from '../../services/rewardService';

export const fetchGuestRewards = createAsyncThunk(
  'rewards/fetchGuestRewards',
  async (guestId: string) => {
    const rewards = await rewardService.getGuestRewards(guestId);
    return rewards;
  }
);

const rewardSlice = createSlice({
  name: 'rewards',
  initialState: {
    guestRewards: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuestRewards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGuestRewards.fulfilled, (state, action) => {
        state.loading = false;
        state.guestRewards = action.payload;
      })
      .addCase(fetchGuestRewards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rewardSlice.reducer;