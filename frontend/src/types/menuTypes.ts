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

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  groupName: string;
  modifiers: Modifier[];
  defaultModifiers: Modifier[];
  reviewsEnabled: boolean;
  averageRating?: number;
  reviewCount?: number;
  showQuantityAvailable: boolean;
  quantityAvailable?: number;
  isAvailable: boolean;
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
  mostPopularItems: MenuItem[]; // Add this line
  leastPopularItem: string;
  averageOrderValue: number;
  // Add any other relevant statistics for your multi-location restaurant system
}
