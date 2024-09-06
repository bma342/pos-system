import axios from 'axios';
import { ServiceFee } from '../types/serviceFeeTypes';

export const serviceFeeService = {
  fetchServiceFees: async (clientId: string): Promise<ServiceFee[]> => {
    try {
      const response = await axios.get(`/api/clients/${clientId}/service-fees`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch service fees: ' + (error as Error).message);
    }
  },

  createServiceFee: async (clientId: string, serviceFee: Omit<ServiceFee, 'id'>): Promise<ServiceFee> => {
    try {
      const response = await axios.post(`/api/clients/${clientId}/service-fees`, serviceFee);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create service fee: ' + (error as Error).message);
    }
  },

  updateServiceFee: async (clientId: string, serviceFeeId: string, serviceFee: Partial<ServiceFee>): Promise<ServiceFee> => {
    try {
      const response = await axios.put(`/api/clients/${clientId}/service-fees/${serviceFeeId}`, serviceFee);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update service fee: ' + (error as Error).message);
    }
  },

  deleteServiceFee: async (clientId: string, serviceFeeId: string): Promise<void> => {
    try {
      await axios.delete(`/api/clients/${clientId}/service-fees/${serviceFeeId}`);
    } catch (error) {
      throw new Error('Failed to delete service fee: ' + (error as Error).message);
    }
  }
};