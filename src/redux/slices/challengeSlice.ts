import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Challenge } from '../../types/challengeTypes';
import * as challengeApi from '../../api/challengeApi';

interface ChallengeState {
  challenges: Challenge[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ChallengeState = {
  challenges: [],
  status: 'idle',
  error: null,
};

export const fetchChallenges = createAsyncThunk(
  'challenges/fetchChallenges',
  async () => {
    return await challengeApi.getChallenges();
  }
);

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallenges.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.challenges = action.payload;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default challengeSlice.reducer;