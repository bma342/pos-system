import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { Menu, MenuStatistics, MenuItem } from '../../types/menuTypes';
import { menuService } from '../../services/menuService';

interface MenuState {
  menuItems: MenuItem[];
  currentMenu: Menu | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MenuState = {
  menuItems: [],
  currentMenu: null,
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
  { clientId: string; locationId: string; menuData: Partial<Menu> },
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
        state.menuItems = action.payload.menuGroups.flatMap(group => group.items);
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
        state.menuItems = action.payload.menuGroups.flatMap(group => group.items);
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectMenu = (state: RootState) => state.menu.currentMenu;
export const selectMenuItems = (state: RootState) => state.menu.menuItems;
export const selectMenuLoading = (state: RootState) => state.menu.status === 'loading';
export const selectMenuError = (state: RootState) => state.menu.error;

export default menuSlice.reducer;
