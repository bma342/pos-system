import { Order, OrderItem } from './orderTypes';

export interface CateringOrder {
  id: string;
  clientId: string;
  customerId: string;
  customerName: string;
  total: number;
  status: OrderStatus;
  eventDate: string;
  eventType: string;
  deliveryAddress: string;
  specialInstructions?: string;
  orderDate: string;
  totalAmount: number;
}

export interface CateringOrderItem extends OrderItem {
  cateringSpecificField?: string;
}

// Remove the duplicate CateringOrder interface
// export interface CateringOrder { ... }

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';

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