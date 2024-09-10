export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: string;
  // Add other relevant properties
}

export interface OrderItem {
  id: string;
  name: string;
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
