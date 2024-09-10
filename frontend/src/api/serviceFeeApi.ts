import axios from 'axios';
import { ServiceFee, ServiceFeeCreateData } from '../types/serviceFeeTypes';

export const serviceFeeApi = {
  getServiceFees: async (clientId: string): Promise<ServiceFee[]> => {
    const response = await axios.get(`/api/service-fees/${clientId}`);
    return response.data;
  },

  createServiceFee: async (clientId: string, serviceFee: ServiceFeeCreateData): Promise<ServiceFee> => {
    const response = await axios.post(`/api/service-fees/${clientId}`, serviceFee);
    return response.data;
  },

  updateServiceFee: async (clientId: string, serviceFee: ServiceFee): Promise<ServiceFee> => {
    const response = await axios.put(`/api/service-fees/${clientId}/${serviceFee.id}`, serviceFee);
    return response.data;
  },

  deleteServiceFee: async (clientId: string, serviceFeeId: string): Promise<void> => {
    await axios.delete(`/api/service-fees/${clientId}/${serviceFeeId}`);
  }
};
