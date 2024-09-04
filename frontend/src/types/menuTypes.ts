export interface Menu {
  id: string;
  locationId: string;
  name: string;
  menuGroups: MenuGroup[];
}

export interface MenuGroup {
  id: string;
  name: string;
  items: MenuItem[];
}

export interface MenuItem extends BaseMenuItem {
  localOverrides: LocalOverrides;
  modifierGroups: {
    id: string;
    name: string;
    modifiers: Modifier[];
  }[];
}

export interface BaseMenuItem {
  id: string;
  posId: string;
  name: string;
  description: string;
  price: number;
  // Other common fields
}

export interface Modifier extends BaseModifier {
  localOverrides: LocalOverrides;
}

export interface BaseModifier {
  id: string;
  posId: string;
  name: string;
  price: number;
  // Other common fields
}

export interface LocalOverrides {
  name?: string;
  description?: string;
  price?: number;
  onlineInventoryCount?: number;
  isAvailable?: boolean;
  loyaltyPointsPrice?: number;
  // Other fields that can be overridden
}

export interface CartItem {
  menuItem: {
    id: string;
    posId: string;
    name: string;
    price: number;
  };
  quantity: number;
  selectedModifiers: Modifier[];
}

export interface MenuStatistics {
  totalItems: number;
  averagePrice: number;
  mostPopularItem: string;
  leastPopularItem: string;
  averageOrderValue: number;
  // Add any other relevant statistics for your multi-location restaurant system
}
