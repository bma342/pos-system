import { MenuItem } from './menuTypes';

export interface CartItem {
  clientId: string;
  locationId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedModifiers: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}