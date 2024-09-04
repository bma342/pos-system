export interface POSSettings {
  id: string;
  locationId: string;
  posProfileId: string; // References the template POS profile
  posSystem: string;
  apiKey: string;
  apiEndpoint: string;
  menuSyncEnabled: boolean;
  inventorySyncEnabled: boolean;
  orderSyncEnabled: boolean;
  lastSyncTimestamp: string | null;
  syncFrequency: number;
  customSettings: Record<string, string | number | boolean>;
}
