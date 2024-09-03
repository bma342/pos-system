import { Order, OrderItem } from './orderTypes';

export interface CateringOrder extends Order {
  eventDate: Date;
  eventType: string;
  deliveryAddress: string;
  specialInstructions?: string;
}

export interface CateringOrderItem extends OrderItem {
  cateringSpecificField?: string; // Add any catering-specific fields here
}

export interface CateringOrder {
  id: number;
  customerName: string;
  orderDate: string;
  status: OrderStatus;
  totalAmount: number;
  // Add other relevant fields
}

export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface OrderStatistics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  // ... other properties
}

// ... other types