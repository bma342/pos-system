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

  createMenuGroup: async (clientId: string, menuId: string, menuGroupData: Partial<MenuGroup>): Promise<MenuGroup> => {
    return await menuApi.createMenuGroup(clientId, menuId, menuGroupData);
  },

  updateMenuGroup: async (clientId: string, menuId: string, menuGroupId: string, menuGroupData: Partial<MenuGroup>): Promise<MenuGroup> => {
    return await menuApi.updateMenuGroup(clientId, menuId, menuGroupId, menuGroupData);
  },

  createMenuItem: async (clientId: string, menuGroupId: string, menuItemData: Partial<MenuItem>): Promise<MenuItem> => {
    // Ensure required fields are present
    if (!menuItemData.name) {
      throw new Error("MenuItem name is required");
    }
    
    // Create a new object with required fields, excluding 'id'
    const newMenuItem: Omit<MenuItem, "id"> = {
      name: menuItemData.name,
      description: menuItemData.description || "",
      price: menuItemData.price || 0,
      imageUrl: menuItemData.imageUrl || "",
      groupName: menuItemData.groupName || "",
      modifiers: menuItemData.modifiers || [],
      defaultModifiers: menuItemData.defaultModifiers || [],
      // Add any other fields that are part of the MenuItem type
    };

    return await menuApi.createMenuItem(clientId, menuGroupId, newMenuItem);
  },

  updateMenuItem: async (clientId: string, menuGroupId: string, menuItemId: string, menuItemData: Partial<MenuItem>): Promise<MenuItem> => {
    return await menuApi.updateMenuItem(clientId, menuGroupId, menuItemId, menuItemData);
  },

  createModifier: async (clientId: string, menuId: string, groupId: string, itemId: string, modifierData: Partial<Modifier>): Promise<Modifier> => {
    return await menuApi.createModifier(clientId, menuId, groupId, itemId, modifierData);
  },

  updateModifier: async (clientId: string, menuId: string, groupId: string, itemId: string, modifierId: string, modifierData: Partial<Modifier>): Promise<Modifier> => {
    return await menuApi.updateModifier(clientId, menuId, groupId, itemId, modifierId, modifierData);
  },

  deleteItem: async (clientId: string, type: string, id: string): Promise<void> => {
    return await menuApi.deleteItem(clientId, type, id);
  },

  syncMenus: async (clientId: string): Promise<void> => {
    return await menuApi.syncMenus(clientId);
  },
};

export default menuService;
