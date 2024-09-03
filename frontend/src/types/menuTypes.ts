export interface Menu {
  id: string;
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
  image: string;
}

export interface MenuStatistics {
  totalItems: number;
  mostPopularItems: PopularItem[];
}

export interface PopularItem {
  name: string;
  orderCount: number;
}
