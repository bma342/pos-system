export type POSType = 'TOAST' | 'BRINK' | 'REVEL' | 'SQUARE';

export interface CorePOSProfile {
  // Define your CorePOSProfile properties here
}

export interface LocationPOSProfile {
  id: string;
  locationId: string;
  corePOSProfileId: string;
  lastSyncStatus: 'SUCCESS' | 'FAILED' | 'IN_PROGRESS' | 'NOT_SYNCED';
  lastSyncError?: string;
  customSettings: Record<string, any>;
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
  // Add properties as needed
  id?: string;
  name?: string;
}
