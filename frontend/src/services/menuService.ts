import { Menu, MenuGroup, MenuItem, Modifier, MenuStatistics } from '../types/menuTypes';
import { menuApi } from '../api/menuApi';

export const menuService = {
  getMenu: async (clientId: string, locationId: string): Promise<Menu> => {
    return await menuApi.getMenu(clientId, locationId);
  },

  updateMenu: async (clientId: string, locationId: string, menuData: Partial<Menu>): Promise<Menu> => {
    return await menuApi.updateMenu(clientId, locationId, menuData);
  },

  getMenuStatistics: async (clientId: string, locationId: string): Promise<MenuStatistics> => {
    return await menuApi.getMenuStatistics(clientId, locationId);
  },

  getAllMenus: async (clientId: string): Promise<Menu[]> => {
    return await menuApi.getAllMenus(clientId);
  },

  createMenu: async (clientId: string, menuData: Partial<Menu>): Promise<Menu> => {
    return await menuApi.createMenu(clientId, menuData);
  },

  createMenuGroup: async (clientId: string, menuId: string, groupData: Partial<MenuGroup>): Promise<MenuGroup> => {
    return await menuApi.createMenuGroup(clientId, menuId, groupData);
  },

  updateMenuGroup: async (clientId: string, menuId: string, groupId: string, groupData: Partial<MenuGroup>): Promise<MenuGroup> => {
    return await menuApi.updateMenuGroup(clientId, menuId, groupId, groupData);
  },

  createMenuItem: async (clientId: string, locationId: string, menuItemData: Omit<MenuItem, 'id'>): Promise<MenuItem> => {
    return await menuApi.createMenuItem(clientId, locationId, menuItemData);
  },

  updateMenuItem: async (clientId: string, locationId: string, menuItemId: string, menuItemData: MenuItem): Promise<MenuItem> => {
    return await menuApi.updateMenuItem(clientId, locationId, menuItemId, menuItemData);
  },

  createModifier: async (clientId: string, menuId: string, groupId: string, itemId: string, modifierData: Partial<Modifier>): Promise<Modifier> => {
    return await menuApi.createModifier(clientId, menuId, groupId, itemId, modifierData);
  },

  updateModifier: async (clientId: string, menuId: string, groupId: string, itemId: string, modifierId: string, modifierData: Partial<Modifier>): Promise<Modifier> => {
    return await menuApi.updateModifier(clientId, menuId, groupId, itemId, modifierId, modifierData);
  },

  deleteItem: async (clientId: string, type: string, id: string): Promise<void> => {
    await menuApi.deleteItem(clientId, type, id);
  },

  syncMenus: async (clientId: string): Promise<void> => {
    await menuApi.syncMenus(clientId);
  },
};

export default menuService;
