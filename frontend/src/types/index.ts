export interface RealtimeMetrics {
  [key: string]: number;
}

export interface Challenge {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  reward: string;
  clientId: number;
  locationId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Export other types from separate files
export * from './analyticsTypes';
export * from './cateringTypes';
export * from './clientTypes';
export * from './inventoryTypes';
export * from './locationTypes';
export * from './menuTypes';
export * from './posIntegrationTypes';
export * from './reviewTypes';
export * from './userTypes';
