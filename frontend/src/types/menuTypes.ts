export interface Menu {
  id: string;
  name: string;
  clientId: string;
  locationId: string;
  menuGroups: MenuGroup[];
  isModified?: boolean;
  // ... any other properties
}

export interface MenuGroup {
  id: string;
  name: string;
  items: MenuItem[];
  isModified?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  groupName: string;
  modifiers: Modifier[];
  defaultModifiers: Modifier[];
  isModified?: boolean;
  description?: string;
  reviewsEnabled?: boolean;
  averageRating?: number;
  reviewCount?: number;
  showQuantityAvailable?: boolean;
  quantityAvailable?: number;
  isAvailable?: boolean;
  calories?: number;
  allergens?: string[];
  nutritionalInfo?: string;
  image?: string;
}

export interface BaseMenuItem {
  id: string;
  posId: string;
  name: string;
  description: string;
  price: number;
  // Other common fields
}

export interface Modifier {
  id: string;
  name: string;
  price: number;
  value?: string | number | boolean;
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
  modifiers: Modifier[];
}

export interface MenuStatistics {
  totalItems: number;
  averagePrice: number;
  mostPopularItem: string;
  mostPopularItems: MenuItem[];
  leastPopularItem: string;
  averageOrderValue: number;
  // Add any other relevant statistics for your multi-location restaurant system
}
