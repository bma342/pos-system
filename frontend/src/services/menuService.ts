import { Menu, MenuStatistics } from '../types/menuTypes';
import { getMenu, getMenuStatistics, updateMenu } from '../api/menuApi';

export const menuService = {
  getMenu,
  getMenuStatistics,
  updateMenu,
};
