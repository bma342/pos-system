import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Fetch roles from the backend
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async () => {
  const response = await axios.get('/roles');
  return response.data;
});

// Add a new role
export const addRole = createAsyncThunk('roles/addRole', async (roleData) => {
  const response = await axios.post('/roles', roleData);
  return response.data;
});

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
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
        state.error = action.error.message;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      });
  },
});

export default rolesSlice.reducer;
