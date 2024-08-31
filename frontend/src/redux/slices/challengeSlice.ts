import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Challenge } from '../../types';
import { getChallenges, createChallenge, updateChallenge, deleteChallenge } from '../../api/challengeApi';

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

export const fetchChallenges = createAsyncThunk('challenges/fetchChallenges', async () => {
  return await getChallenges();
});

export const addChallenge = createAsyncThunk('challenges/addChallenge', async (challenge: Omit<Challenge, 'id' | 'createdAt' | 'updatedAt'>) => {
  return await createChallenge(challenge);
});

export const editChallenge = createAsyncThunk('challenges/editChallenge', async ({ id, challenge }: { id: number; challenge: Partial<Challenge> }) => {
  return await updateChallenge(id, challenge);
});

export const removeChallenge = createAsyncThunk('challenges/removeChallenge', async (id: number) => {
  await deleteChallenge(id);
  return id;
});

const challengeSlice = createSlice({
  name: 'challenges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallenges.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChallenges.fulfilled, (state, action: PayloadAction<Challenge[]>) => {
        state.status = 'succeeded';
        state.challenges = action.payload;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addChallenge.fulfilled, (state, action: PayloadAction<Challenge>) => {
        state.challenges.push(action.payload);
      })
      .addCase(editChallenge.fulfilled, (state, action: PayloadAction<Challenge>) => {
        const index = state.challenges.findIndex((challenge) => challenge.id === action.payload.id);
        if (index !== -1) {
          state.challenges[index] = action.payload;
        }
      })
      .addCase(removeChallenge.fulfilled, (state, action: PayloadAction<number>) => {
        state.challenges = state.challenges.filter((challenge) => challenge.id !== action.payload);
      });
  },
});

export default challengeSlice.reducer;
