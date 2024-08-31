import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMenuItems } from '../../api/menuApi';
import { MenuItem } from '../../types';

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
    const response = await fetchMenuItems(locationId);
    return response;
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
        state.error = action.error.message || null;
      });
  },
});

export default menuItemsSlice.reducer;
