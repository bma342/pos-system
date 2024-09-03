import { menuApi } from '../api/menuApi';
import { Menu, MenuStatistics } from '../types/menuTypes';

export const MenuService = {
  getMenu: async (clientId: string): Promise<Menu> => {
    return await menuApi.getMenu(clientId);
  },

  getMenuStatistics: async (clientId: string): Promise<MenuStatistics> => {
    return await menuApi.getMenuStatistics(clientId);
  },

  // Add other menu-related methods as needed
};
