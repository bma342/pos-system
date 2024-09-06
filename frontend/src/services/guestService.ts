import axios from 'axios';
import { GuestMetrics, Guest } from '../types/guestTypes';

export const guestService = {
  fetchGuestMetrics: async (locationId: string, guestId: string): Promise<GuestMetrics> => {
    try {
      const response = await axios.get(`/api/locations/${locationId}/guests/${guestId}/metrics`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch guest metrics: ' + (error as Error).message);
    }
  },

  fetchGuests: async (locationId: string, page = 1, limit = 20): Promise<{ guests: Guest[], total: number }> => {
    try {
      const response = await axios.get(`/api/locations/${locationId}/guests`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch guests: ' + (error as Error).message);
    }
  },

  createGuest: async (locationId: string, guestData: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'>): Promise<Guest> => {
    try {
      const response = await axios.post(`/api/locations/${locationId}/guests`, guestData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create guest: ' + (error as Error).message);
    }
  },

  updateGuest: async (locationId: string, guestId: string, guestData: Partial<Guest>): Promise<Guest> => {
    try {
      const response = await axios.put(`/api/locations/${locationId}/guests/${guestId}`, guestData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update guest: ' + (error as Error).message);
    }
  },

  deleteGuest: async (locationId: string, guestId: string): Promise<void> => {
    try {
      await axios.delete(`/api/locations/${locationId}/guests/${guestId}`);
    } catch (error) {
      throw new Error('Failed to delete guest: ' + (error as Error).message);
    }
  }
};
