export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
  tenantId: string;
}
