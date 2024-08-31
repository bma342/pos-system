export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  locationId: string;
  minThreshold?: number;
  maxThreshold?: number;
  lastUpdated: string;
  // Add other relevant fields as needed
}