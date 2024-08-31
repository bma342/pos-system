export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  // Add other relevant fields
}

export interface Modifier {
  id: string;
  name: string;
  price: number;
  // Add other necessary fields
}

export interface Category {
  id: string;
  name: string;
  // Add other relevant fields
}

export interface Menu {
  id: string;
  name: string;
  categories: Category[];
  // Add other relevant fields
}

export interface MenuGroup {
  id: string;
  name: string;
  items: MenuItem[];
  // Add other relevant fields
}

// Add any other necessary types related to menus