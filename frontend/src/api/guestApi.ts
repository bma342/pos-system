import apiClient from './apiClient';
import { Reward, CartItem } from '../types';

// ... existing functions

export const fetchGuestRewards = async (guestId: number): Promise<Reward[]> => {
  try {
    const response = await apiClient.get(`/api/guests/${guestId}/rewards`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch guest rewards');
  }
};

export const checkInventory = async (
  cartItems: CartItem[]
): Promise<boolean> => {
  try {
    const response = await apiClient.post('/api/check-inventory', {
      items: cartItems,
    });
    return response.data.inStock;
  } catch (error) {
    throw new Error('Failed to check inventory');
  }
};

export const getEstimatedPrepTime = async (
  cartItems: CartItem[]
): Promise<string> => {
  try {
    const response = await apiClient.post('/api/estimated-prep-time', {
      items: cartItems,
    });
    return response.data.estimatedTime;
  } catch (error) {
    throw new Error('Failed to get estimated prep time');
  }
};
