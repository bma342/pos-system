import axios from 'axios';
import { Discount, DiscountCreateData } from '../types/discountTypes';

export const discountApi = {
  getDiscounts: async (clientId: string): Promise<Discount[]> => {
    const response = await axios.get(`/api/discounts/${clientId}`);
    return response.data;
  },

  createDiscount: async (clientId: string, discount: DiscountCreateData): Promise<Discount> => {
    const response = await axios.post(`/api/discounts/${clientId}`, discount);
    return response.data;
  },

  fetchDiscountsByLocation: async (locationId: string): Promise<Discount[]> => {
    const response = await axios.get(`/api/discounts/location/${locationId}`);
    return response.data;
  },

  updateDiscount: async (clientId: string, discountId: string, discount: Partial<Discount>): Promise<Discount> => {
    const response = await axios.put(`/api/discounts/${clientId}/${discountId}`, discount);
    return response.data;
  },

  deleteDiscount: async (clientId: string, discountId: string): Promise<void> => {
    await axios.delete(`/api/discounts/${clientId}/${discountId}`);
  },

  scheduleDiscountDrop: async (clientId: string, discountId: string, dropDate: string): Promise<Discount> => {
    const response = await axios.post(`/api/discounts/${clientId}/${discountId}/schedule`, { dropDate });
    return response.data;
  },

  syncPOSDiscounts: async (clientId: string): Promise<void> => {
    await axios.post(`/api/discounts/${clientId}/sync-pos`);
  },
};
