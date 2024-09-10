import { MenuItem, Modifier } from './menuTypes';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  clientId: string;
  locationId: string;
  modifiers: Modifier[];
  menuItem: MenuItem; // Add this line
}

export interface Order {
  id: string;
  guestId: string;
  locationId: string;
  items: CartItem[];
  total: number;
  status: string;
  paymentMethod: string;
  appliedRewardId: string;
  customerName: string;
}

// Add any other cart-related types here