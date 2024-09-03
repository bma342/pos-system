import { Location, LocationCreateData } from '../types/locationTypes';
import apiClient from './apiClient';

export const locationApi = {
  getLocations: async (): Promise<Location[]> => {
    try {
      const response = await apiClient.get<Location[]>('/locations');
      return response.data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      throw error;
    }
  },

  getLocation: async (id: number): Promise<Location> => {
    try {
      const response = await apiClient.get<Location>(`/locations/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching location with id ${id}:`, error);
      throw error;
    }
  },

  createLocation: async (location: LocationCreateData): Promise<Location> => {
    try {
      const response = await apiClient.post<Location>('/locations', location);
      return response.data;
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  },

  updateLocation: async (location: Location): Promise<Location> => {
    try {
      const response = await apiClient.put<Location>(`/locations/${location.id}`, location);
      return response.data;
    } catch (error) {
      console.error(`Error updating location with id ${location.id}:`, error);
      throw error;
    }
  },

  deleteLocation: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/locations/${id}`);
    } catch (error) {
      console.error(`Error deleting location with id ${id}:`, error);
      throw error;
    }
  },

  getLocationMenu: async (id: number): Promise<any> => {
    try {
      const response = await apiClient.get(`/locations/${id}/menu`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching menu for location with id ${id}:`, error);
      throw error;
    }
  },

  getLocationOrders: async (id: number): Promise<any> => {
    try {
      const response = await apiClient.get(`/locations/${id}/orders`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching orders for location with id ${id}:`, error);
      throw error;
    }
  },
};
