import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ChallengeType = 'purchase' | 'visit' | 'referral';
export type ChallengeStatus = 'active' | 'inactive';

export interface Challenge {
  id: string;
  name: string;
  description: string;
  challengeType: ChallengeType;
  targetValue: number;
  reward: number;
  status: ChallengeStatus;
}

interface ChallengeState {
  challenges: Challenge[];
  loading: boolean;
  error: string | null;
}

const initialState: ChallengeState = {
  challenges: [],
  loading: false,
  error: null,
};

const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    fetchChallenges: (state) => {
      state.loading = true;
    },
    fetchChallengesSuccess: (state, action: PayloadAction<Challenge[]>) => {
      state.challenges = action.payload;
      state.loading = false;
    },
    fetchChallengesFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    createChallenge: (state, action: PayloadAction<Challenge>) => {
      state.challenges.push(action.payload);
    },
    updateChallenge: (state, action: PayloadAction<Challenge>) => {
      const index = state.challenges.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        state.challenges[index] = action.payload;
      }
    },
  },
});

export const {
  fetchChallenges,
  fetchChallengesSuccess,
  fetchChallengesFailure,
  createChallenge,
  updateChallenge,
} = challengeSlice.actions;

export default challengeSlice.reducer;
