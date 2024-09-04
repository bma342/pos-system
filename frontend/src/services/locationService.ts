import { Location } from '../types/locationTypes';
import { getLocations, getLocation } from '../api/locationApi';

export class LocationService {
  async getLocations(clientId: string): Promise<Location[]> {
    return getLocations(clientId);
  }

  async getLocation(clientId: string, id: string): Promise<Location> {
    return getLocation(clientId, id);
  }
}

