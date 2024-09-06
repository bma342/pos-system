import axios from 'axios';
import { Discount } from '../types/discountTypes';

export const DiscountService = {
  fetchDiscounts: async (clientId: string): Promise<Discount[]> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/discounts`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch discounts: ' + (error as Error).message);
    }
  },

  createDiscount: async (clientId: string, discount: Omit<Discount, 'id'>): Promise<Discount> => {
    try {
      const response = await axios.post(`/api/clients/${clientId}/discounts`, discount);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create discount: ' + (error as Error).message);
    }
  },

  updateDiscount: async (clientId: string, discountId: string, discount: Partial<Discount>): Promise<Discount> => {
    try {
      const response = await axios.put(`/api/clients/${clientId}/discounts/${discountId}`, discount);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update discount: ' + (error as Error).message);
    }
  },

  deleteDiscount: async (clientId: string, discountId: string): Promise<void> => {
    try {
      await axios.delete(`/api/clients/${clientId}/discounts/${discountId}`);
    } catch (error) {
      throw new Error('Failed to delete discount: ' + (error as Error).message);
    }
  }
};