import api from '../api/axios';
import { Location } from '../types/locationTypes';
import logger from '../utils/logger';

export const LocationService = {
  async getLocations(): Promise<Location[]> {
    try {
      const response = await api.get<Location[]>('/locations');
      logger.info('Fetched locations successfully');
      return response.data;
    } catch (error) {
      logger.error('Error fetching locations:', error);
      throw error;
    }
  },

  async getLocation(id: string): Promise<Location> {
    try {
      const response = await api.get<Location>(`/locations/${id}`);
      logger.info(`Fetched location with id ${id} successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error fetching location with id ${id}:`, error);
      throw error;
    }
  },

  async createLocation(location: Omit<Location, 'id'>): Promise<Location> {
    try {
      const response = await api.post<Location>('/locations', location);
      logger.info('Created new location successfully');
      return response.data;
    } catch (error) {
      logger.error('Error creating new location:', error);
      throw error;
    }
  },

  async updateLocation(id: string, location: Partial<Location>): Promise<Location> {
    try {
      const response = await api.put<Location>(`/locations/${id}`, location);
      logger.info(`Updated location with id ${id} successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error updating location with id ${id}:`, error);
      throw error;
    }
  },

  async deleteLocation(id: string): Promise<void> {
    try {
      await api.delete(`/locations/${id}`);
      logger.info(`Deleted location with id ${id} successfully`);
    } catch (error) {
      logger.error(`Error deleting location with id ${id}:`, error);
      throw error;
    }
  }
};