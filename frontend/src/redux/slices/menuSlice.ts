import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { Menu, MenuStatistics, MenuItem, MenuGroup } from '../../types/menuTypes';
import { menuService } from '../../services/menuService';

interface MenuState {
  menuItems: MenuItem[];
  currentMenu: Menu | null;
  menuStatistics: MenuStatistics | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MenuState = {
  menuItems: [],
  currentMenu: null,
  menuStatistics: null,
  status: 'idle',
  error: null,
};

export const fetchMenu = createAsyncThunk<
  Menu,
  { clientId: string; locationId: string },
  { rejectValue: string }
>(
  'menu/fetchMenu',
  async ({ clientId, locationId }, { rejectWithValue }) => {
    try {
      return await menuService.getMenu(clientId, locationId);
    } catch (error) {
      return rejectWithValue('Failed to fetch menu');
    }
  }
);

export const updateMenu = createAsyncThunk<
  Menu,
  { clientId: string; locationId: string; menuData: Partial<Menu>; isClientAdmin?: boolean },
  { rejectValue: string }
>(
  'menu/updateMenu',
  async ({ clientId, locationId, menuData }, { rejectWithValue }) => {
    try {
      return await menuService.updateMenu(clientId, locationId, menuData);
    } catch (error) {
      return rejectWithValue('Failed to update menu');
    }
  }
);

export const fetchMenuStatistics = createAsyncThunk<
  MenuStatistics,
  { clientId: string; locationId: string },
  { rejectValue: string }
>(
  'menu/fetchMenuStatistics',
  async ({ clientId, locationId }, { rejectWithValue }) => {
    try {
      return await menuService.getMenuStatistics(clientId, locationId);
    } catch (error) {
      return rejectWithValue('Failed to fetch menu statistics');
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentMenu = action.payload;
        state.menuItems = action.payload.menuGroups?.flatMap((group: MenuGroup) => group.items) || [];
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(updateMenu.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMenu.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentMenu = action.payload;
        state.menuItems = action.payload.menuGroups?.flatMap((group: MenuGroup) => group.items) || [];
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchMenuStatistics.fulfilled, (state, action) => {
        state.menuStatistics = action.payload;
      });
  },
});

export const selectMenu = (state: RootState) => state.menu.currentMenu;
export const selectMenuItems = (state: RootState) => state.menu.menuItems;
export const selectMenuLoading = (state: RootState) => state.menu.status === 'loading';
export const selectMenuError = (state: RootState) => state.menu.error;
export const selectMenuStatistics = (state: RootState) => state.menu.menuStatistics;

export default menuSlice.reducer;
