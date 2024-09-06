export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  reorderPoint: number;
  locationId: string;
  categoryId: string;
  supplierId: string;
  cost: number;
  lastRestockDate: string;
  expirationDate?: string;
}

export interface InventoryCategory {
  id: string;
  name: string;
  description: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactInfo: string;
}
