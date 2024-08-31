export interface Menu {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  menuGroups: MenuGroup[];
}

export interface MenuGroup {
  id: number;
  name: string;
  description?: string;
  sortOrder: number;
  items: MenuItem[];
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
  modifiers: Modifier[];
  imageUrl?: string;
}

export interface Modifier {
  id: number;
  name: string;
  price: number;
  isRequired: boolean;
  maxSelections?: number;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

export interface MenuStatistics {
  totalItems: number;
  totalGroups: number;
  mostPopularItems: { itemId: number; name: string; orderCount: number }[];
  leastPopularItems: { itemId: number; name: string; orderCount: number }[];
  averageItemPrice: number;
}
