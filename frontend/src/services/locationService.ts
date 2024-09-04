import api from './api';
import { Location } from '../types/locationTypes';

export class LocationService {
  async getLocations(): Promise<Location[]> {
    const response = await api.get('/locations');
    return response.data;
  }

  async getLocation(id: string): Promise<Location> {
    const response = await api.get(`/locations/${id}`);
    return response.data;
  }

  // Add other location-related methods as needed
}

