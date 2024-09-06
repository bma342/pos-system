import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { roleService } from '../../services/roleService';
import { Role } from '../../types/roleTypes';

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

export const fetchRoles = createAsyncThunk<Role[], void, { rejectValue: string }>(
  'roles/fetchRoles',
  async (_, { rejectWithValue }) => {
    try {
      return await roleService.fetchRoles();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, action: PayloadAction<Role>) => {
      state.roles.push(action.payload);
    },
    updateRole: (
      state,
      action: PayloadAction<{ id: string; permissions: string[] }>
    ) => {
      const role = state.roles.find((r) => r.id === action.payload.id);
      if (role) {
        role.permissions = action.payload.permissions;
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
        state.error = action.payload || 'Failed to fetch roles';
      });
  },
});

export const selectRoles = (state: RootState) => state.role.roles;
export const selectRoleStatus = (state: RootState) => state.role.status;
export const selectRoleError = (state: RootState) => state.role.error;

export const { addRole, updateRole } = roleSlice.actions;

export default roleSlice.reducer;
