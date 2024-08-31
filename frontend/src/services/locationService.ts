import apiClient from '../api/apiClient';
import {
  Location,
  LocationCreateData,
  LocationUpdateData,
} from '../types/locationTypes';

export class LocationService {
  async getLocations(): Promise<Location[]> {
    const response = await apiClient.get<Location[]>('/api/locations');
    return response.data;
  }

  async createLocation(locationData: LocationCreateData): Promise<Location> {
    const response = await apiClient.post<Location>(
      '/api/locations',
      locationData
    );
    return response.data;
  }

  async updateLocation(
    locationId: string,
    updateData: LocationUpdateData
  ): Promise<Location> {
    const response = await apiClient.put<Location>(
      `/api/locations/${locationId}`,
      updateData
    );
    return response.data;
  }

  async deleteLocation(locationId: string): Promise<void> {
    await apiClient.delete(`/api/locations/${locationId}`);
  }

  async getLocationDetails(locationId: string): Promise<Location> {
    const response = await apiClient.get<Location>(
      `/api/locations/${locationId}`
    );
    return response.data;
  }

  // Add other location-related methods as needed
}

const locationService = new LocationService();
export default locationService;

// Also export individual methods for convenience
export const {
  getLocations,
  createLocation,
  updateLocation,
  deleteLocation,
  getLocationDetails,
} = locationService;
