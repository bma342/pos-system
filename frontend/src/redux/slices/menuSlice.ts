import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  // Add other properties as needed
}

interface Menu {
  id: string;
  name: string;
  items: MenuItem[];
}

interface MenuState {
  menus: Menu[];
  // Add other state properties as needed
}

const initialState: MenuState = {
  menus: [],
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const updatedItem = action.payload;
      const menuIndex = state.menus.findIndex((menu) => menu.items.some(item => item.id === updatedItem.id));
      if (menuIndex !== -1) {
        state.menus[menuIndex].items = state.menus[menuIndex].items.map(
          (item) => item.id === updatedItem.id ? updatedItem : item
        );
      }
    },
    // Add other reducers as needed
  },
});

export const { updateMenuItem } = menuSlice.actions;

export const selectMenus = (state: RootState) => state.menu.menus;

export const fetchMenus = createAsyncThunk('menu/fetchMenus', async () => {
  // Fetch logic here
});

export const updateMenu = createAsyncThunk('menu/updateMenu', async (menu: Menu) => {
  // Update logic here
});

export default menuSlice.reducer;
