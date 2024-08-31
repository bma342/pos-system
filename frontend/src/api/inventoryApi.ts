import axios from 'axios';
import { InventoryItem } from '../types';

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const fetchInventoryItems = async (): Promise<InventoryItem[]> => {
  try {
    const response = await axios.get<InventoryItem[]>(
      `${API_BASE_URL}/inventory`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory items:', error);
    throw error;
  }
};

export const getInventoryItemById = async (
  id: number
): Promise<InventoryItem> => {
  try {
    const response = await axios.get<InventoryItem>(
      `${API_BASE_URL}/inventory/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching inventory item with id ${id}:`, error);
    throw error;
  }
};

export const createInventoryItem = async (
  itemData: Partial<InventoryItem>
): Promise<InventoryItem> => {
  try {
    const response = await axios.post<InventoryItem>(
      `${API_BASE_URL}/inventory`,
      itemData
    );
    return response.data;
  } catch (error) {
    console.error('Error creating inventory item:', error);
    throw error;
  }
};

export const updateInventoryItem = async (
  id: number,
  itemData: Partial<InventoryItem>
): Promise<InventoryItem> => {
  try {
    const response = await axios.put<InventoryItem>(
      `${API_BASE_URL}/inventory/${id}`,
      itemData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating inventory item with id ${id}:`, error);
    throw error;
  }
};

export const deleteInventoryItem = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/inventory/${id}`);
  } catch (error) {
    console.error(`Error deleting inventory item with id ${id}:`, error);
    throw error;
  }
};

export const updateInventoryQuantity = async (
  id: number,
  quantity: number
): Promise<InventoryItem> => {
  try {
    const response = await axios.patch<InventoryItem>(
      `${API_BASE_URL}/inventory/${id}/quantity`,
      { quantity }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error updating quantity for inventory item with id ${id}:`,
      error
    );
    throw error;
  }
};
