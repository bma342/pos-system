import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { userService } from '../../services/userService';
import { User, UserRole } from '../../types/userTypes';

interface UserState {
  users: User[];
  currentUser: User | null;
  selectedLocation: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  selectedLocation: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], { clientId?: string; locationId?: string }, { rejectValue: string }>(
  'user/fetchUsers',
  async ({ clientId, locationId }, { rejectWithValue }) => {
    try {
      return await userService.fetchUsers(clientId, locationId);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateUserProfile = createAsyncThunk<User, Partial<User>, { rejectValue: string }>(
  'user/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      return await userService.updateUserProfile(userData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
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
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentUser && state.currentUser.id === action.payload.id) {
          state.currentUser = action.payload;
        }
        state.users = state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentUser, setSelectedLocation } = userSlice.actions;

export const selectUsers = (state: RootState) => state.user.users;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectSelectedLocation = (state: RootState) => state.user.selectedLocation;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;

export default userSlice.reducer;
