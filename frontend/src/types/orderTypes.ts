export interface Order {
  id: string;
  clientId: string;
  guestId: string;
  locationId: string;
  locationName: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  total: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  paymentMethod: string; // Add this line
  appliedRewardId?: string; // Add this line
}

export interface OrderItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  modifiers: OrderItemModifier[];
  outOfStock?: boolean;
}

export interface OrderItemModifier {
  modifierId: string;
  quantity: number;
  price: number;
}

export interface SelectedModifier {
  id: string;
  name: string;
  price: number;
}

export interface Modifier {
  id: string;
  name: string;
  price: number;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}
