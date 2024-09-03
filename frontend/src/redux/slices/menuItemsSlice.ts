import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MenuItem } from '../../types/menuTypes';
import { menuApi } from '../../api/menuApi';

interface MenuItemsState {
  items: MenuItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MenuItemsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchMenuItemsAsync = createAsyncThunk(
  'menuItems/fetchMenuItems',
  async (locationId: string) => {
    const response = await menuApi.getMenuItems(locationId);
    return response.data;
  }
);

const menuItemsSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuItemsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenuItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default menuItemsSlice.reducer;
