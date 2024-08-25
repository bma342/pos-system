import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState, User } from '../../types';
import axios from 'axios';

interface UserState {
  profile: User | null;
  rewards: { id: number; description: string; points: number }[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  rewards: [],
  status: 'idle',
  error: null,
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async () => {
    const response = await axios.get<User>('/api/user/profile');
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData: Partial<User>) => {
    const response = await axios.put<User>('/api/user/profile', userData);
    return response.data;
  }
);

export const fetchUserRewards = createAsyncThunk(
  'user/fetchUserRewards',
  async () => {
    const response =
      await axios.get<{ id: number; description: string; points: number }[]>(
        '/api/user/rewards'
      );
    return response.data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = 'succeeded';
          state.profile = action.payload;
        }
      )
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user profile';
      })
      .addCase(
        updateUserProfile.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.profile = action.payload;
        }
      )
      .addCase(fetchUserRewards.fulfilled, (state, action) => {
        state.rewards = action.payload;
      });
  },
});

export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserRewards = (state: RootState) => state.user.rewards;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
