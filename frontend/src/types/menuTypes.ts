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
  modifiers: Modifier[];
}

export interface Modifier {
  id: string;
  name: string;
  price: number;
}
