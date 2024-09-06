export interface POSIntegration {
  id: string;
  tenantId: string;
  posType: POSType;
  apiKey: string;
  isActive: boolean;
  lastSyncDate: string;
  locationId?: string; // Add this line
}

export enum POSType {
  TOAST = 'TOAST',
  SQUARE = 'SQUARE',
  CLOVER = 'CLOVER',
  REVEL = 'REVEL',
}

export interface POSProfile {
  id: number;
  tenantId: string;
  posType: POSType;
  apiKey: string;
  isActive: boolean;
  lastSyncDate: string;
  name: string;
  apiEndpoint: string;
}
