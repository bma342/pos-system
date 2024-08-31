import axios from 'axios';
import { MenuItem, Category } from '../types/menuTypes';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const MenuItemService = {
  async getMenuItems(locationId: string): Promise<MenuItem[]> {
    const response = await axios.get(`${API_BASE_URL}/locations/${locationId}/menu-items`);
    return response.data;
  },

  async getMenuItem(locationId: string, menuItemId: string): Promise<MenuItem> {
    const response = await axios.get(`${API_BASE_URL}/locations/${locationId}/menu-items/${menuItemId}`);
    return response.data;
  },

  async createMenuItem(locationId: string, menuItem: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    const response = await axios.post(`${API_BASE_URL}/locations/${locationId}/menu-items`, menuItem);
    return response.data;
  },

  async updateMenuItem(locationId: string, menuItemId: string, menuItem: Partial<MenuItem>): Promise<MenuItem> {
    const response = await axios.put(`${API_BASE_URL}/locations/${locationId}/menu-items/${menuItemId}`, menuItem);
    return response.data;
  },

  async deleteMenuItem(locationId: string, menuItemId: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/locations/${locationId}/menu-items/${menuItemId}`);
  },

  async getCategories(locationId: string): Promise<Category[]> {
    const response = await axios.get(`${API_BASE_URL}/locations/${locationId}/categories`);
    return response.data;
  },

  async createCategory(locationId: string, category: Omit<Category, 'id'>): Promise<Category> {
    const response = await axios.post(`${API_BASE_URL}/locations/${locationId}/categories`, category);
    return response.data;
  },

  async updateCategory(locationId: string, categoryId: string, category: Partial<Category>): Promise<Category> {
    const response = await axios.put(`${API_BASE_URL}/locations/${locationId}/categories/${categoryId}`, category);
    return response.data;
  },

  async deleteCategory(locationId: string, categoryId: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/locations/${locationId}/categories/${categoryId}`);
  },
};