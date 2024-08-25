import apiClient from './axios';
import { Menu } from '../types';

export const fetchMenus = async (clientId: number): Promise<Menu[]> => {
  const response = await apiClient.get<Menu[]>(
    `/api/clients/${clientId}/menus`
  );
  return response.data;
};

export const fetchMenuWithDetails = async (
  clientId: number,
  menuId: number
): Promise<Menu> => {
  const response = await apiClient.get<Menu>(
    `/api/clients/${clientId}/menus/${menuId}?includeDetails=true`
  );
  return response.data;
};

export const createMenu = async (
  clientId: number,
  menuData: Partial<Menu>
): Promise<Menu> => {
  const response = await apiClient.post<Menu>(
    `/api/clients/${clientId}/menus`,
    menuData
  );
  return response.data;
};

export const updateMenu = async (
  clientId: number,
  menuId: number,
  menuData: Partial<Menu>
): Promise<Menu> => {
  const response = await apiClient.put<Menu>(
    `/api/clients/${clientId}/menus/${menuId}`,
    menuData
  );
  return response.data;
};

export const deleteMenu = async (
  clientId: number,
  menuId: number
): Promise<void> => {
  await apiClient.delete(`/api/clients/${clientId}/menus/${menuId}`);
};

export const syncMenus = async (clientId: number): Promise<void> => {
  await apiClient.post(`/api/clients/${clientId}/menus/sync`);
};
