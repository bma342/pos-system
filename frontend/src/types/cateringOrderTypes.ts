import { Order, OrderItem } from './orderTypes';

export interface CateringOrder extends Omit<Order, 'id'> {
  id: number; // Override the id type to number
  eventDate: Date;
  eventType: string;
  deliveryAddress: string;
  specialInstructions?: string;
}

export interface CateringOrderItem extends OrderItem {
  cateringSpecificField?: string;
}

// Remove the duplicate CateringOrder interface
// export interface CateringOrder { ... }

export type OrderStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface OrderStatistics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  // ... other properties
}

// ... other types

export interface Provider {
  // Define provider properties
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}