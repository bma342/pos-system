import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { Menu, MenuStatistics } from '../../types/menuTypes';
import { menuService } from '../../services/menuService'; // Corrected import

interface MenuState {
  menu: Menu | null;
  statistics: MenuStatistics | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MenuState = {
  menu: null,
  statistics: null,
  status: 'idle',
  error: null,
};

export const fetchMenu = createAsyncThunk<
  Menu,
  string,
  { rejectValue: string }
>(
  'menu/fetchMenu',
  async (locationId, { rejectWithValue }) => {
    try {
      const menu = await menuService.getMenu(locationId);
      return menu;
    } catch (error) {
      return rejectWithValue('Failed to fetch menu');
    }
  }
);

export const updateMenu = createAsyncThunk<
  Menu,
  { locationId: string; menuId: string; menuData: Partial<Menu> },
  { rejectValue: string }
>(
  'menu/updateMenu',
  async ({ locationId, menuId, menuData }, { rejectWithValue }) => {
    try {
      const updatedMenu = await menuService.updateMenu(locationId, menuId, menuData);
      return updatedMenu;
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
        state.menu = action.payload;
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
        state.menu = action.payload;
      })
      .addCase(updateMenu.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const selectMenu = (state: RootState) => state.menu.menu;
export const selectMenuStatus = (state: RootState) => state.menu.status;
export const selectMenuError = (state: RootState) => state.menu.error;

export default menuSlice.reducer;
