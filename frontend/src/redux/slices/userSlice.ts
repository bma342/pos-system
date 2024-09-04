import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchUsers } from 'frontend/src/api/userApi';

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'global_admin' | 'client_admin' | 'restaurant_manager' | 'staff';
  clientId?: string;
  restaurantName?: string;
  cuisineType?: string;
  phoneNumber?: string;
  address?: string;
  timeZone?: string;
}

interface UserState {
  currentUser: User | null;
  selectedLocation: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  selectedLocation: null,
  loading: false,
  error: null,
};

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await api.put('/user/profile', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setSelectedLocation: (state, action: PayloadAction<string | null>) => {
      state.selectedLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentUser, setSelectedLocation } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectSelectedLocation = (state: RootState) => state.user.selectedLocation;

export default userSlice.reducer;
