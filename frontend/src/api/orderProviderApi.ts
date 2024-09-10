import axios from 'axios';
import { OrderProvider } from '../types/orderProviderTypes';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const orderProviderApi = {
  getOrderProvider: async (locationId: string, providerId: string): Promise<OrderProvider> => {
    const response = await axios.get(`${API_BASE_URL}/locations/${locationId}/order-providers/${providerId}`);
    return response.data;
  },

  updateOrderProvider: async (locationId: string, providerId: string, updateData: Partial<OrderProvider>): Promise<OrderProvider> => {
    const response = await axios.put(`${API_BASE_URL}/locations/${locationId}/order-providers/${providerId}`, updateData);
    return response.data;
  },
};