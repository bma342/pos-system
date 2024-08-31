export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  clientId: string;
  locationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  modifiers: OrderItemModifier[];
}

export interface OrderItemModifier {
  id: string;
  name: string;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}