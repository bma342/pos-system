import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';
import { Menu, MenuItem, MenuGroup } from '../../types/menuTypes';

interface MenuItemsState {
  items: MenuItem[];
}

const initialState: MenuItemsState = {
  items: [],
};

const menuItemsSlice = createSlice({
  name: 'menuItems',
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<Menu>) => {
      const menu = action.payload;
      const allItems = menu.menuGroups.flatMap((group: MenuGroup) => group.items);
      state.items = allItems;
    },
  },
});

export const { setMenuItems } = menuItemsSlice.actions;

export const selectMenuItems = (state: RootState) => state.menuItems.items;

export default menuItemsSlice.reducer;
