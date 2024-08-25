import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Menu, MenuState } from '../../types';
import * as menuApi from '../../api/menuApi';

const initialState: MenuState = {
  menus: [],
  status: 'idle',
  error: null,
};

export const fetchMenus = createAsyncThunk(
  'menu/fetchMenus',
  async (clientId: number) => {
    const response = await menuApi.fetchMenus(clientId);
    return response;
  }
);

export const updateMenu = createAsyncThunk(
  'menu/updateMenu',
  async ({
    clientId,
    menuId,
    menuData,
  }: {
    clientId: number;
    menuId: number;
    menuData: Partial<Menu>;
  }) => {
    const response = await menuApi.updateMenu(clientId, menuId, menuData);
    return response;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    // Define any additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMenus.fulfilled, (state, action: PayloadAction<Menu[]>) => {
        state.status = 'succeeded';
        state.menus = action.payload;
      })
      .addCase(fetchMenus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch menus';
      })
      .addCase(updateMenu.fulfilled, (state, action: PayloadAction<Menu>) => {
        // Assuming you want to update a menu in the state
        const updatedMenu = action.payload;
        const index = state.menus.findIndex(
          (menu) => menu.id === updatedMenu.id
        );
        if (index !== -1) {
          state.menus[index] = updatedMenu;
        }
      });
  },
});

export const menuActions = {
  fetchMenus,
  updateMenu,
};

export default menuSlice.reducer;
