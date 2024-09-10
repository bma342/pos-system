import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Role } from '../../types/roleTypes';
import { roleApi } from '../../api/roleApi';

interface RoleState {
  roles: Role[];
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  roles: [],
  loading: false,
  error: null,
};

export const fetchRoles = createAsyncThunk('role/fetchRoles', async () => {
  return await roleApi.getRoles();
});

export const createRole = createAsyncThunk('role/createRole', async (role: Omit<Role, 'id'>) => {
  return await roleApi.createRole(role);
});

export const updateRole = createAsyncThunk('role/updateRole', async (role: Role) => {
  return await roleApi.updateRole(role);
});

export const deleteRole = createAsyncThunk('role/deleteRole', async (roleId: string) => {
  await roleApi.deleteRole(roleId);
  return roleId;
});

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const index = state.roles.findIndex(role => role.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter(role => role.id !== action.payload);
      });
  },
});

export default roleSlice.reducer;
