import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AuthService } from '../../services/authService';
import { User } from '../../types/userTypes';
import { UserRole } from '../../types/userTypes';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  currentUser: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  status: 'idle',
  error: null,
  currentUser: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData: { username: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const user = await AuthService.register(userData);
      return user;
    } catch (error) {
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { user, token } = await AuthService.login(credentials);
      return { user, token };
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    setUserRole: (state, action: PayloadAction<User['role']>) => {
      if (state.user) {
        state.user.role = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { logout, setCredentials, setUserRole } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUserRole = (state: RootState): UserRole | undefined => state.auth.user?.role;

export default authSlice.reducer;
