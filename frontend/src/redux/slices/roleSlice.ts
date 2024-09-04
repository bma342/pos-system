import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

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
});

export const selectRoles = (state: RootState) => state.role.roles;
export const selectRoleStatus = (state: RootState) => state.role.status;
export const selectRoleError = (state: RootState) => state.role.error;

export const { addRole, updateRole } = roleSlice.actions;

export default roleSlice.reducer;
