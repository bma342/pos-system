import api from './api';
import { GuestMetrics } from '../types/guestTypes';

export const GuestService = {
  fetchGuestMetrics: async (locationId: string): Promise<GuestMetrics> => {
    const response = await api.get(`/locations/${locationId}/guest-metrics`);
    return response.data;
  },
};
