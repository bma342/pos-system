export interface Order {
  id: string;
  clientId: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  quantity: number;
  price: number;
  selectedModifiers: SelectedModifier[];
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
