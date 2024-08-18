import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

// Fetch roles from the backend
export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/roles');
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error; // Handle network errors
    }
    return rejectWithValue(error.response.data);
  }
});

// Add a new role
export const addRole = createAsyncThunk('roles/addRole', async (roleData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/roles', roleData);
    return response.data;
  } catch (error) {
    if (!error.response) {
      throw error; // Handle network errors
    }
    return rejectWithValue(error.response.data);
  }
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
        state.error = action.payload || 'Failed to fetch roles.';
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      });
  },
});

export default rolesSlice.reducer;

