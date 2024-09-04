import api from './axios';
import { ServiceFee } from '../types/serviceFeeTypes';
import logger from '../utils/logger';

export const ServiceFeeApi = {
  async getServiceFees(clientId: string): Promise<ServiceFee[]> {
    try {
      const response = await api.get<ServiceFee[]>(
        `/clients/${clientId}/service-fees`
      );
      logger.info('Fetched service fees successfully', { clientId });
      return response.data;
    } catch (error) {
      logger.error('Error fetching service fees', { clientId, error });
      throw error;
    }
  },

  async createServiceFee(
    clientId: string,
    serviceFee: Omit<ServiceFee, 'id'>
  ): Promise<ServiceFee> {
    try {
      const response = await api.post<ServiceFee>(
        `/clients/${clientId}/service-fees`,
        serviceFee
      );
      logger.info('Created service fee successfully', {
        clientId,
        serviceFeeId: response.data.id,
      });
      return response.data;
    } catch (error) {
      logger.error('Error creating service fee', { clientId, error });
      throw error;
    }
  },

  async updateServiceFee(
    clientId: string,
    serviceFeeId: string,
    serviceFee: Partial<ServiceFee>
  ): Promise<ServiceFee> {
    try {
      const response = await api.put<ServiceFee>(
        `/clients/${clientId}/service-fees/${serviceFeeId}`,
        serviceFee
      );
      logger.info('Updated service fee successfully', {
        clientId,
        serviceFeeId,
      });
      return response.data;
    } catch (error) {
      logger.error('Error updating service fee', {
        clientId,
        serviceFeeId,
        error,
      });
      throw error;
    }
  },

  async deleteServiceFee(
    clientId: string,
    serviceFeeId: string
  ): Promise<void> {
    try {
      await api.delete(`/clients/${clientId}/service-fees/${serviceFeeId}`);
      logger.info('Deleted service fee successfully', {
        clientId,
        serviceFeeId,
      });
    } catch (error) {
      logger.error('Error deleting service fee', {
        clientId,
        serviceFeeId,
        error,
      });
      throw error;
    }
  },
};

export default ServiceFeeApi;
