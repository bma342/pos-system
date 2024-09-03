import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Menu } from '../../types';
import { menuService } from '../../services/menuService';

export const fetchMenus = createAsyncThunk(
  'menu/fetchMenus',
  async (clientId: string) => {
    const menus = await menuService.getMenus(clientId);
    return menus;
  }
);

export const updateMenu = createAsyncThunk(
  'menu/updateMenu',
  async ({ clientId, menuId, menuData }: { clientId: string; menuId: string; menuData: Menu }) => {
    const updatedMenu = await menuService.updateMenu(clientId, menuId, menuData);
    return updatedMenu;
  }
);

// ... rest of the slice definition
