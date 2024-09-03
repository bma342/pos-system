import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Menu, MenuStatistics } from '../../types/menuTypes';
import { menuApi } from '../../api/menuApi';

interface MenuState {
  currentMenu: Menu | null;
  menuStatistics: MenuStatistics | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  currentMenu: null,
  menuStatistics: null,
  loading: false,
  error: null,
};

export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (clientId: string, { rejectWithValue }) => {
    try {
      const menu = await menuApi.getMenu(clientId);
      return menu;
    } catch (error) {
      return rejectWithValue('Failed to fetch menu');
    }
  }
);

export const fetchMenuStatistics = createAsyncThunk(
  'menu/fetchMenuStatistics',
  async (clientId: string, { rejectWithValue }) => {
    try {
      const statistics = await menuApi.getMenuStatistics(clientId);
      return statistics;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMenu = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMenuStatistics.fulfilled, (state, action) => {
        state.menuStatistics = action.payload;
      });
  },
});

export default menuSlice.reducer;
