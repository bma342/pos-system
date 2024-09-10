export type POSType = 'SQUARE' | 'CLOVER' | 'TOAST' | 'LIGHTSPEED' | 'REVEL';

export interface CorePOSProfile {
  // Define your CorePOSProfile properties here
}

export interface LocationPOSProfile {
  id: string;
  locationId: string;
  corePOSProfileId: string;
  lastSyncStatus: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS' | 'NOT_SYNCED';
  lastSyncError?: string;
  customSettings: Record<string, string | number | boolean>;
}

export interface POSMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  externalId: string;
}

export interface POSCategory {
  id: string;
  name: string;
  externalId: string;
}

export interface POSOrder {
  id: string;
  externalId: string;
  total: number;
  status: string;
  items: POSOrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface POSOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  externalId: string;
}

export interface POSIntegration {
  id: string;
  name: string;
  type: string;
  // Add other properties as needed
}

export interface POSProfile {
  id: string;
  name: string;
  type: POSType;
  apiKey: string;
  clientId: string;
  active: boolean; // Add this line
}
