import axios from 'axios';
import { Menu, MenuItem, MenuGroup } from '../types/menuTypes';

class MenuService {
  private apiUrl = '/api/menus';

  async getMenus(): Promise<Menu[]> {
    const response = await axios.get<Menu[]>(this.apiUrl);
    return response.data;
  }

  async getMenuById(id: string): Promise<Menu> {
    const response = await axios.get<Menu>(`${this.apiUrl}/${id}`);
    return response.data;
  }

  async createMenu(menuData: Omit<Menu, 'id'>): Promise<Menu> {
    const response = await axios.post<Menu>(this.apiUrl, menuData);
    return response.data;
  }

  async updateMenu(id: string, menuData: Partial<Menu>): Promise<Menu> {
    const response = await axios.put<Menu>(`${this.apiUrl}/${id}`, menuData);
    return response.data;
  }

  async deleteMenu(id: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${id}`);
  }

  async addMenuItem(
    menuId: string,
    itemData: Omit<MenuItem, 'id'>
  ): Promise<MenuItem> {
    const response = await axios.post<MenuItem>(
      `${this.apiUrl}/${menuId}/items`,
      itemData
    );
    return response.data;
  }

  async updateMenuItem(
    menuId: string,
    itemId: string,
    itemData: Partial<MenuItem>
  ): Promise<MenuItem> {
    const response = await axios.put<MenuItem>(
      `${this.apiUrl}/${menuId}/items/${itemId}`,
      itemData
    );
    return response.data;
  }

  async deleteMenuItem(menuId: string, itemId: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${menuId}/items/${itemId}`);
  }

  async addMenuGroup(
    menuId: string,
    groupData: Omit<MenuGroup, 'id'>
  ): Promise<MenuGroup> {
    const response = await axios.post<MenuGroup>(
      `${this.apiUrl}/${menuId}/groups`,
      groupData
    );
    return response.data;
  }

  async updateMenuGroup(
    menuId: string,
    groupId: string,
    groupData: Partial<MenuGroup>
  ): Promise<MenuGroup> {
    const response = await axios.put<MenuGroup>(
      `${this.apiUrl}/${menuId}/groups/${groupId}`,
      groupData
    );
    return response.data;
  }

  async deleteMenuGroup(menuId: string, groupId: string): Promise<void> {
    await axios.delete(`${this.apiUrl}/${menuId}/groups/${groupId}`);
  }

  async getMenuAnalytics(
    menuId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Record<string, number>> {
    const response = await axios.get<Record<string, number>>(
      `${this.apiUrl}/${menuId}/analytics`,
      {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      }
    );
    return response.data;
  }
}

export default new MenuService();
