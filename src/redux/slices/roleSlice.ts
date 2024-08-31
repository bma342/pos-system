import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Role } from '../../types/roleTypes';
import * as roleApi from '../../api/roleApi';

interface RoleState {
  roles: Role[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  status: 'idle',
  error: null,
};

export const fetchRoles = createAsyncThunk('role/fetchRoles', async () => {
  const response = await roleApi.getRoles();
  return response;
});

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    addRole: (state, action: PayloadAction<Role>) => {
      state.roles.push(action.payload);
    },
    updateRole: (state, action: PayloadAction<Role>) => {
      const index = state.roles.findIndex((role) => role.id === action.payload.id);
      if (index !== -1) {
        state.roles[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectRoles = (state: RootState) => state.role.roles;
export const selectRoleStatus = (state: RootState) => state.role.status;
export const selectRoleError = (state: RootState) => state.role.error;

export const { addRole, updateRole } = roleSlice.actions;

export default roleSlice.reducer;