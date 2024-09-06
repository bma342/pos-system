import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { MenuItem } from '../../types/menuTypes';
import { RootState } from '../store';
import menuService from '../../services/menuItemService'; // Correct import

export interface MenuItemsState {
  items: MenuItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedGroupId: string | null;
}

const initialState: MenuItemsState = {
  items: [],
  status: 'idle',
  error: null,
  selectedGroupId: null,
};

export const fetchMenuItemsAsync = createAsyncThunk(
  'menuItems/fetchMenuItems',
  async ({ clientId, locationId }: { clientId: string; locationId: string }) => {
    const response = await menuService.getAllMenuItems(clientId, locationId); // Correct usage
    return response;
  }
);

const menuItemsSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {
    setSelectedGroup: (state, action: PayloadAction<string | null>) => {
      state.selectedGroupId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenuItemsAsync.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMenuItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch menu items';
      });
  },
});

export const { setSelectedGroup } = menuItemsSlice.actions;

export default menuItemsSlice.reducer;
