import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MenuItem, Category } from '../../types/menuTypes';
import { MenuItemService } from '../../services/MenuItemService';

interface MenuItemsState {
  items: MenuItem[];
  categories: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MenuItemsState = {
  items: [],
  categories: [],
  status: 'idle',
  error: null,
};

export const fetchMenuItemsAsync = createAsyncThunk(
  'menuItems/fetchMenuItems',
  async (locationId: string) => {
    return await MenuItemService.getMenuItems(locationId);
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  'menuItems/fetchCategories',
  async (locationId: string) => {
    return await MenuItemService.getCategories(locationId);
  }
);

// Add other async thunks for create, update, delete operations

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
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
    // Add cases for other async thunks
  },
});

export default menuItemsSlice.reducer;